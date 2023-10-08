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
export let field = Array.from(document.querySelectorAll('.glass div'));

let setTimeOutID = 0;
let timerId = 0;
let moveHorisontalLeftId = 0;
let moveHorisontalRightId = 0;
let baseSpeed = 500;
let currentSpeed = baseSpeed;
let currentPosition = 4;
let rotatePosition = 0;
let currentDetailPack = details[randomNumOfDetail()]
let currentDetail = currentDetailPack[rotatePosition];
let score = 0;


//Global variables in index.html
//width = 10;

setFieldCoordinate();
createScoreTableInLocalStorage()
showScoreTable();

let isPaused = false;

button1.addEventListener("click", (e)=>{
	//moveLeft();
	//testdraw()
	//(e).preventDefault();

	setScoreInScoreTableLocalstorage(score);
	showScoreTable();
	
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

//////////////

// function testdraw(det){
// 	let testDet = det[3];
	
// 	for (let i = 0; i < testDet.length; i++) {
// 		const element = testDet[i];
// 		field[element].classList.add("detail")
// 	}
// }
// testdraw(stick_detail)


function clearDetail(){
	currentDetail.forEach(element => {
		field[currentPosition + element].classList.remove("detail")
	});
}

function startGame(){
	timerId = setInterval(moveDown, currentSpeed);
}


function moveDown(){
	if(!isPaused && !checkGround(currentDetail)){ //check ground under detail to prevent moving just after rotetion
		    stopDetail();
			clearDetail();
			currentPosition += width; //add widh to every number, and make it move down
			draw();
			stopDetail();
			//
	}
	else
		stopDetail();
	
	
}



function stopDetail(){
	//check 1 square under detail if it "ground"
	if(checkGround(currentDetail)){
		isPaused = true;
		setTimeOutID = setTimeout(function(){ //pause before new detail to make move current detail on "ground"
			makeDetailUnmovable();//add class GROUND to detail to stop it 
		}, currentSpeed / 1.3);
		
	}

}	
function makeDetailUnmovable(){
	if(isPaused && checkGround(currentDetail)){
		//console.log("make unmovable", currentPosition);
		currentDetail.forEach(element => { //draw figure on field with class ground
		field[currentPosition + element].classList.add("ground")
		});
		checkFullRow();		
		//create new random detail
		currentDetailPack = details[randomNumOfDetail()];
		rotatePosition = 0;
		currentDetail = currentDetailPack[rotatePosition];
		//restart the position
		currentPosition = 4;
		
		changeSpeed(baseSpeed);
		
		draw();
		gameOver();
		isPaused = false;
	}
	else{
		isPaused = false;
	}
	
	
}
//!del
// function makeDetailUngroundAfterRotation(){
	
// 	currentDetail.forEach(element => { //draw figure on field with class ground
// 		field[currentPosition + element].classList.remove("ground")
// 	});
// }

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
		//console.log("forbid rotate");
		return false;
	 }
	 else return true;


}



//check what key was pressed and do action
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
		rotate();
	}	
	else if(event.keyCode === 40){
		changeSpeed(baseSpeed)
	}
}

function changeSpeedButtonController(event){
	if(event.keyCode === 37	){
		moveLeft();
		if(moveHorisontalLeftId === null){ //preventing multiply SETINTERVAl
			moveHorisontalLeftId = setInterval(moveLeft, 150);
		}
		
	}
	else if(event.keyCode === 39){
		moveRight();
		if(moveHorisontalRightId === null){//preventing multiply SETINTERVAl
			moveHorisontalRightId = setInterval(moveRight, 150);
		}
		
	}

	if(event.keyCode === 40){
		console.log("keyDown")
		changeSpeed(40)
	}
}
//add event listener to catch all keyUp
document.addEventListener('keyup', controlList);

document.addEventListener('keydown', changeSpeedButtonController);

function changeSpeed(newSpeed){
	clearInterval(timerId);
	currentSpeed = newSpeed;
	startGame()
}


function randomNumOfDetail(){
	let randomNum = Math.floor(Math.random() * details.length)

	return  randomNum;
}

function checkFullRow(){
	for(let i = 0; i < field.length-10; i+=width){
		let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8,i+9]
		//check all row in fild for ground
		if(row.every(index => field[index].classList.contains('ground'))){
			
			clearRow(row);
			addScore();
			
			let splicedRow = field.splice(i, width);//slice row which was filled
			field = splicedRow.concat(field)//move row on top of glass
			field.forEach(cell => glass.appendChild(cell));//insert all new cell into glass
		
		}	
		
	}
	
}

//remove classes detail or ground from cell in glass
function clearRow(row){
	row.forEach((element)=>{
		field[element].classList.remove("ground");
		field[element].classList.remove("detail");
	});
}

function addScore(){
	score += 10;
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
		console.log("move left - ", setTimeOutID, isPaused);
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

