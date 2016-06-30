import { Injectable } from '@angular/core';

import { Hero, Item, Items, Follower } from '../interfaces/profile'
import { Headers, Http } from '@angular/http';

import { HeroViewModel } from '../viewmodels/heroviewmodel'
import { ItemViewModel } from '../viewmodels/itemviewmodel'

import { ItemService } from './item.service'

import { LocalStorageService } from './localstorageservice'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService
{  
    constructor(
        private _http: Http,
        private _itemService: ItemService,
        private _localStorageService: LocalStorageService
    ){ }

    private getHero(locale: string, profile: string, apiKey: string, heroId: number): Promise<Hero> {

        var cachedHero = this._localStorageService.getItem<Hero>("hero" + heroId);
        if (cachedHero){
            return new Promise<Hero>((resolve, reject) => {
                resolve(cachedHero);
            })
        }

        var url = `https://${locale}.api.battle.net/d3/profile/${profile}/hero/${heroId}?locale=en_GB&apikey=${apiKey}`;
        var heroPromise = this._http.get(url)
                    .toPromise()
                    .then(response => response.json() as Hero)
                    .catch((error: any) => {
                        debugger;
                    });

        heroPromise.then((hero: Hero) => {
            if (hero)
                this._localStorageService.storeItem("hero" + heroId, hero);
        });
        return heroPromise;
    }

    private enrichHero(heroViewModel: HeroViewModel){

        var topToBottomSlots: Array<string> = [ "shoulders", "head", "neck",
            "hands", "torso", "bracers", 
            "leftFinger", "waist", "rightFinger",
            "mainHand", "legs", "offHand",
            "", "feet", ""
        ];

        var items = this.createItems(heroViewModel.hero.items, topToBottomSlots);
        heroViewModel.templarItems = this.setFollowerItems(heroViewModel.hero.followers.templar, ["offHand"]);
        heroViewModel.scoundrelItems = this.setFollowerItems(heroViewModel.hero.followers.scoundrel, null);
        heroViewModel.enchantressItems = this.setFollowerItems(heroViewModel.hero.followers.enchantress, null);

        heroViewModel.items = items;

    }

    private setFollowerItems(follower: Follower, extraSlots: Array<string>): ItemViewModel[]{

        var followerSlots: Array<string> = [ "special", "neck", "leftFinger", "rightFinger", "mainHand"];
        if (extraSlots)
        extraSlots.forEach((slot: string) => {
            followerSlots.push(slot);
        })
        
        return this.createItems(follower.items, followerSlots);
    }

    private createItems(items: Items, topToBottomSlots: Array<string>): ItemViewModel[] {
        var itemViewModels = new Array<ItemViewModel>();
        for (var i = 0; i < topToBottomSlots.length; i++){
            var item = items[topToBottomSlots[i]] as Item;
            var itemViewModel = new ItemViewModel(item, false);
            var slotName = topToBottomSlots[i];
            itemViewModel.slotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
            itemViewModels.push(itemViewModel);
        }
        return itemViewModels;
    }

    private setIconUrl(heroViewModel: HeroViewModel){
        heroViewModel.iconName = (heroViewModel.hero.class == "crusader" ? "x1_" : "") + heroViewModel.hero.class.replace("-", "") + "_" + (heroViewModel.hero.gender ? "female" : "male");
    }

    public createHeroViewModel(hero: Hero){
        var cachedHero = this._localStorageService.getItem<Hero>("hero" + hero.id);
        var heroViewModel = new HeroViewModel(cachedHero ? cachedHero : hero, Boolean(cachedHero));
        this.setIconUrl(heroViewModel);
        if (cachedHero)
            this.enrichHero(heroViewModel);
        return heroViewModel;
    }

    public getHeroViewModel(heroes: HeroViewModel[], heroViewModel: HeroViewModel, locale: string, profileKey: string, apiKey: string): Promise<HeroViewModel>{
        return this.getHero(locale, profileKey, apiKey, heroViewModel.hero.id).then((hero: Hero) => {
                var detailedHeroViewModel = new HeroViewModel(hero, true);
                this.setIconUrl(detailedHeroViewModel);
                this.enrichHero(detailedHeroViewModel);
                var index = heroes.indexOf(heroViewModel);
                heroes[index] = detailedHeroViewModel;
                return detailedHeroViewModel;
            });
            
    }
}
