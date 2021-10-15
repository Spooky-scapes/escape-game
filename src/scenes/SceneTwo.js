import "../App.scss";
import "../main.scss";
import "../assets/SceneTwo/sceneTwo.scss";
import React, { useState } from "react";
// import ReactDom from 'react-dom'
import closedCoffin from "../assets/SceneTwo/closed-coffin.png";
// import openCoffin from '../assets/SceneTwo/open-coffin.png';
import stool from "../assets/SceneTwo/stool-cabinet.png";
import hole from "../assets/SceneTwo/holeinwall.png";
import wallCandle from "../assets/SceneTwo/wall-candle.png";
import oldChair from "../assets/SceneTwo/old-chair.png";
import savion from "../assets/ravenClosedFIT.png";
import cowPainting from "../assets/SceneTwo/cow-painting.png";
// import backgroundImage from "../assets/Background.jpg";
import { Link } from "react-router-dom";
import leftArrow from "../assets/ghostArrowLeft.png";
import rightArrow from "../assets/ghostArrowRight.png";
import { timeoutCollection } from "time-events-manager";

const SceneTwo = () => {
  const [isActive, setActive] = useState(false);
  const [openCoffin, setOpen] = useState(false);

  const heardRiddle = () => {
    const bool = JSON.parse(window.localStorage.getItem("usedCasset"));
    if (bool) {
      window.localStorage.setItem("hasCandyBucket", true);
    }
  };

  const assetClicked = (e) => {
    timeoutCollection.removeAll();
    setActive(false);
    const clicked = e.target.className;
    const narrationBox = document.getElementById("narrationBox");
    narrationBox.innerHTML = "";

    switch (clicked) {
      case "coffin":
        const bool = JSON.parse(window.localStorage.getItem("usedCasset"));
        narrationBox.innerHTML = bool
          ? "A large coffin, it’s open but there isn’t anyone in it. The pungent smell emanating from it fills the room."
          : "A large coffin, the lid is heavy, you wonder what may be inside of it, but you’re too afraid to open it yourself.";
        break;
      case "cowPainting":
        let usedKey = JSON.parse(window.localStorage.getItem("usedKey"));
        if (usedKey) {
          narrationBox.innerHTML =
            "It is getting close to night, but not really.";
          break;
        }
        narrationBox.innerHTML =
          "A painting of a cow, what a strange painting to own.";
        break;
      case "stoolCabinet":
        narrationBox.innerHTML =
          "An old worn down stool cabinet that doesn’t open.";
        break;
      case "oldChair":
        narrationBox.innerHTML =
          "An old worn down chair, it doesn’t look sturdy enough to sit on.";
        break;
      case "holeInWall":
        narrationBox.innerHTML =
          "The old purple wallpaper has a huge hole in it, there doesn’t seem to be anything behind that wallpaper but darkness";
        break;
      case "rightCandle":
        narrationBox.innerHTML =
          "A wall candle, there’s another one on the opposite side of the room. The candle is lit but who lit them?";
        break;
      case "leftCandle":
        narrationBox.innerHTML =
          "A wall candle, there’s another one on the opposite side of the room. The candle is lit but who lit them?";
        break;
      default:
        break;
    }

    setActive(true);
    setTimeout(function () {
      setActive(false);
    }, 3000);
  };

  return (
    <div className="sceneTwo">
      <div>
        <img
          src={closedCoffin}
          alt="an open coffin"
          className="coffin"
          onClick={(e) => {
            assetClicked(e);
            heardRiddle();
          }}
        />
      </div>
      <div></div>
      <div>
        <img
          src={oldChair}
          alt="a very old chair"
          className="oldChair"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={stool}
          alt="an old nasty cabinet"
          className="stoolCabinet"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={hole}
          alt="an odd hole in the wall"
          className="holeInWall"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={wallCandle}
          alt="a lit candle"
          className="rightCandle"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={wallCandle}
          alt="a lit candle"
          className="leftCandle"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={cowPainting}
          alt="an interesting painting"
          className="cowPainting"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={savion}
          className="raven-quiet"
          alt="a squawking talking raven"
        />
      </div>
      <div className="narrationBox">
        <p
          id="narrationBox"
          className={isActive ? "coffin-text-active" : "coffin-text"}
        ></p>
      </div>
      <Link to="/scene1">
        <div>
          <img src={leftArrow} id="leftArrow" alt="ghost arrow pointing left" />
        </div>
      </Link>
      <Link to="/scene3">
        <div>
          <img
            src={rightArrow}
            id="rightArrow"
            alt="ghost arrow pointing right"
          />
        </div>
      </Link>
    </div>
  );
};

export default SceneTwo;
