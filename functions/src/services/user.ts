import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collection } from '../../../enums/collection';
import { Member } from '../../../types/member';
import { logger } from 'firebase-functions';
import { UserRoles } from '../../../enums/roles';
import { UserDocument } from '../../../types/firestore/user';
import {
  GetUsersWithMemberRoleDTO,
  UserAppDataDTO,
} from '../../../types/dto/user';
import { Event } from '../../../types/event';
import { Band } from '../../../types/band';

if (!admin.apps.length) {
  admin.initializeApp();
}

const firestore = admin.firestore();

export const getUsersWithMemberRole = functions.https.onCall(
  async (): Promise<GetUsersWithMemberRoleDTO> => {
    logger.log('[getBandMembers]');

    try {
      const usersSnapshot = await firestore
        .collection(Collection.Users)
        .where('role', '==', UserRoles.Member)
        .get();
      logger.log('[getBandMembers] - usersSnapshot');

      const members = usersSnapshot.docs.map((doc) => ({
        uid: doc.id,
        name: doc.data().name,
        instrument: doc.data().instrument,
      })) as Member[];
      logger.log('[getBandMembers] - usersSnapshot/Docs/members');
      return { members };
    } catch (error) {
      logger.error('Error fetching members:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error fetching members',
        error
      );
    }
  }
);

export const getUserProfileById = functions.https.onCall(
  async (data: { uid: string }): Promise<Member | null> => {
    logger.log('[getUserProfileById]');

    try {
      const { uid } = data;
      const docRef = firestore.collection(Collection.Users).doc(uid);
      logger.log('[getBandMember] - docRef');
      const doc = await docRef.get();
      logger.log('[getUserProfileById] - doc');

      if (doc.exists) {
        const data = doc.data();
        return {
          uid: doc.id,
          ...data,
        } as Member;
      } else {
        return null;
      }
    } catch (error) {
      logger.error('Error fetching getUserProfileById:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error fetching getUserProfileById',
        error
      );
    }
  }
);

export const getUserAppDataById = functions.https.onCall(
  async (data: { userId: string }): Promise<UserAppDataDTO | null> => {
    logger.log('[getUserAppDataById]');

    try {
      const { userId } = data;
      const userDoc = await firestore
        .collection(Collection.Users)
        .doc(userId)
        .get();
      logger.log('[getUserAppDataById] - userDoc');

      if (!userDoc.exists) {
        logger.log('[getUserAppDataById] - No user found');
        return null;
      }

      const userData = userDoc.data() as UserDocument;
      const bandId = userData.bandId;
      const eventIds = userData.events || [];
      logger.log('[getUserAppDataById] - bandId, eventIds', bandId, eventIds);

      const bandDoc = await firestore
        .collection(Collection.Bands)
        .doc(bandId)
        .get();
      logger.log('[getUserAppDataById] - bandDoc');

      const events = await Promise.all(
        eventIds.map((eventId) =>
          firestore.collection('Events').doc(eventId).get()
        )
      );

      const eventsData = events.map(
        (doc) =>
          ({
            uid: doc.id,
            ...doc.data(),
          } as Event)
      );

      return {
        band: {
          uid: bandDoc.id,
          ...(bandDoc.data() as Band),
        },
        events: eventsData,
      };
    } catch (error) {
      logger.error('Error fetching getUserAppDataById:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error fetching getUserAppDataById',
        error
      );
    }
  }
);
