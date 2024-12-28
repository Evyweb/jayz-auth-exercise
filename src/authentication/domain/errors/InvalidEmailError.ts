export class InvalidEmailError extends Error {
    constructor(email: string) {
        super(`Email ${email} is invalid`);
    }
}