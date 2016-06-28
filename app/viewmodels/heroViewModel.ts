import { Hero, NameValue, Item } from '../interfaces/profile'
import { CharacterType } from '../interfaces/enum'
import { ItemViewModel } from '../viewmodels/itemViewModel'
import { SafeUrl } from '@angular/platform-browser';

export class HeroViewModel{

    public items: Array<ItemViewModel>
    public iconUrl: SafeUrl;

    constructor(public hero: Hero, public hasDetails: boolean){
    }

    public getStats(): Array<NameValue>{
        var stats = new Array<NameValue>();
        for (var i = 0; i < Object.keys(this.hero.stats).length; i++){
            
            var statName = Object.keys(this.hero.stats)[i];
            statName = statName.substring(0, 1).toUpperCase() + statName.substring(1).replace(/(?=[A-Z])/, " ");
            var statValue = Object.values(this.hero.stats)[i];
            var stat = new NameValue(statName, statValue);
            if (stat.value > 0)
                stats.push(stat);
        }
        return stats;
    }
}