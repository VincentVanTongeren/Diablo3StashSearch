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
var searchresult_component_1 = require('../components/searchresult.component');
var ItemCarouselComponent = (function () {
    function ItemCarouselComponent() {
    }
    ItemCarouselComponent.prototype.handleClick = function (event) {
        if (event && event.currentTarget == event.srcElement)
            this.items = [];
    };
    ItemCarouselComponent.prototype.getItems = function () {
        var _this = this;
        var items = new Array();
        if (!this.items)
            return items;
        var leftToRightSlots = [
            "Main Hand", "Off Hand",
            "Neck", "Left Finger", "Right Finger",
            "Head", "Hands", "Torso", "Legs", "Shoulders", "Feet",
            "Bracers", "Waist",
            "Special"
        ];
        leftToRightSlots.forEach(function (slot) {
            _this.items.filter(function (x) { return x.item.slotName == slot; }).forEach(function (item) {
                items.push(item);
            });
        });
        return items;
    };
    ItemCarouselComponent.prototype.getInitialIndex = function (items) {
        var selectedItem = items.filter(function (x) { return x.isSelected; });
        if (selectedItem && selectedItem.length > 0)
            return items.indexOf(selectedItem[0]);
        return 0;
    };
    ItemCarouselComponent.prototype.ngOnChanges = function (changes) {
        if (changes.items.currentValue) {
            var index = this.getInitialIndex(this.getItems());
            if (this._flickity)
                // $(this._flickity).flickity('reloadCells');
                $(this._flickity).flickity('destroy');
            this.startFlickity(index);
        }
    };
    ItemCarouselComponent.prototype.startFlickity = function (initialIndex) {
        var _this = this;
        setTimeout(function () {
            return _this._flickity = $('.gallery').flickity({
                cellAlign: 'left',
                contain: true,
                freeScroll: true,
                cellSelector: '.gallery-cell',
                setGallerySize: false,
                wrapAround: false,
                initialIndex: initialIndex
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
            directives: [searchresult_component_1.SearchResultComponent],
            templateUrl: '/app/components/html/item.carousel.html',
            styles: [
                "\n#item-carousel {\n    position: fixed; /* Stay in place */\n    z-index: 10; /* Sit on top */\n    left: 0;\n    width: 100%; /* Full width */\n    height: 100%; /* Full height */\n    background-color: rgb(0,0,0); /* Fallback color */\n    background-color: rgba(0,0,0,0.85); /* Black w/ opacity */\n}\n\n/* The Close Button */\n.close {\n    color: #aaa;\n    float: right;\n    font-size: 28px;\n    font-weight: bold;\n}\n\n.close:hover,\n.close:focus {\n    color: black;\n    text-decoration: none;\n    cursor: pointer;\n}\n\n.content {\n    position: relative;\n    background-color: #000;\n    margin: auto;\n    padding: 0;\n    min-height: 620px;\n    border: 1px solid #888;\n    width: 80%;\n    height: 70%;\n    top: 15%;\n    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);\n    -webkit-animation-name: animatetop;\n    -webkit-animation-duration: 0.4s;\n    animation-name: animatetop;\n    animation-duration: 0.4s\n}\n\n/* Add Animation */\n@-webkit-keyframes animatetop {\n    from {top: -300px; opacity: 0} \n    to {top: 0; opacity: 1}\n}\n\n@keyframes animatetop {\n    from {top: -300px; opacity: 0}\n    to {top: 0; opacity: 1}\n}\n.gallery {\n    height: 100%;\n    width: 100%;\n}\n.flickity-slider{\n    width: 100%;\n}\n.gallery-cell {\n    height: 100%;\n    width: 358px;\n    margin-right: 40px;\n    float: left;\n}\n\n@media (min-width: 768px) and (max-width: 1200px) {\n  .content {\n    transform: scale(0.8);\n  }\n}\n@media (max-width: 767px) {\n  .content {\n    transform: scale(0.66);\n  }\n}\n"
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ItemCarouselComponent);
    return ItemCarouselComponent;
}());
exports.ItemCarouselComponent = ItemCarouselComponent;
//# sourceMappingURL=item.carousel.component.js.map