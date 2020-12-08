
//фильтрует 1й объект на основе 2го
let ob = {
	a: 1,	b: 2,	c: 3
}
let ob1 = {
	a: 1, b: 12
}

let b = Object.entries(ob).reduce((pValue1, arr1) => {

	let c =  Object.entries(ob1).reduce((pValue2, arr2) => {
		
		if((arr1[0] === arr2[0] && arr1[1] === arr2[1])){
			return {...pValue2, [arr1[0]]: arr1[1]} 
			
		}else{
			return {...pValue2}
		}
	
	}, {})

	if(arr1[0] === Object.keys(c)[0] && arr1[1] === c[arr1[0]]){
		return [...pValue1]
	}

	return [...pValue1, {[arr1[0]]: arr1[1]}] 
	
},[])

isEqual// в lodash так работает
let isMyEqual = (a, b) => {
	a = Object.entries(a)
	b = Object.entries(b)
	return a[0][0] === b[0][0] && a[0][1] === b[0][1]
}
console.dir(b);