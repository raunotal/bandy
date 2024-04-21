import { ComponentType, FC, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useHistory, useLocation } from 'react-router-dom';

interface AppAuthProps {
  user: { name: string };
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P & AppAuthProps>
): FC<P> => {
  // noinspection UnnecessaryLocalVariableJS
  const WithAuthComponent: FC<P> = (props) => {
    const { loading, user } = useAuth();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
      if (!loading && !user?.uid) {
        history.push('/login');
      }

      if (location.pathname === '/login' && user?.uid) {
        history.push('/events');
      }
    }, [history, user?.uid, loading, location.pathname]);

    return (
      <WrappedComponent {...{ ...props, user: { name: 'John Smith' } }} />
    );
  };
  return WithAuthComponent;
};

export default withAuth;