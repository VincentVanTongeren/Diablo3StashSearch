import { Injectable } from '@angular/core';

import { ProfileLoader } from '../profile.loader'
import { Profile } from '../interfaces/profile'
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfileService
{  
    private _profileLoader: ProfileLoader;
    private _http: Http;

    constructor(http: Http, private profileLoader: ProfileLoader)
    {
        debugger;
        this._profileLoader = profileLoader;
        this._http = http;
    }
    
    public getProfile(): Promise<Profile> {
        var url = `https://${this._profileLoader.locale}.api.battle.net/d3/profile/${this._profileLoader.profile}}/?locale=en_GB&apikey=${this._profileLoader.apiKey}`;
        return this._http.get(url)
                    .toPromise()
                    .then(response => response.json().data)
                    .catch(() => {});
        }
}