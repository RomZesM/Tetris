import { setFieldCoordinate, setScoreInScoreTableLocalstorage, showScoreTable } from "./utils.js";
import { details } from "./details.js";
import { createScoreTableInLocalStorage } from "./utils.js";


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
export let field = Array.from(document.querySelectorAll('.glass div'));
let nextScreen = Array.from(document.querySelectorAll('.nextDetailScreen div'));

let setTimeOutID = 0;			//to stop setTimeOut for completing stopDetail Function
let timerId = 0;             //to stop setInterval for moveDown()
let moveHorisontalLeftId = 0; //to stop setinterval fot move left, while pressing key
let moveHorisontalRightId = 0;//to stop setinterval fot move left, while pressing key
let isNewDetailAppear = false; //to stop automoving down after new detail appear while pressing down key

let baseSpeed = 800;
let currentSpeed = baseSpeed; 

let currentPosition = 4; //position from left edge of glass
let rotatePosition = 0;
let nextDetailIndex = 0;
let currentDetailPack = details[randomNumOfDetail()]
let currentDetail = currentDetailPack[rotatePosition];
let nextDetailPack = details[randomNumOfDetail()];
let sScreenWidth = 4; //with for second screen with next detail
let detailsForSmallScreen = [[0,1,2,sScreenWidth],
							[0,1,2, sScreenWidth + 2],
							[1,2,sScreenWidth, sScreenWidth+1],
							[0,1, sScreenWidth + 1, sScreenWidth + 2],
							[0,1,2, sScreenWidth+1],
							[0,1,sScreenWidth, sScreenWidth+1],
							[sScreenWidth,sScreenWidth+1,sScreenWidth+2,sScreenWidth+3],[]]


let score = 0;
let lines = 0;
let previousLevel = 0
let level = 0;
let softDropCounter = 0;
let isSoftDropping = false;


//Global variables in index.html
//width = 10;

setFieldCoordinate();
createScoreTableInLocalStorage()
showScoreTable();
draw();
drawNext();

let isPaused = false;

button1.addEventListener("click", (e)=>{
	//moveLeft();
	//testdraw()
	//(e).preventDefault();

	// setScoreInScoreTableLocalstorage(score);
	// showScoreTable();
	drawNext()
});

button2.addEventListener("click", (e)=>{
	//(e).preventDefault();
	isPaused = false;

});




button3.addEventListener("click", (e)=>{
	clearInterval(timerId);

});

button4.addEventListener("click", (e)=>{
	startGame()

});


function draw(){
	for (let i = 0; i < currentDetail.length; i++) {
		const element = currentDetail[i];
		field[currentPosition + element].classList.add("detail")
	}
}



////////////
function drawNext(){
	//CLEAR screen
	nextScreen.forEach((element)=>{
		element.classList.remove("detail");
	});


	let testDet = detailsForSmallScreen[nextDetailIndex];
		
	for (let i = 0; i < testDet.length; i++) {
		const element = testDet[i];
		nextScreen[element].classList.add("detail")
	}
}



function clearDetail(){
	currentDetail.forEach(element => {
		field[currentPosition + element].classList.remove("detail")
	});
}

function startGame(){
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
		
		// if(isSoftDropping){
		// 	console.log(softDropCounter);
		// 	addScore(softDropCounter);
		// 	isSoftDropping = false;
		// 	softDropCounter = 0;
		// }
		gameOver();
		isPaused = false;
	}
	else{
		isPaused = false;
	}
	
	
}

function createNewRandomDetail(){
		currentDetailPack = nextDetailPack;
		nextDetailPack = details[randomNumOfDetail()];
		
		rotatePosition = 0;
		currentDetail = currentDetailPack[rotatePosition];
		


}


function rotate(){
	if(checkRotation()){
		
		clearDetail()
			if(rotatePosition === 3){
				rotatePosition = 0;
			}
			else{rotatePosition++;};
				
			currentDetail = currentDetailPack[rotatePosition];
			
			draw();
		
		//check if there a free squares under detail after rotation and unpause
		if(!checkGround(currentDetail) && isPaused){
			
			clearTimeout(setTimeOutID);
			setTimeOutID = null;
			isPaused = false;
			
		}
		
		
	}

}

