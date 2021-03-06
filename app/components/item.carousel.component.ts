import { Component, Input, OnChanges } from '@angular/core';
import { SearchResultViewModel } from '../viewmodels/searchresultviewmodel'
import { SafeUrlPipe, SafeStylePipe } from '../pipes/safe'
import { SearchResultComponent } from '../components/searchresult.component'

declare var $: any;

@Component({
  selector: 'item-carousel',
  directives: [SearchResultComponent],
  templateUrl: '/app/components/html/item.carousel.html',
  styles: [
    `
#item-carousel {
    position: fixed; /* Stay in place */
    z-index: 10; /* Sit on top */
    left: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.85); /* Black w/ opacity */
}

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.content {
    position: relative;
    background-color: #000;
    margin: auto;
    padding: 0;
    min-height: 620px;
    border: 1px solid #888;
    width: 80%;
    height: 70%;
    top: 15%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
    from {top: -300px; opacity: 0} 
    to {top: 0; opacity: 1}
}

@keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
}
.gallery {
    height: 100%;
    width: 100%;
}
.flickity-slider{
    width: 100%;
}
.gallery-cell {
    height: 100%;
    width: 358px;
    margin-right: 40px;
    float: left;
}

@media (min-width: 768px) and (max-width: 1200px) {
  .content {
    transform: scale(0.8);
  }
}
@media (max-width: 767px) {
  .content {
    transform: scale(0.66);
  }
}
`
  ]
})
export class ItemCarouselComponent { 
  @Input()
  public items: SearchResultViewModel[];

private _flickity: any;

  public handleClick(event){
      if (event && event.currentTarget == event.srcElement)
        this.items = [];
}

    public getItems(): SearchResultViewModel[]{

        var items = new Array<SearchResultViewModel>();
        if (!this.items)
            return items;

        var leftToRightSlots: Array<string> = [
            "Main Hand", "Off Hand",
            "Neck", "Left Finger", "Right Finger",
            "Head", "Hands", "Torso", "Legs", "Shoulders", "Feet",
            "Bracers", "Waist",
            "Special"
        ];

        leftToRightSlots.forEach(slot => {
            this.items.filter(x => x.item.slotName == slot).forEach(item => {
                items.push(item);
            });
        });

        return items;
    }

    private getInitialIndex(items: Array<SearchResultViewModel>): number{
        var selectedItem = items.filter(x => x.isSelected);
        if (selectedItem && selectedItem.length > 0)
            return items.indexOf(selectedItem[0]);
        return 0;
    }

    ngOnChanges(changes){
        if (changes.items.currentValue)
        {
            var index = this.getInitialIndex(this.getItems());
            if (this._flickity)
                // $(this._flickity).flickity('reloadCells');
                $(this._flickity).flickity('destroy');
            this.startFlickity(index);
        }
    }

    startFlickity(initialIndex: number){
        setTimeout(() => 
        this._flickity = $('.gallery').flickity({
                        cellAlign: 'left', 
                        contain: true, 
                        freeScroll: true, 
                        cellSelector: '.gallery-cell',
                        setGallerySize: false,
                        wrapAround: false,
                        initialIndex: initialIndex
                    }), 200);
    }
}
