import { Injectable } from '@angular/core';

import { Profile, Hero, Item } from '../interfaces/profile'
import { Headers, Http } from '@angular/http';

import { HeroService } from './hero.service'
import { ItemService } from './item.service'

import { ProfileViewModel } from '../viewmodels/profileviewmodel'
import { HeroViewModel } from '../viewmodels/heroviewmodel'

import { LocalStorageService } from './localstorageservice'
import { DomSanitizationService } from '@angular/platform-browser';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfileService
{  
    constructor(
        private _http: Http,
        private _heroService: HeroService,
        private _localStorageService: LocalStorageService,
        private _sanitizationService: DomSanitizationService
    ){ }
    
    private getProfile(locale: string, profileKey: string, apiKey: string): Promise<Profile> {
        var cachedProfile = this._localStorageService.getItem<Profile>(profileKey);
        if (cachedProfile)
            return new Promise<Profile>(() => { return cachedProfile });

        var url = `https://${locale}.api.battle.net/d3/profile/${profileKey}/?locale=en_GB&apikey=${apiKey}`;
        var profilePromise =  this._http.get(url)
                    .toPromise()
                    .then(response => response.json() as Profile)
                    .catch((error: any) => {
                        debugger;
                    });

        profilePromise.then((profile: Profile) => {
            if (profile)
                this._localStorageService.storeItem(profileKey, profile);
        });
        return profilePromise;
    }


    public getProfileViewModel(locale: string, profileKey: string, apiKey: string): Promise<ProfileViewModel> {

        return this.getProfile(locale, profileKey, apiKey).then((profile: Profile) => {
            var profileViewModel = new ProfileViewModel(profile);
            if (profile.heroes && profile.heroes.length)
            {
                profile.heroes.forEach(hero => {
                    var cachedHero = this._localStorageService.getItem<Hero>("hero" + hero.id);
                    var heroViewModel = new HeroViewModel(cachedHero ? cachedHero : hero, Boolean(cachedHero));
                    var heroPart = (hero.class == "crusader" ? "x1_" : "") + hero.class.replace("-", "") + "_" + (hero.gender ? "female" : "male");
                    var trustedUrl = `http://media.blizzard.com/d3/icons/portraits/42/${heroPart}.png`;
                    heroViewModel.iconUrl = this._sanitizationService.bypassSecurityTrustUrl(trustedUrl);
                    profileViewModel.heroes.push(heroViewModel); 
                });
            }
            return profileViewModel;
        });
    }
}