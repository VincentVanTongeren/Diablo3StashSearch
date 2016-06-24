"use strict";
var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.getItem = function (key) {
        var itemJson = this.getItemAsString(key);
        debugger;
        return itemJson ? JSON.parse(itemJson) : null;
    };
    LocalStorageService.prototype.getItemAsString = function (key) {
        return localStorage.getItem(key);
    };
    LocalStorageService.prototype.storeItem = function (key, item) {
        var itemJson = JSON.stringify(item);
        this.storeItemAsString(key, itemJson);
    };
    LocalStorageService.prototype.storeItemAsString = function (key, item) {
        if (localStorage[key])
            localStorage.removeItem(key);
        localStorage.setItem(key, item);
    };
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localstorageservice.js.map