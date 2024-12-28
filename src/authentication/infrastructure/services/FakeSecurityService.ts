import {ISecurityService} from "@/authentication/application/ports/driven/ISecurityService";
import {UserPassword} from "@/authentication/domain/valueObjects/UserPassword";
import {UserHashedPassword} from "@/authentication/domain/valueObjects/UserHashedPassword";

export const FakeSecurityService = (): ISecurityService => ({
    hash(password: UserPassword): UserHashedPassword {
        return UserHashedPassword.from(`hashed-${password.value}`);
    }
});