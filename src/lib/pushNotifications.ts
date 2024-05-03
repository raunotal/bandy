import { getToken, onMessage } from 'firebase/messaging';
import { functions, messaging } from '../../config/firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { Callable } from '../../enums/callable';

class PushNotifications {
  private static notificationsAllowed: boolean = false;

  public static async initPushNotifications(uid: string) {
    await this.requestPermission();
    if (!this.notificationsAllowed) {
      return;
    }

    const token = await this.getFcmToken();
    await this.addFcmTokenToUser(uid, token);
  }

  private static async requestPermission(): Promise<void> {
    if (!this.notificationsAllowed) {
      await Notification.requestPermission();
      this.notificationsAllowed = true;
    }
  }

  public static async getFcmToken() {
    if (!this.notificationsAllowed) {
      await this.requestPermission();
    }

    return await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
    });
  }

  public static activateMessageHandler() {
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
