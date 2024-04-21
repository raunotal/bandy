import EventCard from '../components/dashboard/EventCard';
import GeneralLayout from '../components/layout/GeneralLayout';
import React from 'react';
import { useAuth } from '../context/authContext';

const Events = () => {
  const { user } = useAuth();

  return (
    <GeneralLayout title='Events'>
      {user?.events.map((event) => (
        <EventCard {...event} key={event.uid} />
      ))}
    </GeneralLayout>
  );
};

export default Events;
