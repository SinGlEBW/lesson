window.onload = function () {
    let formFile = document.querySelector('#file');
    formFile.addEventListener('submit', ajax);
   
    let url = "db.php";
    let method = "POST";

    function dataServer(data) {
        console.dir(data);
    }
    async function ajax(ev) {
        ev.preventDefault();

        let data = new FormData(this);
        let response = await fetch(url, {
            method: method,
            headers: {},
            body: data
        });
        dataServer(await response.json());
        
    }
}

import * as n from "../../js/Date.js";

console.dir(n.dateInput);



