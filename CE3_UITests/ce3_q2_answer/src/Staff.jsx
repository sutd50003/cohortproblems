import { useState, Component, useEffect } from "react";
import React from "react";
import NewStaffBar from "./NewStaffBar";
import StaffList from "./StaffList";

/**
 * Component for the Staff input bar
 * the component consists of 
 *   -  a text box (name of the staff)
 *   -  a dropdown (dept code of the staff)  
 *   -  a submit button
 * @param {props} param0 
 *    - name (state name)
 *    - code (state dept code)
 *    - depts (state the list of all depts)
 *    - onNameChange (state name update)
 *    - onCodeChange (state dept code update)
 *    - onSubmitClick (submitButton click event handler) 
 * @returns 
 */
/**
 * Componenet for the staff lists
 * render the list of staffs (from the state) into a table
 * @param {props} param0 
 *   - staffs (a list of all staffs state)
 * @returns 
 */



function Staff({http_addr}) {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [staffs, setStaffs] = useState([]);
    const [depts, setDepts] = useState([]);
    function handleSubmitClick() {
        submitNewStaff();
    }

    /**
     * triggered when the submit button is clicked.
     * submit a new staff by calling the API
     * then set the staffs state, which will 
     * render the staff table
     */
    async function submitNewStaff() {
        const response = await fetch(`${http_addr}/staff/submit`,
        {
            method: 'POST',
            body: `name=${name}&code=${code}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }              
        });
        const text = await response.text();
        const json = JSON.parse(text);
        setStaffs(json);
    }

    /**
     * triggered when the component did mount.
     * submit to API to query all the staffs
     * then set the staffs state, which will 
     * render the staff table
     */
    async function initStaffs() {
        const response = await fetch(`${http_addr}/staff/all`);
        const text = await response.text();
        const json = JSON.parse(text);
        setStaffs(json);
    }

    /**
     * triggered when the component did mount.
     * submit to API to query all the depts
     * then set the depts state, which will
     * render the dropdown list of dept codes.
     */
    async function initDepts() {
        const response = await fetch(`${http_addr}/dept/all`);
        const text = await response.text();
        const json = JSON.parse(text);
        setDepts(json);
        // init code to be the first of the depts if it is empty.
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