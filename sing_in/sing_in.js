let show_password = function(){
    var input = document.getElementById("pass");
    var checkbox = document.getElementById("check");
    if(checkbox.checked) input.setAttribute('type', 'text');
    else input.setAttribute('type','password');
    
}



