import { Component } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { LocalStorageService } from './services/localstorageservice'
import { ProfileService } from './services/profile.service'
import { HeroService } from './services/hero.service'
import { ItemService } from './services/item.service'
import { ProfileViewModel } from './viewmodels/profileviewmodel'
import { HeroViewModel } from './viewmodels/heroviewmodel'
import { ItemViewModel } from './viewmodels/itemviewmodel'
import { GemViewModel } from './viewmodels/gemviewmodel'
import { Profile, Hero, Item } from './interfaces/profile'
import { SafeUrlPipe, SafeStylePipe } from './pipes/safe'

@Component({
    directives: [ProfileViewModel],
    pipes: [SafeUrlPipe, SafeStylePipe],
  selector: 'profile-loader',
  styles: [`
.bold {
    font-weight: bold;
}
.white {
    color: #eee;
}
#app-header {
    height: 10%;
}
#app-main {
    height: 90%;
}
#input-pane .input-row {
    margin: 3px;
}
#profile-pane {
    height: 100%;
}
#profile-pane ul {
    padding: 0;
}
#profile-pane li {
    list-style-type:none
}
#profile-pane .hero-tab {
    height: 44px;
    margin: 3px;
    border: 1px solid #222;
    border-radius: 3px;
}
#profile-pane .hero-tab.active {
    border: 1px solid #555;
}
#profile-pane .hero-tab .hero-name {
    margin: 3px 10px;
    color: #ad835a
}
#profile-pane .hero-tab.active .hero-name {
    color: #fff;
}
#hero-pane {
    height: 100%;
}
#hero-main {
    height: 100%;
}
#item-detail {
    height: 100%;
}
`],
  templateUrl: '../app/html/profile.loader.html'
})
export class ProfileLoader {
    public apiKey: string = "";
    public profileKey: string = "";
    public locale: string = "eu";

    public profileViewModel: ProfileViewModel;
    public selectedHeroViewModel: HeroViewModel;
    public selectedItemViewModel: ItemViewModel;
    public itemDetailsHtml: string;

    constructor(
        private _profileService: ProfileService,  
        private _itemService: ItemService,
        private _heroService: HeroService,
        private _localStorageService: LocalStorageService){

        this.resetProfileLoader();

        if (this.profileKey)
        {
            this._profileService.getProfileViewModel(this.locale, this.profileKey, this.apiKey).then((profileViewModel: ProfileViewModel) =>{
                this.profileViewModel = profileViewModel;
            });
        }
    }

    private resetProfileLoader(): void{
        this.apiKey = this._localStorageService.getItemAsString("apikey");
        this.profileKey = this._localStorageService.getItemAsString("profileKey");
        this.locale = this._localStorageService.getItemAsString("locale");
        if (!this.locale) this.locale = "eu";
    }

    public updateProfile(): void{
        this._localStorageService.storeItemAsString("apikey", this.apiKey);
        this._localStorageService.storeItemAsString("profileKey", this.profileKey);
        this._localStorageService.storeItemAsString("locale", this.locale);

        this._profileService.getProfileViewModel(this.locale, this.profileKey, this.apiKey).then((profileViewModel: ProfileViewModel) =>{
            this.profileViewModel = profileViewModel;
            this.selectedHeroViewModel = null;
            this.selectedItemViewModel = null;
        });
    }

    public selectHero(heroViewModel: HeroViewModel): void{
        this._heroService.getHeroViewModel(this.profileViewModel.heroes, heroViewModel, this.locale, this.profileKey, this.apiKey).then((selectedHeroViewModel: HeroViewModel) => {
            this.selectedHeroViewModel = selectedHeroViewModel;
            this.selectedItemViewModel = null;
        });
    }

    public selectItem(itemViewModel: ItemViewModel): void {
        this._itemService.getDetailedItemViewModel(this.selectedHeroViewModel.items, itemViewModel, this.locale, this.profileKey, this.apiKey).then((selectedItemViewModel: ItemViewModel) => {
            this.selectedItemViewModel = selectedItemViewModel;
        });
    }

    public show(obj: any){
        alert(JSON.stringify(obj));
    }
}
