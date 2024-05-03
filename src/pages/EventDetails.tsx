import { useAuth } from '../context/authContext';
import GeneralLayout from '../components/layout/GeneralLayout';
import { RouteComponentProps } from 'react-router';
import { FC, useEffect, useState } from 'react';
import {
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonRow,
  IonText,
} from '@ionic/react';
import { Event } from '../../types/event';
import EventCard from '../components/dashboard/EventCard';
import { Status } from '../../enums/event';
import { UserRoles } from '../../enums/roles';
import { getTitleTypeFromEventStatus } from '../helpers/event';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Callable } from '../../enums/callable';
import EventDetailsStatus from '../components/event/EventDetailsStatus';
import { functions } from '../../config/firebaseConfig';

interface EventDetailsProps
  extends RouteComponentProps<{
    uid: string;
  }> { }

const EventDetails: FC<EventDetailsProps> = ({ match }) => {
  const { user, updateEvent } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const isManager = user?.role === UserRoles.Manager;

  useEffect(() => {
    setEvent(
      user?.events?.find((event) => event.uid === match.params.uid) ?? null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.uid]);

  if (!event || !user) {
    return <GeneralLayout title='Events'>Event not found</GeneralLayout>;
  }

  const eventStatusChangeHandler = async (status: Status) => {
    const updatedEvent = { ...event, status };
    const functions = getFunctions();
    const updateEventFunction = httpsCallable<Event, Event>(
      functions,
      Callable.UpdateEventStatus
    );
    await updateEventFunction(updatedEvent);
    updateEvent(updatedEvent);
    setEvent(updatedEvent);
  };

  const memberStatusChangeHandler = async (status: Status) => {
    const updatedMembers = event.members.map((m) =>
      m.uid === user?.uid ? { ...m, status } : m
    );
    const updatedEvent = { ...event, members: updatedMembers };
    const updateUserEventStatusFunction = httpsCallable<Event, Event>(
      functions,
      Callable.UpdateUserEventStatus
    );
    await updateUserEventStatusFunction(updatedEvent);
    updateEvent(updatedEvent);
    setEvent(updatedEvent);
  };

  const { description, members, status: eventStatus } = event;

  const userAsEventMember = members.find((m) => m.uid === user?.uid);
  const membersToRender = members.filter((m) => m.uid !== user?.uid);
  const currentStatus = isManager ? eventStatus : userAsEventMember?.status;

  return (
    <GeneralLayout>
      <IonGrid>
        <IonRow>
          <IonCol>
            <EventCard {...event} />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className='ion-padding'>
            <IonText>Additional details:</IonText>
            <IonText style={{ display: 'flex' }}>{description}</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonList>
              {isManager && (
                <EventDetailsStatus
                  value={currentStatus!}
                  onChange={isManager ? memberStatusChangeHandler : eventStatusChangeHandler}
                />
              )}
              <div className='ion-padding' />
              {membersToRender.map((m) => (
                <IonItem key={m.uid}>
                  <IonText>{m.name}</IonText>-
                  <IonText color={getTitleTypeFromEventStatus(m.status!)}>
                    {m.status}
                  </IonText>
                </IonItem>
              ))}
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </GeneralLayout>
  );
};

export default EventDetails;
