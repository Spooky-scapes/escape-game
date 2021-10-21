import "./victory.scss";
import { useHistory } from "react-router-dom";

const Victory = () => {
  const history = useHistory();
  const resetLocal = () => {
    window.localStorage.setItem("hasCasset", false);
    window.localStorage.setItem("usedCasset", false);
    window.localStorage.setItem("hasCandyBucket", false);
    window.localStorage.setItem("usedCandyBucket", false);
    window.localStorage.setItem("hasKey", false);
    window.localStorage.setItem("usedKey", false);
    window.localStorage.setItem("foundPainting", false);
    document.getElementsByClassName("invCasset")[0].className = "hiddenCasset";
    document.getElementsByClassName("invCandyBucket")[0].className =
      "hiddenCandyBucket";
    document.getElementsByClassName("invKey")[0].className = "hiddenKey";
  };

  return (
    <div className="victory">
      <h1 className="vic-title">Time to Trick or Treat!</h1>
      <h2
        className="playAgainWin"
        onClick={() => {
          history.push("/");
          resetLocal();
        }}
      >
        Play Again
      </h2>
    </div>
  );
};

export default Victory;
