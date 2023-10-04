import { setFieldCoordinate } from "./utils.js";
import { details } from "./details.js";


console.log("Hello world!");

const button1 = document.querySelector(".but1")
const button2 = document.querySelector(".but2")
const button3 = document.querySelector(".but3")
const button4 = document.querySelector(".but4")
//
const glass = document.querySelector(".glass")
export let field = Array.from(document.querySelectorAll('.glass div'));

console.log(Array.isArray(field));

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
		//check full row
		checkFullRow();

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
	//console.log("random", randomNum); //!del
	return  randomNum;
}

function checkFullRow(){
	for(let i = 0; i < field.length-10; i+=width){
		let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8,i+9]
		//check all row in fild for ground
		if(row.every(index => field[index].classList.contains('ground'))){
			
			clearRow(row);
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