"use strict";
var profile_1 = require('../interfaces/profile');
var ItemViewModel = (function () {
    function ItemViewModel(item, hasDetails) {
        this.item = item;
        this.hasDetails = hasDetails;
        this.uniqueId = item.tooltipParams.split('/')[1];
        this.isAncient = hasDetails && Boolean(item.attributesRaw["Ancient_Rank"]);
        this.sockets = hasDetails && Boolean(item.attributesRaw["Sockets"]) ? item.attributesRaw["Sockets"].min : 0;
        if (hasDetails && Boolean(item.attributesRaw["Armor_Item"]) && item.attributesRaw["Armor_Item"].min > 0) {
            this.baseValue = new profile_1.NameValue("Armor", item.armor.min);
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