import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

import "./index.css";
import { css } from "../styled-system/css";

import { PokemonsProvider } from "./contexts/PokemonsContext";
import { PokedexAppLogo } from "./components/PokedexAppLogo";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Authenticated } from "./components/Authenticated";
import Favorites from "./pages/Favorites";
import { Guest } from "./components/Guest";
import Register from "./pages/Register";
import Login from "./pages/Login";

setupIonicReact();

const App: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <IonApp>
      <PokemonsProvider>
        <IonReactRouter>
          {/* MENU */}
          <IonMenu contentId="main-content">
            <IonHeader>
              <IonToolbar>
                <IonTitle className={css({ paddingLeft: 2 })}>
                  <PokedexAppLogo />
                </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonList>
                <IonItem routerLink="/">
                  <IonLabel>All</IonLabel>
                </IonItem>
                {isAuthenticated && (
                  <>
                    <IonItem routerLink="/favorites">
                      <IonLabel>Favorites</IonLabel>
                    </IonItem>
                    <IonItem
                      button
                      onClick={() => {
                        logout();
                      }}
                    >
                      <IonLabel>Logout</IonLabel>
                    </IonItem>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <IonItem routerLink="/login">
                      <IonLabel>Login</IonLabel>
                    </IonItem>
                  </>
                )}
              </IonList>
            </IonContent>
          </IonMenu>
          {/* PAGES */}
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/favorites">
                <Authenticated>
                  <Favorites />
                </Authenticated>
              </Route>
              <Route path="/login">
                <Guest>
                  <Login />
                </Guest>
              </Route>
              <Route path="/register">
                <Guest>
                  <Register />
                </Guest>
              </Route>
              <Route exact path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </PokemonsProvider>
    </IonApp>
  );
};

export default App;
