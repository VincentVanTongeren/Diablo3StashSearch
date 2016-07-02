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
var battlenet_1 = require('./interfaces/battlenet');
var safe_1 = require('./pipes/safe');
var strings_1 = require('./pipes/strings');
var hero_1 = require('./pipes/hero');
var math_1 = require('./pipes/math');
var battlenet_2 = require('./pipes/battlenet');
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
            this._profileService.getProfileViewModel(new battlenet_1.BattleNet(this.apiKey, this.locale, this.profileKey)).then(function (profileViewModel) {
                _this.profileViewModel = profileViewModel;
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
        this._profileService.getProfileViewModel(new battlenet_1.BattleNet(this.apiKey, this.locale, this.profileKey)).then(function (profileViewModel) {
            _this.profileViewModel = profileViewModel;
            _this.selectedHeroViewModel = null;
            _this.selectedItemViewModel = null;
        });
    };
    ProfileLoader.prototype.selectHero = function (heroViewModel) {
        var _this = this;
        this._heroService.getHeroViewModel(this.profileViewModel.heroes, heroViewModel, new battlenet_1.BattleNet(this.apiKey, this.locale, this.profileKey)).then(function (selectedHeroViewModel) {
            _this.selectedHeroViewModel = selectedHeroViewModel;
            _this.selectedItemViewModel = null;
        });
    };
    ProfileLoader.prototype.selectItem = function (selectedItemViewModel) {
        if (selectedItemViewModel.item)
            this.selectedItemViewModel = selectedItemViewModel;
    };
    ProfileLoader.prototype.show = function (obj) {
        alert(JSON.stringify(obj));
    };
    ProfileLoader = __decorate([
        core_1.Component({
            directives: [profileviewmodel_1.ProfileViewModel],
            pipes: [safe_1.SafeUrlPipe, safe_1.SafeStylePipe, strings_1.ConcatPipe, strings_1.ShortenPipe, hero_1.ClassPipe, hero_1.GenderPipe, math_1.SumPipe, battlenet_2.LegacyNamePipe],
            selector: 'profile-loader',
            styles: ["\n.bold {\n    font-weight: bold;\n}\n.white {\n    color: #eee;\n}\n#app-header {\n    height: 10%;\n}\n#app-main {\n    height: 90%;\n}\n#input-pane .input-row {\n    margin: 3px;\n}\n#profile-pane {\n    height: 100%;\n}\n#profile-pane ul {\n    padding: 0;\n}\n#profile-pane li {\n    list-style-type:none\n}\n#profile-pane .hero-tab {\n    height: 44px;\n    margin: 3px;\n    border: 1px solid #222;\n    border-radius: 3px;\n}\n#profile-pane .hero-tab.active {\n    border: 1px solid #555;\n}\n#profile-pane .hero-tab .hero-name {\n    margin-left: 10px;\n    color: #ad835a\n}\n#profile-pane .hero-tab.active .hero-name {\n    color: #fff;\n}\n#profile-pane .hero-tab .hero-name .paragon {\n    vertical-align: top;\n}\n#profile-pane .hero-tab .sets {\n    margin-top: 2px;\n    padding: 0;\n}\n#profile-pane .hero-tab .sets li {\n    list-style-type: none;\n}\n#profile-pane .hero-tab .sets .set {\n    font-size: 9px;\n}\n#profile-pane .hero-portrait {\n    margin-left: 9px;\n}\n#profile-pane .skills {\n    height: 36px;\n}\n#profile-pane .skills .passive .last {\n    margin-right: 23px;\n}\n#profile-pane .skill {\n    display: inline-block;\n    background-size: contain;\n    margin-right: 3px;\n    width: 21px;\n    height: 21px;\n}\n#profile-pane .sets-container {\n    height: 100%;\n}\n#profile-pane .gems-container {\n    height: 100%;\n}\n#profile-pane .gems {\n    height: 25px;\n}\n#profile-pane .gems .rank {\n    font-size: 9px;\n}\n#profile-pane .gems .gem {\n    float: left;\n    margin-right: 3px;\n}\n#profile-pane .gems .gem-image {\n    width: 17px;\n    height: 17px;\n}\n#profile-pane .augments {\n    font-size: 9px;\n}\n#profile-pane .augments li {\n    list-style-type:none;\n    margin-left: 2px;\n    float: left;\n}\n#profile-pane .augments li.first {\n    margin-left: 5px;\n}\n#profile-pane .augments .ancient {\n    font-size: 9px;\n    color: #ad835a\n}\n#hero-pane {\n    height: 100%;\n}\n#hero-pane ul {\n    padding: 0;\n}\n#hero-main {\n    height: 100%;\n}\n#hero-main li.item-icon {\n    /*float: left;*/\n}\n#hero-main .item-properties {\n    padding: 0;\n    padding-top: 3px;\n    height: 72px;\n}\n#hero-main .ancient {\n    color: #ad835a\n}\n#hero-main .item-properties.active {\n    border: 1px solid #555;\n}\n#hero-main .item-properties ul {\n    padding: 0;\n}\n#hero-main .item-properties ul li {\n    list-style-type:none;\n}\n#hero-main .empty-row {\n    height: 50px;\n}\n#hero-main .follower {\n    padding-left: 24px;\n    height: 21px;\n    margin-top: 10px;\n    display: inline-block;\n}\n\n#hero-main .templar {\n    background: url('http://media.blizzard.com/d3/icons/portraits/21/templar.png') no-repeat; \n}\n#hero-main .scoundrel {\n    background: url('http://media.blizzard.com/d3/icons/portraits/21/scoundrel.png') no-repeat; \n}\n#hero-main .enchantress {\n    background: url('http://media.blizzard.com/d3/icons/portraits/21/enchantress.png') no-repeat; \n}\n#hero-main .d3-icon-item-white {\n    opacity: 0.4;\n}\n#item-detail {\n    height: 100%;\n}\n#item-detail .item-card {\n    max-width: 351px;\n    margin-right: 0;\n}\nli.char-type {\n    height: 21px;\n}\nli.char-type .small-seasonal-leaf { \n    display: inline-block; \n    width: 15px; \n    height: 21px; \n    background: url(\"http://eu.battle.net/d3/static/images/profile/seasonal-leaf.png\") -24px -2px no-repeat; \n}\nli.char-type .small-hardcore { \n    display: inline-block; \n    width: 21px; \n    height: 21px; \n    background: url(\"../images/hardcore.png\") no-repeat; \n}\n\n"],
            templateUrl: '../app/html/profile.loader.html'
        }), 
        __metadata('design:paramtypes', [profile_service_1.ProfileService, item_service_1.ItemService, hero_service_1.HeroService, localstorageservice_1.LocalStorageService])
    ], ProfileLoader);
    return ProfileLoader;
}());
exports.ProfileLoader = ProfileLoader;
//# sourceMappingURL=profile.loader.js.map