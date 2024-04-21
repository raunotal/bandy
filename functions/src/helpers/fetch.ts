import * as admin from 'firebase-admin';
import { Event } from '../../../types/event';
import { Band } from '../../../types/band';
import { Collection } from '../../../enums/collection';

const firestore = admin.firestore();

export const fetchBandData = async (bandId: string): Promise<Band | null> => {
  const bandDoc = await firestore
    .collection(Collection.Bands)
    .doc(bandId)
    .get();
  return bandDoc.exists
    ? { uid: bandDoc.id, ...(bandDoc.data() as Band) }
    : null;
};

export const fetchEventData = async (eventIds: string[]): Promise<Event[]> => {
  const eventDocs = await Promise.all(
    eventIds.map((id) => firestore.collection('Events').doc(id).get())
  );
  return eventDocs.map((doc) => ({ uid: doc.id, ...(doc.data() as Event) }));
};
