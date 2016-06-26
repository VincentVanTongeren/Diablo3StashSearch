import { Component } from '@angular/core';
import { Profile } from '../interfaces/profile'
import { HeroViewModel } from './heroViewModel'

@Component({
  selector: 'profile-viewmodel',
  providers: [Profile],
  templateUrl: '../app/html/profile.viewmodel.html'
})
export class ProfileViewModel{

    public heroes: HeroViewModel[];

    constructor(public profile: Profile)
    {
      this.heroes = [];
    }
}