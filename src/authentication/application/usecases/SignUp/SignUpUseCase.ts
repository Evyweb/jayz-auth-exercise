import {ISignUpUseCase} from "@/authentication/application/ports/driver/ISignUpUseCase";
import {SignUpRequest} from "@/authentication/application/usecases/SignUp/SignUpRequest";
import {UserAlreadyExistError} from "@/authentication/domain/errors/UserAlreadyExistError";
import {IAuthenticationService} from "@/authentication/application/ports/driven/IAuthenticationService";
import {IEmailService} from "@/authentication/application/ports/driven/IEmailService";
import {SignUpResponse} from "@/authentication/application/usecases/SignUp/SignUpResponse";

export const SignUpUseCase = (
    authService: IAuthenticationService,
    emailService: IEmailService,
): ISignUpUseCase => ({
    async execute({email, name, password}: SignUpRequest): Promise<SignUpResponse> {
        const userAlreadyExist = await authService.isEmailAlreadyTaken(email);
        if (userAlreadyExist) {
            throw new UserAlreadyExistError();
        }

        await authService.registerUser(email, name, password);

        await emailService.sendVerificationEmail(email);
    }
});