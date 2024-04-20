import { Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  addCircleOutline,
  calendarOutline,
  peopleOutline,
  radioOutline
} from 'ionicons/icons';
import Events from './pages/Events';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import Members from './pages/Members';
import Bands from './pages/Bands';
import AddEvent from './pages/AddEvent';
import React from 'react';
import Login from './pages/Login';
import './styles.css';

/* Theme variables */
// import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/login" render={() => <Login />} />
            <Route exact path="/bands" render={() => <Bands />} />
            <Route exact path="/events" render={() => <Events />} />
            <Route exact path="/members" render={() => <Members />} />
            <Route exact path="/add-event" render={() => <AddEvent />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="bands" href="/bands">
              <IonIcon aria-hidden="true" icon={radioOutline} />
              <IonLabel>Bands</IonLabel>
            </IonTabButton>
            <IonTabButton tab="dashboard" href="/events">
              <IonIcon icon={calendarOutline} />
              <IonLabel>Gigs</IonLabel>
            </IonTabButton>
            <IonTabButton tab="members" href="/members">
              <IonIcon icon={peopleOutline} />
              <IonLabel>Members</IonLabel>
            </IonTabButton>
            <IonTabButton tab="add-event" href="/add-event">
              <IonIcon aria-hidden="true" icon={addCircleOutline} />
              <IonLabel>Add Event</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
