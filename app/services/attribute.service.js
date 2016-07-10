"use strict";
var attributes_1 = require('../interfaces/attributes');
var AttributeService = (function () {
    function AttributeService() {
    }
    AttributeService.prototype.getItemAttributes = function (heroes) {
        var keys = new Array();
        heroes.forEach(function (hero) {
            if (hero.hasItems())
                hero.getItems().forEach(function (itemViewModel) {
                    if (itemViewModel && itemViewModel.item && itemViewModel.item.attributesRaw) {
                        var raw = itemViewModel.item.attributesRaw;
                        Object.keys(raw).forEach(function (key) {
                            if (keys.indexOf(key) < 0) {
                                keys.push(key);
                            }
                        });
                    }
                });
        });
        return this.getAttributes().filter(function (x) { return keys.indexOf(x.rawAttribute) >= 0; });
    };
    AttributeService.prototype.getAttributes = function () {
        return [
            new attributes_1.ItemAttribute('Dexterity_Item', 'Dexterity'),
            new attributes_1.ItemAttribute('Intelligence_Item', 'Intelligence'),
            new attributes_1.ItemAttribute('Strength_Item', 'Strength'),
            new attributes_1.ItemAttribute('Vitality_Item', 'Vitality'),
            new attributes_1.ItemAttribute('Resistance_All', 'Resistance to All Elements'),
            new attributes_1.ItemAttribute('Damage_Percent_Bonus_Vs_Elites', 'Bonus Damage to Elites'),
            new attributes_1.ItemAttribute('Attacks_Per_Second_Item', 'Attacks per Second'),
            new attributes_1.ItemAttribute('Attacks_Per_Second_Percent', 'Attack Speed Increase'),
            new attributes_1.ItemAttribute('Crit_Percent_Bonus_Capped', 'Critical Hit Chance'),
            new attributes_1.ItemAttribute('Crit_Damage_Percent', 'Critical Hit Damage'),
            new attributes_1.ItemAttribute('Splash_Damage_Effect_Percent', 'Area Damage'),
            new attributes_1.ItemAttribute('Power_Cooldown_Reduction_Percent_All', 'Cooldown Reduction'),
            new attributes_1.ItemAttribute('Armor_Item', 'Armor'),
            new attributes_1.ItemAttribute('Block_Amount_Item_Min', 'Block Amount'),
            new attributes_1.ItemAttribute('Block_Chance_Item', 'Block Chance'),
            new attributes_1.ItemAttribute('Resistance#Physical', 'Physical Resistance'),
            new attributes_1.ItemAttribute('Resistance#Cold', 'Cold Resistance'),
            new attributes_1.ItemAttribute('Resistance#Fire', 'Fire Resistance'),
            new attributes_1.ItemAttribute('Resistance#Lightning', 'Lightning Resistance'),
            new attributes_1.ItemAttribute('Resistance#Poison', 'Poison Resistance'),
            new attributes_1.ItemAttribute('Resistance#Arcane', 'Arcane/Holy Resistance'),
            new attributes_1.ItemAttribute('CrowdControl_Reduction', 'Crowd Control Reduction'),
            new attributes_1.ItemAttribute('Damage_Percent_Reduction_From_Elites', 'Elite Damage Reduction'),
            new attributes_1.ItemAttribute('Damage_Percent_Reduction_From_Ranged', 'Missile Damage Reduction'),
            new attributes_1.ItemAttribute('Damage_Percent_Reduction_From_Melee', 'Melee Damage Reduction'),
            new attributes_1.ItemAttribute('Hitpoints_Max_Percent_Bonus_Item', 'Total Life Bonus'),
            new attributes_1.ItemAttribute('Hitpoints_Regen_Per_Second', 'Life per Second'),
            new attributes_1.ItemAttribute('Hitpoints_On_Hit', 'Life per Hit'),
            new attributes_1.ItemAttribute('Hitpoints_On_Kill', 'Life per Kill'),
            new attributes_1.ItemAttribute('Health_Globe_Bonus_Health', 'Health Globe Healing Bonus'),
            new attributes_1.ItemAttribute('Gold_PickUp_Radius', 'Bonus to Gold/Globe Radius'),
            new attributes_1.ItemAttribute('Movement_Scalar', 'Movement Speed'),
            new attributes_1.ItemAttribute('Gold_Find', 'Gold Find'),
            new attributes_1.ItemAttribute('Magic_Find', 'Magic Find'),
            new attributes_1.ItemAttribute('Thorns_Fixed#Physical', 'Thorns'),
            new attributes_1.ItemAttribute('Experience_Bonus_Percent', 'Bonus Experience'),
            new attributes_1.ItemAttribute('Damage_Dealt_Percent_Bonus#Arcane', 'Arcane skills deal more damage'),
            new attributes_1.ItemAttribute('Damage_Dealt_Percent_Bonus#Cold', 'Cold skills deal more damage'),
            new attributes_1.ItemAttribute('Damage_Dealt_Percent_Bonus#Fire', 'Fire skills deal more damage'),
            new attributes_1.ItemAttribute('Damage_Dealt_Percent_Bonus#Holy', 'Holy skills deal more damage'),
            new attributes_1.ItemAttribute('Damage_Dealt_Percent_Bonus#Lightning', 'Lightning skills deal more damage'),
            new attributes_1.ItemAttribute('Damage_Dealt_Percent_Bonus#Physical', 'Physical skills deal more damage'),
            new attributes_1.ItemAttribute('Damage_Dealt_Percent_Bonus#Poison', 'Poison skills deal more damage')];
    };
    return AttributeService;
}());
exports.AttributeService = AttributeService;
//# sourceMappingURL=attribute.service.js.map