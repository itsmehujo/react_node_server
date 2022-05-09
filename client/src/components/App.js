import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import Header from './Header'
import Footer from './Footer'
import {Home, Dashboard, NewSurvey} from './'
import Error404 from './Error404'
import CheckoutForm from './CheckoutForm'
import {fetchUser} from '../features/authSlice'

import '../style/main.scss'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return(
  <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='*' element={<Error404/>}></Route>
        <Route path='/' element={<Home/>}/>
        <Route path ='/surveys' element={<Dashboard/>}/>
        <Route path='/surveys/new' element={<NewSurvey/>}/>
        <Route path='/checkout_form' element={<CheckoutForm/>}/>
      </Routes>
      <Footer/>
  </BrowserRouter>)
}

export default App; 