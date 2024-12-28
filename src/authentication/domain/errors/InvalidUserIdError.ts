export class InvalidUserIdError extends Error {
    constructor() {
        super(`User ID is invalid`);
    }
}