import { Component, Input } from '@angular/core';
import { ItemViewModel } from '../viewmodels/itemviewmodel'
import { SearchResultViewModel } from '../viewmodels/searchresultviewmodel'
import { SafeUrlPipe, SafeStylePipe } from '../pipes/safe'
import { ClassPipe, GenderPipe } from '../pipes/hero'
import { ConcatPipe, ShortenPipe } from '../pipes/strings'
import { ItemCardComponent } from '../components/item.card.component'

@Component({
  selector: 'search-result',
  pipes: [ SafeUrlPipe, SafeStylePipe, ClassPipe, GenderPipe, ConcatPipe ],
  directives: [ItemCardComponent],
  styles: [
    `.item-icon, .item-text {
    padding-top: 3px;
    height: 72px;
}
.d3-icon-item-white {
    opacity: 0.4;
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
  // styleUrls: ['/app/components/css/item.slot.css'],
  templateUrl: '/app/components/html/search.result.html'
})
export class SearchResultComponent { 
  @Input()
  public searchResult: SearchResultViewModel;
}
