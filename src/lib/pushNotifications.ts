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
    this.notificationsAllowed = Notification.permission === 'granted';
    if (!this.notificationsAllowed || !this.isSupported) {
      throw new Error('Notifications are not allowed or not supported.');
    } else {
      this.activateMessageHandler();
      const token = await this.getFcmToken();
      await this.addFcmTokenToUser(uid, token);
    }
  }

  public static async requestPermission(uid: string): Promise<void> {
    if (!this.notificationsAllowed && this.isSupported) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.notificationsAllowed = true;
        await this.initPushNotifications(uid);
      }
    }
  }

  private static activateMessageHandler() {
    onMessage(messaging, (payload) => {
      // eslint-disable-next-line no-console
      console.log('Message received. ', payload);
      if (payload) {
        new Notification(payload.notification!.title!, {
          body: payload.notification!.body,
          icon: payload.notification!.icon
        });
      }
    });
  }


  private static async getFcmToken() {
    return await getToken(messaging, {
      vapidKey: this.VAPID_KEY
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
