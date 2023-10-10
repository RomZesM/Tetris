import { startGame } from "./mainScript.js";
import { details } from "./details.js";

const tableUl = document.querySelector(".score-table")
let nextScreen = Array.from(document.querySelectorAll('.nextDetailScreen div'));
let nextDetailIndex = 0;
let sScreenWidth = 4; //with for second screen with next detail
let detailsForSmallScreen = [[0,1,2,sScreenWidth],
							[0,1,2, sScreenWidth + 2],
							[1,2,sScreenWidth, sScreenWidth+1],
							[0,1, sScreenWidth + 1, sScreenWidth + 2],
							[0,1,2, sScreenWidth+1],
							[0,1,sScreenWidth, sScreenWidth+1],
							[sScreenWidth,sScreenWidth+1,sScreenWidth+2,sScreenWidth+3]]
let randomColorsList = ["detail", "detail2", "detail3"];
let curretnColorIndex = 0;

const scoreField = document.querySelector(".score")
let score = 0;
//!del after all

// export function setFieldCoordinate(){
// 	for (let i = 0; i < field.length; i++) {
// 		const element = field[i];
// 		element.innerHTML = `${i}`;		
// 	}
// }


export function createScoreTableInLocalStorage(){
	if(localStorage.getItem("scoreTable") == null){
		let scoreTable = [0,0,0,0,0,0,0,0,0,0];
		localStorage.setItem('scoreTable', JSON.stringify(scoreTable))
	}
}

export function setScoreInScoreTableLocalstorage(){ //change one field in userObject
	let scoreTable = JSON.parse(localStorage.getItem("scoreTable")); //get current user
	scoreTable.splice(0,0, score) //add into beginning new score
	scoreTable = scoreTable.sort((a , b )=> b - a);
	//console.log(scoreTable, scoreTable.length);
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


export function clearDetail(){
	currentDetail.forEach(element => {
		//field[currentPosition + element].classList.remove("detail")
		field[currentPosition + element].classList.remove("detail", "detail2", "detail3")
	});
}

export function draw(){
	for (let i = 0; i < currentDetail.length; i++) {
		const element = currentDetail[i];
		console.log(randomColorsList[curretnColorIndex]);
		field[currentPosition + element].classList.add(`${randomColorsList[curretnColorIndex]}`) //chode random color
	}
}

export function checkGround(detail){

	if(detail.some(index => field[currentPosition + index + width].classList.contains('ground'))){
		return true
	}
	else 
		return false;
}

export function changeSpeed(newSpeed){
	clearInterval(timerId);
	currentSpeed = newSpeed;
	startGame()
}
//draw next deatil on additional screen
export function drawNext(){
	//CLEAR screen
	nextScreen.forEach((element)=>{
		element.classList.remove("detail", "detail2", "detail3");
	});


	let testDet = detailsForSmallScreen[nextDetailIndex];
		
	for (let i = 0; i < testDet.length; i++) {
		const element = testDet[i];
		nextScreen[element].classList.add(`${randomColorsList[curretnColorIndex]}`)
	}
}

export function randomNumOfDetail(){
	let randomNum = Math.floor(Math.random() * details.length)
	//nextDetailIndex = randomNum; //for showing next detail in mini window
	return  randomNum;
}

export function randomColorOfDetail(){
	let randomNum = Math.floor(Math.random() * randomColorsList.length)
	return  randomNum;
}

export function createNewRandomDetail(){
	currentDetailPack = nextDetailPack;
	let randomInt = randomNumOfDetail();
	nextDetailIndex = randomInt; //for showing next detail in mini window
	nextDetailPack = details[randomInt];
	countDetailsArr[randomInt]++;
	rotatePosition = 0;
	currentDetail = currentDetailPack[rotatePosition];
	//make random color
	curretnColorIndex = randomColorOfDetail();
}

//remove classes detail or ground from cell in glass
export function clearRow(row){
	row.forEach((element)=>{
		field[element].classList.remove("ground");
		field[element].classList.remove("detail", "detail2", "detail3");
	});
}

export function addScore(amount){
	score += amount;
	scoreField.innerHTML = score;
}

export function playShortSound(sound){
	sound.volume = 0.5;
	sound.pause();
	sound.currentTime = 0;
	sound.play();
}