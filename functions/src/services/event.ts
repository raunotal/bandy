import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import { AddEventDTO } from '../../../types/dto/event';
import { AddEventResponse } from '../../../types/response';
import { logger } from 'firebase-functions';
import { Collection } from '../../../enums/collection';
import { FieldValue } from 'firebase-admin/lib/firestore';

const firestore = admin.firestore();

if (!admin.apps.length) {
  admin.initializeApp();
}

export const addEventToBand = functions.https.onCall(
  async (data: AddEventDTO): Promise<AddEventResponse> => {
    logger.log("[addEventToBand]", data);

    try {
      const { bandId, ...eventData } = data;
      const eventId = firestore.collection('dummy').doc().id;

      await firestore
        .collection(Collection.Bands)
        .doc(bandId)
        .update({
          events: FieldValue.arrayUnion({ eventId, ...eventData})
        });
      logger.log("[addEventToBand] - add event to band events");

      return { statusCode: 301, message: "Event added", event: { eventId } };
    } catch (error) {
      // Handle and return errors
      logger.error("Error adding event:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error adding event",
        error
      );
    }
  }
);
