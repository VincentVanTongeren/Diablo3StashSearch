import { Component, Output, EventEmitter } from '@angular/core';
import { HeroViewModel } from '../viewmodels/heroviewmodel'
import { ItemAttribute } from '../interfaces/attributes'

export class AttributeService {

    public getItemAttributes(heroes: HeroViewModel[]): Array<ItemAttribute>{
        var attributes = new Array<ItemAttribute>();
        heroes.forEach(hero => {
            hero.items.forEach(item => {
                if (!item || !item.item || !item.item.attributesRaw)
                    return;
                var raw = item.item.attributesRaw;
                Object.keys(raw).forEach(key => {
                    if (attributes.filter(x => x.rawAttribute == key).length == 0){
                        attributes.push(this.map(key));
                    }
                });
            });
        });
        // var attributeStrings = new Array<string>();
        // var noUnderscore = new Array<string>();
        // var ignore = new Array<string>();
        // attributes.forEach(a => {
        //     var ignoreRegex = /^Damage_(Weapon|Delta|Min).*#|^Item_Power.*/.exec(a.rawAttribute);
        //     if (ignoreRegex && ignoreRegex.length > 0)
        //         ignore.push(a.rawAttribute);
        //     else if (a.rawAttribute.indexOf("_") < 0 && a.rawAttribute.indexOf("#") < 0)
        //         noUnderscore.push(a.rawAttribute);
        //     else
        //         attributeStrings.push(a.rawAttribute)
        // });
        // attributeStrings = attributeStrings.sort();
        // var json = JSON.stringify(attributeStrings);
        return attributes.filter(a => a.attribute != a.rawAttribute);
    }

    private map(attributeRaw: string): ItemAttribute{
        var attribute = attributeRaw;
        switch(attributeRaw){
            case 'Dexterity_Item': attribute = 'Dexterity'; break;
            case 'Intelligence_Item': attribute = 'Intelligence'; break;
            case 'Strength_Item': attribute = 'Strength'; break;
            case 'Vitality_Item': attribute = 'Vitality'; break;
            case 'Resistance_All': attribute = 'Resistance to All Elements'; break;
            case 'Damage_Percent_Bonus_Vs_Elites': attribute = 'Bonus Damage to Elites'; break;
            case 'Damage_Percent_Bonus_Vs_Elites': attribute = 'Bonus Damage to Elites'; break;
            case 'Attacks_Per_Second_Item': attribute = 'Attacks per Second'; break;
            case 'Attacks_Per_Second_Percent': attribute = 'Attack Speed Increase'; break;
            case 'Crit_Percent_Bonus_Capped': attribute = 'Critical Hit Chance'; break;
            case 'Crit_Damage_Percent': attribute = 'Critical Hit Damage'; break;
            case 'Splash_Damage_Effect_Percent': attribute = 'Area Damage'; break;
            case 'Power_Cooldown_Reduction_Percent_All': attribute = 'Cooldown Reduction'; break;
            case 'Armor_Item': attribute = 'Armor'; break;
            case 'Block_Amount_Item_Min': attribute = 'Block Amount'; break;
            case 'Block_Chance_Item': attribute = 'Block Chance'; break;
            case 'Resistance#Physical': attribute = 'Physical Resistance'; break;
            case 'Resistance#Cold': attribute = 'Cold Resistance'; break;
            case 'Resistance#Fire': attribute = 'Fire Resistance'; break;
            case 'Resistance#Lightning': attribute = 'Lightning Resistance'; break;
            case 'Resistance#Poison': attribute = 'Poison Resistance'; break;
            case 'Resistance#Arcane': attribute = 'Arcane/Holy Resistance'; break;
            case 'CrowdControl_Reduction': attribute = 'Crowd Control Reduction'; break;
            case 'Damage_Percent_Reduction_From_Elites': attribute = 'Elite Damage Reduction'; break;
            case 'Damage_Percent_Reduction_From_Ranged': attribute = 'Missile Damage Reduction'; break;
            case 'Damage_Percent_Reduction_From_Melee': attribute = 'Melee Damage Reduction'; break;
            case 'Hitpoints_Max_Percent_Bonus_Item': attribute = 'Total Life Bonus'; break;
            case 'Hitpoints_Regen_Per_Second': attribute = 'Life per Second'; break;
            case 'Hitpoints_On_Hit': attribute = 'Life per Hit'; break;
            case 'Hitpoints_On_Kill': attribute = 'Life per Kill'; break;
            case 'Health_Globe_Bonus_Health': attribute = 'Health Globe Healing Bonus'; break;
            case 'Gold_PickUp_Radius': attribute = 'Bonus to Gold/Globe Radius'; break;
            case 'Movement_Scalar': attribute = 'Movement Speed'; break;
            case 'Gold_Find': attribute = 'Gold Find'; break;
            case 'Magic_Find': attribute = 'Magic Find'; break;
            case 'Thorns_Fixed#Physical': attribute = 'Thorns'; break;
            case 'Experience_Bonus_Percent': attribute = 'Bonus Experience'; break;
            case 'Damage_Dealt_Percent_Bonus#Arcane': attribute = 'Arcane skills deal more damage'; break;
            case 'Damage_Dealt_Percent_Bonus#Cold': attribute = 'Cold skills deal more damage'; break;
            case 'Damage_Dealt_Percent_Bonus#Fire': attribute = 'Fire skills deal more damage'; break;
            case 'Damage_Dealt_Percent_Bonus#Holy': attribute = 'Holy skills deal more damage'; break;
            case 'Damage_Dealt_Percent_Bonus#Lightning': attribute = 'Lightning skills deal more damage'; break;
            case 'Damage_Dealt_Percent_Bonus#Physical': attribute = 'Physical skills deal more damage'; break;
            case 'Damage_Dealt_Percent_Bonus#Poison': attribute = 'Poison skills deal more damage'; break;
        }
        return new ItemAttribute(attributeRaw, attribute);
    }
}
