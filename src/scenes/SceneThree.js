import "../main.scss";
import "./SceneThree.scss";
import grandFatherClock from "./SceneThreeAssets/GrandfatherClock.png";
import cauldron from "./SceneThreeAssets/Cauldron2.png";
import witch from "./SceneThreeAssets/witch.png";
import woodenspoon from "./SceneThreeAssets/woodenspoon.png";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";

const SceneThree = () => {
  return (
    <div>
      <img
        className="woodenSpoon"
        src={woodenspoon}
        alt="A witches trusty wooden spoon"
      ></img>
      <img
        className="cauldron"
        src={cauldron}
        alt="A black cauldron with skulls on it"
      ></img>
      <img
        className="witch"
        src={witch}
        alt="A spooky witch sitting in a rocking-chair"
      ></img>
      <img
        className="grandFatherClock"
        src={grandFatherClock}
        alt="A grandfather clock"
      ></img>
    </div>
  );
};

export default SceneThree;
