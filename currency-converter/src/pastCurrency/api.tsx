import axios, { AxiosResponse } from 'axios';

const fetchPastCurrency = async (date: string) => {
    const options = {
        method: 'GET',
        url: 'https://currency-converter5.p.rapidapi.com/currency/historical/'+ date,
        params: {from: 'USD', amount: '1', format: 'json', to: 'BRL'},
        headers: {
            'X-RapidAPI-Key': '2ff976640dmsh8cfd198bef105dap1af17bjsna298b838e23a',
            'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
        }
    };

    return await axios.request(options).then((response: AxiosResponse) => {
       return response.data;
    }).catch((error: Error) => {
        console.error('BAD FETCH',error);
        throw error;
    });
}

export default fetchPastCurrency
