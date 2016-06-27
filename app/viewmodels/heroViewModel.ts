import { Hero, HeroStat, Item } from '../interfaces/profile'
import { CharacterType } from '../interfaces/enum'
import { ItemViewModel } from '../viewmodels/itemViewModel'
export class HeroViewModel{

    private _items: Array<ItemViewModel>

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

    public getItems(type: string): Array<ItemViewModel>{
        var items = new Array<ItemViewModel>();
        for (var i = 0; i < Object.keys(this.hero.items).length; i++){
            var item = new ItemViewModel(Object.values(this.hero.items)[i] as Item, false);
            item.slotName = Object.keys(this.hero.items)[i];
            items.push(item);
        }
        return items;
    }
}