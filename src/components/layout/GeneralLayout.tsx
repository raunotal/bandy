import { IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
  const { loading } = useAuth();

  return (
    <IonPage>
      {title && (
        <IonHeader>
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent className={contentClassName}>
        {loading ? (
            <>
              <IonLoading
                isOpen={true}
                duration={3000}
              />
            </>) :
          children
        }
      </IonContent>
    </IonPage>
  );
};

export default withAuth(GeneralLayout);