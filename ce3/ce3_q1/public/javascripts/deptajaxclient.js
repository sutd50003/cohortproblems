// update the ol with id  = "staffsregion" in the curent page
// input: json contains list of staffs 
// output : none
function update_deptsregion(json) {
    var html = "";
    for (let i = 0; i < json.length; i++) {
        const dept = json[i];
        html += `<li><div>${dept.code}</div></li>`;  
    }
    var region = document.getElementById("deptsregion");
    region.innerHTML = html;
}


// handle the click event of the "SendButton"
// invoke /dept/submit/ end-point to create the dept
// Task 1 TODO:
// render the API result (all staff) in the deptsregion div
function handleSendButtonClick() {
    var code  = document.getElementById("code");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var res = xhr.responseText;
            var json = JSON.parse(res);
            // TODO: fixme
        }
    }; 
    // cosntructing a HTTP POST request
    var params = `code=${code.value}`;
    xhr.open('POST', `/dept/submit/`, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

// set up the event listener for the send button
// call /dept/all to get the current list of depts
function run() {
    var sendButton = document.getElementById("sendButton");
    sendButton.addEventListener("click", handleSendButtonClick);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var res = xhr.responseText;
            var json = JSON.parse(res);
            update_deptsregion(json);
        }
    }

    xhr.open('GET', `/dept/all`);
    xhr.send();
}

document.addEventListener( "DOMContentLoaded", run);
