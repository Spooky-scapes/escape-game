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
import Victory from "./scenes/Victory/victory"
// import Chat from "./components/Chat/Chat";
import EndFail from "./scenes/EndFail/EndFail";
import Lobby from "./scenes/Lobby/Lobby";
// import Timer from "./components/Timer/Timer.js"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
    <div className="App">
     {/* <Timer /> */}
      {/* <Chat /> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Lobby} />
          <Route path="/scene1" component={SceneOne} />
          <Route path="/scene2" component={SceneTwo} />
          <Route path="/scene3" component={SceneThree} />
          <Route path="/scene4" component={SceneFour} />
          <Route exact path="/youdied" component={EndFail} />
          <Route exact path="/victory" component={Victory} />
        </Switch>
      </Router>

      <div className="inventory-chat">
        {/* <Inventory /> */}
      </div>
    </div>
  );
}

export default App;
