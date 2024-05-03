import * as admin from 'firebase-admin';
import { Event } from '../../../types/event';
import { Band } from '../../../types/band';
import { Collection } from '../../../enums/collection';
import { logger } from 'firebase-functions';

const firestore = admin.firestore();

export const fetchBandData = async (bandId: string): Promise<Band | null> => {
  const bandDoc = await firestore
    .collection(Collection.Bands)
    .doc(bandId)
    .get();

  logger.log('bandDoc', bandDoc);
  return bandDoc.exists
    ? { uid: bandDoc.id, ...(bandDoc.data() as Band) }
    : null;
};

export const fetchEventData = async (eventIds: string[]): Promise<Event[]> => {
  const eventDocs = await Promise.all(
    eventIds.map((id) => firestore.collection(Collection.Events).doc(id).get())
  );
  const result = eventDocs.map((doc) => ({
    uid: doc.id,
    ...(doc.data() as Event),
  }));
  logger.log('result', result);
  return result;
};
