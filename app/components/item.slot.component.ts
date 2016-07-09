import { Component, Input } from '@angular/core';
import { ItemViewModel } from '../viewmodels/itemviewmodel'
import { SafeUrlPipe, SafeStylePipe } from '../pipes/safe'
import { ItemCardComponent } from '../components/item.card.component'

@Component({
  selector: 'item-slot',
  pipes: [SafeUrlPipe, SafeStylePipe],
  directives: [ItemCardComponent],
  styles: [
    `.item-icon, .item-text {
    padding-top: 3px;
    height: 72px;
}
.d3-icon-item-white {
    opacity: 0.4;
}

`
  ],
  // styleUrls: ['/app/components/css/item.slot.css'],
  templateUrl: '/app/components/html/item.slot.html'
})
export class ItemSlotComponent { 
  @Input()
  public itemSlot: ItemViewModel;
}
