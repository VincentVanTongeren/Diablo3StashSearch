    export interface Kills {
        monsters: number;
        elites: number;
        hardcoreMonsters: number;
    }

    export interface TimePlayed {
        barbarian: number;
        crusader: number;
        'demon-hunter': number;
        monk: number;
        'witch-doctor': number;
        wizard: number;
    }

    export interface ProfileProgression {
        act1: boolean;
        act2: boolean;
        act3: boolean;
        act4: boolean;
        act5: boolean;
    }

    export interface Artisan {
        slug: string;
        level: number;
        stepCurrent: number;
        stepMax: number;
    }

    export interface Season {
        seasonId: number;
        paragonLevel: number;
        paragonLevelHardcore: number;
        kills: Kills;
        timePlayed: TimePlayed;
        highestHardcoreLevel: number;
        progression: ProfileProgression;
    }

    export class Profile {
        battleTag: string;
        paragonLevel: number;
        paragonLevelHardcore: number;
        paragonLevelSeason: number;
        paragonLevelSeasonHardcore: number;
        guildName: string;
        heroes: Hero[];
        lastHeroPlayed: number;
        lastUpdated: number;
        kills: Kills;
        highestHardcoreLevel: number;
        timePlayed: TimePlayed;
        progression: ProfileProgression;
        fallenHeroes: Hero[];
        blacksmith: Artisan;
        jeweler: Artisan;
        mystic: Artisan;
        blacksmithHardcore: Artisan;
        jewelerHardcore: Artisan;
        mysticHardcore: Artisan;
        blacksmithSeason: Artisan;
        jewelerSeason: Artisan;
        mysticSeason: Artisan;
        blacksmithSeasonHardcore: Artisan;
        jewelerSeasonHardcore: Artisan;
        mysticSeasonHardcore: Artisan;
        seasonalProfiles: Season[];
    }

    export interface SkillDetail {
        slug: string;
        name: string;
        icon: string;
        level: number;
        categorySlug: string;
        tooltipUrl: string;
        description: string;
        simpleDescription: string;
        skillCalcId: string;
    }

    export interface Rune {
        slug: string;
        type: string;
        name: string;
        level: number;
        description: string;
        simpleDescription: string;
        tooltipParams: string;
        skillCalcId: string;
        order: number;
    }

    export interface Skill {
        skill: SkillDetail;
        rune: Rune;
    }

    export interface Skills {
        active: Skill[];
        passive: Skill[];
    }

    export interface Items {
        head: Item;
        torso: Item;
        feet: Item;
        hands: Item;
        shoulders: Item;
        legs: Item;
        bracers: Item;
        mainHand: Item;
        offHand: Item;
        waist: Item;
        rightFinger: Item;
        leftFinger: Item;
        neck: Item;
        special: Item;
    }

    export interface Stats {
        goldFind: number;
        magicFind: number;
        experienceBonus: number;
    }

    export class Follower {
        slug: string;
        level: number;
        items: Items;
        stats: Stats;
        skills: Skill[];
    }

    export interface Followers {
        templar: Follower;
        scoundrel: Follower;
        enchantress: Follower;
    }

    export interface LegendaryPower {
        id: string;
        name: string;
        icon: string;
        displayColor: string;
        tooltipParams: string;
    }

    export class HeroStats {
        life: number;
        damage: number;
        toughness: number;
        healing: number;
        attackSpeed: number;
        armor: number;
        strength: number;
        dexterity: number;
        vitality: number;
        intelligence: number;
        physicalResist: number;
        fireResist: number;
        coldResist: number;
        lightningResist: number;
        poisonResist: number;
        arcaneResist: number;
        critDamage: number;
        blockChance: number;
        blockAmountMin: number;
        blockAmountMax: number;
        damageIncrease: number;
        critChance: number;
        damageReduction: number;
        thorns: number;
        lifeSteal: number;
        lifePerKill: number;
        goldFind: number;
        magicFind: number;
        lifeOnHit: number;
        primaryResource: number;
        secondaryResource: number;
    }

    export class NameValue {
        constructor(public name: string, public value: number){}
    }

    export class MinMax {
        constructor(public min: number, public max: number){ }
    }

    export interface CompletedQuest {
        slug: string;
        name: string;
    }

    export interface ActProgression {
        completed: boolean;
        completedQuests: CompletedQuest[];
    }

    export interface HeroProgression {
        act1: ActProgression;
        act2: ActProgression;
        act3: ActProgression;
        act4: ActProgression;
        act5: ActProgression;
    }

    export class Hero {
        id: number;
        name: string;
        class: string;
        gender: number;
        level: number;
        kills: Kills;
        paragonLevel: number;
        hardcore: boolean;
        seasonal: boolean;
        seasonCreated: number;
        skills: Skills;
        items: Items;
        followers: Followers;
        legendaryPowers: LegendaryPower[];
        stats: HeroStats;
        progression: HeroProgression;
        dead: boolean;
        'last-updated': number;
    }

    export interface Type {
        twoHanded: boolean;
        id: string;
    }

    export interface Attribute {
        text: string;
        color: string;
        affixType: string;
    }

    export interface Attributes {
        primary: Attribute[];
        secondary: Attribute[];
        passive: any[];
    }

    export class Item {
        id: string;
        name: string;
        icon: string;
        displayColor: string;
        tooltipParams: string;
        setItemsEquipped: string[];
        requiredLevel: number;
        itemLevel: number;
        stackSizeMax: number;
        bonusAffixes: number;
        bonusAffixesMax: number;
        accountBound: boolean;
        flavorText: string;
        typeName: string;
        type: Type;
        damageRange: string;
        dps: MinMax;
        attacksPerSecond: MinMax;
        attacksPerSecondText: string;
        minDamage: MinMax;
        maxDamage: MinMax;
        elementalType: string;
        armor: MinMax;
        slots: string[];
        augmentation: string;
        attributes: Attributes;
        attributesRaw: any[];
        randomAffixes: any[];
        gems: Gem[];
        socketEffects: any[];
        craftedBy: any[];
        seasonRequiredToDrop: number;
        isSeasonRequiredToDrop: boolean;
        description: any;
        blockChance: string;
    }

    export class Gem {
        item: Item;
        isGem: boolean;
        isJewel: boolean;
        jewelRank: number;
        jewelSecondaryEffectUnlockRank: number;
        jewelSecondaryEffect: string;
        attributes: Attributes;
        attributesRaw: any[];
    }



