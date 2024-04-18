import { IonButton, IonCardContent, IonContent, IonIcon, IonItem, IonText } from "@ionic/react";
import React from "react";
import { Event } from "../../../types/event";
import { extractDate, extractTime } from "../../helpers/event";
import { arrowForwardOutline } from "ionicons/icons";

const EventCardContent = (event: Event) => {
  const { startDateTime, endDateTime } = event;
  return (
    <IonCardContent>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <IonItem lines="none">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IonText>{extractTime(startDateTime)}</IonText>
            <IonText>{extractDate(startDateTime)}</IonText>
          </div>
        </IonItem>
        <IonIcon icon={arrowForwardOutline} />
        <IonItem lines="none">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IonText>{extractTime(endDateTime)}</IonText>
            <IonText>{extractDate(endDateTime)}</IonText>
          </div>
        </IonItem>
      </div>
    </IonCardContent>
  );
};

export default EventCardContent;
