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
var ShortenPipe = (function () {
    function ShortenPipe() {
    }
    ShortenPipe.prototype.transform = function (value, filter) {
        var parts = value.split(" ");
        var shortened = "";
        parts.forEach(function (p) { return shortened += p[0]; });
        return shortened;
    };
    ShortenPipe = __decorate([
        core_1.Pipe({
            name: 'shorten',
            pure: true
        }), 
        __metadata('design:paramtypes', [])
    ], ShortenPipe);
    return ShortenPipe;
}());
exports.ShortenPipe = ShortenPipe;
var SafeStylePipe = (function () {
    function SafeStylePipe() {
    }
    SafeStylePipe.prototype.transform = function (value, filter) {
        return value.replace("-", "").replace(" ", "");
    };
    SafeStylePipe = __decorate([
        core_1.Pipe({
            name: 'concat',
            pure: true
        }), 
        __metadata('design:paramtypes', [])
    ], SafeStylePipe);
    return SafeStylePipe;
}());
exports.SafeStylePipe = SafeStylePipe;
//# sourceMappingURL=strings.js.map