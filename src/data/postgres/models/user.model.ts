
/**
    Table User {
        id uuid [pk]
        name varchar(255) [not null]
        email varchar(255) [not null]
        password varchar(255) [not null]
        rol Rol
        status boolean [not null, default: true]
        created_at timestamp [default: 'now()', not null]
    }
*/

import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Rol {
    user = 'user',
    admin = 'admin'
}

/**
 * This class represent a database entity
 * 
 * in your ./tool.service.ts
 * @example
 * ```
 * const userAdmin = await UserModel.find({where: { rol: admin } })
 * -------------------------------------
 * const userToUpdate = new UserModel();
 * 
 * userToUpdate.name = options.name;
 * 
 * userToUpdate.save();
 * ```
 */

@Entity()
export class UserModel extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {length: 255, nullable: false})
    name: string;

    @Column('varchar', {length: 255, nullable: false})
    email: string;

    @Column('varchar', {length: 255, nullable: false})
    password: string;

    @Column('enum', {enum: Rol, default: Rol.user})
    rol: Rol;

    @Column('boolean', {default: true})
    status: boolean;

    @CreateDateColumn()
    created_at: Date;
    
}