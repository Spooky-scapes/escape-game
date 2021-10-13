import '../index.scss'
import lobbyScreen from '../assets/home-screen.png'
import { Link } from 'react-router-dom'

const Lobby = () => {
  return (
    <div>
      <img className= 'lobbyScreen' src={lobbyScreen} alt = 'haunted house lobby screen'/>
      <Link to="/scene1"><button type = "button">Begin</button></Link>
    </div>
  )
}

export default Lobby;
