console.log("Hello world!");

const button1 = document.querySelector(".but1")
const button2 = document.querySelector(".but2")
const button3 = document.querySelector(".but3")
const button4 = document.querySelector(".but4")
let timerId = 0;
const field = document.querySelectorAll('.glass div');
let width = 10;
let speed = 250;

button1.addEventListener("click", (e)=>{
	moveLeft();
	
	
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
//!del after all
function setFieldCoordinate(){
	for (let i = 0; i < field.length; i++) {
		const element = field[i];
		element.innerHTML = `${i}`;		
	}
}
setFieldCoordinate();





let l_detail = [1, 2, width + 1, width * 2 + 1];

let currentPosition = 4;
let currentDetail = l_detail;

console.log(currentDetail);

function draw(){
	for (let i = 0; i < currentDetail.length; i++) {
		const element = currentDetail[i];
		field[currentPosition + element].classList.add("detail")
	}
}

function clearDetail(){
	currentDetail.forEach(element => {
		field[currentPosition + element].classList.remove("detail")
	});
}

function startGame(){
	timerId = setInterval(moveDown, speed);
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
		//create new random detail	
		currentDetail = l_detail;
		//restart the position
		currentPosition = 4;
		
		changeSpeed(250);
		
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

//check what key was pressed and do action
function controlList(event){
	if(event.keyCode === 37	){
		moveLeft();
	}
	else if(event.keyCode === 39){
		moveRight();
	}
	else if(event.keyCode === 40){
		changeSpeed(20)
	}
}
//add event listener to catch all keyUp
document.addEventListener('keyup', controlList);


function changeSpeed(newSpeed){
	clearInterval(timerId);
	speed = newSpeed;
	startGame()
}

