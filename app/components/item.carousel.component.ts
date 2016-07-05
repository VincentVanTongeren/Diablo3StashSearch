import { Component, Input } from '@angular/core';
import { ItemViewModel } from '../viewmodels/itemviewmodel'
import { SafeUrlPipe, SafeStylePipe } from '../pipes/safe'
import { ItemCardComponent } from '../components/item.card.component'

@Component({
  selector: 'item-carousel',
  directives: [ItemCardComponent],
  templateUrl: '/app/components/html/item.carousel.html'
})
export class ItemCarouselComponent { 
  @Input()
  public items: ItemViewModel[];
}
