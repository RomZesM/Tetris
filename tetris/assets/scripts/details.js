// import { width } from "./mainScript.js";

 //[[width, width+1, width+2, width *2 + 2],
const lr_detail = [[0, 1, 2, width + 2],
				[width * 2, width * 2 + 1, width + 1, 1],
				[0, width,  width + 1, width + 2],
				[1, 2, width + 1, width * 2 + 1]];	
	
const ll_detail = [[0, 1, 2, width],
				[0, 1, width + 1, width * 2 + 1],
				[2, width,  width + 1, width + 2],
				[1, width *2 + 2, width + 1, width * 2 + 1]]				
				

				
const zr_detail = [[1 , 2,  width, width + 1],
				[1, width + 1,  width + 2, width * 2 + 2],
				[width * 2, width * 2 + 1,  width * 1 + 1, width * 1 + 2],
				[1, width + 1,  width + 2, width * 2 + 2]];

 const zl_detail = [[0, 1,  width + 1, width + 2],
						[2, width + 1,  width * 1 + 2, width * 2 + 1],
						[width, width + 1,  width * 2 + 1, width * 2 + 2],
						[2, width + 1,  width * 1 + 2, width * 2 + 1]];		
						
const t_detail =	[[0, 1,  2, width + 1],
						[1, width,  width + 1, width * 2 + 1],
						[1, width,  width + 1, width + 2],
						[1, width + 1,  width + 2, width * 2 + 1]];	

 const cube_detail =	[[0, 1,  width, width + 1],
							[0, 1,  width, width + 1],
							[0, 1,  width, width + 1],
							[0, 1,  width, width + 1]];	
//[[width * 2, width * 2 + 1,  width * 2 + 2, width * 2 + 3],
const stick_detail =	[[0, 1, 2, 3],
							[2, width + 2,  width * 2 + 2, width * 3 + 2],
							[width * 2, width * 2 + 1,  width * 2 + 2, width * 2 + 3],
							[2, width + 2,  width * 2 + 2, width * 3 + 2]];	

export const details = [t_detail, 
						lr_detail, 
						zl_detail,
						 cube_detail, 
						  zr_detail, 
						  ll_detail, 
						  stick_detail];


// function testdraw(det){
// 	let testDet = det[3];
	
// 	for (let i = 0; i < testDet.length; i++) {
// 		const element = testDet[i];
// 		field[element].classList.add("detail")
// 	}
// }
// testdraw(stick_detail)