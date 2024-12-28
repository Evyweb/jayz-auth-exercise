export class InvalidNameError extends Error {
    constructor() {
        super('Name must only contain alphabetic characters');
    }
}