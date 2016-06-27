import { Injectable } from '@angular/core';

import { Profile, Hero, Item } from '../interfaces/profile'
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfileService
{  
    private _http: Http;

    constructor(http: Http)
    {
        this._http = http;
    }
    
    public getProfile(locale: string, profile: string, apiKey: string): Promise<Profile> {
        var url = `https://${locale}.api.battle.net/d3/profile/${profile}/?locale=en_GB&apikey=${apiKey}`;
        return this._http.get(url)
                    .toPromise()
                    .then(response => response.json() as Profile)
                    .catch((error: any) => {
                        debugger;
                    });
    }

    public getHero(locale: string, profile: string, apiKey: string, heroId: number): Promise<Hero> {
        var url = `https://${locale}.api.battle.net/d3/profile/${profile}/hero/${heroId}?locale=en_GB&apikey=${apiKey}`;
        return this._http.get(url)
                    .toPromise()
                    .then(response => response.json() as Hero)
                    .catch((error: any) => {
                        debugger;
                    });
    }

    public getItem(locale: string, profile: string, apiKey: string, uniqueId: string): Promise<Item>{
        var url = `https://${locale}.api.battle.net/d3/data/item/${uniqueId}?locale=en_GB&apikey=${apiKey}`;
                return this._http.get(url)
                            .toPromise()
                            .then(response => response.json() as Item)
                            .catch((error: any) => {
                                debugger;
                            });
    }

    public getItemDetail(locale: string, uniqueId: string): Promise<string>{
        var url = `http://${locale}.battle.net/d3/en/tooltip/item/${uniqueId}`;
        return this._http.get(url)
                    .toPromise()
                    .then(response => response.json() as string)
                    .catch((error: any) => {
                        debugger;
                    });
    }
}