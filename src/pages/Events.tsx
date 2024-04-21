import EventCard from '../components/dashboard/EventCard';
import GeneralLayout from '../components/layout/GeneralLayout';
import React from 'react';
import { useAuth } from '../context/authContext';
import { useHistory } from 'react-router';

const Events = () => {
  const { user } = useAuth();
  const history = useHistory();

  const handleEventClick = (uid: string) => {
    history.push(`/events/${uid}`);
  };

  return (
    <GeneralLayout title='Events'>
      {user?.events.map((event) => (
        <EventCard {...event} key={event.uid} onClick={handleEventClick} />
      ))}
    </GeneralLayout>
  );
};

export default Events;
