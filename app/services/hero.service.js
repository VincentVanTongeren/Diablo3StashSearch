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
var attributes_1 = require('../interfaces/attributes');
var http_1 = require('@angular/http');
var heroviewmodel_1 = require('../viewmodels/heroviewmodel');
var searchresultviewmodel_1 = require('../viewmodels/searchresultviewmodel');
var item_service_1 = require('./item.service');
var localstorageservice_1 = require('./localstorageservice');
require('rxjs/add/operator/toPromise');
var HeroService = (function () {
    function HeroService(_http, _itemService, _localStorageService) {
        this._http = _http;
        this._itemService = _itemService;
        this._localStorageService = _localStorageService;
        this.heroLoaded = new core_1.EventEmitter();
    }
    HeroService.prototype.getHero = function (battleNet, heroId) {
        var _this = this;
        var cachedHero = this._localStorageService.getItem("hero" + heroId);
        if (cachedHero) {
            return new Promise(function (resolve, reject) {
                resolve(cachedHero);
            });
        }
        var url = "https://" + battleNet.locale + ".api.battle.net/d3/profile/" + battleNet.profileKey + "/hero/" + heroId + "?locale=en_GB&apikey=" + battleNet.apiKey;
        var heroPromise = this._http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            debugger;
        });
        heroPromise.then(function (hero) {
            if (hero)
                _this._localStorageService.storeItem("hero" + heroId, hero);
        });
        return heroPromise;
    };
    HeroService.prototype.enrichHero = function (heroViewModel, battleNet) {
        heroViewModel.sets = [];
        if (!heroViewModel.items)
            return;
        var hellfire = heroViewModel.items.filter(function (i) { return i.item && i.item.icon == "x1_amulet_norm_unique_25_demonhunter_male"; });
        if (hellfire.length > 0 && hellfire[0].item.attributes) {
            var passive = hellfire[0].item.attributes.passive[0].text.replace("Gain the ", "").replace(" passive.", "");
            heroViewModel.hellfireAmuletPassive = passive;
        }
        var items = heroViewModel.items;
        var setItems = new Array();
        var legendaryGems = new Array();
        heroViewModel.augments = [];
        var augments = items.forEach(function (x) {
            if (x.augment)
                heroViewModel.augments.push(x.augment);
        });
        for (var i = 0; i < items.length; i++) {
            var item = items[i].item;
            if (item) {
                if (item.set)
                    setItems.push(item.set.name);
                if (item.gems && item.gems.length > 0)
                    item.gems.filter(function (x) { return x.isJewel; }).forEach(function (gem) { return legendaryGems.push(gem); });
            }
        }
        var uniqueSetItems = {};
        setItems.forEach(function (x) { return uniqueSetItems[x] = (uniqueSetItems[x] || 0) + 1; });
        Object.keys(uniqueSetItems).forEach(function (x) {
            if (uniqueSetItems[x] > 1)
                heroViewModel.sets.push(x);
        });
        heroViewModel.legendaryGems = legendaryGems;
        heroViewModel.items = items;
    };
    HeroService.prototype.setFollowerItems = function (follower, extraSlots, battleNet) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var followerSlots = ["special", "neck", "leftFinger", "rightFinger", "mainHand"];
            if (extraSlots)
                extraSlots.forEach(function (slot) {
                    followerSlots.push(slot);
                });
            _this._itemService.createItems(follower.items ? follower.items : null, followerSlots, battleNet).then(function (itemViewModels) {
                resolve(itemViewModels);
            });
        });
    };
    HeroService.prototype.createHeroViewModel = function (hero, battleNet) {
        var cachedHero = this._localStorageService.getItem("hero" + hero.id);
        var heroViewModel = new heroviewmodel_1.HeroViewModel(cachedHero ? cachedHero : hero, Boolean(cachedHero));
        if (cachedHero)
            this.enrichHero(heroViewModel, battleNet);
        return heroViewModel;
    };
    HeroService.prototype.getHeroViewModel = function (heroes, heroViewModel, battleNet) {
        var _this = this;
        return this.getHero(battleNet, heroViewModel.hero.id).then(function (hero) {
            var detailedHeroViewModel = new heroviewmodel_1.HeroViewModel(hero, true);
            var topToBottomSlots = ["shoulders", "head", "neck",
                "hands", "torso", "bracers",
                "leftFinger", "waist", "rightFinger",
                "mainHand", "legs", "offHand",
                "", "feet", ""
            ];
            _this._itemService.createItems(hero.items, topToBottomSlots, battleNet).then(function (itemViewModels) {
                detailedHeroViewModel.items = itemViewModels;
                _this.enrichHero(detailedHeroViewModel, battleNet);
                var dummyFollower = new profile_1.Follower();
                var templar = detailedHeroViewModel.hero.followers.templar ? detailedHeroViewModel.hero.followers.templar : dummyFollower;
                var scoundrel = detailedHeroViewModel.hero.followers.scoundrel ? detailedHeroViewModel.hero.followers.scoundrel : dummyFollower;
                var enchantress = detailedHeroViewModel.hero.followers.enchantress ? detailedHeroViewModel.hero.followers.enchantress : dummyFollower;
                var promises = new Array();
                var templarItemsPromise = _this.setFollowerItems(templar, ["offHand"], battleNet).then(function (items) {
                    detailedHeroViewModel.templarItems = items;
                });
                var scoundrelItemsPromise = _this.setFollowerItems(scoundrel, null, battleNet).then(function (items) {
                    detailedHeroViewModel.scoundrelItems = items;
                });
                var enchantressItemsPromise = _this.setFollowerItems(enchantress, null, battleNet).then(function (items) {
                    detailedHeroViewModel.enchantressItems = items;
                });
                Promise.all([templarItemsPromise, scoundrelItemsPromise, enchantressItemsPromise]).then(function () { return _this.heroLoaded.emit(detailedHeroViewModel); });
            });
            var index = heroes.indexOf(heroViewModel);
            heroes[index] = detailedHeroViewModel;
            return detailedHeroViewModel;
        });
    };
    HeroService.prototype.getProfileItems = function (heroes) {
        var items = new Array();
        heroes.forEach(function (hero) {
            if (hero.hasItems())
                hero.getItems().forEach(function (itemViewModel) {
                    if (itemViewModel && itemViewModel.item) {
                        if (items.filter(function (x) { return x.name == itemViewModel.item.name; }).length == 0) {
                            items.push(new attributes_1.ProfileItem(itemViewModel.item.name, itemViewModel.slotName));
                        }
                    }
                });
        });
        return items;
    };
    HeroService.prototype.getSearchResults = function (heroViewModel, selectedItemViewModel, characterType) {
        var results = new Array();
        var chars = characterType == "follower" ? ["templar", "scoundrel", "enchantress"] : [characterType];
        chars.forEach(function (character) {
            var items = new Array();
            switch (characterType) {
                case "player":
                    items = heroViewModel.items;
                    break;
                case "templar":
                    items = heroViewModel.templarItems;
                    break;
                case "scoundrel":
                    items = heroViewModel.scoundrelItems;
                    break;
                case "enchantress":
                    items = heroViewModel.enchantressItems;
                    break;
            }
            if (items) {
                items = items.filter(function (x) { return Boolean(x.item); });
            }
            if (items) {
                items.forEach(function (x) {
                    var result = new searchresultviewmodel_1.SearchResultViewModel(x, heroViewModel.hero, characterType);
                    result.isSelected = x == selectedItemViewModel;
                    results.push(result);
                });
            }
        });
        return results;
    };
    HeroService.prototype.refresh = function (heroId) {
        this._localStorageService.removeItem("hero" + heroId);
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, item_service_1.ItemService, localstorageservice_1.LocalStorageService])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map