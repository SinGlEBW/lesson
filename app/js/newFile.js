/*map не стоит использовать конкатенацию для возврата 2х аргументов и более, т.к. map вернё строку вместо number */
let box = document.querySelector(".box");
let flag = true;
let item;

//картинка большая умещаеться не на всю клеточку.край картинки это 0. двигаем картинку а не квадрат. Двигая картинку плево подвигаем изображение справа
let figure = {
   0:  ['-263px -19px', '-484px -22px', '-372px -17px', '-150px -16px', '-39px -16px','-372px -16px', '-484px -22px','-263px -19px'],
   1:  ['-595px -19px', '-595px -19px', '-595px -19px', '-595px -19px', '-595px -19px','-595px -19px', '-595px -19px','-595px -19px'],
   6:  ['-595px -116px', '-595px -116px', '-595px -116px', '-595px -116px', '-595px -116px','-595px -116px', '-595px -116px','-595px -116px'],
   7:  ['-263px -116px', '-484px -116px', '-372px -116px', '-39px -116px', '-150px -116px','-372px -116px', '-484px -116px','-263px -116px'],
};


    
for (let i = 0; i < 8; i++) {

    for (let j = 0; j < 8; j++) {

        item = document.createElement("div");
        item.classList.add("item");

        if (j == 0) {
            flag = !flag;
        }
        if (flag) {
            item.classList.add("black")
        } else {
            item.classList.add("white");
        }

        if (figure[i]!==undefined && figure[i][j]!==undefined){
            item.style.backgroundImage = 'url(../img/сhess_symbols_set.png)';
            item.style.backgroundPosition = figure[i][j];
        }

        flag = !flag; //flag == true присвоет обратное ему значение.flag == true опять же присвоит обратное значение
        box.append(item);
    }
}

function $(item){
   return document.querySelector(item);
}

console.dir( $('.box'));