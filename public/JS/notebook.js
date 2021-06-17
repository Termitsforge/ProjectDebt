setInterval(() => {
    let xhrGET = new XMLHttpRequest();
    xhrGET.open(
        'GET',
        '/notebook/about',
        true
    );
    xhrGET.send(); 
    xhrGET.onreadystatechange = function () {
        if (xhrGET.readyState != 4) {
            return
        }
        if (xhrGET.status === 200) {
            let result = JSON.parse(xhrGET.responseText);
            let arrDebts = result;
            let boxTwo = document.querySelector("#creditor");
            let boxOne = document.querySelector("#debtor");
            boxOne.innerHTML = "";
            boxTwo.innerHTML = "";
            if (arrDebts[0].length === 0) {
                let p = document.createElement('p');
                p.classList.add("debp");
                p.classList.add("text");
                p.innerHTML = "Пусто";
                boxOne.append(p);
            }
            if (arrDebts[1].length === 0) {
                let p = document.createElement('p');
                p.classList.add("debp");
                p.classList.add("text");
                p.innerHTML = "Пусто";
                boxTwo.append(p);
            }
            for (let i = 0; i < arrDebts[0].length; i++) {
                console.log(arrDebts[0]);
                let li = document.createElement('li');
                li.classList.add("debp");
                li.classList.add("text");
                li.innerHTML = `Взял у ${arrDebts[0][i].nameCreditor}  ${arrDebts[0][i].Sum} рублей.`;
                boxOne.append(li);
            }
            for (let i = 0; i < arrDebts[1].length; i++) {
                let li = document.createElement('li');
                li.classList.add("debp");
                li.classList.add("text");
                li.innerHTML = `${arrDebts[1][i].nameDebt} должен мне ${arrDebts[1][i].Sum} рублей.`;
                boxTwo.append(li);
            }

        } else {
            console.log('err', xhrGET.responseText);
        }
    };
}, 3000)