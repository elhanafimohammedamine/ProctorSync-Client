import { JwtPayload } from "jwt-decode";


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

export interface IProfessorUpdateRequest {
	id: string
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
	branchId: string;
	departmentId: string;
}


export interface IAdministratorRequest {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

export interface IAdministratorUpdateRequest {
	id: string;
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

export interface IClassroomUpdateRequest {
	id: string;
	name : string;
	bloc: string;
	capacity: number;
}

export interface IElementType {
	id: string;
	typeTitle: string;
}

export interface ILevel {
	id: string;
	levelTitle: string;
}

export interface IPedagogicElementRequest {
	elementTitle: string;
	elementTypeId: string;
	levelId: string;
	professorId: string;
	coordinatorId: string;
}

export interface IPedagogicElementUpdateRequest {
	id: string;
	elementTitle: string;
	elementTypeId: string;
	levelId: string;
	professorId: string;
	coordinatorId: string;
}

export interface IPedagogicElementResponse {
	id: string;
	elementTitle: string;
	level: ILevel;
	elementType: IElementType;
	professor: IProfessorResponse;
	coordinator: IProfessorResponse;
}

export interface ISessionResponse {
	id: string;
	name: string;
}

export interface ISemesterResponse {
	id: string;
	name: string;
}

export interface IExamTypeResponse {
	id: string;
	name: string;
}

export interface IDateRangeRequest {
	startDateTime: string;
	endDateTime: string;
}


export interface IJwtPayload extends JwtPayload {
	roles: string[];
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}