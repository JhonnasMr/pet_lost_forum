import { regularExpresion } from "../../../config"
import { PetPostModel } from "../../../data";


export class CreatePostDto {

    constructor(
        public user_id: string,
        public description: string,
        public pet_name: string,
        public img_url: string
    ) { }

    static execute(body: { [key: string]: any }): [string?, CreatePostDto?] {

        const { user_id, description, pet_name, img_url } = body;

        if (!user_id) return ['user_id is rerquired'];
        if (!description) return ['description is rerquired'];
        if (!pet_name) return ['pet_name is rerquired'];
        if (!img_url) return ['img_url is rerquired'];

        if (!regularExpresion.uuid.test(user_id)) return ['user_id format invalid 😒']
        if (!regularExpresion.url.test(img_url)) return ['img_url format invalid 😒'];
        if (!regularExpresion.noSimbol25char.test(pet_name)) return ['format pet name invalid 😒'];
        if (!regularExpresion.noSimbol240char.test(description)) return ['format description invalid 😒'];

        return [undefined, new CreatePostDto(user_id, description, pet_name, img_url)];

    }

}