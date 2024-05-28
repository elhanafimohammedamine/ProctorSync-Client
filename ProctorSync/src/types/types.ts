

export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	role: string;
}


export interface IAuthRequest {
	email: string;
	password: string;
}

export interface IProfessorRequest {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	branchId: string;
	departmentId: string;
}


export interface IAdministratorRequest {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}








