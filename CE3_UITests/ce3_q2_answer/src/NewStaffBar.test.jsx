import { render, screen } from '@testing-library/react';
import NewStaffBar from './NewStaffBar';

describe( "testing New Staff Bar component", () => {
    // a visual test
    test('Submit Button is rendered in NewMessageBar', () => {
        const nameTxt = "dileepa";
        const codeTxt = "HR";
        const dept = { code : codeTxt };
        const depts = [dept];
        //initialize props for the component (Test driver)
        const setCode = () => {};
        const setName = () => {};
        const handleSubmitClick = () => {};

        render(<NewStaffBar name={nameTxt} code={codeTxt} depts={depts} onCodeChange={setCode} onNameChange={setName} onSubmitClick={handleSubmitClick} />
        );//populate testDOM
        const button = screen.getByText(/submit/i);//retrieve the the element to test
        expect(button).toBeInTheDocument(); // test for expected output
    });

    // a visual test
    test('Textbox is rendered in NewStaffBar', () => {
        const nameTxt = "dileepa";
        const codeTxt = "HR";
        const dept = { code : codeTxt };
        const depts = [dept];

        const setCode = () => {};
        const setName = () => {};
        const handleSubmitClick = () => {};

        render(<NewStaffBar name={nameTxt} code={codeTxt} depts={depts} onCodeChange={setCode} onNameChange={setName} onSubmitClick={handleSubmitClick} />
        );//populate testDOM

        const textbox = screen.getByLabelText("staff_name");
        expect(textbox.value).toBe('dileepa');
    });

    test('Dropdown is rendered in NewStaffBar', () => {
        const nameTxt = "dileepa";
        const codeTxt = "HR";
        const dept = { code : codeTxt };
        const depts = [dept];

        const setCode = () => {};
        const setName = () => {};
        const handleSubmitClick = () => {};

        render(<NewStaffBar name={nameTxt} code={codeTxt} depts={depts} onCodeChange={setCode} onNameChange={setName} onSubmitClick={handleSubmitClick} />
        );//populate testDOM

        const dropdownmenu = screen.getByTestId("dept_select");
        const HROption = screen.getByTestId("HR")
        expect(dropdownmenu).toBeInTheDocument();
        expect(HROption).toBeInTheDocument()
        expect(dropdownmenu.contains(HROption))
    });
});
  