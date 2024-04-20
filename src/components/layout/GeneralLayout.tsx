import {
  IonButtons,
  IonContent,
  IonHeader, IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { ReactNode } from 'react';
import withAuth from '../../hoc/withAuth';
import { useAuth } from '../../context/authContext';

interface GeneralLayoutProps {
  title?: string;
  contentClassName?: string;
  children: ReactNode;
}

const GeneralLayout = (props: GeneralLayoutProps) => {
  const { title, children, contentClassName } = props;
  const { logOut, user } = useAuth();

  return (
    <>
      <IonMenu contentId="main-content" type="push" side="start">
        <IonContent color="light">
          <IonList inset>
            <IonItem>
              <IonText onClick={logOut}>Log out</IonText>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        {user && (
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
              <IonTitle>{title}</IonTitle>
            </IonToolbar>
          </IonHeader>
        )}
        <IonContent className={contentClassName}>
          {children}
        </IonContent>
      </IonPage>
    </>
  );
};

export default withAuth(GeneralLayout);