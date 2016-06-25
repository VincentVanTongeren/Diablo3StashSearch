import { Component } from '@angular/core';
import { Profile } from '../interfaces/profile'
//import { HeroViewModel } from './heroViewModel'

@Component({
  selector: 'profile-viewmodel',
  templateUrl: '../app/html/profile.viewmodel.html'
})
export class ProfileViewModel{

    //public heroes: HeroViewModel[];

    constructor(public profile: Profile)
    {

    }
}