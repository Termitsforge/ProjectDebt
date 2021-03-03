// ------------функция Показать пароль-----------
let show_password = function(){
    var input = document.getElementById("pass");
    var checkbox = document.getElementById("check");
    if(checkbox.checked) input.setAttribute('type', 'text');
    else input.setAttribute('type','password');
    
}
// ---------------Обработка формы--------------
let form = document.getElementById("log_in__form");
let fail = "";
let validateForm = function(form){
    validateLogIn(form.log_in.value);
    validatePassword(form.pass.value);
    if(fail == "") return true;
    else return false;
}
function validateLogIn(logIn){
    var logInError = document.getElementById("log_in__error");
    if (logIn == "") {
        logInError.style.display = "block";
        logInError.innerHTML = "Введите логин";
        fail += "login fail "
    }
}
function validatePassword(pass){
    var passError = document.getElementById("pass__error");
    if (pass == "") {
        passError.style.display = "block";
        passError.innerHTML = "Введите пароль";
        fail += "pass fail "
    }
}