function checkRotation(){
	//create a copy of detail to check future possible position
	let rotationPosStub = rotatePosition;
	let currentDetailStub = currentDetail;
	
	if(rotationPosStub === 3){
		rotationPosStub = 0;
	}
	else{
		rotationPosStub++;
	}	
	 currentDetailStub = currentDetailPack[rotationPosStub];

	//check if two detail doesn't have common square and doest take two edges simultaneusly
	if(isCurrentDetailGetOccupiedPlace(currentDetailStub) ||
	 (isAtLeftEgde(currentDetailStub) && isAtRigthEdge(currentDetailStub))){
		
		return false;
	 }
	 else return true;


}
let isKeyDownPressed = false;

//check what key was pressed and do action shoot when RELEASE key
function controlList(event){
	if(event.keyCode === 37	){
		//moveLeft();
		clearInterval(moveHorisontalLeftId);
		moveHorisontalLeftId = null;
	}
	else if(event.keyCode === 39){
		//moveRight();
		clearInterval(moveHorisontalRightId);
		moveHorisontalRightId = null;
		
	}
	else if(event.keyCode === 38){
		
		isNewDetailAppear = false; //prevent breaking fastDown after rotation (dont remember why)
		rotate();
	}	
	else if(event.keyCode === 40){
		isKeyDownPressed = false;
		isNewDetailAppear = false;
		changeSpeed(baseSpeed)
		//stop softdropping when release down button, clear softDrop score
		isSoftDropping = false;
		softDropCounter = 0;
		console.log("key down release, is new detail", isNewDetailAppear);
	}
}
//check what key was pressed and do action, shoot when PRESS key
function controlListForKeyDown(event){
	if(event.keyCode === 37	){
		moveLeft();
		if(moveHorisontalLeftId === null){ //preventing multiply SETINTERVAl
			moveHorisontalLeftId = setInterval(moveLeft, 100);
		}
		
	}
	else if(event.keyCode === 39){
		moveRight();
		if(moveHorisontalRightId === null){//preventing multiply SETINTERVAl
			moveHorisontalRightId = setInterval(moveRight, 100);
		}
		
	}

	if(event.keyCode === 40){
		//console.log("key down press ", isNewDetailAppear);
		if(!isNewDetailAppear && !isKeyDownPressed){
			isKeyDownPressed = true;
			isSoftDropping = true; //for counting greed of soft dropping
			changeSpeed(40)
		}
		console.log("key down press, isSoftDropping ", isSoftDropping);
	}
}
//add event listener to catch all keyUp
document.addEventListener('keyup', controlList);

document.addEventListener('keydown', controlListForKeyDown);

function changeSpeed(newSpeed){
	//console.log("set speed: ", newSpeed);
	clearInterval(timerId);
	currentSpeed = newSpeed;
	startGame()
}


function randomNumOfDetail(){
	let randomNum = Math.floor(Math.random() * details.length)
	nextDetailIndex = randomNum; //for showing next detail in mini window
	return  randomNum;
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

function isCurrentDetailGetOccupiedPlace(detail){
	return detail.some(element => field[currentPosition + element].classList.contains('ground'));
}

function isAtRigthEdge(detail){
	return detail.some(element => (currentPosition + element + 1) % width === 0)
}

function isAtLeftEgde(detail){
	return detail.some(element => (currentPosition + element) % width === 0)
}

function checkGround(detail){

	if(detail.some(index => field[currentPosition + index + width].classList.contains('ground'))){
		return true
	}
	else 
		return false;
}

function moveLeft(){
	clearDetail();
	if(!isAtLeftEgde(currentDetail)){
		currentPosition--;
	}
	if(isCurrentDetailGetOccupiedPlace(currentDetail)){
		currentPosition++;
	}
	draw()
	//check ground after moving and unpause if necessary
	if(!checkGround(currentDetail) && isPaused){		
		clearTimeout(setTimeOutID);
		setTimeOutID = null;
		isPaused = false;
		
	}
}


function moveRight(){
	clearDetail()
	if(!isAtRigthEdge(currentDetail)){
		currentPosition++;
	}
	if(isCurrentDetailGetOccupiedPlace(currentDetail)){
		currentPosition--;
	}
	draw()
	//check ground after moving and unpause if necessary
	if(!checkGround(currentDetail) && isPaused){	
		clearTimeout(setTimeOutID);
		setTimeOutID = null;
		isPaused = false;
		
	}
}
//

