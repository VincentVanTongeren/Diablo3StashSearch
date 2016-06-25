import { Profile } from '../interfaces/profile'
import { HeroViewModel } from './heroViewModel'
export class ProfileViewModel{

    public heroes: HeroViewModel[];

    constructor(public profile: Profile)
    {

    }
}