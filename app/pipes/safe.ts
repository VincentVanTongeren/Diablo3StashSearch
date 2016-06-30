import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizationService, SafeUrl, SafeStyle } from '@angular/platform-browser';

@Pipe({
	name:'safeUrl',
	pure: true
})
export class SafeUrlPipe implements PipeTransform {

constructor(private _sanitizationService: DomSanitizationService){
}
	transform(value:any, filter:string){
        return this._sanitizationService.bypassSecurityTrustUrl(value);
	}
}

@Pipe({
	name:'safeStyle',
	pure: true
})
export class SafeStylePipe implements PipeTransform {

	constructor(private _sanitizationService: DomSanitizationService){
	}

	transform(value:any, filter:string){
        return this._sanitizationService.bypassSecurityTrustStyle(value);
	}
}