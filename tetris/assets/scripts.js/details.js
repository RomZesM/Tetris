// import { width } from "./mainScript.js";

 
const lr_detail = [[width, width+1, width+2, width *2 + 2],
				[width * 2, width * 2 + 1, width + 1, 1],
				[0, width,  width + 1, width + 2],
				[1, 2, width + 1, width * 2 + 1]];	
	
const ll_detail = [[width, width+1, width+2, width *2],
				[0, 1, width + 1, width * 2 + 1],
				[2, width,  width + 1, width + 2],
				[1, width *2 + 2, width + 1, width * 2 + 1]]				
				

				
const zl_detail = [[width * 2, width * 2 + 1,  width * 1 + 1, width * 1 + 2],
				[1, width + 1,  width + 2, width * 2 + 2],
				[width * 2, width * 2 + 1,  width * 1 + 1, width * 1 + 2],
				[1, width + 1,  width + 2, width * 2 + 2]];

 const zr_detail = [[width, width + 1,  width * 2 + 1, width * 2 + 2],
						[2, width + 1,  width * 1 + 2, width * 2 + 1],
						[width, width + 1,  width * 2 + 1, width * 2 + 2],
						[2, width + 1,  width * 1 + 2, width * 2 + 1]];		
						
const t_detail =	[[width, width + 1,  width + 2, width * 2 + 1],
						[1, width,  width + 1, width * 2 + 1],
						[1, width,  width + 1, width + 2],
						[1, width + 1,  width + 2, width * 2 + 1]];	

 const cube_detail =	[[0, 1,  width, width + 1],
							[0, 1,  width, width + 1],
							[0, 1,  width, width + 1],
							[0, 1,  width, width + 1]];	

const stick_detail =	[[width * 2, width * 2 + 1,  width * 2 + 2, width * 2 + 3],
							[2, width + 2,  width * 2 + 2, width * 3 + 2],
							[width * 2, width * 2 + 1,  width * 2 + 2, width * 2 + 3],
							[2, width + 2,  width * 2 + 2, width * 3 + 2]];	

export const details = [ll_detail, lr_detail, zl_detail, zr_detail, t_detail, cube_detail, stick_detail];