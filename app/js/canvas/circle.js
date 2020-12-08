
    const config = {
       vertices: 100,
       lines = [],
    }
  
    const TWO_PI = 2 * Math.PI;
    const canvas = document.querySelector(`canvas`);
    const ctx    = canvas.getContext(`2d`);




    for(let i = 0; i <= vertices; i++){
      let point = {
        x: Math.cos(i / vertices * Math.PI * 2),
        y: Math.sin(i / vertices * Math.PI * 2)
      }
      lines.push(point)
    }









   