import { Item } from '../interfaces/profile'
import { CharacterType } from '../interfaces/enum'

export class ItemViewModel{

    public isCurrentMatch: boolean;
    public slotName: string;
    public characterType: CharacterType;
    public uniqueId: string;

    constructor(public item: Item, public hasDetails: boolean){
        
    }

    public matches(search: string): boolean{
        return true;
    }
}