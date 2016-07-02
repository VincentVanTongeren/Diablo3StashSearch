import { Injectable } from '@angular/core';

import { Item, Items, NameValue } from '../interfaces/profile'
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
            var promise = new Promise<ItemViewModel>((resolve, reject) => {
                var itemSlotName = slotName.substring(0, 1).toUpperCase() + slotName.substring(1).replace(/(?=[A-Z])/, " ");
                if (item)
                {
                    this.getItem(battleNet, item.tooltipParams.split('/')[1]).then((detailedItem: Item) => {
                        var itemViewModel = new ItemViewModel(detailedItem, true);
                        itemViewModel.slotName = itemSlotName.substring(0, 1).toUpperCase() + itemSlotName.substring(1).replace(/(?=[A-Z])/, " ");
                        if (itemViewModel.item.attributesRaw){
                            itemViewModel.isAncient = Boolean(itemViewModel.item.attributesRaw["Ancient_Rank"]);
                            itemViewModel.sockets = [];
                            
                            for (var i = 0; i < (Boolean(itemViewModel.item.attributesRaw["Sockets"]) ? itemViewModel.item.attributesRaw["Sockets"].min : 0); i++)
                                itemViewModel.sockets.push({});
                                
                            if (Boolean(itemViewModel.item.attributesRaw["Armor_Item"]) && itemViewModel.item.attributesRaw["Armor_Item"].min > 0)
                            {
                                itemViewModel.baseValue = new NameValue("Armor", itemViewModel.item.armor.min);
                            } else if (Boolean(itemViewModel.item.attributesRaw["Damage_Weapon_Min#Physical"]) && itemViewModel.item.attributesRaw["Damage_Weapon_Min#Physical"].min > 0){
                                itemViewModel.baseValue = new NameValue("Damage Per Second", Math.round(itemViewModel.item.dps.min * 10) / 10);
                            }
                            itemViewModel.elementalType = Boolean(itemViewModel.item.elementalType) ? itemViewModel.item.elementalType : "default";
                            itemViewModel.augment = Boolean(itemViewModel.item.attributesRaw["CubeEnchantedGemRank"]) ? itemViewModel.item.attributesRaw["CubeEnchantedGemRank"].min : 0;
                            itemViewModel.effect = itemViewModel.elementalType != "default" ? itemViewModel.elementalType : itemViewModel.baseValue.name;
                        }

                        resolve(itemViewModel);
                    });
                }
                else{
                    var emptyItem = new ItemViewModel(null, false);
                    emptyItem.slotName = itemSlotName;
                    resolve(emptyItem);
                }
            });
            promises.push(promise);
        }
        return Promise.all<ItemViewModel>(promises);
    }
}