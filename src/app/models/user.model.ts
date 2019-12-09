export enum SecurityRole {
    USER = "USER", 
    ADMIN = "ADMIN"
}

export class User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: SecurityRole;
}