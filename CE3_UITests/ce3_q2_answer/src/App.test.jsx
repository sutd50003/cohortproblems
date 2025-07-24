import { fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';//mock user events
import App from './App';

describe("An end-to-end testing for App", () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  test('End-to-end testing on App', async () => {
    const msgTxt = "dileepa";
    render(<App />);
    const textbox = await screen.findByLabelText('staff_name');
    const submitButton = await screen.findByText(/submit/i);

    fireEvent.change(textbox, {target: {value: msgTxt}}); //simulate user typing in message bar
    expect(textbox.value).toBe(msgTxt); // Test: whether the user entered value is present in text box
    const _     = await userEvent.click(submitButton);//simulate user click submit,post method of server is called, server is updated
    const table = await screen.findByTestId("staff-list"); 
    fireEvent.change(textbox, {target: {value: ''}}); //simulate message bar being empty
    const text = await screen.findByText(msgTxt); //retrieve the row in the table with msgTxt, row must have the new msg
    expect(table).toBeInTheDocument(); // the table must be rendered.
    expect(text).toBeInTheDocument(); // the row must be rendered.
    expect(table.contains(text)); //row is loaded
  })  
});
