import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizationService, SafeUrl, SafeStyle } from '@angular/platform-browser';

@Pipe({
	name:'shorten',
	pure: true
})
export class ShortenPipe implements PipeTransform {

	transform(value:string, filter:string){
		var parts = value.split(" ");
		var shortened = "";
		parts.forEach(p => shortened += p[0]);
		return shortened;
	}
}

@Pipe({
	name:'concat',
	pure: true
})
export class ConcatPipe implements PipeTransform {


	transform(value:string, filter:string){
		return value.replace(/[\-|\s]/g, "");
	}
}