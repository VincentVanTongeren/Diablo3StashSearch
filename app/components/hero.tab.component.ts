import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HeroViewModel } from '../viewmodels/heroviewmodel'
import { SearchResultViewModel } from '../viewmodels/searchresultviewmodel'
import { HeroService } from '../services/hero.service'
import { SafeUrlPipe, SafeStylePipe } from '../pipes/safe'
import { ConcatPipe, ShortenPipe } from '../pipes/strings'
import { ClassPipe, GenderPipe } from '../pipes/hero'
import { SumPipe } from '../pipes/math'
import { LegacyNamePipe } from '../pipes/battlenet'

@Component({
  selector: 'hero-tab',
    pipes: [ SafeUrlPipe, SafeStylePipe, ConcatPipe, ShortenPipe, ClassPipe, GenderPipe, SumPipe, LegacyNamePipe],
  styles: [`

.hero-name {
    margin-left: 10px;
    color: #ad835a
}
.hero-name.active {
    color: #fff;
}
.hero-name .paragon {
    vertical-align: top;
}
li.char-type {
    height: 21px;
}
li.char-type .small-seasonal-leaf { 
    display: inline-block; 
    width: 15px; 
    height: 21px; 
    background: url("http://eu.battle.net/d3/static/images/profile/seasonal-leaf.png") -24px -2px no-repeat; 
}
li.char-type .small-hardcore { 
    display: inline-block; 
    width: 21px; 
    height: 21px; 
    background: url("../images/hardcore.png") no-repeat; 
}
.sets {
    margin-top: 2px;
    padding: 0;
}
.sets li {
    list-style-type: none;
}
.sets .set {
    font-size: 9px;
}
.hero-portrait {
    margin-left: 9px;
}
.skills {
    height: 36px;
}
.skills .passive .last {
    margin-right: 23px;
}
.skill {
    display: inline-block;
    background-size: contain;
    margin-right: 3px;
    width: 21px;
    height: 21px;
}
.sets-container {
    height: 100%;
}
.gems-container {
    height: 100%;
}
.gems {
    height: 25px;
}
.gems .rank {
    font-size: 9px;
}
.gems .gem {
    float: left;
    margin-right: 3px;
}
.gems .gem-image {
    width: 17px;
    height: 17px;
}
.augments {
    font-size: 9px;
}
.augments li {
    list-style-type:none;
    margin-left: 2px;
    float: left;
}
.augments li.first {
    margin-left: 5px;
}
.augments .ancient {
    font-size: 9px;
    color: #ad835a
}
`
  ],
  templateUrl: '/app/components/html/hero.tab.html'
})
export class HeroTabComponent { 
  @Input()
  public heroViewModel: HeroViewModel;
  @Input()
  public isSelected: boolean;
  @Output()
  public itemsSelected = new EventEmitter<Array<SearchResultViewModel>>();

public constructor(private heroService: HeroService){

}

  public select(selected: string): void {
      var results = this.heroService.getSearchResults(this.heroViewModel, selected);
        this.itemsSelected.emit(results);
  }
}
