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
var http_1 = require('@angular/http');
var itemviewmodel_1 = require('../viewmodels/itemviewmodel');
var localstorageservice_1 = require('./localstorageservice');
require('rxjs/add/operator/toPromise');
var ItemService = (function () {
    function ItemService(_http, _localStorageService) {
        this._http = _http;
        this._localStorageService = _localStorageService;
    }
    ItemService.prototype.getItem = function (locale, profile, apiKey, uniqueId) {
        var _this = this;
        var cachedItem = this._localStorageService.getItem("item" + uniqueId);
        if (cachedItem) {
            return new Promise(function (resolve, reject) {
                resolve(cachedItem);
            });
        }
        var url = "https://" + locale + ".api.battle.net/d3/data/item/" + uniqueId + "?locale=en_GB&apikey=" + apiKey;
        var itemPromise = this._http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            debugger;
        });
        itemPromise.then(function (item) {
            if (item)
                _this._localStorageService.storeItem("item" + uniqueId, item);
        });
        return itemPromise;
    };
    ItemService.prototype.getDetailedItemViewModel = function (items, itemViewModel, locale, profileKey, apiKey) {
        return this.getItem(locale, profileKey, apiKey, itemViewModel.uniqueId).then(function (item) {
            var detailedItemViewModel = new itemviewmodel_1.ItemViewModel(item, true);
            var slotName = item.slots[0];
            detailedItemViewModel.slotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
            var index = items.indexOf(itemViewModel);
            items[index] = detailedItemViewModel;
            return detailedItemViewModel;
        });
    };
    ItemService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, localstorageservice_1.LocalStorageService])
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map