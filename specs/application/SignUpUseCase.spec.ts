import {IUserRepository} from "@/authentication/application/ports/driven/IUserRepository";
import {SignUpRequest} from "@/authentication/application/usecases/SignUp/SignUpRequest";
import {ISignUpUseCase} from "@/authentication/application/ports/driver/ISignUpUseCase";
import {UserAlreadyExistError} from "@/authentication/domain/errors/UserAlreadyExistError";
import {InMemoryUserRepository} from "@/authentication/infrastructure/repositories/InMemoryUserRepository";
import {SignUpUseCase} from "@/authentication/application/usecases/SignUp/SignUpUseCase";
import {User} from "@/authentication/domain/entities/User";
import {IIdentityProvider} from "@/authentication/application/ports/driven/IIdentityProvider";
import {FakeIdentityProvider} from "@/authentication/infrastructure/providers/FakeIdentityProvider";
import {FakeEmailService} from "@/authentication/infrastructure/services/FakeEmailService";
import {AuthenticationService} from "@/authentication/application/services/AuthenticationService";
import {FakeSecurityService} from "@/authentication/infrastructure/services/FakeSecurityService";
import {UserHashedPassword} from "@/authentication/domain/valueObjects/UserHashedPassword";
import {InvalidNameError} from "@/authentication/domain/errors/InvalidNameError";
import {InvalidPasswordError} from "@/authentication/domain/errors/InvalidPasswordError";
import {InvalidEmailError} from "@/authentication/domain/errors/InvalidEmailError";

describe('SignUpUseCase', () => {
    let repository: IUserRepository;
    let idProvider: IIdentityProvider;
    let useCase: ISignUpUseCase;
    let emailsSent: string[];

    const VALID_ID = '00000000-0000-0000-0000-000000000001';
    const VALID_PASSWORD = '12345678';
    const VALID_HASHED_PASSWORD = 'hashed-12345678';
    const VALID_EMAIL = 'user@creatures.com';
    const VALID_NAME = 'User';

    beforeEach(() => {
        repository = InMemoryUserRepository();
        idProvider = FakeIdentityProvider({nextIds: [VALID_ID]});
        emailsSent = [];

        const emailService = FakeEmailService(emailsSent);
        const securityService = FakeSecurityService();
        const authenticationService = AuthenticationService(repository, idProvider, securityService);

        useCase = SignUpUseCase(authenticationService, emailService);
    });

    describe('When the user to create is valid', () => {

        describe('When user does not exist', () => {
            let request: SignUpRequest;

            beforeEach(() => {
                request = {
                    email: VALID_EMAIL,
                    password: VALID_PASSWORD,
                    name: VALID_NAME
                };
            });

            it('should save the new user information', async () => {
                // Act
                await useCase.execute(request);

                // Assert
                const savedUser = await repository.findById(VALID_ID);
                const expectedUser = User.create({
                    id: VALID_ID,
                    hashedPassword: UserHashedPassword.from(VALID_HASHED_PASSWORD),
                    name: VALID_NAME,
                    email: VALID_EMAIL
                });

                expect(savedUser).toEqual<User>(expectedUser);
            });

            it('should send a verification email to the user', async () => {
                // Act
                await useCase.execute(request);

                // Assert
                expect(emailsSent).toEqual(['user@creatures.com']);
            });
        });

        describe('When the user already exist', () => {
            it('should return a "user already exist" error', async () => {
                // Arrange
                const existingUser = User.create({
                    id: VALID_ID,
                    email: VALID_EMAIL,
                    hashedPassword: UserHashedPassword.from(VALID_HASHED_PASSWORD),
                    name: VALID_NAME
                });

                await repository.add(existingUser);

                const request: SignUpRequest = {
                    email: VALID_EMAIL,
                    password: VALID_PASSWORD,
                    name: VALID_NAME
                };

                // Act
                const userCreation = useCase.execute(request);

                // Assert
                expect(userCreation).rejects.toThrow(new UserAlreadyExistError());
            });
        });
    });

    describe('When the user to create is invalid', () => {
        describe.each([
            [{email: '', password: VALID_PASSWORD, name: VALID_NAME}],
            [{email: 'a@b', password: VALID_PASSWORD, name: VALID_NAME}],
            [{email: 'a@b.c', password: VALID_PASSWORD, name: VALID_NAME}],
        ])('When the email is invalid', (request) => {
            it(`should throw an error for email "${request.email}"`, () => {
                // Act
                const userCreation = useCase.execute(request);

                // Assert
                expect(userCreation).rejects.toThrow(new InvalidEmailError(request.email));
            });
        });

        describe.each([
            [{email: VALID_EMAIL, password: '', name: VALID_NAME}],
            [{email: VALID_EMAIL, password: '123456789', name: VALID_NAME}],
        ])('When the password is invalid', (request) => {
            it(`should throw an error for password "${request.password}"`, () => {
                // Act
                const userCreation = useCase.execute(request);

                // Assert
                expect(userCreation).rejects.toThrow(new InvalidPasswordError());
            });
        });

        describe.each([
            [{email: VALID_EMAIL, password: VALID_PASSWORD, name: ''}],
            [{email: VALID_EMAIL, password: VALID_PASSWORD, name: '123'}],
            [{email: VALID_EMAIL, password: VALID_PASSWORD, name: '*&é"'}],
        ])('When the name is invalid', (request) => {
            it(`should throw an error for name "${request.name}"`, () => {
                // Act
                const userCreation = useCase.execute(request);

                // Assert
                expect(userCreation).rejects.toThrow(new InvalidNameError());
            });
        });
    });
});