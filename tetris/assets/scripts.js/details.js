// import { width } from "./mainScript.js";

console.log("width", width);

 const l_detail = [[1, 2, width + 1, width * 2 + 1],
				[width, width + 1, width + 2, width * 2 + 2],
				[width * 2, width * 2 + 1, width + 1, 1],
				[width, width * 2,  width * 2 + 1, width * 2 + 2]];

				
 const zl_detail = [[width * 2, width * 2 + 1,  width * 1 + 1, width * 1 + 2],
						[0, width,  width * 1 + 1, width * 2 + 1],
						[width * 2, width * 2 + 1,  width * 1 + 1, width * 1 + 2],
						[0, width,  width * 1 + 1, width * 2 + 1]];

 const zr_detail = [[width, width + 1,  width * 2 + 1, width * 2 + 2],
						[2, width + 1,  width * 1 + 2, width * 2 + 1],
						[width, width + 1,  width * 2 + 1, width * 2 + 2],
						[2, width + 1,  width * 1 + 2, width * 2 + 1]];		
						
 const t_detail =	[[1, width,  width + 1, width + 2],
						[1, width + 1,  width + 2, width * 2 + 1],
						[width, width + 1,  width + 2, width * 2 + 1],
						[1, width,  width + 1, width * 2 + 1]];	

 const cube_detail =	[[0, 1,  width, width + 1],
							[0, 1,  width, width + 1],
							[0, 1,  width, width + 1],
							[0, 1,  width, width + 1]];	

 const stick_detail =	[[1, width + 1,  width * 2 + 1, width * 3 + 1],
							[width, width + 1,  width + 2, width + 3],
							[1, width + 1,  width * 2 + 1, width * 3 + 1],
							[width, width + 1,  width + 2, width + 3]];	

export const details = [l_detail, zl_detail, zr_detail, t_detail, cube_detail, stick_detail];