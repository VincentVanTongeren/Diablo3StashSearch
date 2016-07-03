import { Component, Input } from '@angular/core';
import { ItemViewModel } from '../viewmodels/itemviewmodel'
import { SafeUrlPipe, SafeStylePipe } from '../pipes/safe'
// import { ConcatPipe, ShortenPipe } from './pipes/strings'
// import { ClassPipe, GenderPipe } from './pipes/hero'
// import { SumPipe } from './pipes/math'
// import { LegacyNamePipe } from './pipes/battlenet'


@Component({
  selector: 'item-card',
    pipes: [SafeUrlPipe, SafeStylePipe/*, ConcatPipe, ShortenPipe, ClassPipe, GenderPipe, SumPipe, LegacyNamePipe*/],
  templateUrl: '/app/components/html/item.card.html'
})
export class ItemCardComponent { 
  @Input()
  public itemViewModel: ItemViewModel;
}
