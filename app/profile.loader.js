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
    ProfileLoader.prototype.selectHero = function (heroViewModel) {
        var _this = this;
        this.selectedHeroViewModel = heroViewModel;
        if (!heroViewModel.hasDetails) {
            this.getHero(heroViewModel.hero.id).then(function (hero) {
                var detailedHeroViewModel = new heroviewmodel_1.HeroViewModel(hero, true);
                var index = _this.profileViewModel.heroes.indexOf(heroViewModel);
                _this.profileViewModel.heroes[index] = detailedHeroViewModel;
                _this.selectedHeroViewModel = detailedHeroViewModel;
            });
        }
    };
    ProfileLoader = __decorate([
        core_1.Component({
            directives: [profileviewmodel_1.ProfileViewModel],
            selector: 'profile-loader',
            styles: ["\n#app-header {\n    height: 10%;\n}\n#app-main {\n    height: 90%;\n}\n#profile-pane {\n    height: 100%;\n    color: red;\n}\n#profile-pane .hero-tab {\n    color: red;\n    height: 50px;\n    border: 1px solid black;\n}\n#profile-pane .hero-tab.is-selected {\n    background-color: #222;\n    height: 50px;\n    border: 1px solid black;\n}\n#profile-pane .hero-tab .hero-name {\n    margin: 5px 10px;\n}\n#profile-pane .hero-tab .hero-name.has-details {\n    color: blue;\n}\n"],
            templateUrl: '../app/html/profile.loader.html'
        }), 
        __metadata('design:paramtypes', [localstorageservice_1.LocalStorageService, profile_service_1.ProfileService])
    ], ProfileLoader);
    return ProfileLoader;
}());
exports.ProfileLoader = ProfileLoader;
//# sourceMappingURL=profile.loader.js.map