import { PetPostModel } from "../../../data";
import { CustomError, UpdatePostDto } from "../../../domain";

export class UpdatePetPostService {

    async execute(id: string, options: UpdatePostDto) {

        const postToUpdater = await PetPostModel.findOne({
            select: ['created_at', 'description', 'hasFounded', 'id', 'user_id', 'img_url', 'pet_name'],
            where: {
                id: id
            }
        });

        if (!postToUpdater) {
            throw CustomError.notFound('post doesnt exist!');
        }

        postToUpdater.description = options.description;
        postToUpdater.img_url = options.img_url;
        postToUpdater.pet_name = options.pet_name;

        try {
            
            await postToUpdater.save();

        } catch (error) {
            throw CustomError.internalServer('something went wrong!');
        }

    }

}