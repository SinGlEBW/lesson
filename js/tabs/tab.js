let arrItem = document.querySelectorAll('.item');
let arrContent = document.querySelectorAll('.content');

window.onload = function(){

     for(let i = 0; i < arrContent.length; i++){
        arrContent[i].style.display = "none";   
        arrItem[i].onclick = click;
    }
    let i = localStorage.getItem("select");
    arrContent[i].style.display = "block"; 
    arrItem[i].style.borderBottom = "1px solid #6c757d";
    
    function click(){
        console.dir(this);
        for(let i = 0; i < arrContent.length; i++){
            if(this.dataset.tab == i){
                localStorage.setItem("select", i);
                arrContent[i].style.display = "block"; 
                this.style.borderBottom = "1px solid #6c757d";  
            }else{
                arrContent[i].style.display = "none"; 
                arrItem[i].style.borderBottom = "1px solid #78F";
                
            }
        }
    }
}



