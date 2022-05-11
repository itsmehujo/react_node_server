import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import Header from './Header'
import Footer from './Footer'
import Page from './Page'
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
        <Route path='*' 
        element={<Page title='Error 404 !'>
          <Error404/>
        </Page>}/>
        <Route path='/' 
        element={<Page title='Home'>
        <Home/>
        </Page>}/>
        <Route path ='/surveys' 
        element={<Page title='Dashboard'>
        <Dashboard/>
        </Page>}/>
        <Route path='/surveys/new' 
        element={<Page title='New survey'>
        <NewSurvey/>
        </Page>}/>
        <Route path='/choose_tokens' 
        element={<Page title='Choose your package'>
        <ChooseTokens/>
        </Page>}/>
        <Route path='/checkout' 
        element={<Page title='Checkout'>
        <Payment/>
        </Page>}/>
        <Route path='/payment/success' 
        element={<Page title='Success !'>
        <StripeSuccess/>
        </Page>}/>
      </Routes>
      <Footer/>
  </BrowserRouter>)
}

export default App; 