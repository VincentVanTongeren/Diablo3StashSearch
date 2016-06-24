"use strict";
var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.getItem = function (key) {
        var itemJson = localStorage.getItem(key);
        var item = JSON.parse(itemJson);
        return item;
    };
    LocalStorageService.prototype.storeItem = function (key, item) {
        var itemJson = JSON.stringify(item);
        localStorage.setItem(key, itemJson);
    };
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localstorageservice.js.map