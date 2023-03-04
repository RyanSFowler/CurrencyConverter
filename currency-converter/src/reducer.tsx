import { combineReducers } from 'redux'

import pastCurrencyReducer from './pastCurrency/reducer'
import currentCurrencyReducer from './currentCurrency/reducer'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  pastCurrency: pastCurrencyReducer,
  currentCurrency : currentCurrencyReducer
})

export default rootReducer