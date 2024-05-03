import * as admin from 'firebase-admin';
import { Member } from '../../../types/member';
import { Collection } from '../../../enums/collection';

const firestore = admin.firestore();

export const getMembersDeviceTokens = async (members: Member[]) => {
  const tokens = [];
  for (const member of members) {
    const userDoc = await firestore
      .collection(Collection.Users)
      .doc(member.uid!)
      .get();
    const user = userDoc.data();
    if (user?.fcmToken) {
      tokens.push(user.fcmToken);
    }
  }
  return tokens;
};
