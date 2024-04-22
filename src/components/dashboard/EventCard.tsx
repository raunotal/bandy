import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import EventCardContent from './EventCardContent';
import EventCardSubtitle from './EventCardSubtitle';
import { Event } from '../../../types/event';

interface EventCardProps extends Event {
  onClick?: (uid: string) => void;
}

const EventCard = (props: EventCardProps) => {
  const { onClick, uid, location, venue } = props;

  const handleEventCardClick = () => {
    if (onClick) {
      onClick(uid!);
    }
  };

  return (
    <IonCard onClick={handleEventCardClick}>
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
