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
var item_card_component_1 = require('../components/item.card.component');
var ItemSlotComponent = (function () {
    function ItemSlotComponent() {
        this.itemSelected = new core_1.EventEmitter();
    }
    ItemSlotComponent.prototype.onMouseOver = function () {
        this.itemSelected.emit(this.itemSlot.item ? this.itemSlot : null);
    };
    ItemSlotComponent.prototype.onMouseOut = function () {
        this.itemSelected.emit(null);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', itemviewmodel_1.ItemViewModel)
    ], ItemSlotComponent.prototype, "itemSlot", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ItemSlotComponent.prototype, "itemSelected", void 0);
    __decorate([
        core_1.HostListener('mouseover'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ItemSlotComponent.prototype, "onMouseOver", null);
    __decorate([
        core_1.HostListener('mouseout'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ItemSlotComponent.prototype, "onMouseOut", null);
    ItemSlotComponent = __decorate([
        core_1.Component({
            selector: 'item-slot',
            pipes: [safe_1.SafeUrlPipe, safe_1.SafeStylePipe],
            directives: [item_card_component_1.ItemCardComponent],
            styles: [
                ".item-icon, .item-text {\n    padding-top: 3px;\n    height: 72px;\n}\n.d3-icon-item-white {\n    opacity: 0.4;\n}\n"
            ],
            // styleUrls: ['/app/components/css/item.slot.css'],
            templateUrl: '/app/components/html/item.slot.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ItemSlotComponent);
    return ItemSlotComponent;
}());
exports.ItemSlotComponent = ItemSlotComponent;
//# sourceMappingURL=item.slot.component.js.map