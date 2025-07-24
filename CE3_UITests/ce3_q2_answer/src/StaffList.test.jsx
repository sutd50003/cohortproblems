import { render, screen } from '@testing-library/react';
import StaffList from './StaffList';

// testing Message List component 

describe("testing StaffList", () => {
    // a functional test
    test('No message is rendered in empty StaffList', () => {
        const staffs = [];
        render(<StaffList 
                staffs={staffs} />);
        const table = screen.getByTestId("staff-list");
        expect(table).toBeInTheDocument(); // the table must be rendered.
        expect(table.firstElementChild.children.length == 1); // only contains the header row.
    });

    // a functional test
    test('A message is rendered in a singleton StaffList', () => {
        const staffname = "dileepa";
        const deptcode = "HR"
        const staffid = "1"
        const staff = { id : staffid, name: staffname, code: deptcode};
        const staffs = [staff];
        render(<StaffList 
                staffs={staffs} />);
        const table = screen.getByTestId("staff-list");
        const row = screen.getByTestId(staffid);
        expect(table).toBeInTheDocument(); // the table must be rendered in testDOM
        expect(row).toBeInTheDocument(); // the row must be rendered in testDOM
        expect(table.contains(row));//row should be inside table in testDOM
    });
});

