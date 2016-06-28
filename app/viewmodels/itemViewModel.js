"use strict";
var profile_1 = require('../interfaces/profile');
var ItemViewModel = (function () {
    function ItemViewModel(item, hasDetails) {
        this.item = item;
        this.hasDetails = hasDetails;
        this.uniqueId = item.tooltipParams.split('/')[1];
        if (hasDetails) {
            this.isAncient = Boolean(item.attributesRaw["Ancient_Rank"]);
            this.sockets = Boolean(item.attributesRaw["Sockets"]) ? item.attributesRaw["Sockets"].min : 0;
            if (Boolean(item.attributesRaw["Armor_Item"]) && item.attributesRaw["Armor_Item"].min > 0) {
                this.baseValue = new profile_1.NameValue("Armor", item.armor.min);
            }
            this.augment = Boolean(item.attributesRaw["CubeEnchantedGemRank"]) ? item.attributesRaw["CubeEnchantedGemRank"].min : 0;
            this.gems = new Array();
        }
    }
    ItemViewModel.prototype.matches = function (search) {
        return true;
    };
    ItemViewModel.prototype.selectItem = function () {
    };
    return ItemViewModel;
}());
exports.ItemViewModel = ItemViewModel;
//# sourceMappingURL=itemViewModel.js.map