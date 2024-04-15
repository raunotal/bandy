import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import React from "react";
import EventCardContent from "./EventCardContent";
import EventCardSubtitle from "./EventCardSubtitle";
import { DashboardEvent } from "../../../types/event";

const EventCard = (dashboardEvent: DashboardEvent) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{dashboardEvent.band.name}</IonCardSubtitle>
        <IonCardTitle>{dashboardEvent.event.location}</IonCardTitle>
        <EventCardSubtitle {...dashboardEvent} />
      </IonCardHeader>
      <EventCardContent {...dashboardEvent} />
    </IonCard>
  );
};

export default EventCard;
