import { useState, useEffect } from "react";

interface Staff {
    id: number;
    name: string;
    code: string;
}

interface Dept {
    code: string;
}

interface NewStaffBarProps {
    name: string;
    code: string;
    depts: Dept[];
    onNameChange: (name: string) => void;
    onCodeChange: (code: string) => void;
    onSubmitClick: () => void;
}

interface StaffListProps {
    staffs: Staff[];
}

function NewStaffBar({name, code, depts, onNameChange, onCodeChange, onSubmitClick}: NewStaffBarProps) {
    let rows = [];
    for (let i in depts) {
        if (depts[i].code === code) {
            rows.push(<option value={depts[i].code} key={depts[i].code} selected>{depts[i].code}</option>);
        } else {
            rows.push(<option value={depts[i].code} key={depts[i].code} >{depts[i].code}</option>);
        }
    }
    return (
        <div>
            <input type="text" placeholder="name" 
                value={name} 
                onChange={(e) => {onNameChange(e.target.value)}}>
            </input>
            <select onChange={(e) => {onCodeChange(e.target.value)}}>
                {rows}
            </select>
            <button onClick={onSubmitClick}> Submit </button>
        </div>
    )
}

function StaffList({staffs}: StaffListProps) {
    let rows = [];
    for (let i in staffs) {
        rows.push(
            <tr key={staffs[i].id} ><td>{staffs[i].name}</td><td>{staffs[i].code}</td></tr>
        );
    }
    return (
        <table>
            <tbody>
                <tr><th>Staff Name</th><th>Department</th></tr>
                {rows}
            </tbody>
        </table>
    )
}


function Staff() {
    const [name, setName] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [depts, setDepts] = useState<Dept[]>([]);
    function handleSubmitClick() {
        submitNewStaff();
    }

    async function submitNewStaff() {
        const response = await fetch(`http://localhost:3000/staff/submit`,
        {
            method: 'POST',
            body: `name=${name}&code=${code}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }              
        });
        const text = await response.text();
        const json = JSON.parse(text) as Staff[];
        setStaffs(json);
    }
    async function initStaffs() {
        const response = await fetch(`http://localhost:3000/staff/all`);
        const text = await response.text();
        const json = JSON.parse(text) as Staff[];
        setStaffs(json);
        // init code to be the first of the depts if it is empty.
        if (code === '' && json.length > 0) {
            setCode(json[0].code);
        }        
    }

    async function initDepts() {
        const response = await fetch(`http://localhost:3000/dept/all`);
        const text = await response.text();
        const json = JSON.parse(text) as Dept[];
        setDepts(json);
    }


    useEffect( () => {
        // TODO: fixme:
    }, []);

    return (
        <div>
            <NewStaffBar name={name} code={code} depts={depts} onCodeChange={setCode} onNameChange={setName} onSubmitClick={handleSubmitClick} />
            <StaffList staffs={staffs} />
        </div>
    );
}


export default Staff;