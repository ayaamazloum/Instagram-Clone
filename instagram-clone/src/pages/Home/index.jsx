import NavBar from '../../components/NavBar'
import './style.css'

const Home = ({handleUserLogged}) => {
  return (
    <div className='home page'>
      <NavBar handleUserLogged={handleUserLogged} />
    </div>
  )
}

export default Home