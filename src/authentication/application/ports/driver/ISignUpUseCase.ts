import {SignUpRequest} from "@/authentication/application/usecases/SignUp/SignUpRequest";
import {SignUpResponse} from "@/authentication/application/usecases/SignUp/SignUpResponse";

export interface ISignUpUseCase {
    execute: (data: SignUpRequest) => Promise<SignUpResponse>
}