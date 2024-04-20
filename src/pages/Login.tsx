import GeneralLayout from '../components/layout/GeneralLayout';
import { IonButton, IonCardTitle, IonCol, IonGrid, IonInput, IonItem, IonRow } from '@ionic/react';
import React, { useState } from 'react';
import SignUpModal from '../components/layout/SignUpModal';

const Login = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

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
              <IonInput label="Email" labelPlacement="floating"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label="Password" labelPlacement="floating" type="password"></IonInput>
            </IonItem>
            <IonButton className="ion-margin-top" expand="block">
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