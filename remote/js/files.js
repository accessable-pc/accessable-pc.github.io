var func = 'copy';
var source = document.getElementById('src_in');
var destination = document.getElementById('dest_in');
var now;

$( "#copy-a" ).click(function() {
    file_mode_copy();
});

$( "#move-a" ).click(function() {
    file_mode_move();
});

$( "#delete-a" ).click(function() {
    file_mode_delete();
});

$( "#file-action" ).click(function() {
    if(func != 'delete'){
        if(source.value != '' && destination.value){
            run_file_Action(source.value + '|&' + destination.value);
        }
        else{}
    }
    else{
        if(source.value != ''){
            run_file_Action(source.value + '|&na');
        }
    }
});

function file_mode_copy(){

    $( '#src_in' ).fadeIn();
    $('#dest_in' ).fadeIn();

    $( '#move-a' ).removeClass('active-nav');
    $( '#delete-a' ).removeClass('active-nav');
    $( '#copy-a' ).addClass('active-nav');

    func = 'copy';
}

function file_mode_move(){

    $( '#src_in' ).fadeIn();
    $( '#dest_in' ).fadeIn();

    $( '#move-a' ).addClass('active-nav');
    $( '#copy-a' ).removeClass('active-nav');
    $( '#delete-a' ).removeClass('active-nav');

    func = 'move';
}

function file_mode_delete(){

    $( '#src_in' ).fadeIn();
    $( '#dest_in' ).fadeOut();

    $( '#delete-a' ).addClass('active-nav');
    $( '#move-a' ).removeClass('active-nav');
    $( '#copy-a' ).removeClass('active-nav');

    func = 'delete';
}

function run_file_Action(arg){

    try{
        var data = arg + '|&' + func;
        assign_cred();
    
        var today = new Date();
        now = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let myObject = {};
        let myChildObject = now;
        myObject[myChildObject] = data;
    
        firebase.database().ref( bucket + '/run' ).set(myObject);
    }
    catch(ex){
        alert(ex);
    }


}

