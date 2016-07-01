import { Component } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { LocalStorageService } from './services/localstorageservice'
import { ProfileService } from './services/profile.service'
import { HeroService } from './services/hero.service'
import { ItemService } from './services/item.service'
import { ProfileViewModel } from './viewmodels/profileviewmodel'
import { HeroViewModel } from './viewmodels/heroviewmodel'
import { ItemViewModel } from './viewmodels/itemviewmodel'
import { Profile, Hero, Item } from './interfaces/profile'
import { BattleNet } from './interfaces/battlenet'
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
    margin-left: 10px;
    color: #ad835a
}
#profile-pane .hero-tab.active .hero-name {
    color: #fff;
}
#profile-pane .hero-tab .hero-name .paragon {
    vertical-align: top;
}
#profile-pane .hero-portrait {
    margin-left: 9px;
}
#profile-pane .skills {
    height: 36px;
}
#profile-pane .skills .passive.last {
    margin-right: 24px;
}
#profile-pane .skill {
    display: inline-block;
    background-size: contain;
    margin-right: 3px;
    width: 21px;
    height: 21px;
}
#hero-pane {
    height: 100%;
}
#hero-pane ul {
    padding: 0;
}
#hero-main {
    height: 100%;
}
#hero-main li.item-icon {
    /*float: left;*/
}
#hero-main .item-properties {
    padding: 0;
    padding-top: 3px;
    height: 72px;
}
#hero-main .item-properties.active {
    border: 1px solid #555;
}
#hero-main .item-properties ul {
    padding: 0;
}
#hero-main .item-properties ul li {
    list-style-type:none
}
#hero-main .empty-row {
    height: 50px;
}
#hero-main .follower {
    padding-left: 24px;
    height: 21px;
    margin-top: 10px;
    display: inline-block;
}

#hero-main .templar {
    background: url('http://media.blizzard.com/d3/icons/portraits/21/templar.png') no-repeat; 
}
#hero-main .scoundrel {
    background: url('http://media.blizzard.com/d3/icons/portraits/21/scoundrel.png') no-repeat; 
}
#hero-main .enchantress {
    background: url('http://media.blizzard.com/d3/icons/portraits/21/enchantress.png') no-repeat; 
}
#hero-main .d3-icon-item-white {
    opacity: 0.4;
}
#item-detail {
    height: 100%;
}
#item-detail .item-card {
    max-width: 351px;
    margin-right: 0;
}
li.char-type {
    height: 21px;
}
li.char-type .small-seasonal-leaf { 
    display: inline-block; 
    width: 15px; 
    height: 21px; 
    background: url("http://eu.battle.net/d3/static/images/profile/seasonal-leaf.png") -24px -2px no-repeat; 
}
li.char-type .small-hardcore { 
    display: inline-block; 
    width: 21px; 
    height: 21px; 
    background: url("../images/hardcore.png") no-repeat; 
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
            this._profileService.getProfileViewModel(new BattleNet(this.apiKey, this.locale, this.profileKey)).then((profileViewModel: ProfileViewModel) =>{
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

        this._profileService.getProfileViewModel(new BattleNet(this.apiKey, this.locale, this.profileKey)).then((profileViewModel: ProfileViewModel) =>{
            this.profileViewModel = profileViewModel;
            this.selectedHeroViewModel = null;
            this.selectedItemViewModel = null;
        });
    }

    public selectHero(heroViewModel: HeroViewModel): void{
        this._heroService.getHeroViewModel(this.profileViewModel.heroes, heroViewModel, new BattleNet(this.apiKey, this.locale, this.profileKey)).then((selectedHeroViewModel: HeroViewModel) => {
            this.selectedHeroViewModel = selectedHeroViewModel;
            this.selectedItemViewModel = null;
        });
    }

    public selectItem(itemViewModel: ItemViewModel): void {
        if (itemViewModel)
            this._itemService.getDetailedItemViewModel(this.selectedHeroViewModel.items, itemViewModel, new BattleNet(this.apiKey, this.locale, this.profileKey)).then((selectedItemViewModel: ItemViewModel) => {
                this.selectedItemViewModel = selectedItemViewModel;
                var heroItem = this.selectedHeroViewModel.items.filter(i => i.uniqueId == selectedItemViewModel.uniqueId);
                if (heroItem.length > 0){
                    var index = this.selectedHeroViewModel.items.indexOf(heroItem[0]);
                    this.selectedHeroViewModel.items[index] = selectedItemViewModel;
                }
            });
    }

    public show(obj: any){
        alert(JSON.stringify(obj));
    }
}
