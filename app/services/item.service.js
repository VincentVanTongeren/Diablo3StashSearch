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
var profile_1 = require('../interfaces/profile');
var http_1 = require('@angular/http');
var itemviewmodel_1 = require('../viewmodels/itemviewmodel');
var localstorageservice_1 = require('./localstorageservice');
require('rxjs/add/operator/toPromise');
var ItemService = (function () {
    function ItemService(_http, _localStorageService) {
        this._http = _http;
        this._localStorageService = _localStorageService;
    }
    ItemService.prototype.getItem = function (battleNet, uniqueId) {
        var _this = this;
        var cachedItem = this._localStorageService.getItem("item" + uniqueId);
        if (cachedItem) {
            return new Promise(function (resolve, reject) {
                resolve(cachedItem);
            });
        }
        var url = "https://" + battleNet.locale + ".api.battle.net/d3/data/item/" + uniqueId + "?locale=en_GB&apikey=" + battleNet.apiKey;
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
    ItemService.prototype.createItems = function (items, topToBottomSlots, battleNet) {
        var _this = this;
        var itemViewModels = new Array();
        var promises = new Array();
        for (var i = 0; i < topToBottomSlots.length; i++) {
            var slotName = topToBottomSlots[i];
            var item = items ? items[topToBottomSlots[i]] : null;
            var promise = new Promise(function (resolve, reject) {
                var itemSlotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
                if (item) {
                    _this.getItem(battleNet, item.tooltipParams.split('/')[1]).then(function (detailedItem) {
                        var itemViewModel = new itemviewmodel_1.ItemViewModel(detailedItem, true);
                        itemViewModel.slotName = itemSlotName.substring(0, 1).toUpperCase() + itemSlotName.substring(1).replace(/(?=[A-Z])/, " ");
                        if (itemViewModel.item.attributesRaw) {
                            itemViewModel.isAncient = Boolean(itemViewModel.item.attributesRaw["Ancient_Rank"]);
                            itemViewModel.sockets = [];
                            itemViewModel.consumableUsed = Boolean(itemViewModel.item.attributesRaw["ConsumableAddSockets"]);
                            itemViewModel.removeLevelReq = Boolean(itemViewModel.item.attributesRaw["RemoveLevelReq"]);
                            for (var i = 0; i < (Boolean(itemViewModel.item.attributesRaw["Sockets"]) ? itemViewModel.item.attributesRaw["Sockets"].min : 0); i++)
                                itemViewModel.sockets.push({});
                            if (Boolean(itemViewModel.item.attributesRaw["Armor_Item"]) && itemViewModel.item.attributesRaw["Armor_Item"].min > 0) {
                                itemViewModel.baseValue = new profile_1.NameValue("Armor", itemViewModel.item.armor.min);
                            }
                            else if (Boolean(itemViewModel.item.attributesRaw["Damage_Weapon_Min#Physical"]) && itemViewModel.item.attributesRaw["Damage_Weapon_Min#Physical"].min > 0) {
                                itemViewModel.baseValue = new profile_1.NameValue("Damage Per Second", Math.round(itemViewModel.item.dps.min * 10) / 10);
                            }
                            itemViewModel.elementalType = Boolean(itemViewModel.item.elementalType) ? itemViewModel.item.elementalType : "default";
                            itemViewModel.augment = Boolean(itemViewModel.item.attributesRaw["CubeEnchantedGemRank"]) ? itemViewModel.item.attributesRaw["CubeEnchantedGemRank"].min : 0;
                            itemViewModel.effect = itemViewModel.elementalType != "default" ? itemViewModel.elementalType : itemViewModel.baseValue.name;
                        }
                        resolve(itemViewModel);
                    });
                }
                else {
                    var emptyItem = new itemviewmodel_1.ItemViewModel(null, false);
                    emptyItem.slotName = itemSlotName;
                    resolve(emptyItem);
                }
            });
            promises.push(promise);
        }
        return Promise.all(promises);
    };
    ItemService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, localstorageservice_1.LocalStorageService])
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map