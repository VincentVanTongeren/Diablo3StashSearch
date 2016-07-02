import { Injectable } from '@angular/core';

import { Item, Items } from '../interfaces/profile'
import { BattleNet } from '../interfaces/battlenet'
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

    public getItem(battleNet: BattleNet, uniqueId: string): Promise<Item> {
        var cachedItem = this._localStorageService.getItem<Item>("item" + uniqueId);
        if (cachedItem){
            return new Promise<Item>((resolve, reject) => {
                resolve(cachedItem);
            })
        }

        var url = `https://${battleNet.locale}.api.battle.net/d3/data/item/${uniqueId}?locale=en_GB&apikey=${battleNet.apiKey}`;
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

    public createItems(items: Items, topToBottomSlots: Array<string>, battleNet: BattleNet): Promise<ItemViewModel[]> {
        var itemViewModels = new Array<ItemViewModel>();
        var promises = new Array<Promise<ItemViewModel>>();
        for (var i = 0; i < topToBottomSlots.length; i++){
            var slotName = topToBottomSlots[i];
            var item = items ? items[topToBottomSlots[i]] as Item : null;
            if (item)
            {
                var promise = new Promise<ItemViewModel>((resolve, reject) => {
                    var itemSlotName = slotName;
                    this.getItem(battleNet, item.tooltipParams.split('/')[1]).then((detailedItem: Item) => {
                        var itemViewModel = new ItemViewModel(detailedItem, true);
                        itemViewModel.slotName = itemSlotName.substring(0, 1).toUpperCase() + itemSlotName.substring(1).replace(/(?=[A-Z])/, " ");
                        resolve(itemViewModel);
                    });
                });
                promises.push(promise);
            }
        }
        return Promise.all<ItemViewModel>(promises);
    }

    // public getDetailedItemViewModel(items: ItemViewModel[], itemViewModel: ItemViewModel, battleNet: BattleNet): Promise<ItemViewModel>{

    //     return this.getItem(battleNet, itemViewModel.uniqueId).then((item: Item) => {
    //         var detailedItemViewModel = new ItemViewModel(item, true);
            
    //         var slotName = item.slots[0];
    //         detailedItemViewModel.slotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
    //         var index = items.indexOf(itemViewModel);
    //         items[index] = detailedItemViewModel;
    //         return detailedItemViewModel;
    //     });
    // }
}