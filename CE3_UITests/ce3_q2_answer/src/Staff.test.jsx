import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';//mock user events
// to address the CRA project missing TextEncoder for msw
// requires `npm i msw undici`
// https://github.com/mswjs/msw/issues/1796#issuecomment-1839196018
// import './jest.polyfills'
import {http, HttpResponse} from 'msw';//mock the backend 
import {setupServer} from 'msw/node';//mock the backend
import Staff from './Staff';

const server = setupServer( //mock the backend
    http.get('/staff/all', () => {
      return HttpResponse.json(
        [{id:'1',name:'dileepa', code: 'HR'}])//mocked staff entry
    }),
http.post('/staff/submit', () => {
    return HttpResponse.json(
      [{id:'1',name:'dileepa', code: 'HR'},{id:'2',name:'kenny',code: 'HR'}])//mocked staff entry
  }), 
      http.get('/dept/all', () => {
        return HttpResponse.json(
          [{code:'HR'}])//mocked init dept list
      })
    )

describe("testing Staff component", () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())
    // some tests here 
    test('testing initStaffs() in Staff', async () => {
        render(<Staff http_addr='' />);//define the http_addr
        //simple test, no user interaction
        const table = await screen.findByTestId("staff-list");
        const row = await screen.findByTestId("1");
        expect(table).toBeInTheDocument(); // the table must be rendered in testDOM
        expect(row).toBeInTheDocument(); // the row must be rendered in testDOM
        expect(table.contains(row));//row should be inside table in testDOM
    });
    
   test('testing submitStaff() in Staff', async () => {
        const newStaff = "kenny";
        render(<Staff http_addr='' />);

        const textbox = await screen.findByLabelText('staff_name');
        const submitButton = await screen.findByText(/submit/i);
        fireEvent.change(textbox, {target: {value: newStaff}});//simulate user typing text
        expect(textbox.value).toBe(newStaff);//test whether the typed test is populated


        const dropdownmenu = await screen.findByTestId("dept_select");
        const HROption = await screen.findByTestId("HR");
        fireEvent.change(dropdownmenu, {target: {value: "HR"}});//simulate dropdown selection
        //userEvent.selectOptions(dropdownmenu,"HR");
        
        userEvent.click(submitButton);// simulate submit click

        const newStaffId = '2';
        const table = await screen.findByTestId("staff-list");
        const row = await screen.findByTestId(newStaffId);

        expect(table).toBeInTheDocument(); // the table must be rendered.
        expect(row).toBeInTheDocument(); // the row must be rendered.
        expect(table.contains(row));
    })
})


