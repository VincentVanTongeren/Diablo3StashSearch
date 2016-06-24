declare module namespace {

    export interface Skill {
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

    export interface Active {
        skill: Skill;
        rune: Rune;
    }

    export interface Passive {
        skill: Skill;
    }

    export interface Skills {
        active: Active[];
        passive: Passive[];
    }

    export interface Item {
        id: string;
        name: string;
        icon: string;
        displayColor: string;
        tooltipParams: string;
        setItemsEquipped: string[];
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
    }

    export interface FollowerItems {
        special: Item;
        mainHand: Item;
        offHand: Item;
        rightFinger: Item;
        leftFinger: Item;
        neck: Item;
    }

    export interface Stats {
        goldFind: number;
        magicFind: number;
        experienceBonus: number;
    }

    export interface Templar {
        slug: string;
        level: number;
        items: FollowerItems;
        stats: Stats;
        skills: Skill[];
    }

    export interface Scoundrel {
        slug: string;
        level: number;
        items: FollowerItems;
        stats: Stats;
        skills: Skill[];
    }

    export interface Enchantress {
        slug: string;
        level: number;
        items: FollowerItems;
        stats: Stats;
        skills: Skill[];
    }

    export interface Followers {
        templar: Templar;
        scoundrel: Scoundrel;
        enchantress: Enchantress;
    }

    export interface LegendaryPower {
        id: string;
        name: string;
        icon: string;
        displayColor: string;
        tooltipParams: string;
    }

    export interface HeroStats {
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

    export interface Hero {
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
}

