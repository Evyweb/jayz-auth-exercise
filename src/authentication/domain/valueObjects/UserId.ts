import {z} from "zod";
import {InvalidUserIdError} from "@/authentication/domain/errors/InvalidUserIdError";

const schema = z.string().uuid();

export class UserId {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static from(value: string): UserId {
        if (UserId.hasInvalid(value)) {
            throw new InvalidUserIdError();
        }

        return new UserId(value);
    }

    equals(other: UserId) {
        return this.value === other.value;
    }

    static hasInvalid(value: string): boolean {
        return !schema.safeParse(value).success;
    }
}