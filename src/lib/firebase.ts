import { getMessaging, getToken } from 'firebase/messaging';
import { auth, functions } from '../../config/firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { Callable } from '../../enums/callable';

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
          const addFCMToken = httpsCallable(functions, Callable.AddFCMToken);
          await addFCMToken({ uid: auth.currentUser.uid, token });
        }
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An error occurred while retrieving token. ', error);
  }
};
