import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';
import { FieldValue } from 'firebase-admin/firestore';
import { CloudFunctionResponse } from '../../../types/response';
import { Collection } from '../../../enums/collection';
import { AddToMemberToBandDTO } from '../../../types/dto/band';

const firestore = admin.firestore();

if (!admin.apps.length) {
  admin.initializeApp();
}

export const addMemberToBand = functions.https.onCall(
  async (
    data: AddToMemberToBandDTO
  ): Promise<CloudFunctionResponse> => {
    logger.log('[addMemberToBand]', data);
    try {
      const { bandId, uid, name, instrument } = data;

      await firestore
        .collection(Collection.Users)
        .doc(uid)
        .update({
          band: bandId
        });
      logger.log('[addMemberToBand] - add band to user bands');

      await firestore
        .collection(Collection.Bands)
        .doc(bandId)
        .update({
          members: FieldValue.arrayUnion({ name, instrument, uid })
        });
      logger.log('[addMemberToBand] - add entry to bandMembers collection');

      return { statusCode: 301, message: 'Member added to band' };
    } catch (error) {
      logger.error('Error adding user to band:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error adding user to band',
        error
      );
    }
  }
);
