import { PetPostModel } from "../../../data";
import { CustomError } from "../../../domain";

export class DeletePetPostService {

    async execute(id: string) {

        try {

            const postToRemove = await PetPostModel.findBy({ id: id });

            if (postToRemove) {
                PetPostModel.remove(postToRemove);
                return postToRemove;
            }

            return;

        } catch (error) {
            throw new CustomError('bad request', 400);
        }

    }

}