import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import React from "react";
import EventCardContent from "./EventCardContent";
import EventCardSubtitle from "./EventCardSubtitle";
import { Event } from "../../types/event";

const EventCard = (props: Event) => {
  const { location, venue } = props;
  return (
    <IonCard>
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
