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
var heroviewmodel_1 = require('../viewmodels/heroviewmodel');
var itemviewmodel_1 = require('../viewmodels/itemviewmodel');
var item_service_1 = require('./item.service');
var localstorageservice_1 = require('./localstorageservice');
var platform_browser_1 = require('@angular/platform-browser');
require('rxjs/add/operator/toPromise');
var HeroService = (function () {
    function HeroService(_http, _itemService, _localStorageService, _sanitizationService) {
        this._http = _http;
        this._itemService = _itemService;
        this._localStorageService = _localStorageService;
        this._sanitizationService = _sanitizationService;
    }
    HeroService.prototype.getHero = function (locale, profile, apiKey, heroId) {
        var _this = this;
        var cachedHero = this._localStorageService.getItem("hero" + heroId);
        if (cachedHero) {
            return new Promise(function (resolve, reject) {
                resolve(cachedHero);
            });
        }
        var url = "https://" + locale + ".api.battle.net/d3/profile/" + profile + "/hero/" + heroId + "?locale=en_GB&apikey=" + apiKey;
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
    HeroService.prototype.enrichHero = function (heroViewModel) {
        var items = new Array();
        for (var i = 0; i < Object.keys(heroViewModel.hero.items).length; i++) {
            var item = new itemviewmodel_1.ItemViewModel(Object.values(heroViewModel.hero.items)[i], false);
            var slotName = Object.keys(heroViewModel.hero.items)[i];
            item.slotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
            items.push(item);
        }
        heroViewModel.items = items;
    };
    HeroService.prototype.setIconUrl = function (heroViewModel) {
        var heroPart = (heroViewModel.hero.class == "crusader" ? "x1_" : "") + heroViewModel.hero.class.replace("-", "") + "_" + (heroViewModel.hero.gender ? "female" : "male");
        var trustedUrl = "http://media.blizzard.com/d3/icons/portraits/42/" + heroPart + ".png";
        heroViewModel.iconUrl = this._sanitizationService.bypassSecurityTrustUrl(trustedUrl);
    };
    HeroService.prototype.createHeroViewModel = function (hero) {
        var cachedHero = this._localStorageService.getItem("hero" + hero.id);
        var heroViewModel = new heroviewmodel_1.HeroViewModel(cachedHero ? cachedHero : hero, Boolean(cachedHero));
        this.setIconUrl(heroViewModel);
        if (cachedHero)
            this.enrichHero(heroViewModel);
        return heroViewModel;
    };
    HeroService.prototype.getHeroViewModel = function (heroes, heroViewModel, locale, profileKey, apiKey) {
        var _this = this;
        return this.getHero(locale, profileKey, apiKey, heroViewModel.hero.id).then(function (hero) {
            var detailedHeroViewModel = new heroviewmodel_1.HeroViewModel(hero, true);
            _this.setIconUrl(detailedHeroViewModel);
            _this.enrichHero(detailedHeroViewModel);
            var index = heroes.indexOf(heroViewModel);
            heroes[index] = detailedHeroViewModel;
            return detailedHeroViewModel;
        });
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, item_service_1.ItemService, localstorageservice_1.LocalStorageService, platform_browser_1.DomSanitizationService])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map