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
var hero_service_1 = require('./hero.service');
var profileviewmodel_1 = require('../viewmodels/profileviewmodel');
var heroviewmodel_1 = require('../viewmodels/heroviewmodel');
var localstorageservice_1 = require('./localstorageservice');
var platform_browser_1 = require('@angular/platform-browser');
require('rxjs/add/operator/toPromise');
var ProfileService = (function () {
    function ProfileService(_http, _heroService, _localStorageService, _sanitizationService) {
        this._http = _http;
        this._heroService = _heroService;
        this._localStorageService = _localStorageService;
        this._sanitizationService = _sanitizationService;
    }
    ProfileService.prototype.getProfile = function (locale, profileKey, apiKey) {
        var _this = this;
        var cachedProfile = this._localStorageService.getItem(profileKey);
        if (cachedProfile)
            return new Promise(function () { return cachedProfile; });
        var url = "https://" + locale + ".api.battle.net/d3/profile/" + profileKey + "/?locale=en_GB&apikey=" + apiKey;
        var profilePromise = this._http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            debugger;
        });
        profilePromise.then(function (profile) {
            if (profile)
                _this._localStorageService.storeItem(profileKey, profile);
        });
        return profilePromise;
    };
    ProfileService.prototype.getProfileViewModel = function (locale, profileKey, apiKey) {
        var _this = this;
        return this.getProfile(locale, profileKey, apiKey).then(function (profile) {
            var profileViewModel = new profileviewmodel_1.ProfileViewModel(profile);
            if (profile.heroes && profile.heroes.length) {
                profile.heroes.forEach(function (hero) {
                    var cachedHero = _this._localStorageService.getItem("hero" + hero.id);
                    var heroViewModel = new heroviewmodel_1.HeroViewModel(cachedHero ? cachedHero : hero, Boolean(cachedHero));
                    var heroPart = (hero.class == "crusader" ? "x1_" : "") + hero.class.replace("-", "") + "_" + (hero.gender ? "female" : "male");
                    var trustedUrl = "http://media.blizzard.com/d3/icons/portraits/42/" + heroPart + ".png";
                    heroViewModel.iconUrl = _this._sanitizationService.bypassSecurityTrustUrl(trustedUrl);
                    profileViewModel.heroes.push(heroViewModel);
                });
            }
            return profileViewModel;
        });
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, hero_service_1.HeroService, localstorageservice_1.LocalStorageService, platform_browser_1.DomSanitizationService])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map