export class InvalidPasswordError extends Error {
    constructor() {
        super(`Password must be at least 8 characters long`);
    }
}