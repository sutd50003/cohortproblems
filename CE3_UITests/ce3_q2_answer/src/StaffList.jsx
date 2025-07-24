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

/**
 * Componenet for the staff lists
 * render the list of staffs (from the state) into a table
 * @param {props} param0 
 *   - staffs (a list of all staffs state)
 * @returns 
 */
function StaffList({staffs}) {
    let rows = [];
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