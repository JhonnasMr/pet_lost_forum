import { genSaltSync, hashSync, compareSync } from "bcryptjs";


export class Incripter {

    static hashCharacters = (toHash: string, saltNumber: number = 12): string => {
        const salt = genSaltSync(saltNumber);
        return hashSync(toHash, salt);
    }

    static compareCharacters = (noHash: string, hash: string): boolean => {
        return compareSync(noHash, hash);
    }

}