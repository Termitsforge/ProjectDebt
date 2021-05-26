let count_like = 0;
let button = document.getElementById("like");
button.innerHTML = count_like;

button.onclick = () => {
    if (!button.classList.contains("check")){
        count_like++;
        button.innerHTML = count_like;
        button.classList.remove("check");
    } else {
        count_like--;
        button.innerHTML = count_like;
        button.classList.add("check");
    }
    
}
