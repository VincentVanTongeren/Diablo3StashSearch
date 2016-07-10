import { Component } from '@angular/core';
import { Profile } from '../interfaces/profile'
import { HeroViewModel } from './heroViewModel'
import { ItemAttribute } from '../interfaces/attributes'

@Component({
  selector: 'profile-viewmodel',
  providers: [Profile],
  templateUrl: '../app/html/profile.viewmodel.html'
})
export class ProfileViewModel{

    public heroes: HeroViewModel[];
    public itemAttributes: Array<ItemAttribute>;
    public profileItems: Array<string>;

    constructor(public profile: Profile)
    {
      this.heroes = [];
      this.itemAttributes = [];
    }
}
