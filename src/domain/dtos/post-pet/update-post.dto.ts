import { regularExpresion } from "../../../config";

export class UpdatePostDto {

    constructor(
        public description: string,
        public pet_name: string,
        public img_url: string,
    ) { }

    static execute = (body: { [key: string]: any }): [string?, UpdatePostDto?] => {

        const { description, pet_name, img_url } = body;

        if (!img_url) return ['user_id is required'];
        if (!pet_name) return ['user_id is required'];
        // if (!user_id) return ['user_id is required'];
        if (!description) return ['user_id is required'];
        // if (!hasFounded) return ['hasFounded is required'];

        if (!regularExpresion.url.test(img_url)) return ['img_url format invalid 😒'];
        // if (!regularExpresion.uuid.test(user_id)) return ['user_id format invalid 😒'];
        if (!regularExpresion.noSimbol25char.test(pet_name)) return ['format pet name invalid 😒'];
        // if (hasFounded !== 'true' && hasFounded !== 'false') return ['hasFounded mmust be a boolean'];

        return [undefined, new UpdatePostDto(
            // user_id,
            // hasFounded,
            description,
            pet_name,
            img_url
        )];

    }

}