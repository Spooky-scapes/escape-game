import "../assets/SceneFour/SceneFour.scss";
import mainDoor from "../assets/SceneFour/main-door.png";
import backgroundImage from "../assets/Background.jpg";
import window from "../assets/SceneFour/window.png";
import dog from "../assets/SceneFour/Bonedog.png";
import mat from "../assets/SceneFour/mat.png";
import cassette from "../assets/SceneFour/cassette-tape.png";

const SceneFour = () => {
  return (
    <div>
      <img className="backgroundImage" src={backgroundImage} alt="background" />
      <img className="mainDoor" src={mainDoor} alt="front door"/>
      <img className="window1" src={window} alt="window to the left of door" />
      <img className="window2" src={window} alt="window to the right of door" />
      <img className="dog" src={dog} alt="cute little bonedog" />
      <img className="cassette" src={cassette} alt="hidden cassette tape"/>
      <img className="mat" src={mat} alt="dusty old mat" />
      <div className="matClick" onClick = { () => console.log('this is the mat')}></div>
    </div>
  );
};

export default SceneFour;
