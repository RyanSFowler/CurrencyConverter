import { AnyAction } from 'redux';
import { CurrencyTableStore } from '../globalTypes'


const initialState: CurrencyTableStore = {
    loading: {},
    currencyRows: []
}


export default function pastCurrencyReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
      case 'PAST_CURRENCY_FETCH_START': {
        const date = action.payload;
        return {
          ...state,
          loading : {...state.loading,[date]: 'started'}
        }
      }
      case 'PAST_CURRENCY_FETCH_SUCCEEDED': {
        const dateObject = action.payload;
        return {
          ...state,
          currencyRows: [...state.currencyRows, dateObject],
          loading : {...state.loading,[dateObject.date]: 'succeeded'}
        };
      }
      case 'PAST_CURRENCY_FETCH_FAILED':{
        const dateObject = action.payload;
        return {
          ...state,
          currencyRows: [...state.currencyRows, dateObject],
          loading : {...state.loading,[dateObject.date]: 'failed'}
        };
      }
      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }