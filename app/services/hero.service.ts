import { Injectable } from '@angular/core';

import { Hero, Follower } from '../interfaces/profile'
import { BattleNet } from '../interfaces/battlenet'
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

    private getHero(battleNet: BattleNet, heroId: number): Promise<Hero> {

        var cachedHero = this._localStorageService.getItem<Hero>("hero" + heroId);
        if (cachedHero){
            return new Promise<Hero>((resolve, reject) => {
                resolve(cachedHero);
            })
        }

        var url = `https://${battleNet.locale}.api.battle.net/d3/profile/${battleNet.profileKey}/hero/${heroId}?locale=en_GB&apikey=${battleNet.apiKey}`;
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

        heroViewModel.sets = [];
        var items = this._itemService.createItems(heroViewModel.hero.items, topToBottomSlots);
        var hellfire = items.filter(i =>i.item && i.item.icon == "x1_amulet_norm_unique_25_demonhunter_male");
        if (hellfire.length > 0 && hellfire[0].item.attributes){
            var passive = hellfire[0].item.attributes.passive[0].text.replace("Gain the ", "").replace(" passive.", "");
            heroViewModel.hellfireAmuletPassive = passive;
        }

        for (var i = 0; i < items.length; i++)
        {
            var set = items[i].item ? items[i].item.set : null;
            if (set && heroViewModel.sets.indexOf(items[i].item.set.name))
            {
                debugger;
                heroViewModel.sets.push(set.name);
            }
        }

        var dummyFollower = new Follower();
        var templar = heroViewModel.hero.followers.templar ? heroViewModel.hero.followers.templar : dummyFollower;
        var scoundrel = heroViewModel.hero.followers.scoundrel ? heroViewModel.hero.followers.scoundrel : dummyFollower;
        var enchantress = heroViewModel.hero.followers.enchantress ? heroViewModel.hero.followers.enchantress : dummyFollower;

        heroViewModel.templarItems = this.setFollowerItems(templar, ["offHand"]);
        heroViewModel.scoundrelItems = this.setFollowerItems(scoundrel, null);
        heroViewModel.enchantressItems = this.setFollowerItems(enchantress, null);

        heroViewModel.items = items;

    }

    private setFollowerItems(follower: Follower, extraSlots: Array<string>): ItemViewModel[]{

        var followerSlots: Array<string> = [ "special", "neck", "leftFinger", "rightFinger", "mainHand"];
        if (extraSlots)
        extraSlots.forEach((slot: string) => {
            followerSlots.push(slot);
        })
        
        return this._itemService.createItems(follower.items ? follower.items : null, followerSlots);
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

    public getHeroViewModel(heroes: HeroViewModel[], heroViewModel: HeroViewModel, battleNet: BattleNet): Promise<HeroViewModel>{
        return this.getHero(battleNet, heroViewModel.hero.id).then((hero: Hero) => {
                var detailedHeroViewModel = new HeroViewModel(hero, true);
                this.setIconUrl(detailedHeroViewModel);
                this.enrichHero(detailedHeroViewModel);
                var index = heroes.indexOf(heroViewModel);
                heroes[index] = detailedHeroViewModel;
                return detailedHeroViewModel;
            });
            
    }
}
