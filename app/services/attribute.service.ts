import { Component, Output, EventEmitter } from '@angular/core';
import { HeroViewModel } from '../viewmodels/heroviewmodel'
import { ItemAttribute } from '../interfaces/attributes'

export class AttributeService {

    public getItemAttributes(heroes: HeroViewModel[]): Array<ItemAttribute>{
        var keys = new Array<string>();
        heroes.forEach(hero => {
            if (hero.hasItems())
                hero.getItems().forEach(itemViewModel => {
                    if (itemViewModel && itemViewModel.item && itemViewModel.item.attributesRaw)
                    {
                        var raw = itemViewModel.item.attributesRaw;
                        Object.keys(raw).forEach(key => {
                            if (keys.indexOf(key) < 0){
                                keys.push(key);
                            }
                        });
                    }
                });
        });

        return this.getAttributes().filter(x => keys.indexOf(x.rawAttribute) >= 0);
    }

    private getAttributes(): Array<ItemAttribute>{
        return [
            new ItemAttribute('Dexterity_Item', 'Dexterity'),
            new ItemAttribute('Intelligence_Item', 'Intelligence'),
            new ItemAttribute('Strength_Item', 'Strength'),
            new ItemAttribute('Vitality_Item', 'Vitality'),
            new ItemAttribute('Resistance_All', 'Resistance to All Elements'),
            new ItemAttribute('Damage_Percent_Bonus_Vs_Elites', 'Bonus Damage to Elites'),
            new ItemAttribute('Attacks_Per_Second_Item', 'Attacks per Second'),
            new ItemAttribute('Attacks_Per_Second_Percent', 'Attack Speed Increase'),
            new ItemAttribute('Crit_Percent_Bonus_Capped', 'Critical Hit Chance'),
            new ItemAttribute('Crit_Damage_Percent', 'Critical Hit Damage'),
            new ItemAttribute('Splash_Damage_Effect_Percent', 'Area Damage'),
            new ItemAttribute('Power_Cooldown_Reduction_Percent_All', 'Cooldown Reduction'),
            new ItemAttribute('Armor_Item', 'Armor'),
            new ItemAttribute('Block_Amount_Item_Min', 'Block Amount'),
            new ItemAttribute('Block_Chance_Item', 'Block Chance'),
            new ItemAttribute('Resistance#Physical', 'Physical Resistance'),
            new ItemAttribute('Resistance#Cold', 'Cold Resistance'),
            new ItemAttribute('Resistance#Fire', 'Fire Resistance'),
            new ItemAttribute('Resistance#Lightning', 'Lightning Resistance'),
            new ItemAttribute('Resistance#Poison', 'Poison Resistance'),
            new ItemAttribute('Resistance#Arcane', 'Arcane/Holy Resistance'),
            new ItemAttribute('CrowdControl_Reduction', 'Crowd Control Reduction'),
            new ItemAttribute('Damage_Percent_Reduction_From_Elites', 'Elite Damage Reduction'),
            new ItemAttribute('Damage_Percent_Reduction_From_Ranged', 'Missile Damage Reduction'),
            new ItemAttribute('Damage_Percent_Reduction_From_Melee', 'Melee Damage Reduction'),
            new ItemAttribute('Hitpoints_Max_Percent_Bonus_Item', 'Total Life Bonus'),
            new ItemAttribute('Hitpoints_Regen_Per_Second', 'Life per Second'),
            new ItemAttribute('Hitpoints_On_Hit', 'Life per Hit'),
            new ItemAttribute('Hitpoints_On_Kill', 'Life per Kill'),
            new ItemAttribute('Health_Globe_Bonus_Health', 'Health Globe Healing Bonus'),
            new ItemAttribute('Gold_PickUp_Radius', 'Bonus to Gold/Globe Radius'),
            new ItemAttribute('Movement_Scalar', 'Movement Speed'),
            new ItemAttribute('Gold_Find', 'Gold Find'),
            new ItemAttribute('Magic_Find', 'Magic Find'),
            new ItemAttribute('Thorns_Fixed#Physical', 'Thorns'),
            new ItemAttribute('Experience_Bonus_Percent', 'Bonus Experience'),
            new ItemAttribute('Damage_Dealt_Percent_Bonus#Arcane', 'Arcane skills deal more damage'),
            new ItemAttribute('Damage_Dealt_Percent_Bonus#Cold', 'Cold skills deal more damage'),
            new ItemAttribute('Damage_Dealt_Percent_Bonus#Fire', 'Fire skills deal more damage'),
            new ItemAttribute('Damage_Dealt_Percent_Bonus#Holy', 'Holy skills deal more damage'),
            new ItemAttribute('Damage_Dealt_Percent_Bonus#Lightning', 'Lightning skills deal more damage'),
            new ItemAttribute('Damage_Dealt_Percent_Bonus#Physical', 'Physical skills deal more damage'),
            new ItemAttribute('Damage_Dealt_Percent_Bonus#Poison', 'Poison skills deal more damage')];
    }
}
