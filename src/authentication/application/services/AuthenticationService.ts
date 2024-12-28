import {IUserRepository} from "@/authentication/application/ports/driven/IUserRepository";
import {IIdentityProvider} from "@/authentication/application/ports/driven/IIdentityProvider";
import {IAuthenticationService} from "@/authentication/application/ports/driven/IAuthenticationService";
import {UserPassword} from "@/authentication/domain/valueObjects/UserPassword";
import {User} from "@/authentication/domain/entities/User";
import {ISecurityService} from "@/authentication/application/ports/driven/ISecurityService";

export const AuthenticationService = (
    userRepository: IUserRepository,
    identityProvider: IIdentityProvider,
    securityService: ISecurityService,
): IAuthenticationService => ({
    async isEmailAlreadyTaken(email: string): Promise<boolean> {
        return await userRepository.exists(email);
    },
    async registerUser(email: string, name: string, password: string): Promise<void> {
        const id = identityProvider.generateId();
        const userPassword = UserPassword.from(password);
        const hashedPassword = securityService.hash(userPassword);

        const user = User.create({id, email, name, hashedPassword});
        await userRepository.save(user);
    }
});