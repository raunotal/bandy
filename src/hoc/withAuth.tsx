import { ComponentType, FC, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useHistory } from 'react-router';
import { IonContent, IonLoading, IonPage } from '@ionic/react';

interface AppAuthProps {
  user: { name: string };
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P & AppAuthProps>
): FC<P> => {
  // noinspection UnnecessaryLocalVariableJS
  const WithAuthComponent: FC<P> = (props) => {
    const { loading, isUserLoggedIn } = useAuth();
    const history = useHistory();

    useEffect(() => {
      if (!loading && !isUserLoggedIn) {
        history.push('/login');
      }
    }, [history, isUserLoggedIn, loading]);

    if (loading) {
      return (
        <IonPage>
          <IonContent>
            <IonLoading
              isOpen={true}
              duration={3000}
            />
          </IonContent>
        </IonPage>
      );
    }

    return (
      <WrappedComponent {...{ ...props, user: { name: 'John Smith' } }} />
    );
  };
  return WithAuthComponent;
};

export default withAuth;