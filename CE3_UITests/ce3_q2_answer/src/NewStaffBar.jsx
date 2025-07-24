import { useState, Component, useEffect } from "react";
import React from "react";

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
function NewStaffBar({name, code, depts, onNameChange, onCodeChange, onSubmitClick}) {
    let rows = [];
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
                onChange={(e) => {onNameChange(e.target.value)}}>
            </input>
            
            <select data-testid="dept_select" onChange={(e) => {onCodeChange(e.target.value)}}>
                {rows}
            </select>
            <button onClick={onSubmitClick}> Submit </button>
        </div>
    )
}

/**
 * Componenet for the staff lists
 * render the list of staffs (from the state) into a table
 * @param {props} param0 
 *   - staffs (a list of all staffs state)
 * @returns 
 */




export default NewStaffBar;