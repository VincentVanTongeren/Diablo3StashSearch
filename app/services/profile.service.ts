import { Injectable } from '@angular/core';

import { Profile, Hero, Item } from '../interfaces/profile'
import { Headers, Http } from '@angular/http';

import { HeroService } from './hero.service'
import { ItemService } from './item.service'

import { ProfileViewModel } from '../viewmodels/profileviewmodel'
import { HeroViewModel } from '../viewmodels/heroviewmodel'

import { LocalStorageService } from './localstorageservice'
import { DomSanitizationService } from '@angular/platform-browser';

// import 'rxjs/add/operator/toPromise';


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
        if (cachedProfile){
            return new Promise<Profile>((resolve, reject) => {
                resolve(cachedProfile);
            })
        }

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
        var promise = this.getProfile(locale, profileKey, apiKey);
        return promise.then((profile: Profile) => {
            var profileViewModel = new ProfileViewModel(profile);
            if (profile.heroes && profile.heroes.length)
            {
                profile.heroes.forEach(hero => {
                    var heroViewModel = this._heroService.createHeroViewModel(hero);
                    profileViewModel.heroes.push(heroViewModel); 
                });
            }
            return profileViewModel;
        });
    }
}