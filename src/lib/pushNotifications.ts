import { getToken, onMessage } from 'firebase/messaging';
import { functions, messaging } from '../../config/firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { Callable } from '../../enums/callable';

class PushNotifications {
  private static notificationsAllowed: boolean = Notification.permission === 'granted';

  public static async initPushNotifications(uid: string) {
    if (!this.notificationsAllowed) {
      throw new Error('Notifications are not allowed!');
    }

    this.activateMessageHandler();
    const token = await this.getFcmToken();
    await this.addFcmTokenToUser(uid, token);
  }

  public static async requestPermission(uid: string): Promise<void> {
    if (!this.notificationsAllowed) {
      await Notification.requestPermission();
      this.notificationsAllowed = true;
      await this.initPushNotifications(uid)
    }
  }

  private static async getFcmToken() {
    return await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
    });
  }

  private static activateMessageHandler() {
    onMessage(messaging, (payload) => {
      if (payload) {
        new Notification(payload.notification!.title!, {
          body: payload.notification!.body,
          icon: payload.notification!.icon
        });
      }
    });
  }

  private static async addFcmTokenToUser(uid: string, token: string): Promise<void> {
    const addFCMToken = httpsCallable(functions, Callable.AddFcmToken);
    await addFCMToken({ uid, token });
  }
}

export default PushNotifications;
