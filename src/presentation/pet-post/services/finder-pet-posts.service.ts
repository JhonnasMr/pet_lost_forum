import { PetPostModel } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderPetPostsService {

    async execute() {

        try {

            return await PetPostModel.find();

        } catch (error) {
            throw new CustomError('bad request', 400);
        }
    }

}