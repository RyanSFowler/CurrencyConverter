import './CurrentCurrencyTable.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {currentCurrencyFetchStart,currentCurrencyFetchSuccess, currentCurrencyFetchFailed } from './actions';
import fetchCurrentCurrency from "./api"
import { RootState } from '../store';
import { CurrencyTableRow } from '../globalTypes';


export function CurrentCurrencyTable() {
    const dispatch = useDispatch();
    const currentDateData: CurrencyTableRow[] = useSelector((state: RootState) => state.currentCurrency.currencyRows)
    const rowLimit = 24;
    const filteredCurrentDateData = currentDateData.slice(0,rowLimit);
    
    const fetchCurrentCurrencyHelper = async () =>{
        const newDate = new Date();
        const dateString = newDate.toString();
        dispatch(currentCurrencyFetchStart());
        try {
            const curObj = await fetchCurrentCurrency();
            const dateObject: CurrencyTableRow = {
                USD : curObj.amount,
                BRL : curObj.rates.BRL.rate_for_amount,
                date: dateString,
                error: curObj.error
            }
            dispatch(currentCurrencyFetchSuccess(dateObject));
        } catch (error) {
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)
            const errorObject = {
                error: message,
                date: dateString
            }
            dispatch(currentCurrencyFetchFailed(errorObject));
        }
    }

    useEffect(() => {
        (async() => fetchCurrentCurrencyHelper())();
        setInterval(async () => {
           await fetchCurrentCurrencyHelper();
        }, 3600000) // 1 hour
    },[]);


    const currencyCells = (currencyObj : CurrencyTableRow) => {
        if(currencyObj.error !== undefined){
            return (
            <><td className='bordered error' data-testid="error-cell">Error in fetch</td><td className='bordered error'>Error in fetch</td></>
            )
        }
        return (
            <><td className='bordered' data-testid="usd-cell">{currencyObj.USD}</td><td className='bordered' data-testid="brl-cell">{currencyObj.BRL}</td></>
        )
    }


  return (<div>
    <table className="table" data-testid="current-currency-table">
        <thead >
            <tr className="table-header">
                <th className='bordered'>Date Time</th>
                <th className='bordered'>USD</th>
                <th className='bordered'>BRL</th>
            </tr>
        </thead>
        <tbody>
            {filteredCurrentDateData.map((currencyObj: CurrencyTableRow) => (
                <tr className='table-body' data-testid="current-currency-row" key={currencyObj.date}>
                    <td className='bordered' data-testid="date-cell">{currencyObj.date}</td>
                    {currencyCells(currencyObj)}
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  );
}

export default CurrentCurrencyTable;

