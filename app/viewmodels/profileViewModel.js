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
var profile_1 = require('../interfaces/profile');
var attributes_1 = require('../interfaces/attributes');
var ProfileViewModel = (function () {
    function ProfileViewModel(profile) {
        this.profile = profile;
        this._noSlot = "-- Select slot --";
        this.heroes = [];
        this.itemAttributes = [];
        this.slotItems = [new attributes_1.SlotItem("", this._noSlot),
            new attributes_1.SlotItem(" Hand", "Weapons/Off hands"), new attributes_1.SlotItem("Neck", "Amulets"), new attributes_1.SlotItem("Finger", "Rings"),
            new attributes_1.SlotItem("Head", "Helmets"), new attributes_1.SlotItem("Hands", "Gloves"), new attributes_1.SlotItem("Torso", "Chests"), new attributes_1.SlotItem("Legs", "Pants"),
            new attributes_1.SlotItem("Shoulders", "Shoulders"), new attributes_1.SlotItem("Feet", "Boots"), new attributes_1.SlotItem("Bracers", "Bracers"),
            new attributes_1.SlotItem("Waist", "Belts"), new attributes_1.SlotItem("Special", "Follower Token")];
    }
    ProfileViewModel.prototype.setFilter = function (filter) {
        var items = filter ? this.profileItems.filter(function (item) { return !item.slot || item.slot.indexOf(filter) != -1; }) : this.profileItems;
        this.filteredProfileItems = items.sort(function (a, b) {
            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
        });
    };
    ProfileViewModel = __decorate([
        core_1.Component({
            selector: 'profile-viewmodel',
            providers: [profile_1.Profile],
            templateUrl: '../app/html/profile.viewmodel.html'
        }), 
        __metadata('design:paramtypes', [profile_1.Profile])
    ], ProfileViewModel);
    return ProfileViewModel;
}());
exports.ProfileViewModel = ProfileViewModel;
//# sourceMappingURL=profileviewmodel.js.map