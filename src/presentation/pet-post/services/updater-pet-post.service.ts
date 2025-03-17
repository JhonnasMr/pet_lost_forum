import { PetPostModel } from "../../../data";
import { CustomError, UpdatePostDto } from "../../../domain";

export class UpdatePetPostService {

    async execute(id: string, options: UpdatePostDto) {
        
        try {
            
            const postToUpdater = await PetPostModel.findOneBy({id: id});

            if (postToUpdater) {
                postToUpdater.description = options.description;
                postToUpdater.img_url = options.img_url;
                postToUpdater.pet_name = options.pet_name;
                postToUpdater.user_id = options.user_id;
                postToUpdater.hasFounded = options.hasFounded;

                postToUpdater.save();
            }

        } catch (error) {
            throw new CustomError('bad request', 400);
        }

    }

}