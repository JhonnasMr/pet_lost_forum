import { regularExpresion } from "../../../config";

export class UpdatePostDto {

    constructor(
        public user_id: string,
        public description: string,
        public pet_name: string,
        public img_url: string,
        public hasFounded: boolean
    ) { }

    static execute = (body: { [key: string]: any }): [string?, UpdatePostDto?] => {

        const { user_id, description, pet_name, img_url, hasFounded } = body;

        if (!user_id) return ['user_id is required'];
        if (!description) return ['user_id is required'];
        if (!pet_name) return ['user_id is required'];
        if (!img_url) return ['user_id is required'];
        if (!hasFounded) return ['hasFounded is required'];

        if (hasFounded !== 'true' && hasFounded !== 'false') return ['hasFounded mmust be a boolean'];
        if (!regularExpresion.url.test(img_url)) return ['img_url format invalid 😒'];
        if (!regularExpresion.uuid.test(user_id)) return ['user_id format invalid 😒'];

        return [undefined, new UpdatePostDto(
            user_id,
            description,
            pet_name,
            img_url,
            hasFounded
        )];

    }

}