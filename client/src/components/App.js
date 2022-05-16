import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {Header, Footer, Page, Error404} from './Functional'
import {ChooseTokens, Payment, StripeSuccess} from './Payment'
import {SurveyForm, ConfirmSurvey} from './Survey'
import {Dashboard} from './Dashboard'
import Home from './Home'

import {fetchUser} from '../features/authSlice'

import './GLOBAL_STYLE/main.scss';

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
        element={
          <Page title='Error 404 !'>
            <Error404/>
          </Page>}/>
          
        <Route path='/' 
        element={
          <Page title='Home'>
          <Home/>
          </Page>}/>

        <Route path ='/surveys' 
        element={
          <Page title='Dashboard'>
          <Dashboard
          showNav={true}/>
        </Page>}/>

        <Route path='/surveys/new' 
        element={
          <Page title='New survey'>
          <Dashboard
          showNav={true}>
            <SurveyForm/>
          </Dashboard>
          </Page>}/>

        <Route path='/surveys/new/confirm'
        element={
          <Page title='Confirm survey'>
          <ConfirmSurvey/>
          </Page>}/>

        <Route path='/choose_tokens' 
        element={
          <Page title='Choose your package'>
          <ChooseTokens/>
          </Page>}/>

        <Route path='/checkout' 
        element={
          <Page title='Checkout'>
          <Payment/>
          </Page>}/>

        <Route path='/payment/success' 
        element={
          <Page title='Success !'>
          <StripeSuccess/>
          </Page>}/>

      </Routes>
      <Footer/>
  </BrowserRouter>)
}

export default App; 