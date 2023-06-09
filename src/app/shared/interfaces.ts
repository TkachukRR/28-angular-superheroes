import { PowerupsNames, PowerupsTitles } from './powersups.enums';

export interface RegisteredUser {
	id: number;
	email: string;
	password: string;
	name: string;
	favourites: Hero[] | [];
	selectedHero: string;
	powerUps: AvailablePowerup[] | [];
}

export interface Session {
	email: string;
	expDate: Date;
}

export interface Hero {
	response?: 'success' | 'error';
	id: string;
	name: string;
	powerstats: HeroPowerStats;
	image: {
		url: string;
	};
	fights?: Fight[];
	biography?: HeroBiography;
	appearance?: HeroAppearance;
}

export interface HeroBiography {
	['full-name']: string | string[];
	['alter-egos']: string | string[];
	aliases: string | string[];
	['place-of-birth']: string | string[];
	['first-appearance']: string | string[];
	publisher: string | string[];
	alignment: string | string[];
}

export interface HeroAppearance {
	gender: string | string[];
	race: string | string[];
	height: string[];
	weight: string[];
	['eye-color']: string | string[];
	['hair-color']: string | string[];
}

export interface HeroPowerStats {
	[PowerupsNames.Combat]: string;
	[PowerupsNames.Durability]: string;
	[PowerupsNames.Intelligence]: string;
	[PowerupsNames.Power]: string;
	[PowerupsNames.Speed]: string;
	[PowerupsNames.Strength]: string;
}

export interface Fight {
	date: string;
	opponentName: string;
	win: 'true' | 'false';
}

export interface FightHistory {
	hero: string;
	date: Date;
	opponent: string;
	win: boolean;
}

export interface AvailablePowerup {
	title: PowerupsTitles;
	powerName: PowerupsNames;
	addPowerfull: number;
	quantity: number;
}
export interface SortedFights {
	sorted: string;
	isIncrease: boolean;
}

export interface ActiveUser {
	userId: number;
	expDate: Date;
}
