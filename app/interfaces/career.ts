declare module namespace {

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

    export interface Blacksmith {
        slug: string;
        level: number;
        stepCurrent: number;
        stepMax: number;
    }

    export interface Jeweler {
        slug: string;
        level: number;
        stepCurrent: number;
        stepMax: number;
    }

    export interface Mystic {
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

    export interface SeasonalProfiles {
        season4: Season;
        season6: Season;
        season5: Season;
        season0: Season;
        season2: Season;
    }

    export interface Career {
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
        blacksmith: Blacksmith;
        jeweler: Jeweler;
        mystic: Mystic;
        blacksmithHardcore: Blacksmith;
        jewelerHardcore: Jeweler;
        mysticHardcore: Mystic;
        blacksmithSeason: Blacksmith;
        jewelerSeason: Jeweler;
        mysticSeason: Mystic;
        blacksmithSeasonHardcore: Blacksmith;
        jewelerSeasonHardcore: Jeweler;
        mysticSeasonHardcore: Mystic;
        seasonalProfiles: SeasonalProfiles;
    }

}

