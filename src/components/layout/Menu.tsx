import { IonMenu, IonContent, IonList, IonItem, IonText } from '@ionic/react';
import { useAuth } from '../../context/authContext';
import PushNotifications from '../../lib/pushNotifications';

const Menu = () => {
  const auth = useAuth();
  const { user, logOut } = auth;

  const enableNotifications = async () => {
    await PushNotifications.requestPermission(user!.uid);
  };

  return (
    <IonMenu contentId="main-content" type="push" side="start">
      <IonContent color="light">
        <IonList inset>
          <IonItem>
            <IonText>Hello, {user?.name}!</IonText>
          </IonItem>
          <IonItem>
            <IonText onClick={enableNotifications}>Enable Notifications</IonText>
          </IonItem>
          <IonItem>
            <IonText onClick={logOut}>Log out</IonText>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;