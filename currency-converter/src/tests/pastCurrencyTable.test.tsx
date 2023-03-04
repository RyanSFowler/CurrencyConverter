import { render, screen } from '@testing-library/react';
import PastCurrencyTable from '../pastCurrency/PastCurrencyTable';
import * as redux from "react-redux";
import { mockCurrencyData } from './testData';


jest.mock('../pastCurrency/api', () => ({ fetchPastCurrency: () => Promise.resolve() }));
jest.mock('../currentCurrency/currentCurrencyTable', () => ({ CurrentCurrencyTable: () => 'mocked currentCurrencyTable' }));

jest.mock('react-redux', () => {
    const ActualReactRedux = jest.requireActual('react-redux');
    return {
        ...ActualReactRedux,
    };
});

describe('renders past', () => {
    const useSelectorSpy = jest.spyOn(redux, 'useSelector'); 
    beforeEach(()=>{
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch'); 
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);
    });

    it('renders table',()=>{
        useSelectorSpy.mockReturnValue([]);
        render(<PastCurrencyTable />)
        const tableElement = screen.getByTestId('past-currency-table');
        expect(tableElement).toBeInTheDocument();
    });

    it('has as many rows as present in past dates object (25)',()=>{
        useSelectorSpy.mockReturnValue(mockCurrencyData);
        render(<PastCurrencyTable />)
        const tableRows = screen.getAllByTestId('past-currency-row');
        expect(tableRows.length).toBe(25);
    });

    it('has 1 row when only one date in data',()=>{
        useSelectorSpy.mockReturnValue([{
            amount: 1,
            rates:{
                BRL:{
                    rate_for_amount: 2
                }
            },
            date: '1'
        }]);
        render(<PastCurrencyTable />)
        const tableRows = screen.getAllByTestId('past-currency-row');
        expect(tableRows.length).toBe(1);
    });

    it('handles error state in row',()=>{
        useSelectorSpy.mockReturnValue([{
            date: '1',
            error: 'Error'
        }]);
        render(<PastCurrencyTable />)
        const errorTableCell = screen.getByTestId('error-cell');
        expect(errorTableCell).toBeInTheDocument();
    });

    it('validates each cell exsist when no error',()=>{
        useSelectorSpy.mockReturnValue([{
            amount: 1,
            rates:{
                BRL:{
                    rate_for_amount: 2
                }
            },
            date: 'date-1',
            error: undefined
        }]);
        render(<PastCurrencyTable />)
        const dateTableCell = screen.getByTestId('date-cell');
        const usdTableCell = screen.getByTestId('usd-cell');
        const brlTableCell = screen.getByTestId('brl-cell');
        expect(dateTableCell).toBeInTheDocument();
        expect(brlTableCell).toBeInTheDocument();
        expect(usdTableCell).toBeInTheDocument();
    });
});
