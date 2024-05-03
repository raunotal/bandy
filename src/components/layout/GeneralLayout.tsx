import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { ReactNode } from 'react';
import withAuth from '../../hoc/withAuth';
import { useAuth } from '../../context/authContext';
import Menu from './Menu';

interface GeneralLayoutProps {
  title?: string;
  contentClassName?: string;
  children: ReactNode;
}

const GeneralLayout = (props: GeneralLayoutProps) => {
  const { title, children, contentClassName } = props;
  const { user } = useAuth();

  return (
    <>
      <Menu />
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