"use strict";
var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.getItem = function (key) {
        var itemJson = localStorage.getItem(key);
        return itemJson ? JSON.parse(itemJson) : null;
    };
    LocalStorageService.prototype.storeItem = function (key, item) {
        var itemJson = JSON.stringify(item);
        localStorage.setItem(key, itemJson);
    };
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localstorageservice.js.map