import EventCard from '../components/dashboard/EventCard';
import { Event } from '../../types/event';
import { EventStatus } from '../../enums/event';
import GeneralLayout from '../components/layout/GeneralLayout';
import React from 'react';

const DUMMY_DATA: Event[] = [
  {
    startDateTime: '2024-04-15T20:00',
    endDateTime: '2024-04-15T23:00',
    eventType: 'performance',
    location: 'Tallinn',
    venue: 'The Cavern Club',
    status: EventStatus.Confirmed
  },
  {

    startDateTime: '2024-04-15T20:00',
    endDateTime: '2024-04-15T23:00',
    eventType: 'rehearsal',
    location: 'Tallinn',
    venue: 'The Cavern Club',
    status: EventStatus.Pending
  },
  {
    startDateTime: '2024-04-15T20:00',
    endDateTime: '2024-04-15T23:00',
    eventType: 'performance',
    location: 'Tallinn',
    venue: 'The Cavern Club',
    status: EventStatus.Cancelled
  },
  {
    startDateTime: '2024-04-15T20:00',
    endDateTime: '2024-04-15T23:00',
    eventType: 'performance',
    location: 'Tallinn',
    venue: 'The Cavern Club',
    status: EventStatus.Confirmed
  },
  {
    startDateTime: '2024-04-15T20:00',
    endDateTime: '2024-04-15T23:00',
    eventType: 'rehearsal',
    location: 'Tallinn',
    venue: 'The Cavern Club',
    status: EventStatus.Pending
  },
  {
    startDateTime: '2024-04-15T20:00',
    endDateTime: '2024-04-15T23:00',
    eventType: 'performance',
    location: 'Tallinn',
    venue: 'The Cavern Club',
    status: EventStatus.Cancelled
  }
];

const Dashboard = () => {
  return (
    <GeneralLayout>
      {DUMMY_DATA.map((event, index) =>
        <EventCard {...event} key={index} />
      )}
    </GeneralLayout>
  );
};

export default Dashboard;
