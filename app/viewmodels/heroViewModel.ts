import { Hero, HeroStat, Item } from '../interfaces/profile'
import { CharacterType } from '../interfaces/enum'
import { ItemViewModel } from '../viewmodels/itemViewModel'
export class HeroViewModel{

    public items: Array<ItemViewModel>

    constructor(public hero: Hero, public hasDetails: boolean){
        
    }

    public getStats(): Array<HeroStat>{
        var stats = new Array<HeroStat>();
        for (var i = 0; i < Object.keys(this.hero.stats).length; i++){
            var stat = new HeroStat();
            var name = Object.keys(this.hero.stats)[i];
            stat.name = name.substring(0, 1).toUpperCase() + name.substring(1).replace(/(?=[A-Z])/, " ");
            stat.value = Object.values(this.hero.stats)[i];
            if (stat.value > 0)
                stats.push(stat);
        }
        return stats;
    }
}