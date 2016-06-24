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
var ProfileLoader = (function () {
    function ProfileLoader() {
        this.apiKey = "";
        this.profile = "";
        this.locale = "eu";
        var localStorageService = new localstorageservice_1.LocalStorageService();
        this.apiKey = localStorageService.getItem("apikey");
        this.profile = localStorageService.getItem("profile");
        this.locale = localStorageService.getItem("locale");
        if (!this.locale)
            this.locale = "eu";
    }
    ProfileLoader = __decorate([
        core_1.Component({
            selector: 'profile-loader',
            template: "<input type=\"text\" [value]=\"apiKey\" placeholder=\"battle.net api key\" />\n  <input type=\"text\" [value]=\"profile\" placeholder=\"pro-1234\" />\n  <select type=\"text\" [value]=\"locale\" >\n    <option value=\"eu\">Europe</option>\n    <option value=\"us\">US</option>\n    </select>"
        }), 
        __metadata('design:paramtypes', [])
    ], ProfileLoader);
    return ProfileLoader;
}());
exports.ProfileLoader = ProfileLoader;
//# sourceMappingURL=profile.loader.js.map