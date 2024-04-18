import { IonCardSubtitle, IonIcon } from "@ionic/react";
import { peopleOutline, musicalNotes } from "ionicons/icons";
import { getTitleTypeFromEventStatus } from "../../helpers/event";
import { Event } from "../../types/event";

const EventCardSubtitle = (event: Event) => {
  const { status, eventType } = event;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <IonCardSubtitle color={getTitleTypeFromEventStatus(status)}>
        {status}
      </IonCardSubtitle>
      {eventType === "performance" ? <IonIcon icon={peopleOutline} /> : <IonIcon icon={musicalNotes} />}
    </div>
  );
};

export default EventCardSubtitle;
