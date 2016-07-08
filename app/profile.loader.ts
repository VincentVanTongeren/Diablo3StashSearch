import { Component, Output, EventEmitter } from '@angular/core';
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
import { ItemCardComponent } from './components/item.card.component';
import { ItemCarouselComponent } from './components/item.carousel.component';
import { HeroComponent } from './components/hero.component';
import { HeroTabComponent } from './components/hero.tab.component';

@Component({
    directives: [ProfileViewModel, ItemCardComponent, HeroComponent, HeroTabComponent, ItemCarouselComponent],
  selector: 'profile-loader',
  styles: [`
.hero-tab {
    height: 44px;
    margin: 3px;
    border: 1px solid #222;
    border-radius: 3px;
}
.hero-tab.active {
    border: 1px solid #555;
}
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


#hero-pane {
    height: 100%;
}
#item-detail {
    height: 100%;
}
#item-detail .item-card {
    max-width: 351px;
    margin-right: 0;
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
    public highlightedItemViewModels: Array<ItemViewModel>;

    @Output()
    public heroSelected = new EventEmitter<HeroViewModel>();

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
            this.heroSelected.emit(selectedHeroViewModel);
        });
    }

    public selectItem(selectedItemViewModel: ItemViewModel): void {
        if (selectedItemViewModel.item){
            this.selectedItemViewModel = selectedItemViewModel;
        }
    }

    public selectItems(selectedItemViewModels: ItemViewModel[]): void {
        if (selectedItemViewModels){
            this.highlightedItemViewModels = selectedItemViewModels;
        }
    }

    public show(obj: any){
        alert(JSON.stringify(obj));
    }
}
