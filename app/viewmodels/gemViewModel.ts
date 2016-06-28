import { Gem } from '../interfaces/profile'
import { SafeUrl } from '@angular/platform-browser';

export class GemViewModel{

    public iconUrl: SafeUrl;

    constructor(public gem: Gem){
    }

}