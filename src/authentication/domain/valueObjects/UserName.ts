import {z} from "zod";
import {InvalidNameError} from "@/authentication/domain/errors/InvalidNameError";

const UserNameSchema = z
    .string()
    .min(1)
    .regex(/^[A-Za-z]+$/);

export class UserName {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static from(value: string): UserName {
        if (UserName.hasInvalid(value)) {
            throw new InvalidNameError();
        }

        return new UserName(value);
    }

    static hasInvalid(value: string): boolean {
        return !UserNameSchema.safeParse(value).success;
    }
}