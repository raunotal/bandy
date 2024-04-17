import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react'

const MemberCard = (props: Member) => {
  const { name, instrument, image } = props
  return (
    <IonCard>
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