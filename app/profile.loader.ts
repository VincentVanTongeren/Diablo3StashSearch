import { Component } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { LocalStorageService } from './services/localstorageservice'
import { ProfileService } from './services/profile.service'
import { ProfileViewModel } from './viewmodels/profileviewmodel'
import { HeroViewModel } from './viewmodels/heroviewmodel'
import { ItemViewModel } from './viewmodels/itemviewmodel'
import { GemViewModel } from './viewmodels/gemviewmodel'
import { Profile, Hero, Item } from './interfaces/profile'
import { DomSanitizationService } from '@angular/platform-browser';

@Component({
    directives: [ProfileViewModel],
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
#profile-pane {
    height: 100%;
    color: red;
}
#profile-pane .hero-tab {
    height: 50px;
    border: 1px solid #222;
}
#profile-pane .hero-tab.is-selected {
    border: 1px solid #555;
}
#profile-pane .hero-tab .hero-name {
    margin: 5px 10px;
}
#profile-pane .hero-tab .hero-name.has-details {
    color: blue;
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

    private _localStorageService: LocalStorageService;
    private _profileService: ProfileService;

    constructor(localStorageService: LocalStorageService, profileService: ProfileService, private _sanitizationService: DomSanitizationService){
        this._localStorageService = localStorageService;
        this._profileService = profileService;
        this.resetProfileLoader();

        if (this.profileKey)
        {
            var profile = this._localStorageService.getItem<Profile>(this.profileKey);
            if (profile)
            {
                this.profileViewModel = new ProfileViewModel(profile);
                if (profile.heroes && profile.heroes.length)
                {
                    profile.heroes.forEach(hero => {
                        var cachedHero = this._localStorageService.getItem<Hero>("hero" + hero.id);
                        var heroViewModel = new HeroViewModel(cachedHero ? cachedHero : hero, Boolean(cachedHero));
                        var heroPart = (hero.class == "crusader" ? "x1_" : "") + hero.class.replace("-", "") + "_" + (hero.gender ? "female" : "male");
                        var trustedUrl = `http://media.blizzard.com/d3/icons/portraits/42/${heroPart}.png`;
                        heroViewModel.iconUrl = this._sanitizationService.bypassSecurityTrustUrl(trustedUrl);
                        this.profileViewModel.heroes.push(heroViewModel); 
                    });
                }
            }
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

        this.getProfile().then((profile: Profile) => {
            this.profileViewModel = new ProfileViewModel(profile);
        })
    }

    public getProfile(): Promise<Profile> {
        var cachedProfile = this._localStorageService.getItem<Profile>(this.profileKey);
        if (cachedProfile)
            return new Promise<Profile>(() => { return cachedProfile });

        var profilePromise = this._profileService.getProfile(this.locale, this.profileKey, this.apiKey);
        profilePromise.then((profile: Profile) => {
            if (profile)
                this._localStorageService.storeItem(this.profileKey, profile);
        });
        return profilePromise;
    }

    public getHero(heroId: number): Promise<Hero> {
        var cachedHero = this._localStorageService.getItem<Profile>("hero" + heroId);
        if (cachedHero)
            return new Promise<Hero>(() => { return cachedHero });

        var heroPromise = this._profileService.getHero(this.locale, this.profileKey, this.apiKey, heroId);
        heroPromise.then((hero: Hero) => {
            if (hero)
                this._localStorageService.storeItem("hero" + heroId, hero);
        });
        return heroPromise;
    }

    public getItem(uniqueId: string): Promise<Item> {
        var cachedItem = this._localStorageService.getItem<Profile>("item" + uniqueId);
        if (cachedItem)
            return new Promise<Item>(() => { return cachedItem });

        var itemPromise = this._profileService.getItem(this.locale, this.profileKey, this.apiKey, uniqueId);
        itemPromise.then((item: Item) => {
            if (item)
                this._localStorageService.storeItem("item" + uniqueId, item);
        });
        return itemPromise;
    }

    public selectHero(heroViewModel: HeroViewModel): void{
        this.selectedHeroViewModel = heroViewModel;
        if (heroViewModel.hasDetails){
            this.addItemsToHero(this.selectedHeroViewModel);
        }
        else{
            this.getHero(heroViewModel.hero.id).then((hero: Hero) => {
                var detailedHeroViewModel = new HeroViewModel(hero, true);
                this.addItemsToHero(detailedHeroViewModel);
                var index = this.profileViewModel.heroes.indexOf(heroViewModel);
                this.profileViewModel.heroes[index] = detailedHeroViewModel;
                this.selectedHeroViewModel = detailedHeroViewModel;
            });
        }
    }

    private addItemsToHero(heroViewModel: HeroViewModel){
        var items = new Array<ItemViewModel>();
        for (var i = 0; i < Object.keys(heroViewModel.hero.items).length; i++){
            var item = new ItemViewModel(Object.values(heroViewModel.hero.items)[i] as Item, false);
            var slotName = Object.keys(heroViewModel.hero.items)[i];
            item.slotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
            items.push(item);
        }
        heroViewModel.items = items;
    }

public show(obj: any){
    alert(JSON.stringify(obj));
}

    public selectItem(itemViewModel: ItemViewModel): void {
        this.selectedItemViewModel = itemViewModel;
        var trustedUrl = `url('http://media.blizzard.com/d3/icons/items/large/${itemViewModel.item.icon}.png')`;
        itemViewModel.iconUrl = this._sanitizationService.bypassSecurityTrustStyle(trustedUrl);

        if (!itemViewModel.hasDetails){
            this.getItem(itemViewModel.uniqueId).then((item: Item) => {
                var detailedItemViewModel = new ItemViewModel(item, true);
                for (var i = 0; i < item.gems.length; i++)
                {
                    var gem = new GemViewModel(item.gems[i]);
                    var trustedUrl = `http://media.blizzard.com/d3/icons/items/small/${item.gems[i].item.icon}.png`;
                    gem.iconUrl = this._sanitizationService.bypassSecurityTrustUrl(trustedUrl);
                    detailedItemViewModel.gems.push(gem);
                }

                var slotName = item.slots[0];
                detailedItemViewModel.slotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
                var index = this.selectedHeroViewModel.items.indexOf(itemViewModel);
                this.selectedHeroViewModel.items[index] = detailedItemViewModel;
                this.selectedItemViewModel = detailedItemViewModel;

            });
        }
    }
}
