import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name:'legacyname',
	pure: true
})
export class LegacyNamePipe implements PipeTransform {

	transform(value: string, filter:string){
        switch (value.toLocaleLowerCase())
        {
            case "swampland attunement":
                return "physical attunement";
            default:
                return value;
        }
    }
}