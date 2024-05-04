import { getToken, onMessage } from 'firebase/messaging';
import { functions, messaging } from '../../config/firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { Callable } from '../../enums/callable';

class PushNotifications {
  private static notificationsAllowed: boolean = false;
  private static VAPID_KEY: string =
    'BGHsOtPctwGLd7-623D3pVAGUNvjI2J8clZqQyQO4kvn4iDZBbP9luV-e53V6aWtrYB1Vi79JY1xjUKgDwHPViE';
  private static isSupported: boolean = 'Notification' in window;

  public static async initPushNotifications(uid: string) {
    if (!this.notificationsAllowed || !this.isSupported) {
      throw new Error('Notifications are not allowed!');
    }

    this.activateMessageHandler();
    const token = await this.getFcmToken();
    await this.addFcmTokenToUser(uid, token);
  }

  public static async requestPermission(uid: string): Promise<void> {
    if (!this.notificationsAllowed && this.isSupported) {
      await Notification.requestPermission();
      this.notificationsAllowed = true;
      await this.initPushNotifications(uid);
    }
  }

  private static async getFcmToken() {
    return await getToken(messaging, {
      vapidKey: this.VAPID_KEY,
    });
  }

  private static activateMessageHandler() {
    onMessage(messaging, (payload) => {
      if (payload) {
        new Notification(payload.notification!.title!, {
          body: payload.notification!.body,
          icon: payload.notification!.icon,
        });
      }
    });
  }

  private static async addFcmTokenToUser(
    uid: string,
    token: string
  ): Promise<void> {
    const addFCMToken = httpsCallable(functions, Callable.AddFcmToken);
    await addFCMToken({ uid, token });
  }
}

export default PushNotifications;
