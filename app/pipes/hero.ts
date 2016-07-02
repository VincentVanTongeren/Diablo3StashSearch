import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name:'mediaclass',
	pure: true
})
export class ClassPipe implements PipeTransform {

	transform(value:any, filter:string){
        return (value == "crusader" ? "x1_" : "") + value;
	}
}

@Pipe({
	name:'gender',
	pure: true
})
export class GenderPipe implements PipeTransform {

	transform(value:number, filter:string){
        return value ? 'female' : 'male';
	}
}