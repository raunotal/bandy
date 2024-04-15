import { IonCardSubtitle, IonIcon } from "@ionic/react";
import { peopleOutline, musicalNotes } from "ionicons/icons";
import { getTitleTypeFromEventStatus } from "../../../helpers/event";
import { DashboardEvent } from "../../../types/event";

const EventCardSubtitle = (eventItem: DashboardEvent) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <IonCardSubtitle color={getTitleTypeFromEventStatus(eventItem.event.status)}>
        {eventItem.event.status}
      </IonCardSubtitle>
      {eventItem.event.eventType === "performance" ? <IonIcon icon={peopleOutline} /> : <IonIcon icon={musicalNotes} />}
    </div>
  );
};

export default EventCardSubtitle;
