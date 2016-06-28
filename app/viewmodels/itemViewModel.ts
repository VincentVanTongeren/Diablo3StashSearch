import { Item, Gem, NameValue } from '../interfaces/profile'
import { GemViewModel } from '../viewmodels/gemviewmodel'
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
    public augment: number;
    public gems: GemViewModel[];

    constructor(public item: Item, public hasDetails: boolean){
        this.uniqueId = item.tooltipParams.split('/')[1];
        if (hasDetails){
            this.isAncient = Boolean(item.attributesRaw["Ancient_Rank"]);
            this.sockets = Boolean(item.attributesRaw["Sockets"]) ? item.attributesRaw["Sockets"].min : 0;
            if (Boolean(item.attributesRaw["Armor_Item"]) && item.attributesRaw["Armor_Item"].min > 0)
            {
                this.baseValue = new NameValue("Armor", item.armor.min);
            }
            this.augment = Boolean(item.attributesRaw["CubeEnchantedGemRank"]) ? item.attributesRaw["CubeEnchantedGemRank"].min : 0;
            this.gems = new Array<GemViewModel>();
        }


    }

    public matches(search: string): boolean{
        return true;
    }

    public selectItem(): void{
        
    }
}