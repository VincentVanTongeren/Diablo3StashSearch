import { Component, Input, HostListener } from '@angular/core';
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
.item-tooltip {
  border: 1px solid red;
  width: 351px;
  z-index:1000;
  background-color: black;
}
`
  ],
  // styleUrls: ['/app/components/css/item.slot.css'],
  templateUrl: '/app/components/html/item.slot.html'
})
export class ItemSlotComponent { 
  @Input()
  public itemSlot: ItemViewModel;

public itemCardItem: ItemViewModel;

  mouseover:boolean;

  @HostListener('mouseover')
  onMouseOver() {
    this.itemCardItem = this.itemSlot.item ? this.itemSlot : null;
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.itemCardItem = null;
  }
}
