import "./EndFail.scss";
import {useHistory} from "react-router-dom";

const EndFail = () => {
    const history = useHistory();
    return (
        <div className="youFail">
            <h1 className='deadText'>You Died</h1>
            <h2 className = 'playAgain' onClick = {() => {history.push('/')}}>Play Again</h2>
        </div>
    )
}

export default EndFail;
