import { Component, Output, EventEmitter } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { LocalStorageService } from './services/localstorageservice'
import { ProfileService } from './services/profile.service'
import { HeroService } from './services/hero.service'
import { ItemService } from './services/item.service'
import { AttributeService } from './services/attribute.service'
import { ProfileViewModel } from './viewmodels/profileviewmodel'
import { HeroViewModel } from './viewmodels/heroviewmodel'
import { ItemViewModel } from './viewmodels/itemviewmodel'
import { SearchResultViewModel } from './viewmodels/searchresultviewmodel'
import { ItemAttribute } from './interfaces/attributes'
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
#search-pane select {
    margin: 3px;
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
    public searchResults: Array<SearchResultViewModel>;

    public selectedAttribute: string;
    public selectedItem: string;
    
    @Output()
    public heroSelected = new EventEmitter<HeroViewModel>();

    constructor(
        private _profileService: ProfileService,  
        private _itemService: ItemService,
        private _heroService: HeroService,
        private _attributeService: AttributeService,
        private _localStorageService: LocalStorageService){

        this.resetProfileLoader();

        this._heroService.heroLoaded.subscribe((heroViewModel: HeroViewModel) => {
            this.profileViewModel.itemAttributes = this._attributeService.getItemAttributes(this.profileViewModel.heroes);
            this.selectedAttribute = "-- Select item attribute --";
            this.profileViewModel.itemAttributes.unshift(new ItemAttribute("", this.selectedAttribute));
            this.profileViewModel.profileItems = this._heroService.getProfileItems(this.profileViewModel.heroes);
            this.selectedItem = "-- Select item --";
            this.profileViewModel.profileItems.unshift(this.selectedItem);
        })

        if (this.profileKey)
        {
            this.loadProfile();
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
        this.loadProfile();
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

    public selectItems(searchResults: SearchResultViewModel[]): void {
        if (searchResults){
            this.searchResults = searchResults;
        }
    }

    public refresh(): void{
        this._profileService.refresh(this.profileKey);
        this.profileViewModel.heroes.forEach(hero => this._heroService.refresh(hero.hero.id));
        this.loadProfile();
    }

    public loadProfile(): void {
        this._profileService.getProfileViewModel(new BattleNet(this.apiKey, this.locale, this.profileKey)).then((profileViewModel: ProfileViewModel) =>{
            this.profileViewModel = profileViewModel;

            this.selectedHeroViewModel = null;
            this.selectedItemViewModel = null;
        });
    }

    public search(): void {
        var selectedItems = new Array<SearchResultViewModel>();
        if (!this.selectedItem && !this.selectedAttribute)
            return;

        this.profileViewModel.heroes.forEach(hero => {
            hero.getItems().forEach(item => {
                if (item.item &&
                    ((!this.selectedItem || this.selectedItem.indexOf("--") == 0 || item.item.name == this.selectedItem) && 
                    (!this.selectedAttribute || this.selectedAttribute.indexOf("--") == 0 || Object.keys(item.item.attributesRaw).indexOf(this.selectedAttribute) >= 0))){
                        var result = new SearchResultViewModel(item, hero.hero, hero.getCharacterType(item))
                        selectedItems.push(result);
                    }
            });
        });

        if (selectedItems.length == 0)
            alert("No items found");
        else
            this.highlightedItemViewModels = selectedItems;
    }


    public show(obj: any){
        alert(JSON.stringify(obj));
    }
}
