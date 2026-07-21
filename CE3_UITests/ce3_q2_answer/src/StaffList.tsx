import type { StaffListProps } from "./types";

function StaffList({staffs}: StaffListProps) {
    let rows: React.JSX.Element[] = [];
    for (let i in staffs) {
        rows.push(
            <tr key={staffs[i].id} data-testid={staffs[i].id} ><td>{staffs[i].name}</td><td>{staffs[i].code}</td></tr>
        );
    }
    return (
        <table data-testid="staff-list">
            <tbody>
                <tr><th>Staff Name</th><th>Department</th></tr>
                {rows}
            </tbody>
        </table>
    )
}

export default StaffList;
