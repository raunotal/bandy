import {
  IonItem,
  IonSelect,
  IonSelectOption,
  SelectChangeEventDetail,
} from '@ionic/react';
import { Status } from '../../../enums/event';

interface EventDetailsEventStatusProps {
  value: Status;
  onChange: (status: Status) => void;
}

const EventDetailsEventStatus = (props: EventDetailsEventStatusProps) => {
  const { value, onChange } = props;

  const handleEventStatusChange = (
    event: CustomEvent<SelectChangeEventDetail<Status>>
  ) => {
    onChange(event.detail.value);
  };

  return (
    <IonItem>
      <IonSelect
        name='status'
        label='Event status'
        labelPlacement='floating'
        onIonChange={handleEventStatusChange}
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
