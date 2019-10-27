export interface User {
    authdata: User;
    id: number;
    email: string;
    lastName: string;
    firstName: string;
    filters: string[];
    company: string[];
    typeUser: string[];
    createdAt: Date;
    updatedAt: Date;
}