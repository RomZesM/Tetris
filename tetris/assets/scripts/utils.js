import { startGame } from "./mainScript.js";
import { details } from "./details.js";

const tableUl = document.querySelector(".score-table")
let nextScreen = Array.from(document.querySelectorAll('.nextDetailScreen div'));
//let nextDetailIndex = 0; make global
let sScreenWidth = 4; //with for second screen with next detail
let detailsForSmallScreen = [[0,1,2, sScreenWidth+1],
							[0,1,2, sScreenWidth + 2],
							[0,1, sScreenWidth + 1, sScreenWidth + 2],
							[0,1,sScreenWidth, sScreenWidth+1],
							[1,2,sScreenWidth, sScreenWidth+1],
							[0,1,2,sScreenWidth],
							[sScreenWidth,sScreenWidth+1,sScreenWidth+2,sScreenWidth+3]]
let colorsList = ["white", "blue", "light-blue", "white", "blue", "light-blue", "white"];
let curretnColorIndex = 0;

const scoreField = document.querySelector(".score")
let score = 0;

let isMuted = false;

//eventlistener for mute button
document.querySelector(".stop-sound-button").addEventListener("click", (event)=>{
	if(isMuted)
		isMuted = false;
	else
	isMuted = true;
});


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
		field[currentPosition + element].classList.remove(`${colorsList[currentDetailIndex]}`)
	});
}

export function draw(){
	for (let i = 0; i < currentDetail.length; i++) {
		const element = currentDetail[i];
		//console.log(colorsList[curretnColorIndex]);
		field[currentPosition + element].classList.add(`${colorsList[currentDetailIndex]}`) //chode random color
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
		element.classList.remove("white", "blue", "light-blue");
	});


	let testDet = detailsForSmallScreen[nextDetailIndex];
		
	for (let i = 0; i < testDet.length; i++) {
		const element = testDet[i];
		nextScreen[element].classList.add(`${colorsList[nextDetailIndex]}`)
	}
}

export function randomNumOfDetail(){
	let randomNum = Math.floor(Math.random() * details.length)
	//nextDetailIndex = randomNum; //for showing next detail in mini window
	return  randomNum;
}

// export function randomColorOfDetail(){
// 	let randomNum = Math.floor(Math.random() * randomColorsList.length)
// 	return  randomNum;
// }

export function createNewRandomDetail(){
	currentDetailPack = nextDetailPack;
	currentDetailIndex = nextDetailIndex; //for color of current detail
	
	let randomInt = randomNumOfDetail();
	nextDetailIndex = randomInt; //for showing next detail in mini window
	nextDetailPack = details[randomInt];
	countDetailsArr[randomInt]++;
	rotatePosition = 0;
	currentDetail = currentDetailPack[rotatePosition];
	
}

//remove classes detail or ground from cell in glass
export function clearRow(row){
	row.forEach((element)=>{
		field[element].classList.remove("ground");
		field[element].classList.remove("white", "blue", "light-blue");
	});
}

export function addScore(amount){
	score += amount;
	scoreField.innerHTML = score;
}

export function playShortSound(sound){
	if(!isMuted){
		sound.volume = 0.5;
		sound.pause();
		sound.currentTime = 0;
		sound.play();
	}
	
}

//draw mini details in statistics

//make array with 7 separate screens
export function getMiniScreens(){
	let commonArray = Array.from(document.querySelectorAll('.detail-mini-screen div'));
	let screensArrays = [];
	
	for (let i = 0; i < 7; i++) {
		let buf = commonArray.splice(0, 8);
		screensArrays[i] = buf;
	}
	//console.log(screensArrays);
	return screensArrays;
}	

export function drawDetailInStatisticsScreen(statMiniScreensArr){
	//CLEAR screen
	statMiniScreensArr.forEach((element)=>{
		element.forEach((element)=>{
			element.classList.remove("white", "blue", "light-blue");
		});
		
	});
	//drow details
	for (let i = 0; i < statMiniScreensArr.length; i++) {
		let mScreen = statMiniScreensArr[i];
				
		//detail for drawing
		let testDet = detailsForSmallScreen[i];
		//put detail into screen
		for (let j = 0; j < testDet.length; j++) {
				const drowinElement = testDet[j];
				mScreen[drowinElement].classList.add(`${colorsList[i]}-mini`)
			}
	}

	
		
	
}