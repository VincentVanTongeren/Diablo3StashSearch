import { Injectable } from '@angular/core';

import { Item } from '../interfaces/profile'
import { Headers, Http } from '@angular/http';

import { ItemViewModel } from '../viewmodels/itemviewmodel'

import { LocalStorageService } from './localstorageservice'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemService
{  

    constructor(private _http: Http,
        private _localStorageService: LocalStorageService
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
            
            var slotName = item.slots[0];
            detailedItemViewModel.slotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
            var index = items.indexOf(itemViewModel);
            items[index] = detailedItemViewModel;
            return detailedItemViewModel;
        });
    }
}