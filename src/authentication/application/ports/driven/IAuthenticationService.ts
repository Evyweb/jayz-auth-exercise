export interface IAuthenticationService {
    isEmailAlreadyTaken(email: string): Promise<boolean>;

    registerUser(email: string, name: string, password: string): Promise<void>;
}