import { Component, Input } from '@angular/core';
import { ItemViewModel } from '../viewmodels/itemviewmodel'
import { SafeUrlPipe, SafeStylePipe } from '../pipes/safe'

@Component({
  selector: 'item-card',
    pipes: [SafeUrlPipe, SafeStylePipe],
     styles: [`
    .item-card-container {
      border: 2px solid #333;
      width: 358px;
    }
    .item-card-container.ancient {
      border: 2px solid gold;
    }

    `], templateUrl: '/app/components/html/item.card.html'
})
export class ItemCardComponent { 
  @Input()
  public itemViewModel: ItemViewModel;
}
