import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HeroViewModel } from '../viewmodels/heroviewmodel'
import { ItemViewModel } from '../viewmodels/itemviewmodel'
import { SearchResultViewModel } from '../viewmodels/searchresultviewmodel'
import { ItemSlotComponent } from '../components/item.slot.component';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'hero',
  directives: [ItemSlotComponent],
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
.item-slots .empty-slot {
    height: 0px;
}
.item-slot:not(.empty-slot):hover {
    background-color: #111;
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
@media (min-width: 768px) and (max-width: 1200px) {
    .item-slot {
        padding-top: 3px;
    }
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

public selected: string;

constructor(private heroService: HeroService){

}

    public selectItem(selectedItemViewModel: ItemViewModel): void {
        if (selectedItemViewModel && selectedItemViewModel.item)
            this.itemSelected.emit(selectedItemViewModel);
    }

    public selectItems(characterType: string, selectedItemViewModel: ItemViewModel = null): void{
        var results = this.heroService.getSearchResults(this.heroViewModel, selectedItemViewModel, characterType);
        if (results){
            this.itemsSelected.emit(results);
        }
    }

    public showItem(selectedItemViewModel: ItemViewModel, characterType: string){
        var results = this.heroService.getSearchResults(this.heroViewModel, selectedItemViewModel, characterType);
        if (results){
            this.itemsSelected.emit(results);
        }
    }

    public showItems(selected: string){
        this.selected = selected;
    }

    public refresh(): void{
        this.heroOutdated.emit(this.heroViewModel);
    }
}
