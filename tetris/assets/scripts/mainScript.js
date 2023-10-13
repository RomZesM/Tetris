import { playShortSound, setScoreInScoreTableLocalstorage, showScoreTable } from "./utils.js";
import { details } from "./details.js";
import { createScoreTableInLocalStorage } from "./utils.js";
import { controlList } from "./controls.js";
import { isCurrentDetailGetOccupiedPlace } from "./controls.js";
import { controlListForKeyDown } from "./controls.js";
import { clearDetail } from "./utils.js";
import { draw } from "./utils.js";
import { checkGround } from "./utils.js";
import { changeSpeed } from "./utils.js";
import { drawNext } from "./utils.js";
import { randomNumOfDetail } from "./utils.js";
import { createNewRandomDetail } from "./utils.js";
import { clearRow, addScore, drawDetailInStatisticsScreen, getMiniScreens } from "./utils.js";
import {scoreCounter, speedCounter, linesCounter, showDetailsCounter} from "./counters.js"
import { drawAnimationScreen } from "./animation.js";

const glassOverlay = document.querySelector(".glass-overlay");
const startButton = document.querySelector(".start-button")
const pauseButton = document.querySelector(".pause-button")
var downSound = new Audio('./assets/audio/down.mp3');
var clearRowSound = new Audio('./assets/audio/cleanRow01.mp3');
var gamoverSound = new Audio('./assets/audio/game_over.mp3');

//


//Global variables in index.html
//width = 10;
//let moveHorisontalLeftId = 0; //to stop setinterval fot move left, while pressing key
//let moveHorisontalRightId = 0;//to stop setinterval fot move rigth, while pressing key
//let isKeyDownPressed = false; //check down key for doft dropping
//let isNewDetailAppear = false; //to stop automoving down after new detail appear while pressing down key
//let rotatePosition = 0; //index of detail variant while rotation
//let currentDetail = ''; array for drowing current detail on screen
//let currentDetailPack = '';  2dArray with all variant of rotation
//let nextDetailPack = ''; //for genrating next detail
//let currentPosition = 0; //position from left edge of glass
//let field = []); //field where we draw game
//let isPaused = false; //for pausing game without interval clear
//let isSoftDropping = false; 
// let setTimeOutID = 0;	//to stop setTimeOut for completing stopDetail Function
// let timerId = 0;     //to stop setInterval for moveDown()
// let baseSpeed = 800;
// let currentSpeed = baseSpeed; 
//let softDropCounter = 0; //count lines during softdrop
//let curentDetailIndex = 0;//for detail counter monitor
//let lines = 0; -- lines dissapeared while playing
//let level = 0; -- current level
//let score = 0; -- current score
//let isGameOver = false; //flag for stop controls after gameOver

//!set special event -> do it after page load
const glass = document.querySelector(".glass")
countDetailsArr = [0,0,0,0,0,0,0];
createStartDetails();

currentDetail = currentDetailPack[rotatePosition];

currentPosition = 4;
field = Array.from(document.querySelectorAll('.glass div'));


function createStartDetails(){
	let randomDet = randomNumOfDetail();

	countDetailsArr[randomDet] = Number.parseInt(countDetailsArr[randomDet]) + 1; //add detail into array for counting, then count while create random detail
	showDetailsCounter();
	nextDetailPack = details[randomDet]
	nextDetailIndex = randomDet; //index for nex detail color
	createNewRandomDetail();
}


createScoreTableInLocalStorage()
showScoreTable();
draw();
drawNext();
drawDetailInStatisticsScreen(getMiniScreens());


//activate pause button
pauseButton.addEventListener("click", (e)=>{
		
	if(isPaused === false)
		isPaused = true
	else
		isPaused = false;
	
});

//activate start button
startButton.addEventListener("click", (e)=>{
	glassOverlay.classList.add("glass-overlay-hide")
	startGame()
});


document.addEventListener('keyup', controlList);

document.addEventListener('keydown', controlListForKeyDown);




export function startGame(){
	isPaused = false;
	timerId = setInterval(moveDown, currentSpeed);
}


