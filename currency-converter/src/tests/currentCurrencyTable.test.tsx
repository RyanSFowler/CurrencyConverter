import { render, screen } from '@testing-library/react';
import CurrentCurrencyTable from '../currentCurrency/CurrentCurrencyTable';
import * as redux from "react-redux";
import { mockCurrencyData } from './testData';


jest.mock('../currentCurrency/api', () => ({ fetchCurrentCurrency: () => Promise.resolve() }));
jest.mock('../pastCurrency/pastCurrencyTable', () => ({ PastCurrencyTable: () => 'mocked pastCurrencyTable' }));

jest.mock('react-redux', () => {
    const ActualReactRedux = jest.requireActual('react-redux');
    return {
        ...ActualReactRedux,
    };
});

describe('renders current', () => {
    const useSelectorSpy = jest.spyOn(redux, 'useSelector'); 
    beforeEach(()=>{
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch'); 
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);
    });

    it('renders table',()=>{
        useSelectorSpy.mockReturnValue([]);
        render(<CurrentCurrencyTable />)
        const tableElement = screen.getByTestId('current-currency-table');
        expect(tableElement).toBeInTheDocument();
    });

    it('has at most 24 rows',()=>{
        useSelectorSpy.mockReturnValue(mockCurrencyData);
        render(<CurrentCurrencyTable />)
        const tableRows = screen.getAllByTestId('current-currency-row');
        expect(tableRows.length).toBe(24);
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
        render(<CurrentCurrencyTable />)
        const tableRows = screen.getAllByTestId('current-currency-row');
        expect(tableRows.length).toBe(1);
    });

    it('handles error state in row',()=>{
        useSelectorSpy.mockReturnValue([{
            date: '1',
            error: 'Error'
        }]);
        render(<CurrentCurrencyTable />)
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
        render(<CurrentCurrencyTable />)
        const dateTableCell = screen.getByTestId('date-cell');
        const usdTableCell = screen.getByTestId('usd-cell');
        const brlTableCell = screen.getByTestId('brl-cell');
        expect(dateTableCell).toBeInTheDocument();
        expect(brlTableCell).toBeInTheDocument();
        expect(usdTableCell).toBeInTheDocument();
    });
});
