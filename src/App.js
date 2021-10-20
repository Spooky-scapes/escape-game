import "./App.scss";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import SceneOne from "./scenes/SceneOne/SceneOne";
import SceneTwo from "./scenes/SceneTwo/SceneTwo";
import SceneThree from "./scenes/SceneThree/SceneThree";
import SceneFour from "./scenes/SceneFour/SceneFour";
import Inventory from "./components/Inventory/Inventory";
import Victory from "./scenes/Victory/victory";
import Chat from "./components/Chat/Chat";
import EndFail from "./scenes/EndFail/EndFail";
import Lobby from "./scenes/Lobby/Lobby";
import Timer from "./components/Timer/Timer.js";
import Tutorial from "./scenes/Tutorial/Tutorial";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <Chat /> */}
      <Router>
        <Timer />
        <Switch>
          <Route exact path="/" component={Lobby} />
          <Route exact path="/parlor" component={SceneOne} />
          <Route exact path="/storage" component={SceneTwo} />
          <Route exact path="/witchDen" component={SceneThree} />
          <Route exact path="/entryway" component={SceneFour} />
          <Route exact path="/youdied" component={EndFail} />
          <Route exact path="/victory" component={Victory} />
          <Route exact path="/tutorial" component={Tutorial} />
        </Switch>
      </Router>

      <div className="inventory-chat">
        <Inventory />
      </div>
    </div>
  );
}

export default App;
