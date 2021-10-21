import "./EndFail.scss";
import { useHistory } from "react-router-dom";

const EndFail = () => {
  const history = useHistory();
  const hideInv = () => {
    document.getElementsByClassName("visInventory")[0].className =
      "hiddenInventory";
    document.getElementsByClassName("visItemBox")[0].className =
      "hiddenItemBox";
  };
  return (
    <div className="youFail">
      <h1 className="deadText">You Died</h1>
      <h2
        className="playAgain"
        onClick={() => {
          hideInv();
          history.push("/");
        }}
      >
        Play Again
      </h2>
    </div>
  );
};

export default EndFail;
