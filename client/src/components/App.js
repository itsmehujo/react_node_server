import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import Header from './Header'
import {Home, Dashboard, NewSurvey} from './'
import Error404 from './Error404'
import {fetchUser} from '../features/authSlice'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return(
  <BrowserRouter>
    <Header/>
    <div className='row' style={{padding: '2em'}}>
      <Routes>
        <Route path='*' element={<Error404/>}></Route>
        <Route path='/' element={<Home/>}/>
        <Route path ='/surveys' element={<Dashboard/>}/>
        <Route path='/surveys/new' element={<NewSurvey/>}/>
      </Routes>
    </div>
  </BrowserRouter>)
}

export default App; 