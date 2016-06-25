import { Component } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { LocalStorageService } from './services/localstorageservice'

@Component({
  selector: 'profile-loader',
  templateUrl: '../app/html/profile.loader.html'
})
export class ProfileLoader {
    public apiKey: string = "";
    public profile: string = "";
    public locale: string = "eu";

    private _localStorageService: LocalStorageService;

    constructor(localStorageService: LocalStorageService){
        this._localStorageService = localStorageService;
        this.resetProfileLoader();
    }

    private resetProfileLoader(): void{
        this.apiKey = this._localStorageService.getItemAsString("apikey");
        this.profile = this._localStorageService.getItemAsString("profile");
        this.locale = this._localStorageService.getItemAsString("locale");
        if (!this.locale) this.locale = "eu";
    }

    public updateProfile(): void{
        this._localStorageService.storeItemAsString("apikey", this.apiKey);
        this._localStorageService.storeItemAsString("profile", this.profile);
        this._localStorageService.storeItemAsString("locale", this.locale);
    }
}
