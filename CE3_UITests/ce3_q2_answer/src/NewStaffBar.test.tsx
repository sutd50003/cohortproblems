import { render, screen } from '@testing-library/react';
import NewStaffBar from './NewStaffBar';
import { Dept } from './types';

describe( "testing New Staff Bar component", () => {
    test('Submit Button is rendered in NewMessageBar', () => {
        const nameTxt = "dileepa";
        const codeTxt = "HR";
        const dept: Dept = { code : codeTxt };
        const depts: Dept[] = [dept];
        const setCode = () => {};
        const setName = () => {};
        const handleSubmitClick = () => {};

        render(<NewStaffBar name={nameTxt} code={codeTxt} depts={depts} onCodeChange={setCode} onNameChange={setName} onSubmitClick={handleSubmitClick} />
        );
        const button = screen.getByText(/submit/i);
        expect(button).toBeInTheDocument();
    });

    test('Textbox is rendered in NewStaffBar', () => {
        const nameTxt = "dileepa";
        const codeTxt = "HR";
        const dept: Dept = { code : codeTxt };
        const depts: Dept[] = [dept];

        const setCode = () => {};
        const setName = () => {};
        const handleSubmitClick = () => {};

        render(<NewStaffBar name={nameTxt} code={codeTxt} depts={depts} onCodeChange={setCode} onNameChange={setName} onSubmitClick={handleSubmitClick} />
        );

        const textbox = screen.getByLabelText("staff_name") as HTMLInputElement;
        expect(textbox.value).toBe('dileepa');
    });

    test('Dropdown is rendered in NewStaffBar', () => {
        const nameTxt = "dileepa";
        const codeTxt = "HR";
        const dept: Dept = { code : codeTxt };
        const depts: Dept[] = [dept];

        const setCode = () => {};
        const setName = () => {};
        const handleSubmitClick = () => {};

        render(<NewStaffBar name={nameTxt} code={codeTxt} depts={depts} onCodeChange={setCode} onNameChange={setName} onSubmitClick={handleSubmitClick} />
        );

        const dropdownmenu = screen.getByTestId("dept_select");
        const HROption = screen.getByTestId("HR")
        expect(dropdownmenu).toBeInTheDocument();
        expect(HROption).toBeInTheDocument()
        expect(dropdownmenu.contains(HROption))
    });
});
