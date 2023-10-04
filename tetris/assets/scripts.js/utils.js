//!del after all
import { field } from "./mainScript.js";

export function setFieldCoordinate(){
	for (let i = 0; i < field.length; i++) {
		const element = field[i];
		element.innerHTML = `${i}`;		
	}
}