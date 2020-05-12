let cart = document.querySelectorAll('.box');
let front = document.querySelectorAll('.front');
let d = document.querySelector('.d');
let count;
cart.forEach((item) => {
    item.onclick = click;
    
})

count = Math.floor(Math.random() * 3);




function click(Event) { 
    Event.preventDefault();
    this.classList.toggle('active');

    if(Event.target.classList.contains("rand")){
    
        setTimeout(()=>{location.reload(true);}, 100);
    }
    front[count].classList.toggle('rand');

    
}
