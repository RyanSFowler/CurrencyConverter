export type CurrencyTableRow = {
    USD ?: number,
    BRL ?: number,
    date: string, // date for past, dateTime for current
    error?: string
  }

export type loadingState =  {[key: string]: string}

export type CurrencyTableStore = {
    loading: loadingState,
    currencyRows: CurrencyTableRow[]
}