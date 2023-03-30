export interface RegisteredUser {
	email: string;
	password: string;
	name: string;
  favourites: string[] | [];
  selectedHero: string;
  powerUps: object;
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
}

export interface HeroPowerStats {
	combat: string;
	durability: string;
	intelligence: string;
	power: string;
	speed: string;
	strength: string;
}
