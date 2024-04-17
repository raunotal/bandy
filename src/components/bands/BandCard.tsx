import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/react'

const BandCard = (props: Band) => {
  const { name } = props
  return (
    <IonCard>
      <IonCardHeader>
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
          <div>
            <IonCardTitle>{name}</IonCardTitle>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
              borderRadius: "100%",
              border: "1px solid #999",
            }}
          >{name.charAt(0).toUpperCase()}</div>
        </div>
      </IonCardHeader>
    </IonCard>
  )
}

export default BandCard