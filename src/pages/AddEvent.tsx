import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonInput,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonList,
  IonTextarea,
  IonDatetimeButton,
  IonModal
} from '@ionic/react';

const AddEvent = () => {
  // Dummy data for members
  const members = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Emily Johnson' }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem lines='none'>
            <IonLabel position="stacked">Start Time</IonLabel>
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime"></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem lines='none'>
            <IonLabel position="stacked">End Time</IonLabel>
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime"></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonInput label="Venue" labelPlacement="floating"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput label="Location" labelPlacement="floating"></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect label='Event type' labelPlacement='floating'>
              <IonSelectOption value="gig">Gig</IonSelectOption>
              <IonSelectOption value="rehearsal">Rehearsal</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonTextarea label="Additional information:" labelPlacement="floating" autoGrow></IonTextarea>
          </IonItem>
          <IonItem>
            <IonSelect label="Members" labelPlacement="floating" multiple={true}>
              {members.map((member) => (
                <IonSelectOption key={member.id} value={member.id}>
                  {member.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonButton expand="block" onClick={() => console.log('Event Saved:', { message: "Dummy save event" })}>
            Save Event
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEvent