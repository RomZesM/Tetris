
import { clearDetail, playShortSound } from "./utils.js";
import { draw } from "./utils.js";
import { checkGround } from "./utils.js";
import { changeSpeed } from "./utils.js";


var moveSound = new Audio('./assets/audio/move2.mp3');
var rotateSound = new Audio('./assets/audio/move.mp3');


export function controlListForKeyDown(event){
	if(event.keyCode === 37	){
		moveLeft();
		if(moveHorisontalLeftId === null){ //preventing multiply SETINTERVAl
			moveHorisontalLeftId = setInterval(moveLeft, 80);
		}
		
	}
	else if(event.keyCode === 39){
		moveRight();
		if(moveHorisontalRightId === null){//preventing multiply SETINTERVAl
			moveHorisontalRightId = setInterval(moveRight, 80);
		}
		
	}

	if(event.keyCode === 40){
		if(!isNewDetailAppear && !isKeyDownPressed){
			isKeyDownPressed = true;
			isSoftDropping = true; //for counting greed of soft dropping
			changeSpeed(40)
		}
		
	}
}


//check what key was pressed and do action shoot when RELEASE key
export function controlList(event){
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
		//console.log("key down release, is new detail", isNewDetailAppear);
	}
}


function rotate(){
	if(checkRotation()){
		
		clearDetail()
			if(rotatePosition === 3){
				rotatePosition = 0;
			}
			else{rotatePosition++;};
				
			currentDetail = currentDetailPack[rotatePosition];
			playShortSound(rotateSound)
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


function moveLeft(){
	clearDetail();
	if(!isAtLeftEgde(currentDetail)){
		currentPosition--;
		playShortSound(moveSound);
	
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
		playShortSound(moveSound);
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

export function isCurrentDetailGetOccupiedPlace(detail){
	return detail.some(element => field[currentPosition + element].classList.contains('ground'));
}

function isAtRigthEdge(detail){
	return detail.some(element => (currentPosition + element + 1) % width === 0)
}

function isAtLeftEgde(detail){
	return detail.some(element => (currentPosition + element) % width === 0)
}

