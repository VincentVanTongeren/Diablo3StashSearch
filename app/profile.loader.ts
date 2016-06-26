import { Component } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { LocalStorageService } from './services/localstorageservice'
import { ProfileService } from './services/profile.service'
import { ProfileViewModel } from './viewmodels/profileviewmodel'
import { Profile } from './interfaces/profile'

@Component({
    directives: [ProfileViewModel],
  selector: 'profile-loader',
  styles: [`
#app-header {
    height: 10%;
}
#app-main {
    height: 90%;
}
.profile-pane {
    height: 100%;
    color: red;
}
.profile-pane .hero-tab {
    color: green;
    height: 50px;
}
`],
  templateUrl: '../app/html/profile.loader.html'
})
export class ProfileLoader {
    public apiKey: string = "";
    public profileKey: string = "";
    public locale: string = "eu";

    public profileViewModel: ProfileViewModel;

    private _localStorageService: LocalStorageService;
    private _profileService: ProfileService;

    constructor(localStorageService: LocalStorageService, profileService: ProfileService){
        this._localStorageService = localStorageService;
        this._profileService = profileService;
        this.resetProfileLoader();

        if (this.profileKey)
        {
            var profile = this._localStorageService.getItem<Profile>(this.profileKey);
            if (profile)
                this.profileViewModel = new ProfileViewModel(profile);
        }
    }

    private resetProfileLoader(): void{
        this.apiKey = this._localStorageService.getItemAsString("apikey");
        this.profileKey = this._localStorageService.getItemAsString("profileKey");
        this.locale = this._localStorageService.getItemAsString("locale");
        if (!this.locale) this.locale = "eu";
    }

    public updateProfile(): void{
        this._localStorageService.storeItemAsString("apikey", this.apiKey);
        this._localStorageService.storeItemAsString("profileKey", this.profileKey);
        this._localStorageService.storeItemAsString("locale", this.locale);

        this.getProfile().then((profile: Profile) => {
            this.profileViewModel = new ProfileViewModel(profile);
        })
    }

    public getProfile(): Promise<Profile> {
        var cachedProfile = this._localStorageService.getItem<Profile>(this.profileKey);
        if (cachedProfile)
            return new Promise<Profile>(() => { return cachedProfile });

        var profilePromise = this._profileService.getProfile(this.locale, this.profileKey, this.apiKey);
        profilePromise.then((profile: Profile) => {
            if (profile)
                this._localStorageService.storeItem(this.profileKey, profile);
        });
        return profilePromise;
    }
}
