import { IonPage, IonContent } from '@ionic/react';
import BandCard from '../components/pages/bands/BandCard';

const DUMMY_DATA = [
  {
    name: "Heldene Aeg"
  },
  {
    name: "Terminal Frost"
  },
  {
    name: "The Beatles"
  },
]

const Bands = () => {
  return (
    <IonPage>
      <IonContent>
        {DUMMY_DATA.map((band, index) => <BandCard key={index} {...band} />)}
      </IonContent>
    </IonPage>
  )
}

export default Bands