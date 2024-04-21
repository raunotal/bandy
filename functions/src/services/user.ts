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
import { fetchBandData, fetchEventData } from '../helpers/fetch';

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
    const { uid } = data;

    try {
      const docRef = firestore.collection(Collection.Users).doc(uid);
      logger.log('[getBandMember] - docRef');
      const doc = await docRef.get();
      logger.log('[getUserProfileById] - doc');

      if (!doc.exists) {
        return null;
      }

      const data = doc.data();
      return {
        uid: doc.id,
        ...data,
      } as Member;
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
    logger.log('[getUserAppDataById] Starting function');

    try {
      const { userId } = data;
      const userDocRef = firestore.collection(Collection.Users).doc(userId);
      const userDoc = await userDocRef.get();
      logger.log('[getUserAppDataById] - Retrieved user document');

      if (!userDoc.exists) {
        logger.log('[getUserAppDataById] - No user found');
        return null;
      }

      const userData = userDoc.data() as UserDocument;
      const { bandId, events: eventIds = [] } = userData;
      logger.log('[getUserAppDataById] - Data:', bandId, eventIds);

      const band = bandId ? await fetchBandData(bandId) : null;
      const eventsData = eventIds.length ? await fetchEventData(eventIds) : [];

      return { band, events: eventsData };
    } catch (error) {
      logger.error('[getUserAppDataById] - Error:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error fetching user app data',
        error
      );
    }
  }
);
