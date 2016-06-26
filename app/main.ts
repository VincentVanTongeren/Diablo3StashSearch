import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { FORM_PROVIDERS } from '@angular/common';
import { provide, Injectable, ChangeDetectionStrategy, PipeTransform, Pipe, Component, EventEmitter } from '@angular/core';
import { Router, RouteParams, ROUTER_PROVIDERS, RouterLink, RouterOutlet, RouteConfig } from '@angular/router-deprecated';
import { Http, HTTP_PROVIDERS } from '@angular/http'
import { LocalStorageService } from './services/localstorageservice'
import { ProfileService } from './services/profile.service'

bootstrap(AppComponent, [ LocalStorageService, ProfileService, HTTP_PROVIDERS, ROUTER_PROVIDERS, FORM_PROVIDERS]);
