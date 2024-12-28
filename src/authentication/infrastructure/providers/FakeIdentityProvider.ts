import {IIdentityProvider} from "@/authentication/application/ports/driven/IIdentityProvider";

export const FakeIdentityProvider = ({ nextIds }: { nextIds: string[] }): IIdentityProvider => {
    return ({
        generateId: () => {
            const id = nextIds.shift();
            if (!id) {
                throw new Error('No more ids available');
            }
            return id;
        }
    });
};