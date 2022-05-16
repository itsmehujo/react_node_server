import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {updateCart} from '../../features/cartSlice'
import '../../style/choose_tokens.scss'

const ChooseTokens = () => {
  const profile = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [chosenPackage, setChosenPackage] = useState({name: 'standard', tokens: 10, price: 10})
  const packages = useRef()
  useEffect(() => {
    dispatch(updateCart({chosenPackage}))
  }, [chosenPackage]);

  const getPackage = (chosenPackage) => {
    switch(chosenPackage) {
      case 'standard':
        return {name: chosenPackage, tokens: 10, price: 10}
      case 'premium':
        return {name: chosenPackage, tokens: 30, price: 25}
      case 'exclusive':
        return {name: chosenPackage, tokens: 100, price: 75}       
      default: return
  }
}

  const choosePackage = (chosenPackage) => {
    packages.current.className = `${chosenPackage}__chosen`
    setChosenPackage(getPackage(chosenPackage))
  }

  return(<main id='choose_tokens' ref={packages} className='standard__chosen'>
    <h1>Please choose your package</h1>
    <div className='packages'>
      <div className='standard'>
      <h2>Standard</h2>
      <small>10€</small>
      <p>
        The standard package, perfect to begin with.
        It comes with 10 tokens, so you can send 10 different surveys, to an unlimited number of emails.
      </p>
      <button
      onClick={() => choosePackage('standard')}
      >I'll go with that !</button>
      </div>
      <div className='premium'>
      <h2>Premium</h2>
      <small>25€</small>
      <p>
        The premium package, for those who want to perform.
        It comes with 30 tokens, so you can send 30 different surveys, to an unlimited number of emails.
      </p>
      <button
      onClick={() => choosePackage('premium')}
      >I want to perform !</button>
      </div>
      <div className='exclusive'>
      <h2>Exclusive</h2>
      <small>75€</small>
      <p>
        The exclusive package, for the top companies.
        It comes with 100 tokens, so you can send 100 different surveys, to an unlimited number of emails.
      </p>
      <button
      onClick={() => choosePackage('exclusive')}
      >I need the cream of the crop.</button>
      </div>
    </div>
    { profile ?
      <Link to='/checkout'
      className='checkout_link'>
      Go to checkout ({ chosenPackage.price }€)
    </Link>
    : <span className='checkout_link'>Please log in to continue</span>
    }
  </main>)
}

export default ChooseTokens