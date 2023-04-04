export interface RegisteredUser {
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
	id: string;
	name: string;
	powerstats: HeroPowerStats;
	image: {
		url: string;
	};
	fights?: Fight[];
}

export interface HeroPowerStats {
	combat: string;
	durability: string;
	intelligence: string;
	power: string;
	speed: string;
	strength: string;
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
	title:
		| 'Ironman nano armor'
		| 'Captain America shield'
		| "Dr. Strange's cloak"
		| 'Mjolnir'
		| 'Flash boots'
		| "Green lantern's ring";
	powerName: 'combat' | 'durability' | 'intelligence' | 'power' | 'speed' | 'strength';
	addPowerfull: number;
	quantity: number;
}
