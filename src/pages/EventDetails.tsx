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
import EventDetailsEventStatus from '../components/event/EventDetailsEventStatus';
import { UserRoles } from '../../enums/roles';
import EventDetailsUserStatus from '../components/event/EventDetailsUserStatus';
import { getTitleTypeFromEventStatus } from '../helpers/event';

interface EventDetailsProps
  extends RouteComponentProps<{
    uid: string;
  }> {}

const EventDetails: FC<EventDetailsProps> = ({ match }) => {
  const { user } = useAuth();
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

  const eventStatusChangeHandler = (status: Status) => {};

  const memberStatusChangeHandler = (status: Status) => {};

  const { description, members, status: eventStatus } = event;

  const userAsEventMember = members.find((m) => m.uid === user?.uid);
  const membersToRender = members.filter((m) => m.uid !== user?.uid);

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
                <EventDetailsEventStatus
                  value={eventStatus!}
                  onChange={eventStatusChangeHandler}
                />
              )}
              {!isManager && (
                <EventDetailsUserStatus
                  value={userAsEventMember!.status!}
                  onChange={memberStatusChangeHandler}
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
