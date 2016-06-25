
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

    export interface ItemDetails {
        id: string;
        name: string;
        icon: string;
        displayColor: string;
        tooltipParams: string;
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
        slots: string[];
        attributes: Attributes;
        attributesRaw: any[];
        randomAffixes: any[];
        gems: any[];
        socketEffects: any[];
        craftedBy: any[];
        seasonRequiredToDrop: number;
        isSeasonRequiredToDrop: boolean;
        description?: any;
        blockChance: string;
    }


