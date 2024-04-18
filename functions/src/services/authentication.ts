import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { CreateNewUser, CreateNewUserResponse } from '../../../types/authentication';
import { UserRoles } from '../../../enums/roles';
import { CallableRequest, onCall } from 'firebase-functions/lib/v2/providers/https';
import { Collection } from '../../../enums/collection';

// Initialize the Firebase Admin SDK
admin.initializeApp();

export const createUser = onCall(
  async (
    request: CallableRequest<CreateNewUser>): Promise<CreateNewUserResponse> => {
    const data = request.data;
    console.log('[createUser] - data', data);
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
      console.log('[createUser] - userCrated - userRecord');

      const { uid } = userRecord;
      await admin.auth().setCustomUserClaims(uid, { role });
      console.log('[createUser] - customClaimsSet');
      await admin.auth().updateUser(uid, {
        emailVerified: true
      });
      console.log('[createUser] - userEmailVerified');

      const usersCollection = admin
        .firestore()
        .collection(Collection.Users);

      await usersCollection
        .doc(uid)
        .set({ displayName, email, phoneNumber, role, bands: [] });
      console.log('[createUser] - createUser - documentCreated');

      if (isManager && bandName) {
        const band = {
          name: bandName,
          events: []
        };

        const bandsCollection = admin
          .firestore()
          .collection(Collection.Bands);

        const { id: bandId } = await bandsCollection.add(band);
        console.log('[createUser] - createBand - documentCreated');

        await usersCollection.doc(uid).update({
          bands: FieldValue.arrayUnion(bandId)
        });
        console.log('[createUser] - add band to user bands');
      }

      const jwtToken = await admin.auth().createCustomToken(uid);
      return {
        jwtToken
      };
    } catch (error) {
      // Handle and return errors
      console.error('Error creating user:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error creating user',
        error
      );
    }
  });
