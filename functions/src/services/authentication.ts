// /* eslint-disable @typescript-eslint/no-unused-vars */
// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import {FieldValue} from "firebase-admin/firestore";
// import {CreateNewUser} from "../../../types/dto/user";
// import {UserRoles} from "../../../config/user/role";
// import {Collection} from "../../../config/colletion";
// import {generateBandColorHex} from "../utils/band";
//
// // Initialize the Firebase Admin SDK
// admin.initializeApp();
//
// export const createUser = functions.https.onCall(
//   async (data: CreateNewUser): Promise<{ jwtToken: string; uid: string }> => {
//     console.log("[createUser] - data", data);
//     const {email, password, displayName, isManager, phoneNumber, bandName} =
//       data;
//     const role = isManager ? UserRoles.MANAGER : UserRoles.MEMBER;
//
//     try {
//       // Create the user with email and password
//       const userRecord = await admin.auth().createUser({
//         email,
//         password,
//         displayName,
//         phoneNumber,
//       });
//       console.log("[createUser] - userCrated - userRecord");
//
//       // Set the custom claim for the user role
//       const {uid} = userRecord;
//       await admin.auth().setCustomUserClaims(uid, {role});
//       console.log("[createUser] - customClaimsSet");
//       await admin.auth().updateUser(uid, {
//         emailVerified: true,
//       });
//       console.log("[createUser] - userEmailVerified");
//
//       // Create a reference to the Firestore collection for user data
//       const usersCollection = admin.firestore().collection(Collection.Users);
//       // Store the additional user data in Firestore
//       await usersCollection
//         .doc(uid)
//         .set({displayName, email, phoneNumber, role, bands: []});
//       console.log("[createUser] - createUser - documentCreated");
//
//       if (isManager && bandName) {
//         const band = {
//           name: bandName,
//           color: generateBandColorHex(bandName),
//           events: [],
//         };
//         // Create a reference to the Firestore collection for band data
//         const bandsCollection = admin.firestore().collection(Collection.Bands);
//         // Store the additional band data in Firestore
//         const {id: bandId} = await bandsCollection.add(band);
//         console.log("[createUser] - createBand - documentCreated");
//
//         await usersCollection.doc(uid).update({
//           bands: FieldValue.arrayUnion(bandId),
//         });
//         console.log("[createUser] - add band to user bands");
//       }
//
//       const jwtToken = await admin.auth().createCustomToken(uid);
//       return {
//         jwtToken,
//         uid,
//       };
//     } catch (error) {
//       // Handle and return errors
//       console.error("Error creating user:", error);
//       throw new functions.https.HttpsError(
//         "internal",
//         "Error creating user",
//         error
//       );
//     }
//   }
// );
