import { Component } from '@angular/core';
import { Profile } from '../interfaces/profile'
import { HeroViewModel } from './heroViewModel'
import { ItemAttribute, ProfileItem, SlotItem } from '../interfaces/attributes'

@Component({
  selector: 'profile-viewmodel',
  providers: [Profile],
  templateUrl: '../app/html/profile.viewmodel.html'
})
export class ProfileViewModel{

    public heroes: HeroViewModel[];
    public itemAttributes: Array<ItemAttribute>;
    public profileItems: Array<ProfileItem>;
    public slotItems: Array<SlotItem>;

    public filteredProfileItems: Array<ProfileItem>;

    private _noSlot = "-- Select slot --";

    constructor(public profile: Profile)
    {
      this.heroes = [];
      this.itemAttributes = [];

      this.slotItems = [ new SlotItem("", this._noSlot), 
        new SlotItem(" Hand", "Weapons/Off hands"), new SlotItem("Neck", "Amulets"), new SlotItem("Finger", "Rings"),
        new SlotItem("Head", "Helmets"), new SlotItem("Hands", "Gloves"), new SlotItem("Torso", "Chests"), new SlotItem("Legs", "Pants"),
        new SlotItem("Shoulders", "Shoulders"), new SlotItem("Feet", "Boots"), new SlotItem("Bracers", "Bracers"),
        new SlotItem("Waist", "Belts"), new SlotItem("Special", "Follower Token")];
    }

    public setFilter(filter: string){
        var items = filter ? this.profileItems.filter(item => !item.slot || item.slot.indexOf(filter) != -1) : this.profileItems;
        this.filteredProfileItems = items.sort((a,b) => {
            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
        });
    }
}
