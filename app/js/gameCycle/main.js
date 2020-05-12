let canvas = document.querySelector("#ctx1");
let context = canvas.getContext('2d');

let x = 10,
    y = 10;
context.fillStyle='black';

drawRect = () =>{
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(x, y, 50, 50);
}

let AnimationFrame = (function () {

    return  requestAnimationFrame       ||
            webkitRequestAnimationFrame ||
            mozRequestAnimationFrame    ||
            oRequestAnimationFrame      ||
            msRequestAnimationFrame;

})();

let flag = true;
let gameEngineStep = () =>{
    if(flag)
        gameLoopRight();
    else
        gameLoopLeft();
    
    AnimationFrame(gameEngineStep);     
}

let gameLoopRight = () => {
    drawRect();
    x++;
    if (x >= 250) {
        flag = false;
    }
}

let gameLoopLeft = () => {
    drawRect();
    x--;
    if (x < 0) {
        flag = true;
    }
}

gameEngineStep();



