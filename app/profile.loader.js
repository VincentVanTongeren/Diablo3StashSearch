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
var ProfileLoader = (function () {
    function ProfileLoader(localStorageService, profileService) {
        this.apiKey = "";
        this.profileKey = "";
        this.locale = "eu";
        this._localStorageService = localStorageService;
        this._profileService = profileService;
        this.resetProfileLoader();
        if (this.profileKey) {
            var profile = this._localStorageService.getItem(this.profileKey);
            if (profile)
                this.profileViewModel = new profileviewmodel_1.ProfileViewModel(profile);
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
    ProfileLoader = __decorate([
        core_1.Component({
            directives: [profileviewmodel_1.ProfileViewModel],
            selector: 'profile-loader',
            styles: ["\n#app-header {\n    height: 10%;\n}\n#app-main {\n    height: 90%;\n}\n.profile-pane {\n    height: 100%;\n    color: red;\n}\n.profile-pane .hero-tab {\n    color: green;\n    height: 50px;\n}\n"],
            templateUrl: '../app/html/profile.loader.html'
        }), 
        __metadata('design:paramtypes', [localstorageservice_1.LocalStorageService, profile_service_1.ProfileService])
    ], ProfileLoader);
    return ProfileLoader;
}());
exports.ProfileLoader = ProfileLoader;
//# sourceMappingURL=profile.loader.js.map