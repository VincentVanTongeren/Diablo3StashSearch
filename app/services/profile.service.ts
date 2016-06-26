import { Injectable } from '@angular/core';

import { Profile, Hero } from '../interfaces/profile'
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

}