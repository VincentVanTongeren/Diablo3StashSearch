
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

    export interface SeasonalProfiles {
        season4: Season;
        season6: Season;
        season5: Season;
        season0: Season;
        season2: Season;
    }

    export interface Profile {
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
        seasonalProfiles: SeasonalProfiles;
    }


