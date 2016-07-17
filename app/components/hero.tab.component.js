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
var heroviewmodel_1 = require('../viewmodels/heroviewmodel');
var hero_service_1 = require('../services/hero.service');
var safe_1 = require('../pipes/safe');
var strings_1 = require('../pipes/strings');
var hero_1 = require('../pipes/hero');
var math_1 = require('../pipes/math');
var battlenet_1 = require('../pipes/battlenet');
var HeroTabComponent = (function () {
    function HeroTabComponent(heroService) {
        this.heroService = heroService;
        this.itemsSelected = new core_1.EventEmitter();
    }
    HeroTabComponent.prototype.select = function (selected) {
        var results = this.heroService.getSearchResults(this.heroViewModel, selected);
        this.itemsSelected.emit(results);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', heroviewmodel_1.HeroViewModel)
    ], HeroTabComponent.prototype, "heroViewModel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HeroTabComponent.prototype, "isSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeroTabComponent.prototype, "itemsSelected", void 0);
    HeroTabComponent = __decorate([
        core_1.Component({
            selector: 'hero-tab',
            pipes: [safe_1.SafeUrlPipe, safe_1.SafeStylePipe, strings_1.ConcatPipe, strings_1.ShortenPipe, hero_1.ClassPipe, hero_1.GenderPipe, math_1.SumPipe, battlenet_1.LegacyNamePipe],
            styles: ["\n\n.hero-name {\n    margin-left: 10px;\n    color: #ad835a\n}\n.hero-name.active {\n    color: #fff;\n}\n.hero-name .paragon {\n    vertical-align: top;\n}\nli.char-type {\n    height: 21px;\n}\nli.char-type .small-seasonal-leaf { \n    display: inline-block; \n    width: 15px; \n    height: 21px; \n    background: url(\"http://eu.battle.net/d3/static/images/profile/seasonal-leaf.png\") -24px -2px no-repeat; \n}\nli.char-type .small-hardcore { \n    display: inline-block; \n    width: 21px; \n    height: 21px; \n    background: url(\"../images/hardcore.png\") no-repeat; \n}\n.sets {\n    margin-top: 2px;\n    padding: 0;\n}\n.sets li {\n    list-style-type: none;\n}\n.sets .set {\n    font-size: 9px;\n}\n.hero-portrait {\n    margin-left: 9px;\n}\n.skills {\n    height: 36px;\n}\n.skills .passive .last {\n    margin-right: 23px;\n}\n.skill {\n    display: inline-block;\n    background-size: contain;\n    margin-right: 3px;\n    width: 21px;\n    height: 21px;\n}\n.sets-container {\n    height: 100%;\n}\n.gems-container {\n    height: 100%;\n}\n.gems {\n    height: 25px;\n}\n.gems .rank {\n    font-size: 9px;\n}\n.gems .gem {\n    float: left;\n    margin-right: 3px;\n}\n.gems .gem-image {\n    width: 17px;\n    height: 17px;\n}\n.augments {\n    font-size: 9px;\n}\n.augments li {\n    list-style-type:none;\n    margin-left: 2px;\n    float: left;\n}\n.augments li.first {\n    margin-left: 5px;\n}\n.augments .ancient {\n    font-size: 9px;\n    color: #ad835a\n}\n"
            ],
            templateUrl: '/app/components/html/hero.tab.html'
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], HeroTabComponent);
    return HeroTabComponent;
}());
exports.HeroTabComponent = HeroTabComponent;
//# sourceMappingURL=hero.tab.component.js.map