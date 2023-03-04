import './PastCurrencyTable.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pastCurrencyFetchFailed, pastCurrencyFetchStart, pastCurrencyFetchSuccess } from "./actions";
import fetchPastCurrency from "./api";
import { RootState } from "../store";
import { CurrencyTableRow } from '../globalTypes';

const getFormattedDate = (date: Date) => {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day ;
}

const getFormattedDatesArray = (numberOfDays: number) =>{
    const dateArray = [];
    for(let daysFromToday=0; daysFromToday<numberOfDays; daysFromToday++){
        let d = new Date();
        d.setDate(d.getDate()-daysFromToday);
        dateArray.push(getFormattedDate(d));
    }
    return dateArray;
}

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function PastCurrencyTable() {
    const numberOfDays = 24; // set number of days to pull back from api
    const dispatch = useDispatch();
    const pastDateData: CurrencyTableRow[] = useSelector((state: RootState) => state.pastCurrency.currencyRows)
    const formatedDatesArray: string[] = getFormattedDatesArray(numberOfDays);

    useEffect(() => {
        (async () => {
            for( const key in formatedDatesArray){
                const date = formatedDatesArray[key];
                dispatch(pastCurrencyFetchStart(date));
                await timeout(1500); // overloading API when not used
                try {
                   const curObj = await fetchPastCurrency(date);
                    const dateObject = {
                        USD : curObj.amount,
                        BRL : curObj.rates.BRL.rate_for_amount,
                        date: curObj.updated_date
                    }
                    dispatch(pastCurrencyFetchSuccess(dateObject));
                } catch (error) {
                    let message
                    if (error instanceof Error) message = error.message
                    else message = String(error)
                    dispatch(pastCurrencyFetchFailed(message, date));
                }
            }
        })()
    },[])

    const currencyCells = (currencyObj : CurrencyTableRow) => {
        if(currencyObj.error !== undefined){
            //Error state when you don't throttled enough between api calls
            return (
            <><td className='bordered error' data-testid="error-cell">Error in fetch</td><td className='bordered error'>Error in fetch</td></>
            )
        }
        return (
            <><td className='bordered' data-testid="usd-cell">{currencyObj.USD}</td><td className='bordered' data-testid="brl-cell">{currencyObj.BRL}</td></>
        )
    }


  return (<div>
    <table className="table" data-testid="past-currency-table">
        <thead >
            <tr className="table-header">
                <th className='bordered'>Date</th>
                <th className='bordered'>USD</th>
                <th className='bordered'>BRL</th>
            </tr>
        </thead>
        <tbody>
            {pastDateData.map((currencyObj: CurrencyTableRow) => (
                <tr className='table-body' data-testid='past-currency-row' key={currencyObj.date}>
                    <td className='bordered' data-testid="date-cell">{currencyObj.date}</td>
                    {currencyCells(currencyObj)}
                </tr>
            ))}
            
        </tbody>
    </table>
    </div>
  );
}

export default PastCurrencyTable;

