import {
  InputChangeEventDetail,
  IonButton,
  IonButtons, IonCheckbox, IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonInput,
  IonItem, IonList,
  IonModal, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { FormEvent, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { CreateNewUser } from '../../../types/authentication';
import { useHistory } from 'react-router-dom';
import { faker } from '@faker-js/faker';

interface SignUpProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const SignUpModal = (props: SignUpProps) => {
  const { isOpen, toggleModal } = props;
  const history = useHistory();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<CreateNewUser>({
    name: faker.person.firstName(),
    email: '',
    password: '',
    isManager: false,
    bandName: faker.vehicle.manufacturer(),
    instrument: faker.hacker.noun()
  });

  const { isManager } = formData;

  const toggleManager = () => {
    setFormData(prevState => ({
      ...prevState,
      isManager: !prevState.isManager
    }));
  };

  const onInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const signUpUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signUp({
      ...formData,
      email: faker.internet.email(),
      password: '123123',
      isManager: formData.isManager
    });
    // await signUp(formData);
    history.push('/events');
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={toggleModal}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="ion-padding ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
          <IonRow className="ion-align-items-center" style={{ height: '100%' }}>
            <IonCol>
              <IonList>
                <form onSubmit={signUpUser}>
                  <IonItem className="ion-margin-bottom" lines="none">
                    <IonCheckbox
                      justify="start"
                      onClick={toggleManager}
                      name="isManager"
                    >
                      Register as band?
                    </IonCheckbox>;
                  </IonItem>
                  <IonItem className="ion-margin-top">
                    <IonInput
                      name="name"
                      label="Name"
                      labelPlacement="floating"
                      value={formData.name}
                      onIonInput={onInputChange}
                      required
                    />
                  </IonItem>
                  <IonItem>
                    <IonInput
                      name="email"
                      label="Email"
                      labelPlacement="floating"
                      type="email"
                      onIonChange={onInputChange}
                      onIonInput={onInputChange}
                      autocomplete="off"
                      required
                    />
                  </IonItem>
                  <IonItem>
                    <IonInput
                      name="password"
                      label="Password"
                      labelPlacement="floating"
                      type="password"
                      minlength={6}
                      onIonInput={onInputChange}
                      autocomplete="off"
                      required
                    />
                  </IonItem>
                  {!isManager &&
                    <IonItem>
                      <IonInput
                        name="instrument"
                        label="Instrument"
                        labelPlacement="floating"
                        value={formData.instrument}
                        onIonInput={onInputChange}
                        required
                      />
                    </IonItem>}
                  {isManager &&
                    <IonItem>
                      <IonInput
                        name="bandName"
                        label="Band name"
                        labelPlacement="floating"
                        value={formData.bandName}
                        onIonInput={onInputChange}
                        required
                      />
                    </IonItem>}
                  <IonButton
                    className="ion-margin-top"
                    expand="block"
                    type="submit"
                  >
                    Sign Up
                  </IonButton>
                </form>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default SignUpModal;
