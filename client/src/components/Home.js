import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './home.scss'

const Home = () => {
  const profile = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if(profile) {
      navigate('/surveys')
    }
  }, [profile]);

  return(
  <main id='home'>
    <h1>Itsmehujo feedback app !</h1>
    <p>Collect feedback from your users, gain insight and improve !</p>
  </main>
  )
}

export default Home 