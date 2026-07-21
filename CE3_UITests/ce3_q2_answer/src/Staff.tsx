import { useState, useEffect } from "react";
import NewStaffBar from "./NewStaffBar";
import StaffList from "./StaffList";
import type { Staff, Dept, StaffProps } from "./types";

function Staff({http_addr}: StaffProps) {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [depts, setDepts] = useState<Dept[]>([]);

    function handleSubmitClick() {
        submitNewStaff();
    }

    async function submitNewStaff() {
        const response = await fetch(`${http_addr}/staff/submit`, {
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
        const response = await fetch(`${http_addr}/staff/all`);
        const text = await response.text();
        const json = JSON.parse(text) as Staff[];
        setStaffs(json);
    }

    async function initDepts() {
        const response = await fetch(`${http_addr}/dept/all`);
        const text = await response.text();
        const json = JSON.parse(text) as Dept[];
        setDepts(json);
        if (code === '' && json.length > 0) {
            setCode(json[0].code);
        }
        console.log("after init department");
        console.log(code)
    }

    useEffect( () => {
        initStaffs();
    }, []);

    useEffect( () => {
        initDepts();
    }, []);

    return (
        <div>
            <NewStaffBar name={name} code={code} depts={depts} onCodeChange={setCode} onNameChange={setName} onSubmitClick={handleSubmitClick} />
            <StaffList staffs={staffs} />
        </div>
    );
}

export default Staff;
