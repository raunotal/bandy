import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collection } from '../../../enums/collection';
import { Member } from '../../../types/member';
import { logger } from 'firebase-functions';
import { UserRoles } from '../../../enums/roles';
import { GetUsersWithMemberRoleDTO } from '../../../types/dto/user';

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
        .where('role', '==', UserRoles.MEMBER)
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
    logger.log("[getBandMember]");

    try {
      const { uid } = data;
      const docRef = firestore.collection(Collection.Users).doc(uid);
      logger.log("[getBandMember] - docRef");
      const doc = await docRef.get();
      logger.log("[getBandMember] - doc");

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
      logger.error("Error fetching bandMember:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error fetching bandMember",
        error
      );
    }
  }
);