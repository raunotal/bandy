import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AddEventDTO } from '../../../types/dto/event';
import { AddEventResponse } from '../../../types/response';
import { logger } from 'firebase-functions';
import { Status } from '../../../enums/event';
import { Event } from '../../../types/event';
import { Collection } from '../../../enums/collection';
import { FieldValue } from 'firebase-admin/firestore';
import { getMembersDeviceTokens } from '../helpers/messaging';

const firestore = admin.firestore();
const messaging = admin.messaging();

if (!admin.apps.length) {
  admin.initializeApp();
}

export const addEvent = functions.https.onCall(
  async (data: AddEventDTO): Promise<AddEventResponse> => {
    logger.log('[addEvent]', data);
    const { members, managerId, ...eventData } = data;
    const eventRef = firestore.collection('events').doc();
    const managerRef = firestore.collection('users').doc(managerId);
    const updatedMembers = members.map((member) => ({
      uid: member.uid,
      name: member.name,
      instrument: member.instrument,
      status: Status.Pending,
    }));

    try {
      await firestore.runTransaction(async (transaction) => {
        transaction.set(eventRef, {
          ...eventData,
          status: Status.Pending,
          members: updatedMembers,
        });

        members.forEach((member) => {
          const userRef = firestore.collection('users').doc(member.uid!);
          transaction.update(userRef, {
            events: FieldValue.arrayUnion(eventRef.id),
          });
        });

        transaction.update(managerRef, {
          events: FieldValue.arrayUnion(eventRef.id),
        });
      });

      const tokens = await getMembersDeviceTokens(members);
      logger.log('tokens:', tokens);
      if (tokens.length > 0) {
        const message = {
          notification: {
            title: 'New Event Created!',
            body: 'Please set your availability for the new event.',
          },
          tokens: tokens,
        };

        const response = await messaging.sendMulticast(message);
        logger.log('Notifications sent:', response);
      }

      return {
        statusCode: 301,
        message: 'Event created',
        event: {
          ...eventData,
          status: Status.Pending,
          uid: eventRef.id,
          members: updatedMembers,
        },
      };
    } catch (error) {
      logger.error('Transaction failed: ', error);
      throw new functions.https.HttpsError(
        'unknown',
        'Transaction failed',
        error
      );
    }
  }
);

export const updateEventStatus = functions.https.onCall(
  async (event: Event): Promise<Event | null> => {
    logger.log('[updateEventStatus]', event);
    const { uid, status } = event;

    try {
      await firestore.collection(Collection.Events).doc(uid!).update({
        status,
      });
      logger.log('[updateEventStatus] - eventRef updated');

      return event;
    } catch (error) {
      logger.error('Error fetching updateEventStatus:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error fetching updateEventStatus',
        error
      );
    }
  }
);

export const updateUserEventStatus = functions.https.onCall(
  async (event: Event): Promise<Event | null> => {
    logger.log('[updateUserEventStatus]', event);
    const { uid, members } = event;

    try {
      await firestore.collection(Collection.Events).doc(uid!).update({
        members,
      });
      logger.log('[updateUserEventStatus] - eventRef updated');

      return event;
    } catch (error) {
      logger.error('Error fetching updateUserEventStatus:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error fetching updateUserEventStatus',
        error
      );
    }
  }
);
