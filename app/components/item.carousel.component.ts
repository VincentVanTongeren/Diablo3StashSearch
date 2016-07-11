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
    width: 351px;
    margin-right: 40px;
    float: left;
}`
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

    ngOnChanges(changes){
        if (changes.items.currentValue)
        {
            if (this._flickity)
                // $(this._flickity).flickity('reloadCells');
                $(this._flickity).flickity('destroy');
            this.startFlickity();
        }
    }

    startFlickity(){
        setTimeout(() => 
        this._flickity = $('.gallery').flickity({
                        cellAlign: 'left', 
                        contain: true, 
                        freeScroll: true, 
                        cellSelector: '.gallery-cell',
                        setGallerySize: false,
                        wrapAround: false
                    }), 200);
    }
}
