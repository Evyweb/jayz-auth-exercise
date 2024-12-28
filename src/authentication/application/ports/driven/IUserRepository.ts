import {User} from "@/authentication/domain/entities/User";

export interface IUserRepository {
    add(user: User): Promise<void>;

    exists(email: string): Promise<boolean>;

    findById(id: string): Promise<User | undefined>;

    save(user: User): Promise<void>;
}