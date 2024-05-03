import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../../config/firebaseConfig';

class PushNotifications {
  private static notificationsAllowed: boolean = false;

  public static async requestPermission(): Promise<boolean> {
    if (!this.notificationsAllowed) {
      await Notification.requestPermission();
      this.notificationsAllowed = true;
    }
    return this.notificationsAllowed;
  }

  public static async getFcmToken() {
    if (!this.notificationsAllowed) {
      await this.requestPermission();
    }

    return await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
  }

  public static activateMessageHandler() {
    onMessage(messaging, (payload) => {
      if (payload) {
        new Notification(payload.notification!.title!, {
          body: payload.notification!.body,
          icon: payload.notification!.icon,
        });
      }
    });
  }
}

export default PushNotifications;
