import { IonCardSubtitle, IonIcon } from '@ionic/react';
import { musicalNotes, peopleOutline } from 'ionicons/icons';
import { getTitleTypeFromEventStatus } from '../../helpers/event';
import { Event } from '../../../types/event';
import { EventType } from '../../../enums/event';

const EventCardSubtitle = (event: Event) => {
  const { status, eventType } = event;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <IonCardSubtitle color={getTitleTypeFromEventStatus(status!)}>
        {status}
      </IonCardSubtitle>
      {eventType === EventType.Performance ? <IonIcon icon={peopleOutline} /> : <IonIcon icon={musicalNotes} />}
    </div>
  );
};

export default EventCardSubtitle;
