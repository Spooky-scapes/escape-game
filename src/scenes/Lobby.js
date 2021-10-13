import "../lobby.scss";
import { Link } from "react-router-dom";

const Lobby = () => {
  return (
    <div className="lobbyScreen">
      <div className="title">
        <h1>Spooky Scapes!</h1>
      </div>
      <Link to="/scene1">
        <div className="playButton">
          <h1>Play</h1>
        </div>
      </Link>
    </div>
  );
};

export default Lobby;
