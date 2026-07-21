import { useState, useEffect } from "react";
import type { Dept, NewDeptBarProps, DeptListProps } from "./types";

function NewDeptBar({code, onCodeChange, onSubmitClick}: NewDeptBarProps) {
    return (
        <div>
            <input type="text" placeholder="department code" 
                value={code} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onCodeChange(e.target.value)}}
            />
            <button onClick={onSubmitClick}> Submit </button>
        </div>
    )
}

function DeptList({depts}: DeptListProps) {
    let rows: React.JSX.Element[] = [];
    for (let i in depts) {
        rows.push(
            <tr><td>{depts[i].code}</td></tr>
        );
    }
    return (
        <table>
            <tbody>
                <tr><th>Department Code</th></tr>
                {rows}
            </tbody>
        </table>
    )
}

function Dept() {
    const [code, setCode] = useState('');

    function handleSubmitClick() {
        submitNewDept();
    }
    const [depts, setDepts] = useState<Dept[]>([]);
    
    async function submitNewDept() {
        const response = await fetch(`http://localhost:3000/dept/submit`, {
            method: 'POST',
            body: `code=${code}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }              
        });
        const text = await response.text();
        const json = JSON.parse(text) as Dept[];
        setDepts(json);
    }

    async function initDepts() {
        const response = await fetch(`http://localhost:3000/dept/all`);
        const text = await response.text();
        const json = JSON.parse(text) as Dept[];
        setDepts(json);
    }

    useEffect( () => {
        initDepts()
    }, []);

    return (
        <div> 
            <NewDeptBar code={code} onCodeChange={setCode} onSubmitClick={handleSubmitClick}/>
            <DeptList depts={depts} /> 
        </div>
    );
}

export default Dept;
