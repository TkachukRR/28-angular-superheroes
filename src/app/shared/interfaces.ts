export interface RegisteredUser {
	email: string;
	password: string;
	name: string;
}

export interface Session {
	email: string;
	expDate: Date;
}
