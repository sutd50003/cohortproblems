// update the ol with id  = "staffsregion" in the curent page
// input: json contains a list of staffs 
// output : none
function update_staffsregion(json) {
    var html = "";
    for (let i = 0; i < json.length; i++) {
        const staff = json[i];
        html += `<li><div>${staff.name}</div><div>${staff.code}</div></li>`;  
    }
    var region = document.getElementById("staffsregion");
    region.innerHTML = html;
}

// update the select with id = "code" in the current page
// input: json contains a list of codes
// output: none
function update_code_dddl(json) {
    var html = "";
    for (let i = 0; i < json.length; i++) {
        const dept = json[i];
        html += `<option value="${dept.code}">${dept.code}</option>`;  
    }
    var select = document.getElementById("code");
    select.innerHTML = html;
}

// Task 2 TODO:
// handle the click event of the "SendButton"
// invoke /staff/submit/ end-point to create the staff
// render the API result (all staff) in the staffsregion div
function handleSendButtonClick() {
    var name = document.getElementById("name");
    var code  = document.getElementById("code");
    var xhr = new XMLHttpRequest();
    // TODO: fixme
}

/**
 * populate the code drop down list by making an AJAX call
 */
function populate_code_dropdown() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var res = xhr.responseText;
            var json = JSON.parse(res);
            update_code_dddl(json);
        }
    }
    xhr.open('GET', `/dept/all/`);
    xhr.send();
}

// set up the event listener for the send button
// call /echo/all to get the current list of staffs
function run() {
    populate_code_dropdown();
    var sendButton = document.getElementById("sendButton");
    sendButton.addEventListener("click", handleSendButtonClick);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var res = xhr.responseText;
            var json = JSON.parse(res);
            update_staffsregion(json);
        }
    }
    xhr.open('GET', `/staff/all`);
    xhr.send();
}

document.addEventListener( "DOMContentLoaded", run);
