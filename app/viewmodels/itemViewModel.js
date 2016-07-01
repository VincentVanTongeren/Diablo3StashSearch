"use strict";
var profile_1 = require('../interfaces/profile');
var ItemViewModel = (function () {
    function ItemViewModel(item, hasDetails) {
        this.item = item;
        this.hasDetails = hasDetails;
        if (!item)
            return;
        this.uniqueId = item.tooltipParams.split('/')[1];
        this.baseValue = new profile_1.NameValue("", null);
        if (hasDetails) {
            this.isAncient = Boolean(item.attributesRaw["Ancient_Rank"]);
            this.sockets = [];
            for (var i = 0; i < (Boolean(item.attributesRaw["Sockets"]) ? item.attributesRaw["Sockets"].min : 0); i++)
                this.sockets.push({});
            if (Boolean(item.attributesRaw["Armor_Item"]) && item.attributesRaw["Armor_Item"].min > 0) {
                this.baseValue = new profile_1.NameValue("Armor", item.armor.min);
            }
            else if (Boolean(item.attributesRaw["Damage_Weapon_Min#Physical"]) && item.attributesRaw["Damage_Weapon_Min#Physical"].min > 0) {
                this.baseValue = new profile_1.NameValue("Damage Per Second", Math.round(item.dps.min * 10) / 10);
            }
            this.elementalType = Boolean(this.item.elementalType) ? this.item.elementalType : "default";
            this.augment = Boolean(item.attributesRaw["CubeEnchantedGemRank"]) ? item.attributesRaw["CubeEnchantedGemRank"].min : 0;
            this.effect = this.elementalType != "default" ? this.elementalType : this.baseValue.name;
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