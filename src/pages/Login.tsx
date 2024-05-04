import GeneralLayout from '../components/layout/GeneralLayout';
import { IonButton, IonCardTitle, IonCol, IonGrid, IonInput, IonItem, IonRow } from '@ionic/react';
import React, { useState } from 'react';
import SignUpModal from '../components/layout/SignUpModal';
import { useAuth } from '../context/authContext';

const Login = () => {
  const { login } = useAuth();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login(email, password);
  };

  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(prevState => !prevState);
  };

  return (
    <GeneralLayout>
      <IonGrid className="ion-padding ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
        <IonRow className="ion-align-items-center" style={{ height: '100%' }}>
          <IonCol>
            <IonCardTitle className="ion-text-center ion-margin-bottom">Bandy</IonCardTitle>
            <IonItem>
              <IonInput name="email" label="Email" labelPlacement="floating" type="email" value={email}
                onIonInput={(e) => setEmail(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonInput name="password" label="Password" labelPlacement="floating" type="password" value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>
            <IonButton className="ion-margin-top" expand="block" onClick={handleLogin}>
              Log In
            </IonButton>
            <IonButton expand="block" onClick={toggleSignUpModal}>
              Sign Up
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      <SignUpModal isOpen={isSignUpModalOpen} toggleModal={toggleSignUpModal} />
    </GeneralLayout>
  );
};

export default Login;