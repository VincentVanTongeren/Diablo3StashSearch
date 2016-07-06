import { Component, Input } from '@angular/core';
import { ItemViewModel } from '../viewmodels/itemviewmodel'
import { SafeUrlPipe, SafeStylePipe } from '../pipes/safe'

@Component({
  selector: 'item-card',
    pipes: [SafeUrlPipe, SafeStylePipe],
     styles: [`
    .item-card {
      max-width: 351px;
    }
    `], templateUrl: '/app/components/html/item.card.html'
})
export class ItemCardComponent { 
  @Input()
  public itemViewModel: ItemViewModel;
}
