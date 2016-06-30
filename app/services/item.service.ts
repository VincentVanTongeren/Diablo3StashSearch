import { Injectable } from '@angular/core';

import { Item } from '../interfaces/profile'
import { Headers, Http } from '@angular/http';

import { ItemViewModel } from '../viewmodels/itemviewmodel'
import { GemViewModel } from '../viewmodels/gemviewmodel'

import { LocalStorageService } from './localstorageservice'
import { DomSanitizationService } from '@angular/platform-browser';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemService
{  

    constructor(private _http: Http,
        private _localStorageService: LocalStorageService,
        private _sanitizationService: DomSanitizationService
    ) { }

    public getItem(locale: string, profile: string, apiKey: string, uniqueId: string): Promise<Item> {
        var cachedItem = this._localStorageService.getItem<Item>("item" + uniqueId);
        if (cachedItem){
            return new Promise<Item>((resolve, reject) => {
                resolve(cachedItem);
            })
        }

        var url = `https://${locale}.api.battle.net/d3/data/item/${uniqueId}?locale=en_GB&apikey=${apiKey}`;
        var itemPromise = this._http.get(url)
                            .toPromise()
                            .then(response => response.json() as Item)
                            .catch((error: any) => {
                                debugger;
                            });

        itemPromise.then((item: Item) => {
            if (item)
                this._localStorageService.storeItem("item" + uniqueId, item);
        });
        return itemPromise;
    }

    public getDetailedItemViewModel(items: ItemViewModel[], itemViewModel: ItemViewModel, locale: string, profileKey: string, apiKey: string): Promise<ItemViewModel>{

        return this.getItem(locale, profileKey, apiKey, itemViewModel.uniqueId).then((item: Item) => {
            var detailedItemViewModel = new ItemViewModel(item, true);
            for (var i = 0; i < item.gems.length; i++)
            {
                var gem = new GemViewModel(item.gems[i]);
                var trustedUrl = `http://media.blizzard.com/d3/icons/items/small/${item.gems[i].item.icon}.png`;
                gem.iconUrl = this._sanitizationService.bypassSecurityTrustUrl(trustedUrl);
                detailedItemViewModel.gems.push(gem);
            }

            var trustedStyle = `url('http://media.blizzard.com/d3/icons/items/large/${itemViewModel.item.icon}.png')`;
            detailedItemViewModel.iconUrl = this._sanitizationService.bypassSecurityTrustStyle(trustedStyle);

            var slotName = item.slots[0];
            detailedItemViewModel.slotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
            var index = items.indexOf(itemViewModel);
            items[index] = detailedItemViewModel;
            return detailedItemViewModel;
        });
    }
}