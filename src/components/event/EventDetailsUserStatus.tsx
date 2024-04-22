import {
  IonItem,
  IonSelect,
  IonSelectOption,
  SelectChangeEventDetail,
} from '@ionic/react';
import React from 'react';
import { Status } from '../../../enums/event';

interface EventDetailsUserStatusProps {
  value: Status;
  onChange: (status: Status) => void;
}

const EventDetailsUserStatus = (props: EventDetailsUserStatusProps) => {
  const { value, onChange } = props;

  const handleUserStatusChange = (
    event: CustomEvent<SelectChangeEventDetail<Status>>
  ) => {
    onChange(event.detail.value);
  };

  return (
    <IonItem>
      <IonSelect
        name='status'
        label='Your status'
        labelPlacement='floating'
        onIonChange={handleUserStatusChange}
        value={value}
      >
        <IonSelectOption value={Status.Confirmed}>Confirmed</IonSelectOption>
        <IonSelectOption value={Status.Pending}>Pending</IonSelectOption>
        <IonSelectOption value={Status.Cancelled}>Cancelled</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default EventDetailsUserStatus;
