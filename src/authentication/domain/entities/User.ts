import {UserId} from "@/authentication/domain/valueObjects/UserId";
import {UserEmail} from "@/authentication/domain/valueObjects/UserEmail";
import {UserName} from "@/authentication/domain/valueObjects/UserName";
import {UserHashedPassword} from "@/authentication/domain/valueObjects/UserHashedPassword";

type UserData = {
    id: string,
    email: string,
    hashedPassword: UserHashedPassword,
    name: string
};

export class User {
    private readonly id: UserId;
    private readonly email: UserEmail;
    private readonly hashedPassword: UserHashedPassword;
    private readonly name: UserName;

    private constructor(id: UserId, email: UserEmail, hashedPassword: UserHashedPassword, name: UserName) {
        this.id = id;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.name = name;
    }

    static create({id, email, name, hashedPassword}: UserData): User {
        const userId = UserId.from(id);
        const userEmail = UserEmail.from(email);
        const userHashedPassword = hashedPassword;
        const userName = UserName.from(name);

        return new User(userId, userEmail, userHashedPassword, userName);
    }

    hasEmail(email: string): boolean {
        return this.email.equals(email);
    }

    equals(user: User): boolean {
        return this.id.equals(user.id);
    }

    hasId(id: string): boolean {
        return this.id.equals(UserId.from(id));
    }
}