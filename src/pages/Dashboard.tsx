import { IonContent, IonPage } from "@ionic/react";
import EventCard from "../components/pages/dashboard/EventCard";
import { EventStatus } from "../types/event";

const DUMMY_DATA = [
  {
    band: {
      name: "The Beatles",
    },
    event: {
      startDateTime: "2024-04-15T20:00",
      endDateTime: "2024-04-15T23:00",
      eventType: "performance",
      location: "The Cavern Club",
      status: EventStatus.Confirmed,
    },
  },
  {
    band: {
      name: "Heldene Aeg",
    },
    event: {
      startDateTime: "2024-04-15T20:00",
      endDateTime: "2024-04-15T23:00",
      eventType: "rehearsal",
      location: "The Cavern Club",
      status: EventStatus.Pending,
    },
  },
  {
    band: {
      name: "Terminal Frost",
    },
    event: {
      startDateTime: "2024-04-15T20:00",
      endDateTime: "2024-04-15T23:00",
      eventType: "performance",
      location: "The Cavern Club",
      status: EventStatus.Cancelled,
    },
  },
  {
    band: {
      name: "The Beatles",
    },
    event: {
      startDateTime: "2024-04-15T20:00",
      endDateTime: "2024-04-15T23:00",
      eventType: "performance",
      location: "The Cavern Club",
      status: EventStatus.Confirmed,
    },
  },
  {
    band: {
      name: "Heldene Aeg",
    },
    event: {
      startDateTime: "2024-04-15T20:00",
      endDateTime: "2024-04-15T23:00",
      eventType: "rehearsal",
      location: "The Cavern Club",
      status: EventStatus.Pending,
    },
  },
  {
    band: {
      name: "Terminal Frost",
    },
    event: {
      startDateTime: "2024-04-15T20:00",
      endDateTime: "2024-04-15T23:00",
      eventType: "performance",
      location: "The Cavern Club",
      status: EventStatus.Cancelled,
    },
  },
];

const Dashboard = () => {
  return (
    <IonPage>
      <IonContent>
        {DUMMY_DATA.map((eventItem, index) =>
          <EventCard {...eventItem} key={index} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
