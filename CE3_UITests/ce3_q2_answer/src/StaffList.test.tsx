import { render, screen } from '@testing-library/react';
import StaffList from './StaffList';
import { Staff } from './types';

describe("testing StaffList", () => {
    test('No message is rendered in empty StaffList', () => {
        const staffs: Staff[] = [];
        render(<StaffList 
                staffs={staffs} />);
        const table = screen.getByTestId("staff-list");
        expect(table).toBeInTheDocument();
        expect(table.firstElementChild!.children.length == 1);
    });

    test('A message is rendered in a singleton StaffList', () => {
        const staffname = "dileepa";
        const deptcode = "HR"
        const staffid = "1"
        const staff: Staff = { id : staffid, name: staffname, code: deptcode};
        const staffs: Staff[] = [staff];
        render(<StaffList 
                staffs={staffs} />);
        const table = screen.getByTestId("staff-list");
        const row = screen.getByTestId(staffid);
        expect(table).toBeInTheDocument();
        expect(row).toBeInTheDocument();
        expect(table.contains(row));
    });
});
