import * as admin from 'firebase-admin';
import { Member } from '../../../types/member';

const firestore = admin.firestore();

export const getMemberDeviceTokens = async (members: Member[]) => {
  const tokens = [];
  for (const member of members) {
    const userSnapshot = await firestore
      .collection('users')
      .doc(member.uid!)
      .get();
    const userTokens = userSnapshot.data()?.deviceTokens || [];
    tokens.push(...userTokens);
  }
  return tokens.filter((t) => t); // Remove any undefined or null entries
};
