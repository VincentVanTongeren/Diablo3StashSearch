import { Item } from '../interfaces/profile'
import { CharacterType } from '../interfaces/enum'

export class ItemViewModel{

    public isCurrentMatch: boolean;
    public slotName: string;
    public characterType: CharacterType;
    public uniqueId: string;
    public isAncient: boolean;

    constructor(public item: Item, public hasDetails: boolean){
        this.uniqueId = item.tooltipParams.split('/')[1];
        this.isAncient = hasDetails && Boolean(item.attributesRaw["Ancient_Rank"]);
    }

    public matches(search: string): boolean{
        return true;
    }

    public selectItem(): void{
        
    }
}