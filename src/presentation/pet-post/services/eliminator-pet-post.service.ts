import { PetPostModel } from "../../../data";
import { CustomError } from "../../../domain";

export class DeletePetPostService {

    async execute(id: string) {

        const postToRemove = await PetPostModel.findOne({
            select: ['created_at', 'description', 'hasFounded', 'id', 'user_id', 'img_url', 'pet_name'],
            where: {
                id: id,
            }
        });

        if (!postToRemove) {
            throw CustomError.notFound('post doesnt exist!');
        }

        try {

            PetPostModel.remove(postToRemove);

            return postToRemove;

        } catch (error) {
            throw CustomError.internalServer('something went wrong!');
        }

    }

}