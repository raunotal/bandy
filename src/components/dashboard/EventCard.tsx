import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import EventCardContent from './EventCardContent';
import EventCardSubtitle from './EventCardSubtitle';
import { Event } from '../../../types/event';
import { useHistory } from 'react-router';

const EventCard = (props: Event) => {
  const { uid, location, venue } = props;
  const history = useHistory();

  const handleEventClick = () => {
    history.push(`/events/${uid}`);
  };

  return (
    <IonCard onClick={handleEventClick}>
      <IonCardHeader>
        <IonCardSubtitle>{location}</IonCardSubtitle>
        <IonCardTitle>{venue}</IonCardTitle>
        <EventCardSubtitle {...props} />
      </IonCardHeader>
      <EventCardContent {...props} />
    </IonCard>
  );
};

export default EventCard;
