import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HeroViewModel } from '../viewmodels/heroviewmodel'
import { ItemViewModel } from '../viewmodels/itemviewmodel'
import { SearchResultViewModel } from '../viewmodels/searchresultviewmodel'
import { ItemSlotComponent } from '../components/item.slot.component';
import { ItemCardComponent } from '../components/item.card.component';

@Component({
  selector: 'hero',
  directives: [ItemSlotComponent, ItemCardComponent],
  styles: [
    `
.ancient {
    color: #ad835a
}
.follower {
    padding-left: 24px;
    height: 21px;
    margin-top: 10px;
    display: inline-block;
}

.templar {
    background: url('http://media.blizzard.com/d3/icons/portraits/21/templar.png') no-repeat; 
}
.scoundrel {
    background: url('http://media.blizzard.com/d3/icons/portraits/21/scoundrel.png') no-repeat; 
}
.enchantress {
    background: url('http://media.blizzard.com/d3/icons/portraits/21/enchantress.png') no-repeat; 
}

`
  ],
  templateUrl: '/app/components/html/hero.html'
})
export class HeroComponent { 
  @Input()
  public heroViewModel: HeroViewModel;
  @Output()
  public itemSelected = new EventEmitter<ItemViewModel>();
  @Output()
  public itemsSelected = new EventEmitter<Array<SearchResultViewModel>>();
  @Output()
  public heroOutdated = new EventEmitter<HeroViewModel>(); 

    public selectItem(selectedItemViewModel: ItemViewModel): void {
        if (selectedItemViewModel && selectedItemViewModel.item)
            this.itemSelected.emit(selectedItemViewModel);
    }

    public selectItems(characterType: string): void{
        var items = new Array<ItemViewModel>();
        switch(characterType){
            case "player":
                items = this.heroViewModel.items;
                break;
            case "templar":
                items = this.heroViewModel.templarItems;
                break;
            case "scoundrel":
                items = this.heroViewModel.scoundrelItems;
                break;
            case "enchantress":
                items = this.heroViewModel.enchantressItems;
                break;
        }
        if (items){
            items = items.filter(x => Boolean(x.item));
        }
        if (items){
            var results = new Array<SearchResultViewModel>();
            items.forEach(x => {
                var result = new SearchResultViewModel(x, this.heroViewModel.hero, characterType);
                results.push(result)
            })
            this.itemsSelected.emit(results);
        }
    }

    public refresh(): void{
        this.heroOutdated.emit(this.heroViewModel);
    }
}
