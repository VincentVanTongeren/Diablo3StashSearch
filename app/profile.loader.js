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
var hero_service_1 = require('./services/hero.service');
var item_service_1 = require('./services/item.service');
var profileviewmodel_1 = require('./viewmodels/profileviewmodel');
var ProfileLoader = (function () {
    function ProfileLoader(_profileService, _itemService, _heroService, _localStorageService) {
        var _this = this;
        this._profileService = _profileService;
        this._itemService = _itemService;
        this._heroService = _heroService;
        this._localStorageService = _localStorageService;
        this.apiKey = "";
        this.profileKey = "";
        this.locale = "eu";
        this.resetProfileLoader();
        if (this.profileKey) {
            this._profileService.getProfileViewModel(this.locale, this.profileKey, this.apiKey).then(function (profile) {
                _this.loadProfile(profile);
            });
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
        this._profileService.getProfileViewModel(this.locale, this.profileKey, this.apiKey).then(function (profile) {
            _this.loadProfile(profile);
        });
    };
    ProfileLoader.prototype.loadProfile = function (profile) {
        var _this = this;
        var profileViewModel = new profileviewmodel_1.ProfileViewModel(profile);
        if (profile.heroes && profile.heroes.length) {
            profile.heroes.forEach(function (hero) {
                var heroViewModel = _this._heroService.createHeroViewModel(hero);
                profileViewModel.heroes.push(heroViewModel);
            });
        }
        this.profileViewModel = profileViewModel;
    };
    ProfileLoader.prototype.selectHero = function (heroViewModel) {
        var _this = this;
        this._heroService.getHeroViewModel(this.profileViewModel.heroes, heroViewModel, this.locale, this.profileKey, this.apiKey).then(function (selectedHeroViewModel) {
            _this.selectedHeroViewModel = selectedHeroViewModel;
        });
    };
    ProfileLoader.prototype.show = function (obj) {
        alert(JSON.stringify(obj));
    };
    ProfileLoader.prototype.selectItem = function (itemViewModel) {
        var _this = this;
        this._itemService.getDetailedItemViewModel(this.selectedHeroViewModel.items, itemViewModel, this.locale, this.profileKey, this.apiKey).then(function (selectedItemViewModel) {
            _this.selectedItemViewModel = selectedItemViewModel;
        });
    };
    ProfileLoader = __decorate([
        core_1.Component({
            directives: [profileviewmodel_1.ProfileViewModel],
            selector: 'profile-loader',
            styles: ["\n.bold {\n    font-weight: bold;\n}\n.white {\n    color: #eee;\n}\n#app-header {\n    height: 10%;\n}\n#app-main {\n    height: 90%;\n}\n#input-pane .input-row {\n    margin: 3px;\n}\n#profile-pane {\n    height: 100%;\n}\n#profile-pane ul {\n    padding: 0;\n}\n#profile-pane li {\n    list-style-type:none\n}\n#profile-pane .hero-tab {\n    height: 44px;\n    margin: 3px;\n    border: 1px solid #222;\n    border-radius: 3px;\n}\n#profile-pane .hero-tab.is-selected {\n    border: 1px solid #555;\n}\n#profile-pane .hero-tab .hero-name {\n    margin: 5px 10px;\n}\n#profile-pane .hero-tab .hero-name.has-details {\n    color: blue;\n}\n#hero-pane {\n    height: 100%;\n}\n#hero-main {\n    height: 100%;\n}\n#item-detail {\n    height: 100%;\n}\n"],
            templateUrl: '../app/html/profile.loader.html'
        }), 
        __metadata('design:paramtypes', [profile_service_1.ProfileService, item_service_1.ItemService, hero_service_1.HeroService, localstorageservice_1.LocalStorageService])
    ], ProfileLoader);
    return ProfileLoader;
}());
exports.ProfileLoader = ProfileLoader;
//# sourceMappingURL=profile.loader.js.map