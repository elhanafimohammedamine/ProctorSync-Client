

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

export interface IProfessorResponse {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	createdAt: string;
}


export interface IAdministratorRequest {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

export interface IAdministratorResponse {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	createdAt: string;
}

export interface IGroupRequest {
	groupName: string;
	description: string;

}

export interface IGroupResponse {
	id: string;
	groupName: string;
	description: string;
	createdAt: string;
	professors: IProfessorResponse[];
	professorsCount: number;
}


export interface IBranch {
	id: string;
	branchName: string;
}

export interface IDepartment {
	id: string;
	departmentName: string;
}


export interface IClassroomRequest {
	roomName: string;
	bloc: string;
	capacity: number;
}

export interface IClassroomResponse {
	id: string;
	name: string;
	bloc: string;
	capacity: number;
}