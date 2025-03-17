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

import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * enum for PetPsst status.
 */
export enum PetPostStatus {
   pending = 'pending',
   approve = 'approve',
   reject = 'rejected'
}

/**
 * This class represent a database entity
 * 
 * in your ./tool.service.ts
 * @example
 * ```
 * const myPetPost = await PetPostModel.findOneBy({ id: postID })
 * -------------------------------------
 * const myPetPost = new PetPostModel();
 * 
 * myPetPost.user_id = options.user_id;
 * 
 * myPetPost.save();
 * ```
 */

@Entity()
export class PetPostModel extends BaseEntity {

   @PrimaryGeneratedColumn('uuid')
   id: string

   @Column('uuid')
   user_id: string

   @Column('varchar', { length: 255, nullable: false })
   pet_name: string

   @Column('text')
   description: string

   @Column('varchar', { length: 255, nullable: true })
   img_url: string

   @Column('enum', { enum: PetPostStatus, default: PetPostStatus.pending })
   status: PetPostStatus

   @Column('boolean', { default: false })
   hasFounded: boolean

   @CreateDateColumn()
   created_at: Date

}