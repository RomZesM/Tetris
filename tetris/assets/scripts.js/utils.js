//!del after all
import { field } from "./mainScript.js";
const tableUl = document.querySelector(".score-table")


export function setFieldCoordinate(){
	for (let i = 0; i < field.length; i++) {
		const element = field[i];
		element.innerHTML = `${i}`;		
	}
}


export function createScoreTableInLocalStorage(){
	if(localStorage.getItem("scoreTable") == null){
		let scoreTable = [0,0,0,0,0,0,0,0,0,0];
		localStorage.setItem('scoreTable', JSON.stringify(scoreTable))
	}
}

export function setScoreInScoreTableLocalstorage(score){ //change one field in userObject
	let scoreTable = JSON.parse(localStorage.getItem("scoreTable")); //get current user
	scoreTable.splice(0,0, score) //add into beginning new score
	scoreTable = scoreTable.sort((a , b )=> b - a);
	console.log(scoreTable, scoreTable.length);
	if(scoreTable.length > 10){
		scoreTable.splice(10);		
		 console.log("scoreTable", scoreTable); 
	}	
		
	localStorage.setItem("scoreTable", JSON.stringify(scoreTable));
}

export function getScoreTable(){
	let scoreTable = JSON.parse(localStorage.getItem("scoreTable"));
	return scoreTable;
}

export function showScoreTable(){
	let scoreTable = getScoreTable()
	let list = '';
	scoreTable.forEach(element => {
		let buffer = `<li class="score-field">${element}</li>`
		list = list.concat('', buffer);
	});
	tableUl.innerHTML = list;

}