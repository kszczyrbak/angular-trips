export enum SecurityRole {
    USER, ADMIN
}

export class User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: SecurityRole;
}