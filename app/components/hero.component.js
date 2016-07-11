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
var heroviewmodel_1 = require('../viewmodels/heroviewmodel');
var searchresultviewmodel_1 = require('../viewmodels/searchresultviewmodel');
var item_slot_component_1 = require('../components/item.slot.component');
var item_card_component_1 = require('../components/item.card.component');
var HeroComponent = (function () {
    function HeroComponent() {
        this.itemSelected = new core_1.EventEmitter();
        this.itemsSelected = new core_1.EventEmitter();
        this.heroOutdated = new core_1.EventEmitter();
    }
    HeroComponent.prototype.selectItem = function (selectedItemViewModel) {
        if (selectedItemViewModel.item)
            this.itemSelected.emit(selectedItemViewModel);
    };
    HeroComponent.prototype.selectItems = function (characterType) {
        var _this = this;
        var items = new Array();
        switch (characterType) {
            case "player":
                items = this.heroViewModel.items;
                break;
            case "templar":
                items = this.heroViewModel.templarItems;
                break;
            case "scoundrel":
                items = this.heroViewModel.scoundrelItems;
                break;
            case "enchantress":
                items = this.heroViewModel.enchantressItems;
                break;
        }
        if (items) {
            items = items.filter(function (x) { return Boolean(x.item); });
        }
        if (items) {
            var results = new Array();
            items.forEach(function (x) {
                var result = new searchresultviewmodel_1.SearchResultViewModel(x, _this.heroViewModel.hero, characterType);
                results.push(result);
            });
            this.itemsSelected.emit(results);
        }
    };
    HeroComponent.prototype.refresh = function () {
        this.heroOutdated.emit(this.heroViewModel);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', heroviewmodel_1.HeroViewModel)
    ], HeroComponent.prototype, "heroViewModel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeroComponent.prototype, "itemSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeroComponent.prototype, "itemsSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeroComponent.prototype, "heroOutdated", void 0);
    HeroComponent = __decorate([
        core_1.Component({
            selector: 'hero',
            directives: [item_slot_component_1.ItemSlotComponent, item_card_component_1.ItemCardComponent],
            styles: [
                "\n.ancient {\n    color: #ad835a\n}\n.follower {\n    padding-left: 24px;\n    height: 21px;\n    margin-top: 10px;\n    display: inline-block;\n}\n\n.templar {\n    background: url('http://media.blizzard.com/d3/icons/portraits/21/templar.png') no-repeat; \n}\n.scoundrel {\n    background: url('http://media.blizzard.com/d3/icons/portraits/21/scoundrel.png') no-repeat; \n}\n.enchantress {\n    background: url('http://media.blizzard.com/d3/icons/portraits/21/enchantress.png') no-repeat; \n}\n\n"
            ],
            templateUrl: '/app/components/html/hero.html'
        }), 
        __metadata('design:paramtypes', [])
    ], HeroComponent);
    return HeroComponent;
}());
exports.HeroComponent = HeroComponent;
//# sourceMappingURL=hero.component.js.map