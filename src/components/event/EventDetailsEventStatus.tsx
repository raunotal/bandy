import {
  IonItem,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import React from 'react';
import { Status } from '../../../enums/event';

interface EventDetailsEventStatusProps {
  value: Status;
  onChange: (status: Status) => void;
}

const EventDetailsEventStatus = (props: EventDetailsEventStatusProps) => {
  const { value } = props;
  return (
    <IonItem>
      <IonSelect
        name='status'
        label='Event status'
        labelPlacement='floating'
        value={value}
      >
        <IonSelectOption value={Status.Confirmed}>Confirmed</IonSelectOption>
        <IonSelectOption value={Status.Pending}>Pending</IonSelectOption>
        <IonSelectOption value={Status.Cancelled}>Cancelled</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default EventDetailsEventStatus;
