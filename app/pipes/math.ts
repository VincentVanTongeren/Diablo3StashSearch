import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name:'sum',
	pure: true
})
export class SumPipe implements PipeTransform {

	transform(value:Array<number>, filter:string){
        var sum = 0;
        if (value instanceof Array)
            value.forEach(x => { if (x) sum += x })

        return sum;
	}
}
