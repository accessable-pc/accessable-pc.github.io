var hashed_code = getCookie("code");
var bucket;
var pc_name;

$("#mpop").fadeOut(); 
$("#opop").fadeOut(); 

function assign_cred(){

    try{
        pc_name = getCookie("name");
        var bytes = CryptoJS.AES.decrypt(hashed_code.toString(), pc_name);
        bucket = bytes.toString(CryptoJS.enc.Utf8); 

        document.getElementById('pc-name').textContent = pc_name;
    }
    catch{}
}

if (hashed_code != "") {

    assign_cred();
} 
else {
    window.location.replace('login.html');
}

$(document).mouseup(function (e) { 
    if ($(e.target).closest("#mpop").length=== 0) { 
        $("#mpop").fadeOut(); 
    } 
}); 

$(document).mouseup(function (e) { 
    if ($(e.target).closest("#opop").length=== 0) { 
        $("#opop").fadeOut(); 
    } 
}); 

$('#msg-btn').click(function (e) {
    $('#mpop').show();
});

$('#opop-btn').click(function (e) {
    $('#opop').show();
});

function msgAsync(arg){
    var today = new Date();
    now = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let myObject = {};
    let myChildObject = now;
    myObject[myChildObject] = arg + '|&Message' + '|&msg';

    firebase.database().ref( bucket + '/run' ).set(myObject);
}

$("#msg-input").keyup(function(event) {
    if (event.keyCode === 13) 
    {
        var msg = document.getElementById('msg-input').value;
        msgAsync(msg)
    }
});

$('#shut-down').click(function (e) {
    power('shutdown.exe|&/s /t 0');
});

$('#re-start').click(function (e) {
    power('shutdown.exe|&/r /t 0');
});

$('#lock').click(function (e) {
    power('user32.dll|&LockWorkStation');
});

$('#log-out').click(function (e) {
    power('shutdown.exe|&-l');
});


function power(arg){
    var today = new Date();
    now = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let myObject = {};
    let myChildObject = now;
    myObject[myChildObject] = arg + '|&ex';

    firebase.database().ref( bucket + '/run' ).set(myObject);
}