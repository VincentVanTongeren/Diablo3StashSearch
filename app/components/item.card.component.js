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
var itemviewmodel_1 = require('../viewmodels/itemviewmodel');
var safe_1 = require('../pipes/safe');
var ItemCardComponent = (function () {
    function ItemCardComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', itemviewmodel_1.ItemViewModel)
    ], ItemCardComponent.prototype, "itemViewModel", void 0);
    ItemCardComponent = __decorate([
        core_1.Component({
            selector: 'item-card',
            pipes: [safe_1.SafeUrlPipe, safe_1.SafeStylePipe],
            styles: ["\n    .item-card {\n      max-width: 351px;\n    }\n    "],
            templateUrl: '/app/components/html/item.card.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ItemCardComponent);
    return ItemCardComponent;
}());
exports.ItemCardComponent = ItemCardComponent;
//# sourceMappingURL=item.card.component.js.map