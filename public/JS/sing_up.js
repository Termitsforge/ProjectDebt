let show_password = function () {
    var input = document.getElementById("pass");
    var checkbox = document.getElementById("check");
    if (checkbox.checked) input.setAttribute('type', 'text');
    else input.setAttribute('type', 'password');

}

// ---------------Обработка формы--------------

function validateForm(form){
    let fail = "";
    fail += validateLogIn(form.log_in.value);
    fail += validatePassword(form.pass.value);
    fail += validateEmail(form.email.value);
    if (fail == "") return true;
    else return false;
}

function validateLogIn(logIn) {
    var logInError = document.getElementById("log_in__error");
    if (logIn == "") {
        logInError.style.display = "block";
        logInError.innerHTML = "Введите логин";
        return "login fail ";
    }
    return "";
}

function validatePassword(pass) {
    var passError = document.getElementById("pass__error");
    if (pass == "") {
        passError.style.display = "block";
        passError.innerHTML = "Введите пароль";
        return "pass fail ";
    }
    return "";
}

function validateEmail(email){
    var error = "";
    var array_email = ['gmail.com', 'yandex.ru', 'mail.ru', 'rambler.ru'];
    var check = 0;
    var emailError = document.getElementById("email__error");
    for(let i = 0; i < array_email.length; i++){
        if (email.indexOf(array_email[i]) == -1) check += 0;
        else check = email.indexOf(array_email[i]);
    }
    if (check == 0) {
        emailError.style.display = "block";
        emailError.innerHTML = "Введите корректный email";
        error += "email fail";
    }
    if(email == ""){
        emailError.style.display = "block";
        emailError.innerHTML = "Введите email";
        error += "email fail";
    }
    return error;
}
