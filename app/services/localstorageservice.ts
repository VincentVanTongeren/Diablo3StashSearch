export class LocalStorageService { 
    public getItem<T>(key: string): T
    {
        var itemJson = localStorage.getItem(key);
        return itemJson ? JSON.parse(itemJson) as T : null;
    }

    public storeItem<T>(key: string, item: T): void{
        var itemJson = JSON.stringify(item);
        localStorage.setItem(key, itemJson);
    }
}