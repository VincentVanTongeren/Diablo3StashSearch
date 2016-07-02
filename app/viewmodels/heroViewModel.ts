import { Hero, NameValue, Item, Gem } from '../interfaces/profile'
import { CharacterType } from '../interfaces/enum'
import { ItemViewModel } from '../viewmodels/itemViewModel'

export class HeroViewModel{

    public items: Array<ItemViewModel>
    public templarItems: Array<ItemViewModel>
    public scoundrelItems: Array<ItemViewModel>
    public enchantressItems: Array<ItemViewModel>
    public sets: Array<string>;
    public hellfireAmuletPassive: string;
    public legendaryGems : Array<Gem>;
    public augments: Array<number>;

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

    public getAncientCount(): number {
        return this.items ? this.items.filter(x => Boolean(x.item) && x.isAncient).length : 0;
    }
}