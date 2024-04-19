import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CreateNewUser, CreateNewUserResponse } from '../../../types/authentication';
import { UserRoles } from '../../../enums/roles';
import { Collection } from '../../../enums/collection';
import { logger } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import FieldValue = firestore.FieldValue;

export const createUser = functions.https.onCall(
  async (data: CreateNewUser): Promise<CreateNewUserResponse> => {
    logger.info('[createUser] - data', data);
    const { email, password, displayName, isManager, phoneNumber, bandName } =
      data;
    const role = isManager ? UserRoles.MANAGER : UserRoles.MEMBER;

    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName,
        phoneNumber
      });
      logger.info('[createUser] - userCrated - userRecord');

      const { uid } = userRecord;
      await admin.auth().setCustomUserClaims(uid, { role });
      logger.info('[createUser] - customClaimsSet');
      await admin.auth().updateUser(uid, {
        emailVerified: true
      });
      logger.info('[createUser] - userEmailVerified');

      const usersCollection = admin
        .firestore()
        .collection(Collection.Users);

      await usersCollection
        .doc(uid)
        .set({ displayName, email, phoneNumber, role, bands: [] });
      logger.info('[createUser] - createUser - documentCreated');

      if (isManager && bandName) {
        const band = {
          name: bandName,
          events: []
        };

        const bandsCollection = admin
          .firestore()
          .collection(Collection.Bands);

        const { id: bandId } = await bandsCollection.add(band);
        logger.info('[createUser] - createBand - documentCreated');

        await usersCollection.doc(uid).update({
          bands: FieldValue.arrayUnion(bandId)
        });
        logger.info('[createUser] - add band to user bands');
      }

      const jwtToken = await admin.auth().createCustomToken(uid);
      return {
        jwtToken
      };
    } catch (error) {
      // Handle and return errors
      logger.error('Error creating user:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error creating user',
        error
      );
    }
  });
