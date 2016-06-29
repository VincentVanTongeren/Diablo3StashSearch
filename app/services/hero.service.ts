import { Injectable } from '@angular/core';

import { Hero, Item } from '../interfaces/profile'
import { Headers, Http } from '@angular/http';

import { HeroViewModel } from '../viewmodels/heroviewmodel'
import { ItemViewModel } from '../viewmodels/itemviewmodel'

import { ItemService } from './item.service'

import { LocalStorageService } from './localstorageservice'
import { DomSanitizationService } from '@angular/platform-browser';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService
{  
    constructor(
        private _http: Http,
        private _itemService: ItemService,
        private _localStorageService: LocalStorageService,
        private _sanitizationService: DomSanitizationService
    ){ }

    private getHero(locale: string, profile: string, apiKey: string, heroId: number): Promise<Hero> {

        var cachedHero = this._localStorageService.getItem<Hero>("hero" + heroId);
        if (cachedHero)
            return new Promise<Hero>(() => { return cachedHero });

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
        var items = new Array<ItemViewModel>();
        for (var i = 0; i < Object.keys(heroViewModel.hero.items).length; i++){
            var item = new ItemViewModel(Object.values(heroViewModel.hero.items)[i] as Item, false);
            var slotName = Object.keys(heroViewModel.hero.items)[i];
            item.slotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
            items.push(item);
        }
        heroViewModel.items = items;
    }

    private setIconUrl(heroViewModel: HeroViewModel){
        var heroPart = (heroViewModel.hero.class == "crusader" ? "x1_" : "") + heroViewModel.hero.class.replace("-", "") + "_" + (heroViewModel.hero.gender ? "female" : "male");
        var trustedUrl = `http://media.blizzard.com/d3/icons/portraits/42/${heroPart}.png`;
        heroViewModel.iconUrl = this._sanitizationService.bypassSecurityTrustUrl(trustedUrl);
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
