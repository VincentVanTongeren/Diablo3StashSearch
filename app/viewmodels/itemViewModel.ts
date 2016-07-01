import { Item, Gem, NameValue } from '../interfaces/profile'
import { CharacterType } from '../interfaces/enum'
import { SafeStyle } from '@angular/platform-browser';

export class ItemViewModel{

    public isCurrentMatch: boolean;
    public slotName: string;
    public characterType: CharacterType;
    public uniqueId: string;
    public isAncient: boolean;
    public sockets: Array<any>;
    public baseValue: NameValue;
    public elementalType: string;
    public augment: number;
    public effect: string;

    constructor(public item: Item, public hasDetails: boolean){
        if (!item)
            return;

        this.uniqueId = item.tooltipParams.split('/')[1];
        this.baseValue = new NameValue("", null);
        if (hasDetails){
            this.isAncient = Boolean(item.attributesRaw["Ancient_Rank"]);
            this.sockets = [];
            
            for (var i = 0; i < (Boolean(item.attributesRaw["Sockets"]) ? item.attributesRaw["Sockets"].min : 0); i++)
                this.sockets.push({});
                
            if (Boolean(item.attributesRaw["Armor_Item"]) && item.attributesRaw["Armor_Item"].min > 0)
            {
                this.baseValue = new NameValue("Armor", item.armor.min);
            } else if (Boolean(item.attributesRaw["Damage_Weapon_Min#Physical"]) && item.attributesRaw["Damage_Weapon_Min#Physical"].min > 0){
                this.baseValue = new NameValue("Damage Per Second", Math.round(item.dps.min * 10) / 10);
            }
            this.elementalType = Boolean(this.item.elementalType) ? this.item.elementalType : "default";
            this.augment = Boolean(item.attributesRaw["CubeEnchantedGemRank"]) ? item.attributesRaw["CubeEnchantedGemRank"].min : 0;
            this.effect = this.elementalType != "default" ? this.elementalType : this.baseValue.name;
        }
    }

    public matches(search: string): boolean{
        return true;
    }

    public getEmptySockets(): Array<any> {
        if (!this.item.gems)
            return this.sockets;

        var emptySockets = new Array<any>();
        for (var i = 0; i < this.sockets.length - this.item.gems.length; i++)
            emptySockets.push({});

        return emptySockets;
    }
}