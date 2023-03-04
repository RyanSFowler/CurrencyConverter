import { AnyAction } from 'redux';
import { CurrencyTableStore } from '../globalTypes'

const initialState: CurrencyTableStore = {
    loading: {},
    currencyRows: []
}

export default function currentCurrencyReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
      case 'CURRENT_CURRENCY_FETCH_START': {
        return {
          ...state,
          loading : {currentFetch: 'started'}
        }
      }
      case 'CURRENT_CURRENCY_FETCH_SUCCEEDED': {
        const dateObject = action.payload;
        return {
          ...state,
          currencyRows: [dateObject, ...state.currencyRows],
          loading : {...state.loading, currentFetch: 'succeeded'}
        };
      }
      case 'CURRENT_CURRENCY_FETCH_FAILED':{
        const dateObject = action.payload;
        return {
          ...state,
          currencyRows: [dateObject, ...state.currencyRows],
          loading : {...state.loading, currentFetch: 'failed'}
        };
      }
      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }