import { Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonLabel,
  IonLoading,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  addCircleOutline,
  calendarOutline,
  peopleOutline,
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
import AddEvent from './pages/AddEvent';
import React from 'react';
import Login from './pages/Login';
import './styles.css';
import MemberDetails from './pages/MemberDetails';
import { useAuth } from './context/authContext';
import { UserRoles } from '../enums/roles';
import EventDetails from './pages/EventDetails';

/* Theme variables */
// import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const isManager = user?.role === UserRoles.Manager;

  if (loading) {
    return (
      <IonPage>
        <IonContent>
          <IonLoading isOpen={true} duration={3000} />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route exact path='/login' render={() => <Login />} />
          <Route path='/'>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path='/events' component={Events} />
                <Route exact path='/events/:uid' component={EventDetails} />
                <Route exact path='/members' component={Members} />
                <Route exact path='/members/:uid' component={MemberDetails} />
                <Route exact path='/add-event' component={AddEvent} />
              </IonRouterOutlet>
              <IonTabBar slot='bottom'>
                <IonTabButton tab='dashboard' href='/events'>
                  <IonIcon icon={calendarOutline} />
                  <IonLabel>Gigs</IonLabel>
                </IonTabButton>
                <IonTabButton tab='members' href='/members'>
                  <IonIcon icon={peopleOutline} />
                  <IonLabel>Members</IonLabel>
                </IonTabButton>
                {isManager && (
                  <IonTabButton tab='add-event' href='/add-event'>
                    <IonIcon aria-hidden='true' icon={addCircleOutline} />
                    <IonLabel>Add Event</IonLabel>
                  </IonTabButton>
                )}
              </IonTabBar>
            </IonTabs>
          </Route>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
