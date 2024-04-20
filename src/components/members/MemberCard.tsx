import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react'
import { Member } from '../../../types/member';
import { useHistory } from 'react-router-dom';

const MemberCard = (props: Member) => {
  const { uid, name, instrument, image } = props
  const history = useHistory();

  const handleMemberClick = () => {
    history.push(`/members/${uid}`);
  }

  return (
    <IonCard onClick={handleMemberClick}>
      <IonCardHeader>
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
          <div>
            <IonCardTitle>{name}</IonCardTitle>
            <IonCardSubtitle>{instrument}</IonCardSubtitle>
          </div>
          <img
            src={image}
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
  )
}

export default MemberCard