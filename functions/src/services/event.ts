import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AddEventDTO } from '../../../types/dto/event';
import { AddEventResponse } from '../../../types/response';
import { logger } from 'firebase-functions';
import { Status } from '../../../enums/event';

const firestore = admin.firestore();

if (!admin.apps.length) {
  admin.initializeApp();
}

export const addEvent = functions.https.onCall(
  async (data: AddEventDTO): Promise<AddEventResponse> => {
    logger.log('[addEvent]', data);
    const { members, managerId, ...eventData } = data;
    const eventRef = firestore.collection('events').doc();
    const managerRef = firestore.collection('users').doc(managerId);

    try {
      await firestore.runTransaction(async (transaction) => {
        transaction.set(eventRef, {
          ...eventData,
          status: Status.Pending,
          members: members.map((member) => ({
            uid: member.uid,
            name: member.name,
            instrument: member.instrument,
            status: 'pending',
          })),
        });

        members.forEach((member) => {
          const userRef = firestore.collection('users').doc(member.uid!);
          transaction.update(userRef, {
            events: admin.firestore.FieldValue.arrayUnion(eventRef.id),
          });
        });

        transaction.update(managerRef, {
          events: admin.firestore.FieldValue.arrayUnion(eventRef.id),
        });
      });

      return {
        statusCode: 301,
        message: 'Event created',
        event: {
          ...eventData,
          status: Status.Pending,
          uid: eventRef.id,
          members,
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
