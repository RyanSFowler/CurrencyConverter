import './App.css';
import {CurrentCurrencyTable} from './currentCurrency/CurrentCurrencyTable';
import {PastCurrencyTable} from './pastCurrency/PastCurrencyTable';

function App() {
  return (
    <div>
      <h1 className='App-header'>Ryan Fowler's Currency App</h1>
      <table className='App-table'>
        <thead>
          <tr>
            <th className='right-column'> 
              <h3> Past Dates (throttled for API performance) </h3>
            </th>
            <th> 
              <h3> Current Currency (pulled hourly) </h3> 
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='right-column'>
              <PastCurrencyTable/>
            </td>
            <td>
              <CurrentCurrencyTable/>
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
}

export default App;
