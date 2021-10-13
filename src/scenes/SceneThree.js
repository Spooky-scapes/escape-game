import "../main.scss";
import "../assets/SceneThreeAssets/SceneThree.scss";
import grandFatherClock from "../assets/SceneThreeAssets/GrandfatherClock.png";
import cauldron from "../assets/SceneThreeAssets/Cauldron2.png";
import witch from "../assets/SceneThreeAssets/witch.png";
import painting from "../assets/SceneThreeAssets/farm-painting.png";
import woodenspoon from "../assets/SceneThreeAssets/woodenspoon.png";
import arrowRight from "../assets/SceneThreeAssets/ghostArrowRight.png";
import arrowLeft from "../assets/SceneThreeAssets/ghostArrowLeft.png";
import ravenClosed from "../assets/SceneOne/ravenClosedFIT.png";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/Background.jpg";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";

const SceneThree = () => {
  return (
    <div className="sceneThreeBG">
      <div>
        <img
          className="woodenSpoon"
          src={woodenspoon}
          alt="A witches trusty wooden spoon"
        ></img>
      </div>
      <div>
        <img
          className="cauldron"
          src={cauldron}
          alt="A black cauldron with skulls on it"
        ></img>
      </div>
      <div>
        <img
          className="witch"
          src={witch}
          alt="A spooky witch sitting in a rocking-chair"
        ></img>
      </div>
      <div>
        <img
          className="grandFatherClock"
          src={grandFatherClock}
          alt="A grandfather clock"
        ></img>
      </div>
      <div>
        <img
          className="ravion"
          src={ravenClosed}
          alt="A spooky, but helpful raven"
        ></img>
      </div>
      <div>
        <img
          className="painting"
          src={painting}
          alt="classical painting of farmers working"
        ></img>
      </div>
      <Link to="/scene4">
        <div>
          <img
            className="arrowRight"
            src={arrowRight}
            alt="An arrow that looks ghostly"
          ></img>
        </div>
      </Link>
      <Link to="/scene2">
        <div>
          <img
            className="arrowLeft"
            src={arrowLeft}
            alt="An arrow that looks ghostly"
          ></img>
        </div>
      </Link>
    </div>
  );
};

export default SceneThree;
