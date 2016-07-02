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