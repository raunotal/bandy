import { IonContent, IonPage } from "@ionic/react";
import EventCard from '../components/dashboard/EventCard';
import { Event } from "../../types/event";
import { EventStatus } from '../../enums/event';

const DUMMY_DATA: Event[] = [
  {
    startDateTime: "2024-04-15T20:00",
    endDateTime: "2024-04-15T23:00",
    eventType: "performance",
    location: "Tallinn",
    venue: "The Cavern Club",
    status: EventStatus.Confirmed,
  },
  {

    startDateTime: "2024-04-15T20:00",
    endDateTime: "2024-04-15T23:00",
    eventType: "rehearsal",
    location: "Tallinn",
    venue: "The Cavern Club",
    status: EventStatus.Pending,
  },
  {
    startDateTime: "2024-04-15T20:00",
    endDateTime: "2024-04-15T23:00",
    eventType: "performance",
    location: "Tallinn",
    venue: "The Cavern Club",
    status: EventStatus.Cancelled,
  },
  {
    startDateTime: "2024-04-15T20:00",
    endDateTime: "2024-04-15T23:00",
    eventType: "performance",
    location: "Tallinn",
    venue: "The Cavern Club",
    status: EventStatus.Confirmed,
  },
  {
    startDateTime: "2024-04-15T20:00",
    endDateTime: "2024-04-15T23:00",
    eventType: "rehearsal",
    location: "Tallinn",
    venue: "The Cavern Club",
    status: EventStatus.Pending,
  },
  {
    startDateTime: "2024-04-15T20:00",
    endDateTime: "2024-04-15T23:00",
    eventType: "performance",
    location: "Tallinn",
    venue: "The Cavern Club",
    status: EventStatus.Cancelled,
  },
];

const Dashboard = () => {
  return (
    <IonPage>
      <IonContent>
        {DUMMY_DATA.map((event, index) =>
          <EventCard {...event} key={index} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
