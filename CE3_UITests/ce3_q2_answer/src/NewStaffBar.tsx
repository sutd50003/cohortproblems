import { NewStaffBarProps } from "./types";

function NewStaffBar({name, code, depts, onNameChange, onCodeChange, onSubmitClick}: NewStaffBarProps) {
    let rows: React.JSX.Element[] = [];
    for (let i in depts) {
        if (depts[i].code === code) {
            console.log("equal code")
            rows.push(<option data-testid={depts[i].code} value={depts[i].code} key={depts[i].code} selected>{depts[i].code}</option>);
        } else {
            rows.push(<option data-testid={depts[i].code} value={depts[i].code} key={depts[i].code} >{depts[i].code}</option>);
            console.log("Not equal code")
        }
    }
    console.log(rows);
    console.log("rows");
    return (
        <div>
            <input type="text" placeholder="name" aria-label="staff_name"
                value={name} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onNameChange(e.target.value)}}
            />
            
            <select data-testid="dept_select" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {onCodeChange(e.target.value)}}>
                {rows}
            </select>
            <button onClick={onSubmitClick}> Submit </button>
        </div>
    )
}

export default NewStaffBar;
