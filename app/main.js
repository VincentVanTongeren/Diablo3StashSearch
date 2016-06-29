"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
var http_1 = require('@angular/http');
var localstorageservice_1 = require('./services/localstorageservice');
var profile_service_1 = require('./services/profile.service');
var hero_service_1 = require('./services/hero.service');
var item_service_1 = require('./services/item.service');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [localstorageservice_1.LocalStorageService, profile_service_1.ProfileService, hero_service_1.HeroService, item_service_1.ItemService, http_1.HTTP_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS, common_1.FORM_PROVIDERS]);
//# sourceMappingURL=main.js.map