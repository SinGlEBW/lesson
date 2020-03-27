(() => {
    const config = {
      dotMinRad  : 6,
      dotMaxRad  : 20,
      sphereRad  : 350,
      bigDotRad  : 35,
      mouseSize  : 120,
      massFactor : 0.002,
      defColor   : `rgba(250, 10, 30, 0.9)`,
      smooth     : 0.85,
    }
  
    const TWO_PI = 2 * Math.PI;
    const canvas = document.querySelector(`canvas`);
    const ctx    = canvas.getContext(`2d`);
  
    let w, h, dots = [];

    w     = canvas.width  = innerWidth;
    h     = canvas.height = innerHeight;

    mouse = {x: w / 2, y: h / 2, down: false};
 
  //mass используеться при вычислении притяжения одной частички к другой, это влияет на скорость и направление
  //масса вычисляеться из её размеров rad * config.massFactor(маленькое число что бы скорость не была высокой)
  //что бы рассчитать притяжение каждой частице друг другу, нужно суммировать ускорение и хранить в переменной  
  class Dot {
      constructor(r) {
        this.pos   = {x: mouse.x, y: mouse.y};//половина высоты и ширины изначальное положение шара
        this.vel   = {x: 0, y: 0};//скорость мелких шаров
        this.rad   = r || Math.random() * (config.dotMaxRad - config.dotMinRad) + config.dotMinRad;//мин 6 макс 20
        this.mass  = this.rad * config.massFactor;
        this.color = config.defColor;
      }

      createCircle(x,y) {
        
        this.pos.x = x || this.pos.x + this.vel.x;
        this.pos.y = y || this.pos.y + this.vel.y;

        ctx.fillStyle = this.color;
        ctx.strokeStyle = config.defColor;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.rad, 0, TWO_PI);
        ctx.closePath();
        ctx.fill() ; ctx.stroke();
      }
    }

    dots.push(new Dot(config.bigDotRad));//Созадн 1й объект. Передан статичный радиус

    dots.push(new Dot())
    dots.push(new Dot())
 
/*------------------------------------------------------------------------- */
console.dir(dots.map((e)=>e)); 
    function animation() {
      ctx.clearRect(0, 0, w, h);//очищается
  
      //if (mouse.down) { dots.push(new Dot()); }//при нажатии создаются шары
      
      for (let i = 1; i < dots.length; i++) {
         /*1 й цикл перебирает переменные, 2й цикл перебирает те же переменые но со здвигом
            так можно сравенивать каждый элемент массива друг с другом. 1й элемент 1го дикла, со всеми элементами
            2го цикла, потом 2й элемент 1го цикла со всеми элементами 2го цикла и т.д. 
            В циклах встречаеться момент когда значение сравниваеться сама с сабой, прежде чем идти по циклу дальше.
            Если это сравнение не требуеться то и используеться пропускание цикла через continue
         */
         let acc = {x: 0, y: 0}// отвечает за ускорение частиц
  
        for (let j = 0; j < dots.length; j++) {
          if (i == j) continue;
          let [a, b] = [dots[i], dots[j]]; //сравнение частиц друг к другу/ 2 - 3, 3 - 1, 3 - 2 
          console.dir(a);
          console.dir(b);
          let delta  = {x: b.pos.x - a.pos.x, y: b.pos.y - a.pos.y} // вычисляет разницу между позицией 1й частицы и второй
          let dist   = Math.sqrt( delta.x * delta.x + delta.y * delta.y) || 1;//Пифагор
          let force  = (dist - config.sphereRad) / dist * b.mass;
  
          if (j == 0) {
            let alpha = config.mouseSize / dist;
            a.color   = `rgba(250, 10, 30, ${alpha})`;
  
            dist < config.mouseSize ? force = (dist - config.mouseSize) * b.mass : force = a.mass;
          }
  
          acc.x     += delta.x * force;
          acc.y     += delta.y * force;
          
        }
        //изменение положения мелких шаров
        //изначальное пол. 0 * скорость + изменяемая дельта * массу . Вроде это Скорость = Сила / масса
        
        dots[i].vel.x = dots[i].vel.x * config.smooth + acc.x * dots[i].mass;//
        dots[i].vel.y = dots[i].vel.y * config.smooth + acc.y * dots[i].mass;
      }
  //map проходиться по каждому элементу в вызывает методы объекта для каждого элемента массива
      dots.map((e) => {
    
        e == dots[0] ? e.createCircle(mouse.x, mouse.y) : e.createCircle()}); //передаётся


     
      window.requestAnimationFrame(animation);
    }
    
    animation();
/*------------------------------------------------------------------------- */ 
    function setPos({layerX, layerY}) {//тож самое Event.layerX. Это ES6
        [mouse.x, mouse.y] = [layerX, layerY];     
    }
    
/*------------------------------------------------------------------------- */ 
//переключение анимации. Удобный вариант что бы перебросить информацию о нажатии и отпускании мыши. Просто менять переменную.
/*
    Почему изменения не видать в глобальной видимости, потому что код в глобальной видимости отработал 1 раз, а в локальной за счёт
    вызова вункции свойства перепроверяются. 
*/
    function isDown() {
      mouse.down = !mouse.down;//флаг
    }
  
    canvas.addEventListener(`mousemove`, setPos);
    window.addEventListener(`mousedown`, isDown);
    window.addEventListener(`mouseup`  , isDown);
   })();











   