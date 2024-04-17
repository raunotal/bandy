import { IonButton, IonCardContent, IonContent, IonIcon, IonItem, IonText } from "@ionic/react";
import React from "react";
import { DashboardEvent } from "../../types/event";
import { extractDate, extractTime } from "../../helpers/event";
import { arrowForwardOutline } from "ionicons/icons";

const EventCardContent = (eventItem: DashboardEvent) => {
  return (
    <IonCardContent>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <IonItem lines="none">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IonText>{extractTime(eventItem.event.startDateTime)}</IonText>
            <IonText>{extractDate(eventItem.event.startDateTime)}</IonText>
          </div>
        </IonItem>
        <IonIcon icon={arrowForwardOutline} />
        <IonItem lines="none">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IonText>{extractTime(eventItem.event.endDateTime)}</IonText>
            <IonText>{extractDate(eventItem.event.endDateTime)}</IonText>
          </div>
        </IonItem>
      </div>
    </IonCardContent>
  );
};

export default EventCardContent;
