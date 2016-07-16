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
var attribute_service_1 = require('./services/attribute.service');
var profileviewmodel_1 = require('./viewmodels/profileviewmodel');
var searchresultviewmodel_1 = require('./viewmodels/searchresultviewmodel');
var attributes_1 = require('./interfaces/attributes');
var battlenet_1 = require('./interfaces/battlenet');
var item_card_component_1 = require('./components/item.card.component');
var item_carousel_component_1 = require('./components/item.carousel.component');
var hero_component_1 = require('./components/hero.component');
var hero_tab_component_1 = require('./components/hero.tab.component');
var ProfileLoader = (function () {
    function ProfileLoader(_profileService, _itemService, _heroService, _attributeService, _localStorageService) {
        var _this = this;
        this._profileService = _profileService;
        this._itemService = _itemService;
        this._heroService = _heroService;
        this._attributeService = _attributeService;
        this._localStorageService = _localStorageService;
        this.apiKey = "";
        this.profileKey = "";
        this.locale = "eu";
        this.heroSelected = new core_1.EventEmitter();
        this.resetProfileLoader();
        this._heroService.heroLoaded.subscribe(function (heroViewModel) {
            _this.profileViewModel.itemAttributes = _this._attributeService.getItemAttributes(_this.profileViewModel.heroes);
            _this.selectedAttribute = "-- Select item attribute --";
            _this.profileViewModel.itemAttributes.unshift(new attributes_1.ItemAttribute("", _this.selectedAttribute));
            _this.profileViewModel.profileItems = _this._heroService.getProfileItems(_this.profileViewModel.heroes);
            _this.selectedItem = "-- Select item --";
            _this.profileViewModel.profileItems.unshift(new attributes_1.ProfileItem(_this.selectedItem, ""));
            _this.profileViewModel.setFilter("");
        });
        if (this.profileKey) {
            this.loadProfile();
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
        this._localStorageService.storeItemAsString("apikey", this.apiKey);
        this._localStorageService.storeItemAsString("profileKey", this.profileKey);
        this._localStorageService.storeItemAsString("locale", this.locale);
        this.loadProfile();
    };
    ProfileLoader.prototype.selectHero = function (heroViewModel) {
        var _this = this;
        this._heroService.getHeroViewModel(this.profileViewModel.heroes, heroViewModel, new battlenet_1.BattleNet(this.apiKey, this.locale, this.profileKey)).then(function (selectedHeroViewModel) {
            _this.selectedHeroViewModel = selectedHeroViewModel;
            _this.selectedItemViewModel = null;
            _this.heroSelected.emit(selectedHeroViewModel);
        });
    };
    ProfileLoader.prototype.selectItem = function (selectedItemViewModel) {
        if (selectedItemViewModel.item) {
            this.selectedItemViewModel = selectedItemViewModel;
        }
    };
    ProfileLoader.prototype.selectItems = function (searchResults) {
        if (searchResults) {
            this.searchResults = searchResults;
        }
    };
    ProfileLoader.prototype.refresh = function () {
        var _this = this;
        this._profileService.refresh(this.profileKey);
        this.profileViewModel.heroes.forEach(function (hero) { return _this._heroService.refresh(hero.hero.id); });
        this.loadProfile();
    };
    ProfileLoader.prototype.loadProfile = function () {
        var _this = this;
        this._profileService.getProfileViewModel(new battlenet_1.BattleNet(this.apiKey, this.locale, this.profileKey)).then(function (profileViewModel) {
            _this.profileViewModel = profileViewModel;
            _this.selectedHeroViewModel = null;
            _this.selectedItemViewModel = null;
        });
    };
    ProfileLoader.prototype.search = function () {
        var _this = this;
        var selectedItems = new Array();
        if (!this.selectedItem && !this.selectedAttribute)
            return;
        this.profileViewModel.heroes.forEach(function (hero) {
            hero.getItems().forEach(function (item) {
                if (item.item &&
                    ((!_this.selectedItem || _this.selectedItem.indexOf("--") == 0 || item.item.name == _this.selectedItem) &&
                        (!_this.selectedItemSlot || _this.selectedItemSlot.indexOf("--") == 0 || item.slotName.indexOf(_this.selectedItemSlot) >= 0 &&
                            (!_this.selectedAttribute || _this.selectedAttribute.indexOf("--") == 0 || Object.keys(item.item.attributesRaw).indexOf(_this.selectedAttribute) >= 0)))) {
                    var result = new searchresultviewmodel_1.SearchResultViewModel(item, hero.hero, hero.getCharacterType(item));
                    selectedItems.push(result);
                }
            });
        });
        if (selectedItems.length == 0)
            alert("No items found");
        else
            this.searchResults = selectedItems;
    };
    ProfileLoader.prototype.onSlotChange = function (event) {
        this.profileViewModel.setFilter(event.currentTarget.value);
        this.selectedItemSlot = event.currentTarget.value;
    };
    ProfileLoader.prototype.show = function (obj) {
        alert(JSON.stringify(obj));
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProfileLoader.prototype, "heroSelected", void 0);
    ProfileLoader = __decorate([
        core_1.Component({
            directives: [profileviewmodel_1.ProfileViewModel, item_card_component_1.ItemCardComponent, hero_component_1.HeroComponent, hero_tab_component_1.HeroTabComponent, item_carousel_component_1.ItemCarouselComponent],
            selector: 'profile-loader',
            styles: ["\n.hero-tab {\n    height: 44px;\n    margin: 3px;\n    border: 1px solid #222;\n    border-radius: 3px;\n}\n.hero-tab:hover {\n    background-color: #111;\n}\n.hero-tab.active {\n    border: 1px solid #555;\n}\n.bold {\n    font-weight: bold;\n}\n.white {\n    color: #eee;\n}\n#app-header {\n    height: 10%;\n}\n#app-main {\n    height: 90%;\n}\n#input-pane select {\n    margin: 3px 0 3px 0;\n}\n#input-pane input {\n    margin: 3px 0 3px 0;\n}\n#profile-pane {\n    height: 100%;\n}\n#profile-pane ul {\n    padding: 0;\n}\n#profile-pane li {\n    list-style-type:none\n}\n#search-pane select {\n    margin: 3px 0 3px 0;\n}\n\n#hero-pane {\n    height: 100%;\n}\n#item-detail {\n    height: 100%;\n}\n#item-detail .item-card {\n    max-width: 358px;\n    width: 358px;\n    margin-right: 0;\n}\n\n\n"],
            templateUrl: '../app/html/profile.loader.html'
        }), 
        __metadata('design:paramtypes', [profile_service_1.ProfileService, item_service_1.ItemService, hero_service_1.HeroService, attribute_service_1.AttributeService, localstorageservice_1.LocalStorageService])
    ], ProfileLoader);
    return ProfileLoader;
}());
exports.ProfileLoader = ProfileLoader;
//# sourceMappingURL=profile.loader.js.map