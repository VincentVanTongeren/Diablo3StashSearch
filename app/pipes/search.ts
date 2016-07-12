import { PipeTransform, Pipe } from '@angular/core';
import { ProfileItem } from '../interfaces/attributes'

@Pipe({
	name:'profileItemsFilter',
	pure: true
})
export class ProfileItemsFilterPipe implements PipeTransform {
    transform(value: Array<ProfileItem>, args: string[]): any {
        
    }
}
