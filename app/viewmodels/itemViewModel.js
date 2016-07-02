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
    }
    ItemViewModel.prototype.matches = function (search) {
        return true;
    };
    ItemViewModel.prototype.getEmptySockets = function () {
        if (!this.item.gems)
            return this.sockets;
        var emptySockets = new Array();
        for (var i = 0; i < this.sockets.length - this.item.gems.length; i++)
            emptySockets.push({});
        return emptySockets;
    };
    return ItemViewModel;
}());
exports.ItemViewModel = ItemViewModel;
//# sourceMappingURL=itemViewModel.js.map