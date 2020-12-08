/*
Виды шейдоров.
Вершинный шейдер - отвечает за реализоваие и расположение точек(вершин),
перемемещение и скос вершин, обрезку и многое другое. Все эти действия называются
Аффиные преобразования.


Шейдер даёт доступ к Конвееру, который находиться на видеокарте.

OpenGL это низкоуровневый доступ к видео карте. В видеокарт есть физический
графический процессор для обработки шейдеров

*/
//Фрактал 
// let x = 0, y = 0;
// let canvas;
// let context;
// window.onload = function () {
//     canvas = document.querySelector("#ctx");
//     context = canvas.getContext('2d');
//     console.dir(canvas);
//     context.fillStyle = "black";
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     //Update 20 times every frame



//     // let clos = setInterval(() => {

//     //     for (let i = 0; i < 20; i++)
//     //     cout++;
//     //     console.dir(cout);



//     // }, 1000/250); // 250 frames per second

//     update();
// };

// let time = performance.now();
// let cout = 0;

// let tim = new this.Date();
// let sec = tim.getSeconds();

// function update() {

//     let nextX, nextY;
//     let r = Math.random();
//     if (r < 0.01) {
//         nextX =  0;
//         nextY =  0.16 * y;
//     } else if (r < 0.86) {
//         nextX =  0.85 * x + 0.04 * y;
//         nextY = -0.04 * x + 0.85 * y + 1.6;
//     } else if (r < 0.93) {
//         nextX =  0.20 * x - 0.26 * y;
//         nextY =  0.23 * x + 0.22 * y + 1.6;
//     } else {
//         nextX = -0.15 * x + 0.28 * y;
//         nextY =  0.26 * x + 0.24 * y + 0.44;
//     }

//     // Scaling and positioning
//     let plotX = canvas.width * (x + 3) / 6;
//     let plotY = canvas.height - canvas.height * ((y + 2) / 14);

//     drawFilledCircle(plotX, plotY, 1, "green");

//     x = nextX;
//     y = nextY;
//     cout++;
//     console.dir(cout);
//     if(cout == 1000){

//         console.dir(performance.now() - time);
//         console.dir(tim.getSeconds() - sec);
//         return
//     }

//     requestAnimationFrame(update);
// }
// const drawFilledCircle = (centerX, centerY, radius, color) => {
//     context.beginPath();
//     context.fillStyle = color;
//     context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
//     context.fill();
// };

//в THREE свои свойства и методы поэтому контекст не нужно подключать с его функционалом
console.dir(THREE);
let canvas = document.querySelector("#ctx");

let renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
console.dir(renderer); //ng
renderer.setClearColor("#111111")

let scena = new THREE.Scene();
console.dir(scena); //ob

let light = new THREE.AmbientLight(""); //цвет света, [2й параметр хз]
console.dir(light); //mf

let camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 5000); //угол обзора, пропорция отношения ширины на высоту, видим: не ближе, не дальше
camera.position.set(0, 30, 500); //смещение камеры вправо, вверх и расстояние до объекта
console.dir(camera); //ba

//геометрическая фигура 2d /PlaneGeometry: ƒ Id(a,b,c,d)
let geometry2d = new THREE.PlaneGeometry(300, 300, 12, 12); //ширина, высота, граней по вертикали, по горизонтали
console.dir(geometry2d); //Id
//фигуры 3d
//CircleGeometry: ƒ ne(a,b,c,d),CubeGeometry: ƒ b(b,d,e,f,g,h),SphereGeometry: ƒ ie(a,b,c,d,e,f,g)
let rotation = 0;
let geometry3d = new THREE.SphereGeometry(100, 15, 15); //радиус,грани по вертикали, по горизонтали, вращение, сворачивание граней, 2 последних непонятных эффкта
console.dir(geometry3d); //ie

for (let i = 0; i < geometry3d.faces.length; i++) {
    geometry3d.faces[i].color.setRGB(Math.random(), Math.random(), Math.random()); //цвет геометрии зависит от цвета матерьяла
}

let material = new THREE.MeshBasicMaterial({
    /*color: "teal",*/
    wireframe: false,
    vertexColors: true
}); //цвет материала и включить грани.
console.dir(material); //Oa

let mesh = new THREE.Mesh(geometry3d, material);
console.dir(mesh); //S
scena.add(mesh);

//последнее действие 
/*###--Настройка интерфейса в браузере----####*/
let ball = {
    rotationX: 0.1,
    rotationY: 0.1,
    rotationZ: 0.1,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
}

console.dir(ball["rotateX"]);
let gui = new dat.GUI();
for(key in ball){
   gui.add(ball, key).min(-2).max(2).step(0.1);
}




/*------------------------------------------------- */

window.animation = (function (callback) { //крос платформеный вариант обращения к requestAnimationFrame 
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
        console.dir(1);
    };
})();


function draw() {
    mesh.rotation.x += ball.rotationX / 200;
    mesh.rotation.y += ball.rotationY / 200;
    mesh.rotation.z += ball.rotationZ / 200;
    mesh.position.x += ball.positionX;
    mesh.position.y += ball.positionY;
    mesh.position.z += ball.positionZ;
    
    renderer.render(scena, camera);
    animation(draw);
}
//Дерево прототипа db / E,K,N / Ea / Object
draw();


/*-------------------------------------------------*/