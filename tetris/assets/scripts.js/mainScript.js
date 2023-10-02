console.log("Hello world!");

const button1 = document.querySelector(".but1")
const button2 = document.querySelector(".but2")
const button3 = document.querySelector(".but3")
const button4 = document.querySelector(".but4")
let timerId = 0;

button1.addEventListener("click", (e)=>{
	clearDetail()
	currentPosition--;
	
});

button2.addEventListener("click", (e)=>{
		clearDetail()
	currentPosition++;

});

button3.addEventListener("click", (e)=>{
	clearInterval(timerId);

});

button4.addEventListener("click", (e)=>{
	startGame()

});



const field = document.querySelectorAll('.glass div');
let width = 10;

console.log(field.length);

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
	timerId = setInterval(moveDown, 250);
}


function moveDown(){
	clearDetail();
	currentPosition += width; //add widh to every number, and make it move down
	draw();
	stopDetail();
}

function stopDetail(){
	//check 1 squere under detail if it "ground"
	if(currentDetail.some(index => field[currentPosition + index + width].classList.contains('ground'))){
		currentDetail.forEach(element => { //draw figure on field with class grund
			field[currentPosition + element].classList.add("ground")
		});

	//create new random detail	
	currentDetail = l_detail;
	//restart the position
	currentPosition = 4;
	draw();
	}
}

	



