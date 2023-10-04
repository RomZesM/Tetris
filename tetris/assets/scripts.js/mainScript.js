import { setFieldCoordinate } from "./utils.js";
import { details } from "./details.js";


console.log("Hello world!");

const button1 = document.querySelector(".but1")
const button2 = document.querySelector(".but2")
const button3 = document.querySelector(".but3")
const button4 = document.querySelector(".but4")
//
export const field = document.querySelectorAll('.glass div');
let timerId = 0;


let baseSpeed = 1000;
let currentSpeed = baseSpeed;
let currentPosition = 4;
let rotatePosition = 0;
let currentDetailPack = details[randomNumOfDetail()]
let currentDetail = currentDetailPack[rotatePosition];


//Global variables in index.html
//width = 10;


setFieldCoordinate();
console.log(currentDetail);

button1.addEventListener("click", (e)=>{
	//moveLeft();
	testdraw()
	
});

button2.addEventListener("click", (e)=>{
	moveRight()

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

// function testdraw(){
// 	let testDet = [width, width + 1,  width + 2, width + 3];
	
// 	for (let i = 0; i < testDet.length; i++) {
// 		const element = testDet[i];
// 		field[element].classList.add("detail")
// 	}
// }


function clearDetail(){
	currentDetail.forEach(element => {
		field[currentPosition + element].classList.remove("detail")
	});
}

function startGame(){
	timerId = setInterval(moveDown, currentSpeed);
}


function moveDown(){
	clearDetail();
	currentPosition += width; //add widh to every number, and make it move down
	draw();
	stopDetail();
}

function stopDetail(){
	//check 1 square under detail if it "ground"
	if(currentDetail.some(index => field[currentPosition + index + width].classList.contains('ground'))){
		currentDetail.forEach(element => { //draw figure on field with class ground
			field[currentPosition + element].classList.add("ground")
		});
		//create new random detail	//todo
		currentDetailPack = details[randomNumOfDetail()];
		rotatePosition = 0;
		currentDetail = currentDetailPack[rotatePosition];
		//restart the position
		currentPosition = 4;
		
		changeSpeed(baseSpeed);
		
		draw();
	
	}

}	

function moveLeft(){
	clearDetail();
	//check if some part of detail is on the left edge of the glass (10, 20, 30 etc)
	if(currentDetail.some(element => (currentPosition + element + width) % width === 0)){
		currentPosition++;
		console.log(" left edge");
	}
	currentPosition--;
	
	if(currentDetail.some(element => field[currentPosition + element].classList.contains('ground'))){
		currentPosition++;
		console.log("ground on the left");
	 }
	 draw()

}	

function moveRight(){
	clearDetail();
	//check if some part of detail is on the right edge of the glass (10, 20, 30 etc)
	if(currentDetail.some(element => (currentPosition + element + 1) % width === 0)){
		currentPosition--;
		console.log("rigth edge");
	}
	currentPosition++;
	 if(currentDetail.some(element => field[currentPosition + element].classList.contains('ground'))){
		currentPosition--;
		console.log("ground on the right");
	 }
	 draw()
}

function rotate(){
	clearDetail()
	if(rotatePosition === 3){
		rotatePosition = 0;
	}
	else
		rotatePosition++;
	currentDetail = currentDetailPack[rotatePosition];
	draw();
}

//check what key was pressed and do action
function controlList(event){
	if(event.keyCode === 37	){
		moveLeft();
	}
	else if(event.keyCode === 39){
		moveRight();
	}
	else if(event.keyCode === 38){
		rotate();
	}

	
	else if(event.keyCode === 40){
		changeSpeed(20)
	}
}
//add event listener to catch all keyUp
document.addEventListener('keyup', controlList);


function changeSpeed(newSpeed){
	clearInterval(timerId);
	currentSpeed = newSpeed;
	startGame()
}


function randomNumOfDetail(){
	let randomNum = Math.floor(Math.random() * details.length)
	console.log("random", randomNum);
	return  randomNum;
}