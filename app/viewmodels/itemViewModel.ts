import { Item, NameValue } from '../interfaces/profile'
import { CharacterType } from '../interfaces/enum'
import { SafeStyle } from '@angular/platform-browser';

export class ItemViewModel{

    public isCurrentMatch: boolean;
    public slotName: string;
    public characterType: CharacterType;
    public uniqueId: string;
    public isAncient: boolean;
    public sockets: number;
    public iconUrl: SafeStyle;
    public baseValue: NameValue;

    constructor(public item: Item, public hasDetails: boolean){
        this.uniqueId = item.tooltipParams.split('/')[1];
        this.isAncient = hasDetails && Boolean(item.attributesRaw["Ancient_Rank"]);
        this.sockets = hasDetails && Boolean(item.attributesRaw["Sockets"]) ? item.attributesRaw["Sockets"].min : 0;
        if (hasDetails && Boolean(item.attributesRaw["Armor_Item"]) && item.attributesRaw["Armor_Item"].min > 0)
        {
            this.baseValue = new NameValue("Armor", item.armor.min);
        }
    }

    public matches(search: string): boolean{
        return true;
    }

    public selectItem(): void{
        
    }
}