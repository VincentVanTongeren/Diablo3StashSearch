import { Component, Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService { 
    public getItem<T>(key: string): T
    {
        var itemJson = this.getItemAsString(key);
        debugger;
        return itemJson ? JSON.parse(itemJson) as T : null;
    }

    public getItemAsString(key: string): string{
        return localStorage.getItem(key);
    }

    public storeItem<T>(key: string, item: T): void{
        var itemJson = JSON.stringify(item);
        this.storeItemAsString(key, itemJson);
    }

    public storeItemAsString(key: string, item: string): void{
        if (localStorage[key])
            localStorage.removeItem(key);
        localStorage.setItem(key, item);
    }
}