import "../main.scss";
import "../assets/SceneThreeAssets/SceneThree.scss";
import grandFatherClock from "../assets/SceneThreeAssets/GrandfatherClock.png";
import cauldron from "../assets/SceneThreeAssets/Cauldron2.png";
import witch from "../assets/SceneThreeAssets/witch.png";
import harvestPainting from "../assets/SceneThreeAssets/farm-painting.png";
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
  const [isActive, setActive] = useState(false);
  const [haveCandy, setCandy] = useState(false);
  const [usedCandy, setUsedCandy] = useState(false);
  const [paintingHint, setPaintingHint] = useState(false);
  const hasBucket = () => {
    const bool = JSON.parse(window.localStorage.getItem("hasCandyBucket"));
    if (bool) {
      window.localStorage.setItem("usedCandyBucket", true);
    }
  };

  const assetClicked = (e) => {
    setActive(false);
    const clicked = e.target.className;
    const paintingClicked = e.target.id;
    const narrationBox = document.getElementById("narrationBox");
    narrationBox.innerHTML = "";
    switch (clicked || paintingClicked) {
      case "woodenSpoon":
        narrationBox.innerHTML =
          "A wooden spoon, a witch’s favorite tool. Potion stirrer and wand! What more could a witch want?";
        break;
      case "cauldron":
        let bool = JSON.parse(window.localStorage.getItem("usedCandyBucket"));
        narrationBox.innerHTML = bool
          ? "The small is rather pleasant now, sweet and spicy, with a hint of something citricy.” Lily: “I was making my famous candied chilis! Now scram you oversized crow!” *squack*"
          : "Lily’s cauldron. It seems to be made out of cast iron with skull motifs on four sides of it. In the witch's pot is an unholy amount of chili peppers boiling. I am not sure what she is making, but it hurts to breathe it in.";
        break;
      case "witch":
        const hasCandyBucket = JSON.parse(
          window.localStorage.getItem("hasCandyBucket")
        );
        const usedCandyBucket = JSON.parse(
          window.localStorage.getItem("usedCandyBucket")
        );
        if (usedCandyBucket) {
          narrationBox.innerHTML =
            "Thank you for you lovely gift. I found this at the bottom of your candy bucket. I hope you make it out of here alive... *witches laugh*";
          window.localStorage.setItem("hasKey", true);
          break;
        }
        narrationBox.innerHTML = hasCandyBucket
          ? "Is that candy, for me? Thank you kindly. *shuffling sound and crinkle of wrappers* *witches cackle* *savions signature explosion sound* Come and drink some of this potion sweaty. I have a feeling that you will need this in order to get out of here."
          : "Oh hello there deary. It appears you have also been stolen into the belly of this house monster. Child, I am missing something to counteract the spiciness of my brew here and I was wondering if you could help me?";
        break;
      case "grandFatherClock":
        narrationBox.innerHTML =
          "An old grandfather clock that has stopped working ages ago. It’s beautiful smooth dark wood has been kept in decent shape. It’s a shame that we are the only ones who get to enjoy this.";
        break;
      case "harvestPainting":
        let usedKey = JSON.parse(window.localStorage.getItem("usedKey"));
        if (usedKey) {
          narrationBox.innerHTML =
            "The clouds do cast a shadow, but the painting is set during the day.";
          break;
        }
        narrationBox.innerHTML = usedKey
          ? "Hmmm… I am not sure that is right, there aren’t any orbs in this painting."
          : "This painting depicts three women harvesting golden wheat on a hot fall day. A fluffy cloud looms in the distance foreshadowing a muddy week ahead.";
        break;

      default:
        break;
    }
    setActive(true);
    setTimeout(function () {
      setActive(false);
    }, 3000);
    return;
  };

  return (
    <div className="sceneThreeBG">
      <div>
        <img
          className="woodenSpoon"
          src={woodenspoon}
          alt="A witches trusty wooden spoon"
          onClick={(event) => assetClicked(event)}
        ></img>
      </div>
      <div>
        <img
          className="cauldron"
          src={cauldron}
          alt="A black cauldron with skulls on it"
          onClick={(event) => assetClicked(event)}
        ></img>
      </div>
      <div>
        <img
          className="witch"
          src={witch}
          alt="A spooky witch sitting in a rocking-chair"
          onClick={(event) => {
            assetClicked(event);
            hasBucket();
          }}
        ></img>
      </div>
      <div>
        <img
          className="grandFatherClock"
          src={grandFatherClock}
          alt="A grandfather clock"
          onClick={(event) => assetClicked(event)}
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
          id="harvestPainting"
          src={harvestPainting}
          alt="classical painting of farmers working"
          onClick={(event) => assetClicked(event)}
        ></img>
      </div>
      <div className="narrationBox">
        <p id="narrationBox"></p>
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
