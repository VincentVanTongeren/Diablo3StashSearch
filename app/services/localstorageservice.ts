export class LocalStorageService { 
    public getItem<T>(key: string): T
    {
        var itemJson = localStorage.getItem(key);
        var item = JSON.parse(itemJson) as T;
        return item;
    }

    public storeItem<T>(key: string, item: T): void{
        var itemJson = JSON.stringify(item);
        localStorage.setItem(key, itemJson);
    }
}