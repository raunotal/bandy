import { ComponentType, FC } from 'react';

interface AppAuthProps {
  user: { name: string };
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P & AppAuthProps>
): FC<P> => {

  // noinspection UnnecessaryLocalVariableJS
  const WithAuthComponent: FC<P> = (props) => {
    return (
      <WrappedComponent {...{ ...props, user: { name: 'John Smith' } }} />
    );
  };
  return WithAuthComponent;
};

export default withAuth;