function moveDown(){
	//console.log("move");

	if(!isPaused && !checkGround(currentDetail)){ //check ground under detail to prevent moving just after rotetion
		   
			stopDetail();
			clearDetail();
			currentPosition += width; //add widh to every number, and make it move down
			if(isSoftDropping){ //counting softdropping for score
				softDropCounter++;				
			}
			draw();
			//
			drawAnimationScreen();
		}
	else
		stopDetail();
	
}


function stopDetail(){
	//check 1 square under detail if it "ground"
	console.log("check stop");
	if(checkGround(currentDetail)){
		isPaused = true;
		isNewDetailAppear = true;//to prevent fast falling down after new detail was appear

		if(isSoftDropping){
			//console.log("softDrop", softDropCounter);//!del
			addScore(softDropCounter);
			isSoftDropping = false;
			softDropCounter = 0;
			
		}
		console.log("setId before", setTimeOutID);
		
			setTimeOutID = setTimeout(function(){ //pause before new detail to make move current detail on "ground"
				makeDetailUnmovable();//add class GROUND to detail to stop it 
			}, 100); //Lock Delay
	
		
		console.log("setId after", setTimeOutID);
	}

}	
function makeDetailUnmovable(){
	if(isPaused && checkGround(currentDetail)){
		//console.log("make unmovable", currentPosition);
		currentDetail.forEach(element => { //draw figure on field with class ground
		field[currentPosition + element].classList.add("ground")
		});
		
		if(checkFullRow() === 0){
			playShortSound(downSound);
		}
		else {
			playShortSound(clearRowSound);
		}		
		showDetailsCounter();//update detail counter screen
		createNewRandomDetail()
		drawNext();
		//restart the position
		currentPosition = 4;
		
		changeSpeed(baseSpeed);		
		
		//isKeyDownPressed = false;//--to prevent fast falling down after new detail was appear
		draw();
		gameOver();
		isPaused = false;
		
		setTimeout(function(){ 
			//isKeyDownPressed = false;
			isNewDetailAppear = false;
			}, 10);
	}
	else{
		isPaused = false;
		
	}	
}



function checkFullRow(){
	let rows = 0;
	
	for(let i = 0; i < field.length-10; i+=width){
		let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8,i+9]
		//check all row in fild for ground
		if(row.every(index => field[index].classList.contains('ground'))){
			
			clearRow(row);
			
			
			let splicedRow = field.splice(i, width);//slice row which was filled
			field = splicedRow.concat(field)//move row on top of glass
			field.forEach(cell => glass.appendChild(cell));//insert all new cell into glass
			rows++;
		}	
		
	}
	
	scoreCounter(rows);
	linesCounter(rows); //lines is a global rows counter
	speedCounter();
	
	if(rows > 0){ //for sound choosing
		return 1
	}
	else return 0;

}

function gameOver(){	
	if(isCurrentDetailGetOccupiedPlace(currentDetail)){
		
		clearInterval(timerId); //stop moving
		timerId = null;//stop moving
		currentDetail.forEach(element => { //draw figure on field with class ground
			field[currentPosition + element].classList.add("ground")
		});
		setScoreInScoreTableLocalstorage()
		showScoreTable();
		isPaused = true;
		isGameOver = true;
		//show gameOver screen
		showGameOverScreen()
		
		console.log("finish");

		// setTimeout(function(){ //little pause for playing sound
		// 	location.reload();
		// }, 500);
		console.log("isPaused = ", isPaused);
	}
}


const playAgainButton = document.querySelector(".play-again-button")

//reload page to start the game
playAgainButton.addEventListener('click', (event)=>{
	 setTimeout(function(){ //little pause for playing sound
			location.reload();
		 }, 50);
});

function showGameOverScreen(){
	glassOverlay.classList.remove("glass-overlay-hide")
	playShortSound(gamoverSound);
	document.querySelector(".score-final").innerHTML = score;
	document.querySelector(".lines-final").innerHTML = lines;
	document.querySelector(".level-final").innerHTML = level;

	document.querySelector(".final-scores-screen").classList.add("show-final-scores");
	playAgainButton.classList.add("play-again-button-show");
	document.querySelector(".start-button").classList.add("start-button-hide");	
}

