import { Component } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { LocalStorageService } from './services/localstorageservice'
import { ProfileService } from './services/profile.service'
import { ProfileViewModel } from './viewmodels/profileviewmodel'
import { HeroViewModel } from './viewmodels/heroviewmodel'
import { Profile, Hero } from './interfaces/profile'

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
    color: red;
    height: 50px;
    border: 1px solid black;
}
#profile-pane .hero-tab.is-selected {
    background-color: #222;
    height: 50px;
    border: 1px solid black;
}
#profile-pane .hero-tab .hero-name {
    margin: 5px 10px;
}
#profile-pane .hero-tab .hero-name.has-details {
    color: blue;
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

    private _localStorageService: LocalStorageService;
    private _profileService: ProfileService;

    constructor(localStorageService: LocalStorageService, profileService: ProfileService){
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
                        this.profileViewModel.heroes.push(new HeroViewModel(cachedHero ? cachedHero : hero, Boolean(cachedHero))); 
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


    public selectHero(heroViewModel: HeroViewModel): void{
        this.selectedHeroViewModel = heroViewModel;
        if (!heroViewModel.hasDetails){
            this.getHero(heroViewModel.hero.id).then((hero: Hero) => {
                var detailedHeroViewModel = new HeroViewModel(hero, true);
                var index = this.profileViewModel.heroes.indexOf(heroViewModel);
                this.profileViewModel.heroes[index] = detailedHeroViewModel;
                this.selectedHeroViewModel = detailedHeroViewModel;
            });
        }
    }
}
