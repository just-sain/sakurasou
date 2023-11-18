export interface ILoginParams {
	identifier: string;
	password: string;
}
export interface IRegisterParams extends Omit<ILoginParams, 'identifier'> {
	username: string;
	email: string;
}

export interface IAuth {
	jwt: string;
	user: IUser;
}

export interface IUser {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
}

// error interface
export interface IErrorAxiosStrapi {
	code: string;
	message: string;
	name: string;
	response: {
		status: number;
		statusText: string;
		data: IErrorStrapi;
	};
}

export interface IErrorStrapi {
	data?: null;
	error: Error;
}

interface Error {
	status: number;
	name: string;
	message: string;
	details: {};
}
