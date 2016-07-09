import { Injectable } from '@angular/core';

import { Profile, Hero, Item } from '../interfaces/profile'
import { BattleNet } from '../interfaces/battlenet'
import { Headers, Http } from '@angular/http';

import { HeroService } from './hero.service'
import { ItemService } from './item.service'

import { ProfileViewModel } from '../viewmodels/profileviewmodel'
import { HeroViewModel } from '../viewmodels/heroviewmodel'

import { LocalStorageService } from './localstorageservice'

// import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProfileService
{  
    constructor(
        private _http: Http,
        private _heroService: HeroService,
        private _localStorageService: LocalStorageService
    ){ }
    
    private getProfile(battleNet: BattleNet): Promise<Profile> {
        var cachedProfile = this._localStorageService.getItem<Profile>(battleNet.profileKey);
        if (cachedProfile){
            return new Promise<Profile>((resolve, reject) => {
                resolve(cachedProfile);
            })
        }

        var url = `https://${battleNet.locale}.api.battle.net/d3/profile/${battleNet.profileKey}/?locale=en_GB&apikey=${battleNet.apiKey}`;
        var profilePromise =  this._http.get(url)
                    .toPromise()
                    .then(response => response.json() as Profile)
                    .catch((error: any) => {
                        debugger;
                    });

        profilePromise.then((profile: Profile) => {
            if (profile)
                this._localStorageService.storeItem(battleNet.profileKey, profile);
        });
        return profilePromise;
    }

    public getProfileViewModel(battleNet: BattleNet): Promise<ProfileViewModel> {
        var promise = this.getProfile(battleNet);
        return promise.then((profile: Profile) => {
            var profileViewModel = new ProfileViewModel(profile);
            if (profile.heroes && profile.heroes.length > 0)
            {
                profile.heroes.forEach(hero => {
                    var createdHeroViewModel = this._heroService.createHeroViewModel(hero, battleNet);
                    profileViewModel.heroes.push(createdHeroViewModel); 
                });

                profileViewModel.heroes.forEach(heroViewModel => {
                    this._heroService.getHeroViewModel(profileViewModel.heroes, heroViewModel, battleNet).then((processedHeroViewModel: HeroViewModel) => { 
                        var currentHero = profileViewModel.heroes.filter(x => x.hero.id == processedHeroViewModel.hero.id);
                        if (currentHero && currentHero.length > 0)
                        {
                            var index = profileViewModel.heroes.indexOf(currentHero[0]);
                            profileViewModel.heroes[index] = processedHeroViewModel;
                        }
                    });
                })

            }
            return profileViewModel;
        });
    }

    public refresh(profileKey: string): void {
        this._localStorageService.removeItem(profileKey);
    }
}