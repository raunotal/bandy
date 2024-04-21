import { useAuth } from '../context/authContext';
import GeneralLayout from '../components/layout/GeneralLayout';
import { RouteComponentProps } from 'react-router';
import { FC, useEffect, useState } from 'react';
import { IonGrid, IonRow } from '@ionic/react';
import { Event } from '../../types/event';

interface EventDetailsProps
  extends RouteComponentProps<{
    uid: string;
  }> {}

const EventDetails: FC<EventDetailsProps> = ({ match }) => {
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    setEvent(
      user?.events?.find((event) => event.uid === match.params.uid) ?? null
    );
  }, [match.params.uid]);

  if (!event) {
    return <GeneralLayout title='Events'>Event not found</GeneralLayout>;
  }

  return (
    <GeneralLayout>
      <IonGrid>
        <IonRow></IonRow>
      </IonGrid>
    </GeneralLayout>
  );
};

export default EventDetails;
