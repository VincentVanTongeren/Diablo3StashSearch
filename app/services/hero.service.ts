import { Injectable } from '@angular/core';

import { Hero, Follower, Gem } from '../interfaces/profile'
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

    private enrichHero(heroViewModel: HeroViewModel, battleNet: BattleNet): void{

        heroViewModel.sets = [];
        if (!heroViewModel.items)
            return;

        var hellfire = heroViewModel.items.filter(i =>i.item && i.item.icon == "x1_amulet_norm_unique_25_demonhunter_male");
        if (hellfire.length > 0 && hellfire[0].item.attributes){
            var passive = hellfire[0].item.attributes.passive[0].text.replace("Gain the ", "").replace(" passive.", "");
            heroViewModel.hellfireAmuletPassive = passive;
        }

        var items = heroViewModel.items;
        var setItems = new Array<string>();
        var legendaryGems = new Array<Gem>();
        heroViewModel.augments = [];
        var augments = items.forEach(x => {
            if (x.augment)
                heroViewModel.augments.push(x.augment);
        });

        for (var i = 0; i < items.length; i++)
        {
            var item = items[i].item;
            if (item)
            {
                if (item.set)
                    setItems.push(item.set.name);

                if (item.gems && item.gems.length > 0)
                    item.gems.filter(x => x.isJewel).forEach(gem => legendaryGems.push(gem));
            }
        }

        var uniqueSetItems = {};
        setItems.forEach(x => uniqueSetItems[x] = (uniqueSetItems[x] || 0)+1 );
        Object.keys(uniqueSetItems).forEach(x => {
            if (uniqueSetItems[x] > 1)
                heroViewModel.sets.push(x);
        })

        heroViewModel.legendaryGems = legendaryGems;

        var dummyFollower = new Follower();
        var templar = heroViewModel.hero.followers.templar ? heroViewModel.hero.followers.templar : dummyFollower;
        var scoundrel = heroViewModel.hero.followers.scoundrel ? heroViewModel.hero.followers.scoundrel : dummyFollower;
        var enchantress = heroViewModel.hero.followers.enchantress ? heroViewModel.hero.followers.enchantress : dummyFollower;

        this.setFollowerItems(templar, ["offHand"], battleNet).then((items: ItemViewModel[]) => {
            heroViewModel.templarItems = items;
        });
        this.setFollowerItems(scoundrel, null, battleNet).then((items: ItemViewModel[]) => {
            heroViewModel.scoundrelItems = items;
        });
        this.setFollowerItems(enchantress, null, battleNet).then((items: ItemViewModel[]) => {
            heroViewModel.enchantressItems = items;
        });

        heroViewModel.items = items;

    }

    private setFollowerItems(follower: Follower, extraSlots: Array<string>, battleNet): Promise<ItemViewModel[]>{

        return new Promise<ItemViewModel[]>((resolve, reject) => {
            var followerSlots: Array<string> = [ "special", "neck", "leftFinger", "rightFinger", "mainHand"];
            if (extraSlots)
            extraSlots.forEach((slot: string) => {
                followerSlots.push(slot);
            })
            this._itemService.createItems(follower.items ? follower.items : null, followerSlots, battleNet).then((itemViewModels: ItemViewModel[]) => {
                resolve(itemViewModels);
            });
        });
    }

    public createHeroViewModel(hero: Hero, battleNet: BattleNet){
        var cachedHero = this._localStorageService.getItem<Hero>("hero" + hero.id);
        var heroViewModel = new HeroViewModel(cachedHero ? cachedHero : hero, Boolean(cachedHero));

        if (cachedHero)
            this.enrichHero(heroViewModel, battleNet);
        return heroViewModel;
    }

    public getHeroViewModel(heroes: HeroViewModel[], heroViewModel: HeroViewModel, battleNet: BattleNet): Promise<HeroViewModel>{
        return this.getHero(battleNet, heroViewModel.hero.id).then((hero: Hero) => {
                var detailedHeroViewModel = new HeroViewModel(hero, true);

                var topToBottomSlots: Array<string> = [ "shoulders", "head", "neck",
                    "hands", "torso", "bracers", 
                    "leftFinger", "waist", "rightFinger",
                    "mainHand", "legs", "offHand",
                    "", "feet", ""
                ];

                this._itemService.createItems(hero.items, topToBottomSlots, battleNet).then((itemViewModels: ItemViewModel[]) => {
                    detailedHeroViewModel.items = itemViewModels;
                    this.enrichHero(detailedHeroViewModel, battleNet);
                });

                var index = heroes.indexOf(heroViewModel);
                heroes[index] = detailedHeroViewModel;
                return detailedHeroViewModel;
            });
            
    }
}
