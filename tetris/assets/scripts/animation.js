

const animationScreen = document.querySelector(".animation-screen");
let animationScreenPixels = fillAnimationScreen();
let toggler = false; //!del
let currentMarioFrame = 0;
let animationOn = true;

//frames with ccordinate for image pixels for 3 colors 
let mario01fr = [[5,6,7,8,9,19,20,21,22,23,24,25,26,27,112,127,128,141,142,144,145,157,158,159,160,173,174,175,184,188,189,200,201,202],
				[34,35,36,39,48,50,54,63,65,66,70,78,79,84,85,86,87,109,110,111,113,114,123,124,125,126,129,130,138,139,140,153,154,155,156,168,169,170,185,203,204,205,215,216,217,218],
				[37,38,40,49,51,52,53,55,56,57,64,67,68,69,71,72,73,80,81,82,83,95,96,97,98,99,100,101,143,171,172,186,187]] 

let mario02fr = [[5,6,7,8,9,10,11,12,13,98,99,114,140,155,156,157,158,159,160,161,169,170,171,172,173,174,175,176,184,185,188,189,190],
				[19,20,21,24,33,35,39,48,50,51,55,63,64,69,70,71,72,96,97,100,110,111,112,113,115,125,126,127,128,129,130,141,142,143,144,145,153,154,168,182,183,197,202,203,204,218,219,220],
				[22,23,25,34,36,37,38,40,41,42,49,52,53,54,56,57,58,65,66,67,68,80,81,82,83,84,85,86,124,131,132,133,138,139,146,147]]

let mario03fr = [[5,6,7,8,9,19,20,21,22,23,24,25,26,27,112,127,128,141,142,144,145,157,158,159,160,173,174,175,184,188,189,200,201,202],
				[34,35,36,39,48,50,54,63,65,66,70,78,79,84,85,86,87,109,110,111,113,114,123,124,125,126,129,130,138,139,140,153,154,155,156,168,169,170,185,203,204,205,215,216,217,218],
				[37,38,40,49,51,52,53,55,56,57,64,67,68,69,71,72,73,80,81,82,83,95,96,97,98,99,100,101,143,171,172,186,187]] 


let mario04fr = [[4,5,6,7,8,9,10,11,12,96,100,111,112,116,126,127,128,129,130,131,139,140,141,143,144,145,153,154,155,156,157,158,159,160,161,162,167,168,169,170,171,172,173,174,175,176,177,183,184,185,190,191,192],
				[19,20,21,24,33,35,39,48,50,51,55,63,64,69,70,71,72,92,93,94,95,97,98,99,107,108,109,110,113,114,115,117,124,125,132,133,149,163,164,178,179,181,182,193,194,196,197,198,212,213,214],
				[22,23,25,34,36,37,38,40,41,42,49,52,53,54,56,57,58,65,66,67,68,80,81,82,83,84,85,86,105,106,118,119,120,121,122,134,135,136,142,146]]

let marioAnimation = [mario01fr, mario02fr, mario03fr, mario04fr];			

//add field of div into screen, to keep html clear
export function fillAnimationScreen(){
	for (let i = 0; i < 225; i++) {
		const div_empty = document.createElement('div');
		animationScreen.append(div_empty)
	}
	
	return Array.from(document.querySelectorAll(".animation-screen div"))
}


document.querySelector(".stop-animation-button").addEventListener("click", (event)=>{
	if(animationOn)
		animationOn = false;
	else
	animationOn = true;
});

export function drawAnimationScreen(){
	//clear
	if(animationOn){
		animationScreenPixels.forEach(element => element.classList.remove("light-blue-micro", "blue-micro", "white-micro"))
	
		marioAnimation[currentMarioFrame][0].forEach(element=>{
			animationScreenPixels[element].classList.add("light-blue-micro")
		})
		marioAnimation[currentMarioFrame][1].forEach(element=>{
			animationScreenPixels[element].classList.add("blue-micro")
		})
		marioAnimation[currentMarioFrame][2].forEach(element=>{
			animationScreenPixels[element].classList.add("white-micro")
		})
		if(currentMarioFrame === 3){
			currentMarioFrame = 0;
		}
		else 
			currentMarioFrame++;
	}
	
}


//!del
export function drawAnimationScreenTesting(){
	if(toggler){
		animationScreenPixels.forEach(element => {
		element.classList.remove("blue-mini")
		});

		animationScreenPixels.forEach(element => {
		element.classList.add("white-mini")
		});
		
		toggler=false
	}
	else if(!toggler){
		animationScreenPixels.forEach(element => {
			element.classList.remove("white-mini")
			});
	
			animationScreenPixels.forEach(element => {
			element.classList.add("blue-mini")
			});
			
			toggler=true;
	}

}
