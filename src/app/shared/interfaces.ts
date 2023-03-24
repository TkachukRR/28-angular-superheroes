export interface RegisteredUser {
	email: string;
	password: string;
	name: string;
}

export interface Session {
	email: string;
	expDate: Date;
}

export interface Hero{
  id: string;
  name: string;
  stats: HeroPowerStats;
}

export interface HeroPowerStats{
  combat: string;
  durability: string;
  intelligence: string;
  power: string;
  speed: string;
  strength: string;
}
