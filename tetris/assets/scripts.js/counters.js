import { addScore } from "./utils.js";

const linesField = document.querySelector(".lines")
const levelField = document.querySelector(".level")
const speedField = document.querySelector(".speed")
let lines = 0;
let previousLevel = 0
let level = 0;

//count score dependin on lines was dissapiared and level
export function scoreCounter(lines){
	//console.log("lines", lines);
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
export function linesCounter(linesLocal){
	lines += linesLocal;
	previousLevel = level;//for speed checking
	level = Math.floor(lines / 10);
	linesField.innerHTML = lines; //show lines and level for player
	levelField.innerHTML = level;
}
//make speed as in classical nintendo game (just more simplier ))
export function speedCounter(){
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