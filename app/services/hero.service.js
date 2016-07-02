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
var heroviewmodel_1 = require('../viewmodels/heroviewmodel');
var item_service_1 = require('./item.service');
var localstorageservice_1 = require('./localstorageservice');
require('rxjs/add/operator/toPromise');
var HeroService = (function () {
    function HeroService(_http, _itemService, _localStorageService) {
        this._http = _http;
        this._itemService = _itemService;
        this._localStorageService = _localStorageService;
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
        for (var i = 0; i < items.length; i++) {
            var set = items[i].item ? items[i].item.set : null;
            if (set && heroViewModel.sets.indexOf(items[i].item.set.name)) {
                debugger;
                heroViewModel.sets.push(set.name);
            }
        }
        var dummyFollower = new profile_1.Follower();
        var templar = heroViewModel.hero.followers.templar ? heroViewModel.hero.followers.templar : dummyFollower;
        var scoundrel = heroViewModel.hero.followers.scoundrel ? heroViewModel.hero.followers.scoundrel : dummyFollower;
        var enchantress = heroViewModel.hero.followers.enchantress ? heroViewModel.hero.followers.enchantress : dummyFollower;
        this.setFollowerItems(templar, ["offHand"], battleNet).then(function (items) {
            heroViewModel.templarItems = items;
        });
        this.setFollowerItems(scoundrel, null, battleNet).then(function (items) {
            heroViewModel.scoundrelItems = items;
        });
        this.setFollowerItems(enchantress, null, battleNet).then(function (items) {
            heroViewModel.enchantressItems = items;
        });
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
    HeroService.prototype.setIconUrl = function (heroViewModel) {
        heroViewModel.iconName = (heroViewModel.hero.class == "crusader" ? "x1_" : "") + heroViewModel.hero.class.replace("-", "") + "_" + (heroViewModel.hero.gender ? "female" : "male");
    };
    HeroService.prototype.createHeroViewModel = function (hero, battleNet) {
        var cachedHero = this._localStorageService.getItem("hero" + hero.id);
        var heroViewModel = new heroviewmodel_1.HeroViewModel(cachedHero ? cachedHero : hero, Boolean(cachedHero));
        this.setIconUrl(heroViewModel);
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
            });
            _this.setIconUrl(detailedHeroViewModel);
            var index = heroes.indexOf(heroViewModel);
            heroes[index] = detailedHeroViewModel;
            return detailedHeroViewModel;
        });
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, item_service_1.ItemService, localstorageservice_1.LocalStorageService])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map