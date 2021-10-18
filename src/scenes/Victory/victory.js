import { Link } from "react-router-dom";
import './victory.scss'

const Victory = () => {

  const theRoadHome = setTimeout(() => {document.getElementById('home').click()}, 5000)
  return (
    <div className="victory">
      <h1 className="vic-title">You've done a great job</h1>
      <Link to='/'>
        <button className='hidden' id='home'>home</button>
      </Link>
    </div>

  )
}

export default Victory
