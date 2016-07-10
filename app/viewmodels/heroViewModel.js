"use strict";
var profile_1 = require('../interfaces/profile');
var HeroViewModel = (function () {
    function HeroViewModel(hero, hasDetails) {
        this.hero = hero;
        this.hasDetails = hasDetails;
    }
    HeroViewModel.prototype.getStats = function () {
        var stats = new Array();
        for (var i = 0; i < Object.keys(this.hero.stats).length; i++) {
            var statName = Object.keys(this.hero.stats)[i];
            statName = statName.substring(0, 1).toUpperCase() + statName.substring(1).replace(/(?=[A-Z])/, " ");
            var statValue = Object.values(this.hero.stats)[i];
            var stat = new profile_1.NameValue(statName, statValue);
            if (stat.value > 0)
                stats.push(stat);
        }
        return stats;
    };
    HeroViewModel.prototype.getAncientCount = function () {
        return this.items ? this.items.filter(function (x) { return Boolean(x.item) && x.isAncient; }).length : 0;
    };
    HeroViewModel.prototype.hasItems = function () {
        return Boolean(this.items) || Boolean(this.templarItems) || Boolean(this.scoundrelItems) || Boolean(this.enchantressItems);
    };
    HeroViewModel.prototype.getItems = function () {
        var items = new Array();
        if (this.items)
            this.items.forEach(function (item) { return items.push(item); });
        if (this.templarItems)
            this.templarItems.forEach(function (item) { return items.push(item); });
        if (this.scoundrelItems)
            this.scoundrelItems.forEach(function (item) { return items.push(item); });
        if (this.enchantressItems)
            this.enchantressItems.forEach(function (item) { return items.push(item); });
        return items;
    };
    return HeroViewModel;
}());
exports.HeroViewModel = HeroViewModel;
//# sourceMappingURL=heroviewmodel.js.map