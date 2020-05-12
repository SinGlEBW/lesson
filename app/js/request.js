//Функция для получения ассоциативного массива с сервера через var_export

function requesServer(data){
 
    let regExpForMatch = /'.+|\[.+/gmi;
    let regExpForSplit = /['\[]|^\)|['\]]| => |\,$/gmi; 
  
    let arrMatch = data.match(regExpForMatch);//выборка нужного текста построчно в массив
    let dataServer = {};//данные в обычном объекте
  
    let arrMap = arrMatch.map((item)=>{
  
      let arrSplit = item.split(regExpForSplit);
  
      if(arrSplit[3] === ""){
        for(let i = 2; i <= arrSplit.length; i++){
          if(i==arrSplit.length-1){dataServer[arrSplit[1]] = ''; break;}
          if(arrSplit[i]==''){continue;}
          dataServer[arrSplit[1]] = arrSplit[i]; break; }  
      }else{
        dataServer[arrSplit[1]] = arrSplit[3]
      }
  
  return [arrSplit[1], (arrSplit[3] == "")?arrSplit[4]:arrSplit[3]];                     
  });
  
  let dataServer1 = new Map(arrMap);
  
  
  }