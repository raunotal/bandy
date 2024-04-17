import {
  IonPage,
  IonContent,
} from "@ionic/react";
import MemberCard from "../components/members/MemberCard";

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
        {DUMMY_DATA.map((member, index) => <MemberCard key={index} {...member} />)}
      </IonContent>
    </IonPage>
  );
};

export default Members;
