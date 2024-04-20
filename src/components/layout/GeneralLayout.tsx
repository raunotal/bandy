import { IonContent, IonHeader, IonMenu, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ReactNode } from 'react';
import withAuth from '../../hoc/withAuth';

interface GeneralLayoutProps {
  title?: string;
  contentClassName?: string;
  children: ReactNode;
}

const GeneralLayout = (props: GeneralLayoutProps) => {
  const { title, children, contentClassName } = props;

  return (
    <>
      <IonMenu contentId="main-content">
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu>
      <IonPage id="main-content">
        {title && (
          <IonHeader>
            <IonToolbar>
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