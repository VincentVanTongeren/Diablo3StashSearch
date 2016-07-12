"use strict";
var ItemAttribute = (function () {
    function ItemAttribute(rawAttribute, attribute) {
        this.rawAttribute = rawAttribute;
        this.attribute = attribute;
    }
    return ItemAttribute;
}());
exports.ItemAttribute = ItemAttribute;
var ProfileItem = (function () {
    function ProfileItem(name, slot) {
        this.name = name;
        this.slot = slot;
    }
    return ProfileItem;
}());
exports.ProfileItem = ProfileItem;
var SlotItem = (function () {
    function SlotItem(slotValue, slotName) {
        this.slotValue = slotValue;
        this.slotName = slotName;
    }
    return SlotItem;
}());
exports.SlotItem = SlotItem;
//# sourceMappingURL=attributes.js.map