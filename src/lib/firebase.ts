import { getMessaging, getToken } from 'firebase/messaging';
import { auth, firestore } from '../../config/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { Collection } from '../../enums/collection';

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const messaging = getMessaging();
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });
      if (token) {
        if (auth.currentUser) {
          const userRef = doc(
            firestore,
            Collection.Users,
            auth.currentUser.uid
          );
          await updateDoc(userRef, {
            fcmToken: token,
          });
        }
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An error occurred while retrieving token. ', error);
  }
};
