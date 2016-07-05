import { Component, Input, OnChanges } from '@angular/core';
import { ItemViewModel } from '../viewmodels/itemviewmodel'
import { SafeUrlPipe, SafeStylePipe } from '../pipes/safe'
import { ItemCardComponent } from '../components/item.card.component'

var jQuery:any;

@Component({
  selector: 'item-carousel',
  directives: [ItemCardComponent],
  styles: [`

#item-carousel {
    position: fixed; /* Stay in place */
    z-index: 10; /* Sit on top */
    left: 0;
    top: 15%;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
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
    border: 1px red solid;
    height: 60%;
    width: 100%;
}
.gallery-cell {
    border: 1px green solid;
    height: 100%;
}

  `],
  templateUrl: '/app/components/html/item.carousel.html'
})
export class ItemCarouselComponent { 
  @Input()
  public items: ItemViewModel[];
  
public removeItems(){
    this.items = [];
}

}
