import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe("An end-to-end testing for App", () => {
  test('End-to-end testing on App', async () => {
    const msgTxt = "dileepa";
    render(<App />);
    const textbox = await screen.findByLabelText('staff_name') as HTMLInputElement;
    const submitButton = await screen.findByText(/submit/i);

    fireEvent.change(textbox, {target: {value: msgTxt}});
    expect(textbox.value).toBe(msgTxt);
    await userEvent.click(submitButton);
    const table = await screen.findByTestId("staff-list"); 
    fireEvent.change(textbox, {target: {value: ''}});
    const text = await screen.findByText(msgTxt);
    expect(table).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(table.contains(text));
  })  
});
