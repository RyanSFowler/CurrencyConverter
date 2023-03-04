import axios, { AxiosResponse } from 'axios';

const fetchCurrentCurrency = async () => {
    const options = {
        method: 'GET',
        url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
        params: {format: 'json', from: 'USD', to: 'BRL', amount: '1'},
        headers: {
            'X-RapidAPI-Key': '2ff976640dmsh8cfd198bef105dap1af17bjsna298b838e23a',
            'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
        }
    };

    return axios.request(options).then((response: AxiosResponse) => {
        return response.data;
    }).catch((error: Error) => {
        console.error(error);
        throw error;
    });
}

export default fetchCurrentCurrency