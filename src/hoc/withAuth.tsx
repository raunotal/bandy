import { ComponentType, FC, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useHistory, useLocation } from 'react-router-dom';
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
    const location = useLocation();

    useEffect(() => {
      if (!loading && !isUserLoggedIn) {
        history.push('/login');
      }

      if (location.pathname === '/login' && isUserLoggedIn) {
        history.push('/events');
      }
    }, [history, isUserLoggedIn, loading, location.pathname]);

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