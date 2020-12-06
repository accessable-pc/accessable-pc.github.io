var today = new Date();
var now;
var history_div = document.getElementById('com_log');
var cmd = document.getElementById('command-in')

//Get data async
_getDataAsync()

function _getDataAsync() {
    assign_cred();
    firebase.database().ref( bucket + '/cmd_logs' ).on('value', function (snapshot) {
        history_div.innerHTML = snapshot.val().log.replace(/\r\n/g, "\n");
        //window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        cmd.value = '';
    });
}  

cmd.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      saveAsync(cmd.value);

    }
});


function saveAsync(arg){
    var today = new Date();
    now = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let myObject = {};
    let myChildObject = now;
    myObject[myChildObject] = arg + '|&na' + '|&cmd';

    firebase.database().ref( bucket + '/run' ).set(myObject);

}