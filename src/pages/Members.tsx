import {
  IonPage,
  IonContent,
  IonCard,
  IonCardTitle,
  IonItem,
  IonCardHeader,
  IonCardSubtitle,
} from "@ionic/react";
import React from "react";
import EventCard from "../components/pages/dashboard/EventCard";

//create twenty members with dummy data. same image and random names, and random instruments they are playing
// image src: https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png
// example: { name: "John Doe", instrument: "guitar", image: "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png" }

const DUMMY_DATA = [
  {
    name: "John Doe",
    instrument: "guitar",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
  {
    name: "Jane Doe",
    instrument: "drums",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
  {
    name: "John Smith",
    instrument: "bass",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
  {
    name: "Jane Smith",
    instrument: "vocals",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
  {
    name: "John Doe",
    instrument: "guitar",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
  {
    name: "Jane Doe",
    instrument: "drums",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
  {
    name: "John Smith",
    instrument: "bass",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
  {
    name: "Jane Smith",
    instrument: "vocals",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
  {
    name: "John Doe",
    instrument: "guitar",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
  {
    name: "Jane Doe",
    instrument: "drums",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
  {
    name: "John Smith",
    instrument: "bass",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
  {
    name: "Jane Smith",
    instrument: "vocals",
    image:
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
  },
];

const Members = () => {
  return (
    <IonPage>
      <IonContent>
        {DUMMY_DATA.map((member, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <div>
                  <IonCardTitle>{member.name}</IonCardTitle>
                  <IonCardSubtitle>{member.instrument}</IonCardSubtitle>
                </div>
                <img
                  src={member.image}
                  alt="profile"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                  }}
                />
              </div>
            </IonCardHeader>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Members;
