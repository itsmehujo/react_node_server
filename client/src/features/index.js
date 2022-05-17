import * as surveysActions from './surveysSlice'
import * as authActions from './authSlice'
export {default as authReducer} from './authSlice'
export {default as surveysReducer} from './surveysSlice'
export {default as cartReducer} from './cartSlice'
export {default as formReducer} from './formSlice'

// asyncThunk
export const fetchSurveys = surveysActions.fetchSurveys
export const fetchUser = authActions.fetchUser