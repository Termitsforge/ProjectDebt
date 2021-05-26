// ---------------Обработка формы--------------
let form = document.getElementById("dept__form");
let fail = "";
let validateForm = function(form){
    validateName(form.name.value);
    validateSum(form.sum.value);
    if(fail == "") return true;
    else return false;
}
function validateName(Name){
    var NameError = document.getElementById("dept__error");
    if (Name == "") {
        NameError.style.display = "block";
        NameError.innerHTML = "Введите имя";
        fail += "Name fail "
    }
}
function validateSum(sum){
    var sumError = document.getElementById("sum__error");
    if (sum == "") {
        sumError.style.display = "block";
        sumError.innerHTML = "Введите сумму";
        fail += "sum fail "
    }
}



