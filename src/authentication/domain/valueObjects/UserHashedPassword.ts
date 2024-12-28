import {z} from "zod";
import {InvalidPasswordError} from "@/authentication/domain/errors/InvalidPasswordError";

const schema = z.string().nonempty();

export class UserHashedPassword {
    public readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static from(value: string): UserHashedPassword {
        if (UserHashedPassword.hasInvalid(value)) {
            throw new InvalidPasswordError();
        }

        return new UserHashedPassword(value);
    }

    static hasInvalid(value: string): boolean {
        return !schema.safeParse(value).success;
    }
}