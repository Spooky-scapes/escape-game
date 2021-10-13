import "../assets/SceneFour/SceneFour.scss";
import mainDoor from "../assets/SceneFour/main-door.png";
import window from "../assets/SceneFour/window.png";
import dog from "../assets/SceneFour/Bonedog.png";
import mat from "../assets/SceneFour/mat.png";
import cassette from "../assets/SceneFour/cassette-tape.png";
import closedRaven from "../assets/SceneFour/ravenClosedFIT.png";
import openRaven from "../assets/SceneFour/ravenOpenFIT.png";
import { Link } from "react-router-dom";
import leftArrow from "../assets/ghostArrowLeft.png";
import rightArrow from "../assets/ghostArrowRight.png";

const SceneFour = () => {
  return (
    <div className="container">
      <img
        className="mainDoor"
        src={mainDoor}
        alt="front door"
        onClick={() => alert("this is the door")}
      />
      <img
        className="window1"
        src={window}
        alt="window to the left of door"
        onClick={() => alert("this is the window1")}
      />
      <img
        className="window2"
        src={window}
        alt="window to the right of door"
        onClick={() => alert("this is the window2")}
      />
      <img
        className="dog"
        src={dog}
        alt="cute little bonedog"
        onClick={() => alert("this is the bone dog")}
      />
      <img className="cassette" src={cassette} alt="hidden cassette tape" />
      <img
        className="mat"
        src={mat}
        alt="dusty old mat"
        onClick={() => alert("this is the mat")}
      />
      <img
        className="closedRaven"
        src={closedRaven}
        alt="raven watching you"
        onClick={() => alert("this is the raven")}
      />
      {/* <div className="matClick" onClick = { () => alert('this is the mat')}></div> */}
      <Link to="/scene3">
        <div>
          <img src={leftArrow} id="leftArrow" alt="ghost arrow pointing left" />
        </div>
      </Link>
      <Link to="/scene1">
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

export default SceneFour;
