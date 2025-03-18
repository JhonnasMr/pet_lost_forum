
/**
     Table PetPost {
        id uuid [pk]
        user_id uuid [not null]
        pet_name varchar(255) [not null]
        description text
        img_url varchar(255)
        status Status [default: 'pending', not null]
        hasFounded boolean
        create_at timestamp [default: 'now()', not null]
    }
 */

import { PetPostModel } from "../../../data";
import { CustomError } from "../../../domain";
import { CreatePostDto } from "../../../domain";

export class CreatorPetPostService {

    async execute(options: CreatePostDto) {

        const petPostModel = new PetPostModel();

        petPostModel.user_id = options.user_id;
        petPostModel.pet_name = options.pet_name;
        petPostModel.description = options.description;
        petPostModel.img_url = options.img_url;

        try {

            await petPostModel.save();
            return 'post created successfully!'

        } catch (error) {

            throw CustomError.badRequest('post exist');

        }
    }

}