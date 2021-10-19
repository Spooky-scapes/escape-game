import './victory.scss'
import {useHistory} from "react-router-dom";

const Victory = () => {
  const history = useHistory();
  return (
    <div className="victory">
      <h1 className="vic-title">Time to Trick or Treat!</h1>
      <h2 className = 'playAgain' onClick = {() => {history.push('/')}}>Play Again</h2>
    </div>

  )
}

export default Victory
