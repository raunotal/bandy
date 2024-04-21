import { IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';
import { Status } from '../../../enums/event';

interface EventDetailsUserStatusProps {
  value: Status;
  onChange: (status: Status) => void;
  hidden?: boolean;
}

const EventDetailsUserStatus = (props: EventDetailsUserStatusProps) => {
  const { value, hidden } = props;

  if (hidden) {
    return null;
  }

  return (
    <IonItem>
      <IonSelect
        name='status'
        label='Your status'
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

export default EventDetailsUserStatus;
