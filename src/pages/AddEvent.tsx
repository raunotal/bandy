import { FormEvent, useState } from 'react';
import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';
import GeneralLayout from '../components/layout/GeneralLayout';
import { useAuth } from '../context/authContext';
import { AddEventDTO } from '../../types/dto/event';
import { EventType } from '../../enums/event';
import { faker } from '@faker-js/faker';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Callable } from '../../enums/callable';
import { useHistory } from 'react-router-dom';

const AddEvent = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [eventData] = useState<AddEventDTO>({
    startDateTime: new Date(),
    endDateTime: new Date(),
    eventType: EventType.Performance,
    location: faker.location.city(),
    venue: faker.company.name(),
    members: [],
  });

  // const onInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
  //   const target = event.target as HTMLInputElement;
  //   const { name, value } = target;
  //   setEventData(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // }

  const addEventHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const startDateTime = new Date();
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);
    const functions = getFunctions();
    const addEventFunction = httpsCallable(functions, Callable.AddEventToBand);
    await addEventFunction({
      ...eventData,
      bandId: user!.band!.uid!,
      startDateTime,
      endDateTime,
    });
    // add event to user bands
    history.push('/events');
  };

  const members = user?.band?.members;

  return (
    <GeneralLayout title='Add Event' contentClassName='ion-padding'>
      <form onSubmit={addEventHandler}>
        <IonList>
          <IonItem lines='none'>
            <IonLabel position='stacked'>Start Time</IonLabel>
            <IonDatetimeButton datetime='startDateTime'></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime name='startDateTime' id='startDateTime' />
            </IonModal>
          </IonItem>
          <IonItem lines='none'>
            <IonLabel position='stacked'>End Time</IonLabel>
            <IonDatetimeButton datetime='endDateTime'></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime name='endDateTime' id='endDateTime' />
            </IonModal>
          </IonItem>
          <IonItem>
            <IonInput
              name='venue'
              label='Venue'
              labelPlacement='floating'
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              name='location'
              label='Location'
              labelPlacement='floating'
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect
              name='eventType'
              label='Event type'
              labelPlacement='floating'
            >
              <IonSelectOption value={EventType.Performance}>
                Performance
              </IonSelectOption>
              <IonSelectOption value={EventType.Rehearsal}>
                Rehearsal
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonTextarea
              name='description'
              label='Additional information:'
              labelPlacement='floating'
              autoGrow
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <IonSelect
              name='members'
              label='Members'
              labelPlacement='floating'
              multiple={true}
            >
              {members?.map((member) => (
                <IonSelectOption key={member.uid} value={member.uid}>
                  {member.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonButton expand='block' type='submit'>
            Save Event
          </IonButton>
        </IonList>
      </form>
    </GeneralLayout>
  );
};

export default AddEvent;
