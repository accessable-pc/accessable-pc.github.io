var code;
var code_input = document.getElementById('login-code');
var display_name = "sudo";

$( '#a-pop' ).fadeOut();
$( '#d-pop' ).fadeOut();

$( "#login-button" ).click(function() {
    check_if_Exist();
});

$("#login-code").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#login-button").click();
    }
});

$("#deactivate-btn").click(function() {
    $("#d-pop").fadeIn();
});

function check_if_Exist(){

    code = code_input.value;
    firebase.database().ref(code + '/meta').once('value', function (snapshot) {

        try{
            if(snapshot.val().status === "active"){     

                display_name = snapshot.val().display_name;  
                code = CryptoJS.AES.encrypt(code, display_name);   
                assign_cookies();
                //var bytes = CryptoJS.AES.decrypt(encryptd.toString(), display_name);
                //var decrypted = bytes.toString(CryptoJS.enc.Utf8);

            }
            else{
                alert_pop("This code is inactive.")
            }
        }
        catch{
            alert_pop("No such pc");
        }
    });

}

function assign_cookies(){

    try{
        setCookie("code", code, 365)
        setCookie("name", display_name, 365)
        setTimeout(open_index, 5000)
    }
    catch(ex){
        alert(ex);
    }

}

function open_index(){
    window.location.replace('index.html');
}

function alert_pop(message){

    var div = document.getElementById('a-pop');
    div.textContent = message;
    $( '#a-pop' ).fadeIn();
    setTimeout(close_pop, 3000);
}

function close_pop(){
    $( '#a-pop' ).fadeOut();
}

$( "#de-go" ).click(function() {
    var req = document.getElementById('da-input').value;
    deactivate_code(req)

});

$(document).mouseup(function (e) { 
    if ($(e.target).closest("#d-pop").length=== 0) { 
        $("#d-pop").fadeOut(); 
    } 
}); 

function deactivate_code(req){


    var checkBox = document.getElementById("permanent-check");

    if (checkBox.checked == true){

        try{
            firebase.database().ref(req).remove();
        }
        catch{
            alert_pop('Unable to deactivate')
        }

    } else {

        try{
            firebase.database().ref(req + '/meta').update({
                status:'not_Active',
            });
            $("#d-pop").fadeOut();
            alert_pop('Successfully deactivated')
        }
        catch(ex){
            $("#d-pop").fadeOut();
            alert_pop('Unable to deactivate')
        }
    }

}