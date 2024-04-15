import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Dashboard = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listen now</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        Dashboard
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
