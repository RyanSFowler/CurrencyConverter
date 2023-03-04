export const currentCurrencyFetchStart = () => {
    return {
        type: "CURRENT_CURRENCY_FETCH_START"
    }
}

export const currentCurrencyFetchSuccess = (dateObject: object) => {
    return {
        type: "CURRENT_CURRENCY_FETCH_SUCCEEDED",
        payload: dateObject
    }
}

export const currentCurrencyFetchFailed = (error: object) => {
    return {
        type: "CURRENT_CURRENCY_FETCH_FAILED",
        payload: error
    }
}
const currentCurrencyActions = {
    currentCurrencyFetchStart,
    currentCurrencyFetchSuccess,
    currentCurrencyFetchFailed,
}

export default currentCurrencyActions;