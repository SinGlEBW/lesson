/* 
    Как неправильно создавать и удалять ивент. Дело в том что каждый раз когда вызывается функция,
    создаётся локальная область и что-то в ней выполняется. Если одной функцией контролировать создание и удаление
    событий то получиться так что при 1м вызове создаётся область и событие в нём которое ссылается на функции 
    выполняющие это событие, при 2м вызове создаётся новая локальная область которая уже хочет удалить 
    события. Запрос removeEventListener выполняется хотя события в этой локальной области не вешалось, оно в предыдущей    
    осталось.
*/
    
function blockingScroll(bool, untouchable = null, saveScrollToTheOpen = null){
    if(bool){
      console.dir('создание');
      window.addEventListener('wheel', evWheel.bind(window, saveScrollToTheOpen, untouchable), { passive: false })
      window.addEventListener('scroll', evScroll.bind(window, saveScrollToTheOpen))
      return;
    }
    console.dir('удаление');//
    window.removeEventListener('wheel', evWheel, { passive: false })
    window.removeEventListener('scroll', evScroll)
  }
  
  function evWheel (saveScroll, untouchable, ev) {
     
    if(!untouchable.contains(ev.target)){
      console.dir('Wheel');
      ev.preventDefault(); return; 
    }
    this.scrollTo(0, saveScroll);
  } 
  
  function evScroll(saveScroll){
    console.dir('Scroll');
    this.scrollTo(0, saveScroll)
  } 
  