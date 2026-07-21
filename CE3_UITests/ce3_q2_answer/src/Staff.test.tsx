import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import Staff from './Staff';

const server = setupServer(
    http.get('/staff/all', () => {
      return HttpResponse.json(
        [{id:'1',name:'dileepa', code: 'HR'}])
    }),
http.post('/staff/submit', () => {
    return HttpResponse.json(
      [{id:'1',name:'dileepa', code: 'HR'},{id:'2',name:'kenny',code: 'HR'}])
  }), 
      http.get('/dept/all', () => {
        return HttpResponse.json(
          [{code:'HR'}])
      })
    )

describe("testing Staff component", () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('testing initStaffs() in Staff', async () => {
        render(<Staff http_addr='' />);
        const table = await screen.findByTestId("staff-list");
        const row = await screen.findByTestId("1");
        expect(table).toBeInTheDocument();
        expect(row).toBeInTheDocument();
        expect(table.contains(row));
    });
    
   test('testing submitStaff() in Staff', async () => {
        const newStaff = "kenny";
        render(<Staff http_addr='' />);

        const textbox = await screen.findByLabelText('staff_name') as HTMLInputElement;
        const submitButton = await screen.findByText(/submit/i);
        fireEvent.change(textbox, {target: {value: newStaff}});
        expect(textbox.value).toBe(newStaff);

        const dropdownmenu = await screen.findByTestId("dept_select");
        await screen.findByTestId("HR");
        fireEvent.change(dropdownmenu, {target: {value: "HR"}});
        
        userEvent.click(submitButton);

        const newStaffId = '2';
        const table = await screen.findByTestId("staff-list");
        const row = await screen.findByTestId(newStaffId);

        expect(table).toBeInTheDocument();
        expect(row).toBeInTheDocument();
        expect(table.contains(row));
    })
})
