export interface IEmailService {
    sendVerificationEmail(email: string): Promise<void>;
}