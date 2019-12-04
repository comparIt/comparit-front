export class User {
    authdata: User;
    id: number;
    email: string;
    lastName: string;
    firstName: string;
    password: string;
    filters: string[];
    company: string[];
    typeUser: string[];
    createdAt: Date;
    updatedAt: Date;

    static buildUser(user: User): User {
        const newUser = new User();
        newUser.email=user.email;
        newUser.lastName=user.lastName;
        newUser.firstName=user.firstName;
        newUser.password=user.password;
        return newUser;
    }
}