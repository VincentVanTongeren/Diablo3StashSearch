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
require('rxjs/add/operator/toPromise');
var ProfileService = (function () {
    function ProfileService(http) {
        this._http = http;
    }
    ProfileService.prototype.getProfile = function (locale, profile, apiKey) {
        var url = "https://" + locale + ".api.battle.net/d3/profile/" + profile + "/?locale=en_GB&apikey=" + apiKey;
        return this._http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            debugger;
        });
    };
    ProfileService.prototype.getHero = function (locale, profile, apiKey, heroId) {
        var url = "https://" + locale + ".api.battle.net/d3/profile/" + profile + "/hero/" + heroId + "?locale=en_GB&apikey=" + apiKey;
        return this._http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            debugger;
        });
    };
    ProfileService.prototype.getItem = function (locale, profile, apiKey, uniqueId) {
        var url = "https://" + locale + ".api.battle.net/d3/data/item/" + uniqueId + "?locale=en_GB&apikey=" + apiKey;
        return this._http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            debugger;
        });
    };
    ProfileService.prototype.getItemDetail = function (locale, uniqueId) {
        var url = "http://" + locale + ".battle.net/d3/en/tooltip/item/" + uniqueId;
        return this._http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            debugger;
        });
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map