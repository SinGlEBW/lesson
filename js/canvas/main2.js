let canvas = document.querySelector("#ctx1");
let context = canvas.getContext('2d');
canvas.width = 1920; canvas.height = 350;

let gradient = context.createLinearGradient(0, 0, 1200, 300);
gradient.addColorStop("0", "#00FFA9");
gradient.addColorStop("0.2", "#24C6BC");
gradient.addColorStop("0.7", "#B67FDE");
gradient.addColorStop("1", "#FBA5C5");
context.fillStyle = gradient;

context.strokeStyle = gradient;
context.globalCompositeOperation='lighter';

context.lineWidth = 2;

let n = Math.random() * (canvas.width - 50 * 2) + 50;
console.dir(Math.random() * (canvas.width - 50 * 2));
class Circle {
    constructor(radius,speed) {
        this.radius = radius;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.speed = speed;
        this.directionX = this.speed * Math.random()
        this.directionY = this.speed * Math.random()
           
        }
   
    anim() {
        
        context.beginPath();
        context.arc(this.x, this.y, this.radius , 0, 2 * Math.PI * 2);
        context.fill()
        this.x += this.directionX;
        this.y += this.directionY;
        if (this.x + this.radius >= canvas.width || this.x - this.radius < 0)
            this.directionX = -this.directionX;
            
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
            this.directionY = -this.directionY;  

        }  
}

let arr = [];
for(let i = 0; i < 5; i++){
    arr.push(new Circle(50, 1)) 
}

function animation() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < 5; i++){
        arr[i].anim();
    }

    requestAnimationFrame(animation);
}

animation();




// let object = {
//     water: 0,
//     method(item = this.water){
//         return this.water = item;
//     },
//     get method1(){
//         return this.water;
//     }
// }

// console.dir(object.water);
// console.dir(object.method(3));


