import {z} from "zod";
import {InvalidEmailError} from "@/authentication/domain/errors/InvalidEmailError";

const UserEmailSchema = z.string().email().nonempty()

export class UserEmail {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static from(value: string): UserEmail {
        if (UserEmail.hasInvalid(value)) {
            throw new InvalidEmailError(value);
        }

        return new UserEmail(value);
    }

    equals(email: string): boolean {
        return this.value === email
    }

    private static hasInvalid(value: string): boolean {
        return !UserEmailSchema.safeParse(value).success;
    }
}