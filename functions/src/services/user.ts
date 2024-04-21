import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collection } from '../../../enums/collection';
import { Member } from '../../../types/member';
import { logger } from 'firebase-functions';
import { UserRoles } from '../../../enums/roles';
import { GetUsersWithMemberRoleDTO } from '../../../types/dto/user';
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
        instrument: doc.data().instrument
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
          ...data
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

export const getUserBandDataById = functions.https.onCall(
  async (data: { uid: string }): Promise<Band | null> => {
    logger.log('[getUserBandDataById]');

    try {
      const { uid } = data;
      const docRef = firestore.collection(Collection.Users).doc(uid);
      logger.log('[getUserBandDataById] - docRef');
      const doc = await docRef.get();
      logger.log('[getUserBandDataById] - doc');
      const member = doc.data() as Member;

      if (doc.exists && member.band) {
        logger.log('[getUserBandDataById] - member data', data);
        const docRef = firestore.collection(Collection.Bands).doc(member.band);
        logger.log('[getUserBandDataById] - band docRef');
        const bandDoc = await docRef.get();
        logger.log('[getUserBandDataById] - bandDoc');

        const bandData = bandDoc.data();
        return {
          uid: bandDoc.id,
          ...bandData
        } as Band;
      }

      return null;
    } catch (error) {
      logger.error('Error fetching getUserBandDataById:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error fetching getUserBandDataById',
        error
      );
    }
  }
);
