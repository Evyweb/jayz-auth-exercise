import {UserPassword} from "@/authentication/domain/valueObjects/UserPassword";
import {UserHashedPassword} from "@/authentication/domain/valueObjects/UserHashedPassword";

export interface ISecurityService {
    hash(password: UserPassword): UserHashedPassword;
}