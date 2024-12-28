import {IUserRepository} from "@/authentication/application/ports/driven/IUserRepository";
import {User} from "@/authentication/domain/entities/User";

export const InMemoryUserRepository = (): IUserRepository => {
    const users: User[] = [];

    return ({
        async add(user: User): Promise<void> {
            users.push(user);
        },
        async exists(email: string): Promise<boolean> {
            return !!users.find(user => user.hasEmail(email));
        },
        async save(userToSave: User): Promise<void> {
            const userIndex = users.findIndex(user => user.equals(userToSave));
            if (userIndex === -1) {
                return await this.add(userToSave);
            }

            users[userIndex] = userToSave;
        },
        async findById(id: string): Promise<User | undefined> {
            return users.find(user => user.hasId(id));
        }
    });
};