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
            var stat = new profile_1.HeroStat();
            var name = Object.keys(this.hero.stats)[i];
            stat.name = name.substring(0, 1).toUpperCase() + name.substring(1).replace(/(?=[A-Z])/, " ");
            stat.value = Object.values(this.hero.stats)[i];
            if (stat.value > 0)
                stats.push(stat);
        }
        return stats;
    };
    return HeroViewModel;
}());
exports.HeroViewModel = HeroViewModel;
//# sourceMappingURL=heroViewModel.js.map