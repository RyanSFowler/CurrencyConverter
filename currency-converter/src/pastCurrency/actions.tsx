export const pastCurrencyFetchStart = (date: string) => {
    return {
        type: "PAST_CURRENCY_FETCH_START",
        payload: date
    }
}

export const pastCurrencyFetchSuccess = (dateObject: object) => {
    
    return {
        type: "PAST_CURRENCY_FETCH_SUCCEEDED",
        payload: dateObject
    }
}

export const pastCurrencyFetchFailed = (error: string, date: string) => {
    const dateObject = {
        date,
        error
    }
    return {
        type: "PAST_CURRENCY_FETCH_FAILED",
        payload: dateObject
    }
}
const pastCurrencyActions = {
    pastCurrencyFetchStart,
    pastCurrencyFetchSuccess,
    pastCurrencyFetchFailed,
}

export default pastCurrencyActions