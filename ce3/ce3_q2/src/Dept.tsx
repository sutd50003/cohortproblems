import { useState, useEffect } from "react";

interface Dept {
    code: string;
}

interface NewDeptBarProps {
    code: string;
    onCodeChange: (code: string) => void;
    onSubmitClick: () => void;
}

interface DeptListProps {
    depts: Dept[];
}


function NewDeptBar({code, onCodeChange, onSubmitClick}: NewDeptBarProps) {
    return (
        <div>
            <input type="text" placeholder="department code" 
                value={code} 
                onChange={(e) => {onCodeChange(e.target.value)}}>
            </input>
            <button onClick={onSubmitClick}> Submit </button>
        </div>
    )
}


function DeptList({depts}: DeptListProps) {
    let rows = [];
    for (let i in depts) {
        rows.push(
            <tr key={depts[i].code}><td>{depts[i].code}</td></tr>
        );
    }
    return (        
        <div></div> // TODO: fixme
    )
}

function Dept() {
    const [code, setCode] = useState<string>('');

    function handleSubmitClick() {
        submitNewDept();
    }
    const [depts, setDepts] = useState<Dept[]>([]);
    
    async function submitNewDept() {
        const response = await fetch(`http://localhost:3000/dept/submit`,
        {
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