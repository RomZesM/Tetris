import { setFieldCoordinate, setScoreInScoreTableLocalstorage, showScoreTable } from "./utils.js";
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


const button1 = document.querySelector(".but1")
const button2 = document.querySelector(".but2")
const button3 = document.querySelector(".but3")
const button4 = document.querySelector(".but4")
//
const glass = document.querySelector(".glass")
const scoreField = document.querySelector(".score")
const linesField = document.querySelector(".lines")
const levelField = document.querySelector(".level")
const speedField = document.querySelector(".speed")


let score = 0;
let lines = 0;
let previousLevel = 0
let level = 0;




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

//!set special event -> do it after page load

currentDetailPack = details[randomNumOfDetail()]
currentDetail = currentDetailPack[rotatePosition];
nextDetailPack = details[randomNumOfDetail()];
currentPosition = 4
field = Array.from(document.querySelectorAll('.glass div'))



setFieldCoordinate();
createScoreTableInLocalStorage()
showScoreTable();
draw();
drawNext();



button1.addEventListener("click", (e)=>{
	drawNext()
});

button2.addEventListener("click", (e)=>{
	isPaused = false;
});

button3.addEventListener("click", (e)=>{
	clearInterval(timerId);

});

button4.addEventListener("click", (e)=>{
	startGame()
});


document.addEventListener('keyup', controlList);

document.addEventListener('keydown', controlListForKeyDown);


export function startGame(){
	timerId = setInterval(moveDown, currentSpeed);
}


function moveDown(){
	//console.log("is new det appear move down", isNewDetailAppear);
	if(!isPaused && !checkGround(currentDetail)){ //check ground under detail to prevent moving just after rotetion
		   
			stopDetail();
			clearDetail();
			currentPosition += width; //add widh to every number, and make it move down
			if(isSoftDropping){ //counting softdropping for score
				softDropCounter++;				
			}
			draw();
			//stopDetail();
			//
	}
	else
		stopDetail();
	
}


function stopDetail(){
	//check 1 square under detail if it "ground"
	if(checkGround(currentDetail)){
		isPaused = true;
		isNewDetailAppear = true;//to prevent fast falling down after new detail was appear

		if(isSoftDropping){
			console.log("softDrop", softDropCounter);
			addScore(softDropCounter);
			isSoftDropping = false;
			softDropCounter = 0;
		}
		
		setTimeOutID = setTimeout(function(){ //pause before new detail to make move current detail on "ground"
			makeDetailUnmovable();//add class GROUND to detail to stop it 
		}, baseSpeed / 1.4); //Lock Delay for half a second or 30 frames
		
	}

}	
function makeDetailUnmovable(){
	if(isPaused && checkGround(currentDetail)){
		//console.log("make unmovable", currentPosition);
		currentDetail.forEach(element => { //draw figure on field with class ground
		field[currentPosition + element].classList.add("ground")
		});
		checkFullRow();		
		createNewRandomDetail()
		drawNext();
		//restart the position
		currentPosition = 4;
		
		changeSpeed(baseSpeed);		
		
		isKeyDownPressed = false;//--to prevent fast falling down after new detail was appear
		draw();
		gameOver();
		isPaused = false;
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
}

//remove classes detail or ground from cell in glass
function clearRow(row){
	row.forEach((element)=>{
		field[element].classList.remove("ground");
		field[element].classList.remove("detail");
	});
}
//count score dependin on lines was dissapiared and level
function scoreCounter(lines){
	console.log("lines", lines);
	let scoresLocal = 0;
	if(lines === 1){
		scoresLocal = 40 * (level + 1);
	}
	else if(lines === 2){
		scoresLocal = 100 * (level + 1);
	}
	else if(lines === 3){
		scoresLocal = 300 * (level + 1);
	}
	else if(lines === 4){
		scoresLocal = 1200 * (level + 1);
	}
	addScore(scoresLocal);
}

//count lines and increase level
function linesCounter(linesLocal){
	lines += linesLocal;
	previousLevel = level;//for speed checking
	level = Math.floor(lines / 10);
	linesField.innerHTML = lines; //show lines and level for player
	levelField.innerHTML = level;
}
//make speed as in classical nintendo game (just more simplier ))
function speedCounter(){
	if(previousLevel != level){
		if(level < 8){
			baseSpeed -= 84;
		}
		else if(level === 8)
			baseSpeed -= 84;
		else if(level === 9)
			baseSpeed = 100;
		else if(level > 9 && level < 29)
			baseSpeed -= 17;
		else if(level >= 29)
			baseSpeed = 16;
	}

	speedField.innerHTML = baseSpeed;
}

function addScore(amount){
	score += amount;
	scoreField.innerHTML = score;
}

function gameOver(){	
	if(isCurrentDetailGetOccupiedPlace(currentDetail)){
		
		clearInterval(timerId);
		timerId = null;
		currentDetail.forEach(element => { //draw figure on field with class ground
			field[currentPosition + element].classList.add("ground")
		});
		setScoreInScoreTableLocalstorage(score)
		showScoreTable();
		isPaused = true;
		console.log("finish");
	}
}

