"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var item_card_component_1 = require('../components/item.card.component');
var ItemCarouselComponent = (function () {
    function ItemCarouselComponent() {
    }
    ItemCarouselComponent.prototype.removeItems = function () {
        this.items = [];
    };
    ItemCarouselComponent.prototype.ngOnChanges = function (changes) {
        if (changes.items.currentValue) {
            if (this._flickity)
                // $(this._flickity).flickity('reloadCells');
                $(this._flickity).flickity('destroy');
            this.startFlickity();
        }
    };
    ItemCarouselComponent.prototype.startFlickity = function () {
        var _this = this;
        setTimeout(function () {
            return _this._flickity = $('.gallery').flickity({
                cellAlign: 'left',
                contain: true,
                freeScroll: true,
                cellSelector: '.gallery-cell',
                setGallerySize: false,
                wrapAround: true
            });
        }, 200);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ItemCarouselComponent.prototype, "items", void 0);
    ItemCarouselComponent = __decorate([
        core_1.Component({
            selector: 'item-carousel',
            directives: [item_card_component_1.ItemCardComponent],
            templateUrl: '/app/components/html/item.carousel.html',
            styles: [
                "\n#item-carousel {\n    position: fixed; /* Stay in place */\n    z-index: 10; /* Sit on top */\n    left: 0;\n    top: 15%;\n    width: 100%; /* Full width */\n    height: 100%; /* Full height */\n    overflow: auto; /* Enable scroll if needed */\n    background-color: rgb(0,0,0); /* Fallback color */\n    background-color: rgba(0,0,0,0.85); /* Black w/ opacity */\n}\n\n/* The Close Button */\n.close {\n    color: #aaa;\n    float: right;\n    font-size: 28px;\n    font-weight: bold;\n}\n\n.close:hover,\n.close:focus {\n    color: black;\n    text-decoration: none;\n    cursor: pointer;\n}\n\n.content {\n    position: relative;\n    background-color: #000;\n    margin: auto;\n    padding: 0;\n    border: 1px solid #888;\n    width: 80%;\n    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);\n    -webkit-animation-name: animatetop;\n    -webkit-animation-duration: 0.4s;\n    animation-name: animatetop;\n    animation-duration: 0.4s\n}\n\n/* Add Animation */\n@-webkit-keyframes animatetop {\n    from {top: -300px; opacity: 0} \n    to {top: 0; opacity: 1}\n}\n\n@keyframes animatetop {\n    from {top: -300px; opacity: 0}\n    to {top: 0; opacity: 1}\n}\n.gallery {\n    border: 1px red solid;\n    width: 100%;\n}\n.flickity-slider{\n    width: 100%;\n}\n.gallery-cell {\n    border: 1px green solid;\n    height: 100%;\n    width: 351px;\n    margin-right: 40px;\n    float: left;\n}"
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ItemCarouselComponent);
    return ItemCarouselComponent;
}());
exports.ItemCarouselComponent = ItemCarouselComponent;
//# sourceMappingURL=item.carousel.component.js.map