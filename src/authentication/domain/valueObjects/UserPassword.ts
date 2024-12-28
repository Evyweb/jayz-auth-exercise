import {z} from "zod";
import {InvalidPasswordError} from "@/authentication/domain/errors/InvalidPasswordError";

const UserPasswordSchema = z.string().min(1).max(8);

export class UserPassword {
    public readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static from(value: string): UserPassword {
        if (UserPassword.hasInvalid(value)) {
            throw new InvalidPasswordError();
        }

        return new UserPassword(value);
    }

    static hasInvalid(value: string): boolean {
        return !UserPasswordSchema.safeParse(value).success;
    }
}