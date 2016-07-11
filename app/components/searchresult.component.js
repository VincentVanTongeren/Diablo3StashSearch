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
var searchresultviewmodel_1 = require('../viewmodels/searchresultviewmodel');
var safe_1 = require('../pipes/safe');
var hero_1 = require('../pipes/hero');
var strings_1 = require('../pipes/strings');
var item_card_component_1 = require('../components/item.card.component');
var SearchResultComponent = (function () {
    function SearchResultComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', searchresultviewmodel_1.SearchResultViewModel)
    ], SearchResultComponent.prototype, "searchResult", void 0);
    SearchResultComponent = __decorate([
        core_1.Component({
            selector: 'search-result',
            pipes: [safe_1.SafeUrlPipe, safe_1.SafeStylePipe, hero_1.ClassPipe, hero_1.GenderPipe, strings_1.ConcatPipe],
            directives: [item_card_component_1.ItemCardComponent],
            styles: [
                ".item-icon, .item-text {\n    padding-top: 3px;\n    height: 72px;\n}\n.d3-icon-item-white {\n    opacity: 0.4;\n}\n\n.templar {\n    background: url('http://media.blizzard.com/d3/icons/portraits/21/templar.png') no-repeat; \n}\n.scoundrel {\n    background: url('http://media.blizzard.com/d3/icons/portraits/21/scoundrel.png') no-repeat; \n}\n.enchantress {\n    background: url('http://media.blizzard.com/d3/icons/portraits/21/enchantress.png') no-repeat; \n}\n"
            ],
            // styleUrls: ['/app/components/css/item.slot.css'],
            templateUrl: '/app/components/html/search.result.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SearchResultComponent);
    return SearchResultComponent;
}());
exports.SearchResultComponent = SearchResultComponent;
//# sourceMappingURL=searchresult.component.js.map