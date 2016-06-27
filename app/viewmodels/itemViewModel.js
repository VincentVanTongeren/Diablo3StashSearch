"use strict";
var ItemViewModel = (function () {
    function ItemViewModel(item, hasDetails) {
        this.item = item;
        this.hasDetails = hasDetails;
        this.uniqueId = item.tooltipParams.split('/')[1];
        this.isAncient = hasDetails && Boolean(item.attributesRaw["Ancient_Rank"]);
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