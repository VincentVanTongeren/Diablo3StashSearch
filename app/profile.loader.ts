import { Component } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { LocalStorageService } from './services/localstorageservice'
@Component({
  selector: 'profile-loader',
  template: `<input type="text" [value]="apiKey" placeholder="battle.net api key" />
  <input type="text" [value]="profile" placeholder="pro-1234" />
  <select type="text" [value]="locale" >
    <option value="eu">Europe</option>
    <option value="us">US</option>
    </select>`
})
export class ProfileLoader {
    public apiKey: string = "";
    public profile: string = "";
    public locale: string = "eu";

    constructor(){
        var localStorageService = new LocalStorageService();
        this.apiKey = localStorageService.getItem<string>("apikey");
        this.profile = localStorageService.getItem<string>("profile");
        this.locale = localStorageService.getItem<string>("locale");
        if (!this.locale) this.locale = "eu";
    }
}
