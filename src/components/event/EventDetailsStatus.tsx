import {
  IonItem,
  IonSelect,
  IonSelectOption,
  SelectChangeEventDetail,
} from '@ionic/react';
import { Status } from '../../../enums/event';

interface EventDetailsStatusProps {
  isManager: boolean;
  value: Status;
  onChange: (status: Status) => void;
}

const EventDetailsStatus = (props: EventDetailsStatusProps) => {
  const { isManager, value, onChange } = props;

  const handleStatusChange = (
    event: CustomEvent<SelectChangeEventDetail<Status>>
  ) => {
    onChange(event.detail.value);
  };

  return (
    <IonItem>
      <IonSelect
        name='status'
        label={isManager ? 'Event status' : 'Your status'}
        labelPlacement='floating'
        onIonChange={handleStatusChange}
        value={value}
      >
        <IonSelectOption value={Status.Confirmed}>Confirmed</IonSelectOption>
        <IonSelectOption value={Status.Pending}>Pending</IonSelectOption>
        <IonSelectOption value={Status.Cancelled}>Cancelled</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default EventDetailsStatus;
