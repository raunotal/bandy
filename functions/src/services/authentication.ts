import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CreateNewUser } from '../../../types/authentication';
import { UserRoles } from '../../../enums/roles';
import { Collection } from '../../../enums/collection';
import { logger } from 'firebase-functions';
import { CreateNewUserResponse } from '../../../types/response';

if (!admin.apps.length) {
  admin.initializeApp();
}

const IMAGE_URL = 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png';

export const createUser = functions.https.onCall(
  async (data: CreateNewUser): Promise<CreateNewUserResponse> => {
    logger.info('[createUser] - data', data);
    const { email, password, name, instrument, isManager, bandName } =
      data;
    const role = isManager ? UserRoles.MANAGER : UserRoles.MEMBER;

    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: name
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
        .set({ name, email, instrument, role, image: IMAGE_URL });
      logger.info('[createUser] - createUser - documentCreated');

      if (isManager) {
        const band = {
          name: bandName,
          events: [],
          members: []
        };

        const bandsCollection = admin
          .firestore()
          .collection(Collection.Bands);

        const { id: bandId } = await bandsCollection.add(band);
        logger.info('[createUser] - createBand - documentCreated');

        await usersCollection.doc(uid).set({
          band: bandId
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
