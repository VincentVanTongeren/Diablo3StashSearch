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
var profile_loader_1 = require('../profile.loader');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var ProfileService = (function () {
    function ProfileService(http, profileLoader) {
        this.profileLoader = profileLoader;
        debugger;
        this._profileLoader = profileLoader;
        this._http = http;
    }
    ProfileService.prototype.getProfile = function () {
        var url = "https://" + this._profileLoader.locale + ".api.battle.net/d3/profile/" + this._profileLoader.profile + "}/?locale=en_GB&apikey=" + this._profileLoader.apiKey;
        return this._http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(function () { });
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, profile_loader_1.ProfileLoader])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map