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
var localstorageservice_1 = require('./services/localstorageservice');
var profile_service_1 = require('./services/profile.service');
var profileviewmodel_1 = require('./viewmodels/profileviewmodel');
var heroviewmodel_1 = require('./viewmodels/heroviewmodel');
var itemviewmodel_1 = require('./viewmodels/itemviewmodel');
var ProfileLoader = (function () {
    function ProfileLoader(localStorageService, profileService) {
        var _this = this;
        this.apiKey = "";
        this.profileKey = "";
        this.locale = "eu";
        this._localStorageService = localStorageService;
        this._profileService = profileService;
        this.resetProfileLoader();
        if (this.profileKey) {
            var profile = this._localStorageService.getItem(this.profileKey);
            if (profile) {
                this.profileViewModel = new profileviewmodel_1.ProfileViewModel(profile);
                if (profile.heroes && profile.heroes.length) {
                    profile.heroes.forEach(function (hero) {
                        var cachedHero = _this._localStorageService.getItem("hero" + hero.id);
                        _this.profileViewModel.heroes.push(new heroviewmodel_1.HeroViewModel(cachedHero ? cachedHero : hero, Boolean(cachedHero)));
                    });
                }
            }
        }
    }
    ProfileLoader.prototype.resetProfileLoader = function () {
        this.apiKey = this._localStorageService.getItemAsString("apikey");
        this.profileKey = this._localStorageService.getItemAsString("profileKey");
        this.locale = this._localStorageService.getItemAsString("locale");
        if (!this.locale)
            this.locale = "eu";
    };
    ProfileLoader.prototype.updateProfile = function () {
        var _this = this;
        this._localStorageService.storeItemAsString("apikey", this.apiKey);
        this._localStorageService.storeItemAsString("profileKey", this.profileKey);
        this._localStorageService.storeItemAsString("locale", this.locale);
        this.getProfile().then(function (profile) {
            _this.profileViewModel = new profileviewmodel_1.ProfileViewModel(profile);
        });
    };
    ProfileLoader.prototype.getProfile = function () {
        var _this = this;
        var cachedProfile = this._localStorageService.getItem(this.profileKey);
        if (cachedProfile)
            return new Promise(function () { return cachedProfile; });
        var profilePromise = this._profileService.getProfile(this.locale, this.profileKey, this.apiKey);
        profilePromise.then(function (profile) {
            if (profile)
                _this._localStorageService.storeItem(_this.profileKey, profile);
        });
        return profilePromise;
    };
    ProfileLoader.prototype.getHero = function (heroId) {
        var _this = this;
        var cachedHero = this._localStorageService.getItem("hero" + heroId);
        if (cachedHero)
            return new Promise(function () { return cachedHero; });
        var heroPromise = this._profileService.getHero(this.locale, this.profileKey, this.apiKey, heroId);
        heroPromise.then(function (hero) {
            if (hero)
                _this._localStorageService.storeItem("hero" + heroId, hero);
        });
        return heroPromise;
    };
    ProfileLoader.prototype.getItem = function (uniqueId) {
        var _this = this;
        var cachedItem = this._localStorageService.getItem("item" + uniqueId);
        if (cachedItem)
            return new Promise(function () { return cachedItem; });
        var itemPromise = this._profileService.getItem(this.locale, this.profileKey, this.apiKey, uniqueId);
        itemPromise.then(function (item) {
            if (item)
                _this._localStorageService.storeItem("item" + uniqueId, item);
        });
        return itemPromise;
    };
    ProfileLoader.prototype.selectHero = function (heroViewModel) {
        var _this = this;
        this.selectedHeroViewModel = heroViewModel;
        if (heroViewModel.hasDetails) {
            this.addItemsToHero(this.selectedHeroViewModel);
        }
        else {
            this.getHero(heroViewModel.hero.id).then(function (hero) {
                var detailedHeroViewModel = new heroviewmodel_1.HeroViewModel(hero, true);
                _this.addItemsToHero(detailedHeroViewModel);
                var index = _this.profileViewModel.heroes.indexOf(heroViewModel);
                _this.profileViewModel.heroes[index] = detailedHeroViewModel;
                _this.selectedHeroViewModel = detailedHeroViewModel;
            });
        }
    };
    ProfileLoader.prototype.addItemsToHero = function (heroViewModel) {
        var items = new Array();
        for (var i = 0; i < Object.keys(heroViewModel.hero.items).length; i++) {
            var item = new itemviewmodel_1.ItemViewModel(Object.values(heroViewModel.hero.items)[i], false);
            var slotName = Object.keys(heroViewModel.hero.items)[i];
            item.slotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
            items.push(item);
        }
        heroViewModel.items = items;
    };
    ProfileLoader.prototype.selectItem = function (itemViewModel) {
        var _this = this;
        this.selectedItemViewModel = itemViewModel;
        if (!itemViewModel.hasDetails) {
            this.getItem(itemViewModel.uniqueId).then(function (item) {
                var detailedItemViewModel = new itemviewmodel_1.ItemViewModel(item, true);
                var slotName = item.slots[0];
                detailedItemViewModel.slotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
                var index = _this.selectedHeroViewModel.items.indexOf(itemViewModel);
                _this.selectedHeroViewModel.items[index] = detailedItemViewModel;
                _this.selectedItemViewModel = detailedItemViewModel;
            });
        }
    };
    ProfileLoader = __decorate([
        core_1.Component({
            directives: [profileviewmodel_1.ProfileViewModel],
            selector: 'profile-loader',
            styles: ["\n.bold {\n    font-weight: bold;\n}\n.white {\n    color: #eee;\n}\n#app-header {\n    height: 10%;\n}\n#app-main {\n    height: 90%;\n}\n#profile-pane {\n    height: 100%;\n    color: red;\n}\n#profile-pane .hero-tab {\n    color: red;\n    height: 50px;\n    border: 1px solid black;\n}\n#profile-pane .hero-tab.is-selected {\n    background-color: #222;\n    height: 50px;\n    border: 1px solid black;\n}\n#profile-pane .hero-tab .hero-name {\n    margin: 5px 10px;\n}\n#profile-pane .hero-tab .hero-name.has-details {\n    color: blue;\n}\n#hero-pane {\n    height: 100%;\n}\n#hero-main {\n    height: 100%;\n}\n#item-detail {\n    height: 100%;\n}\n"],
            templateUrl: '../app/html/profile.loader.html'
        }), 
        __metadata('design:paramtypes', [localstorageservice_1.LocalStorageService, profile_service_1.ProfileService])
    ], ProfileLoader);
    return ProfileLoader;
}());
exports.ProfileLoader = ProfileLoader;
//# sourceMappingURL=profile.loader.js.map