import { Component, Input, Output, HostListener, EventEmitter } from '@angular/core';
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
@media (min-width: 768px) and (max-width: 1200px) {
  .item-text, .item-icon {
    padding-top: 0px;
    height: 44px;
  }
  .item-text {
    padding-top: 6px;
  }
  .d3-icon-item-small .icon-item-default 
  { 
    width: 32px; 
    height: 39px; 
  }
}
`
  ],
  // styleUrls: ['/app/components/css/item.slot.css'],
  templateUrl: '/app/components/html/item.slot.html'
})
export class ItemSlotComponent { 
  @Input()
  public itemSlot: ItemViewModel;
  @Output()
  public itemSelected = new EventEmitter<ItemViewModel>();

  mouseover:boolean;

  @HostListener('mouseover')
  onMouseOver() {
    this.itemSelected.emit(this.itemSlot.item ? this.itemSlot : null);
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.itemSelected.emit(null);
  }
}
