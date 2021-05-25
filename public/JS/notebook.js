let myID;
let xhrGET = new XMLHttpRequest();
xhrGET.open(
    'GET',
    'http://localhost:3000/ID',
    true
);
xhrGET.send();
xhrGET.onreadystatechange = function () {
    if (xhrGET.readyState != 4) {
        return
    }
    if (xhrGET.status === 200) {
        let result = JSON.parse(xhrGET.responseText);
        myID = result;
        xhrPOST();

    } else {
        console.log('err', xhrGET.responseText);
    }
};

const xhrPOST = () => {
    let arrDebts = [];
    let xhrPOST = new XMLHttpRequest();
    xhrPOST.open(
        'POST',
        `http://localhost:3000/notebook/${myID}`,
        true
    );
    xhrPOST.send();
    xhrPOST.onreadystatechange = function () {
        if (xhrPOST.readyState != 4) {
            return
        }
        if (xhrPOST.status === 200) {
            let result = JSON.parse(xhrPOST.responseText);
            arrDebts = result;
            let boxTwo = document.querySelector("#creditor");
            let boxOne = document.querySelector("#debtor");
            console.log(arrDebts);
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
                boxOne.append(p);
            }
            for (let i = 0; i < arrDebts[0].length; i++) {
                console.log(arrDebts[0]);
                let li = document.createElement('li');
                li.classList.add("debp");
                li.classList.add("text");
                li.innerHTML = `Взял у ${arrDebts[0][i].log_in}  ${arrDebts[0][i].Sum} рублей.`;
                boxOne.append(li);
            }
            for (let i = 0; i < arrDebts[1].length; i++) {
                let li = document.createElement('li');
                li.classList.add("debp");
                li.classList.add("text");
                li.innerHTML = `${arrDebts[1][i].log_in} должен мне ${arrDebts[1][i].Sum} рублей.`;
                boxTwo.append(li);
            }
        } else {
            console.log('err', xhrPOST.responseText);
        }
    };
};