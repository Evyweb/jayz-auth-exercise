import {IEmailService} from "@/authentication/application/ports/driven/IEmailService";

export function FakeEmailService(verificationEmailsSent: string[] = []): IEmailService {
    return {
        async sendVerificationEmail(email: string) {
            verificationEmailsSent.push(email);
        }
    };
}