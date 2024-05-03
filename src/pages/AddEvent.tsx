import { FormEvent, useState } from 'react';
import {
  InputChangeEventDetail,
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
  SelectChangeEventDetail
} from '@ionic/react';
import GeneralLayout from '../components/layout/GeneralLayout';
import { useAuth } from '../context/authContext';
import { EventType } from '../../enums/event';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Callable } from '../../enums/callable';
import { useHistory } from 'react-router-dom';
import { AddEventForm, Event } from '../../types/event';

const AddEvent = () => {
  const { user, addEventToUser } = useAuth();
  const history = useHistory();
  const [selectedMembers, setSelectedMembers] = useState(
    user?.band?.members.map((member) => member.uid) || []
  );
  const [eventData, setEventData] = useState<AddEventForm>({
    startDateTime: new Date().toISOString(),
    endDateTime: new Date().toISOString(),
    eventType: EventType.Performance,
    location: '',
    venue: '',
    description: '',
    managerId: '',
    members: []
  });

  const handleMembersChange = (
    event: CustomEvent<SelectChangeEventDetail<string[]>>
  ) => {
    setSelectedMembers(event.detail.value);
  };

  const onInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    setEventData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addEventHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const members =
      user?.band?.members.filter((member) =>
        selectedMembers.includes(member.uid)
      ) || [];

    const functions = getFunctions();
    const addEventFunction = httpsCallable<AddEventForm, { event: Event }>(
      functions,
      Callable.AddEvent
    );
    const response = await addEventFunction({
      ...eventData,
      managerId: user!.uid,
      members
    });
    addEventToUser(response.data.event as Event);
    history.push(`/events/${response.data.event.uid}`);
  };

  const members = user?.band?.members;

  return (
    <GeneralLayout title="Add Event" contentClassName="ion-padding">
      <form onSubmit={addEventHandler}>
        <IonList>
          <IonItem lines="none">
            <IonLabel position="stacked">Start Time</IonLabel>
            <IonDatetimeButton datetime="startDateTime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime name="startDateTime" id="startDateTime" />
            </IonModal>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">End Time</IonLabel>
            <IonDatetimeButton datetime="endDateTime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime name="endDateTime" id="endDateTime" />
            </IonModal>
          </IonItem>
          <IonItem>
            <IonInput
              name="venue"
              label="Venue"
              labelPlacement="floating"
              value={eventData.venue}
              onIonChange={onInputChange}
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              name="location"
              label="Location"
              labelPlacement="floating"
              value={eventData.location}
              onIonChange={onInputChange}
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect
              name="eventType"
              label="Event type"
              labelPlacement="floating"
              value={eventData.eventType}
              onIonChange={onInputChange}
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
              name="description"
              label="Additional information:"
              labelPlacement="floating"
              value={eventData.description}
              onIonChange={onInputChange}
              autoGrow
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <IonSelect
              name="members"
              label="Members"
              labelPlacement="floating"
              multiple={true}
              onIonChange={handleMembersChange}
              value={selectedMembers}
            >
              {members?.map((member) => (
                <IonSelectOption key={member.uid} value={member.uid}>
                  {member.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonButton expand="block" type="submit">
            Save Event
          </IonButton>
        </IonList>
      </form>
    </GeneralLayout>
  );
};

export default AddEvent;
