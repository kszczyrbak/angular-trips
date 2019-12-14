export enum SecurityRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export class AppUser {
    _id: string;
    name: string;
    email: string;
    role: SecurityRole;
}