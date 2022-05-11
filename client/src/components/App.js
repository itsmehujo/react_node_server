import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import Header from './Header'
import Footer from './Footer'
import {Home, Dashboard, NewSurvey} from './'
import Error404 from './Error404'
import Payment from './Payment/Payment'
import StripeSuccess from './Payment/StripeSuccess'
import {fetchUser} from '../features/authSlice'

import '../style/main.scss'
import ChooseTokens from './Payment/ChooseTokens'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return(
  <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='*' element={<Error404/>}></Route>
        <Route path='/' element={<Home/>}/>
        <Route path ='/surveys' element={<Dashboard/>}/>
        <Route path='/surveys/new' element={<NewSurvey/>}/>
        <Route path='/choose_tokens' element={<ChooseTokens/>}/>
        <Route path='/checkout' element={<Payment/>}/>
        <Route path='/payment/success' element={<StripeSuccess/>}/>
      </Routes>
      <Footer/>
  </BrowserRouter>)
}

export default App; 