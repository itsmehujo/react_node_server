import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {Header, Footer, Page, Error404} from './Functional'
import {ChooseTokens, Payment, StripeSuccess} from './Payment'
import {SurveyForm, ConfirmSurvey} from './Survey'
import {HOCDashboard, DashboardView} from './Dashboard'
import Home from './Home'


import './GLOBAL_STYLE/main.scss';
import { fetchSurveys, fetchUser } from '../features/'

const App = () => {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.auth)
  

  useEffect(() => {
    dispatch(fetchUser())
    if(profile) {
      dispatch(fetchSurveys())
    }
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
          <HOCDashboard
          showNav={true}>
            <DashboardView/>
          </HOCDashboard>
        </Page>}/>

        <Route path='/surveys/new' 
        element={
          <Page title='New survey'>
          <HOCDashboard
          showNav={true}>
            <SurveyForm/>
          </HOCDashboard>
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