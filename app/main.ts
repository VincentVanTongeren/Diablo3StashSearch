import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { FORM_PROVIDERS } from '@angular/common';
import { provide, Injectable, ChangeDetectionStrategy, PipeTransform, Pipe, Component, EventEmitter } from '@angular/core';
import { Router, RouteParams, ROUTER_PROVIDERS, RouterLink, RouterOutlet, RouteConfig } from '@angular/router-deprecated';
import { Http, HTTP_PROVIDERS } from '@angular/http'
import { LocalStorageService } from './services/localstorageservice'
import { ProfileService } from './services/profile.service'
import { HeroService } from './services/hero.service'
import { ItemService } from './services/item.service'

bootstrap(AppComponent, [ LocalStorageService, ProfileService, HeroService, ItemService, HTTP_PROVIDERS, ROUTER_PROVIDERS, FORM_PROVIDERS]);
