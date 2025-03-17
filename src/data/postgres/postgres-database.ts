import { DataSource } from "typeorm"

import { PetPostModel, UserModel } from "../"

/**
 * Interface that defines the options for starting the database.
 */

interface Options {
    host: string,
    port: number,
    username: string,
    password: string,
    database: string
}

/**
 * This class representing a database and all configs
 * 
 * @example
 * ```
 * import { PostgreDataBase } from './postgre-dadtabase.ts';
 * 
 * const DataBase = new PostgreDataBase({
 *  host: envs.HOST,
    database: envs.DATABASE,
    username: envs.USER,
    password: envs.PASSWORD,
    port: envs.PORT,
 * });
 * ```
 */

export class PostgreDataBase {


    public dataSource: DataSource

    constructor(options: Options) {

        this.dataSource = new DataSource({
            type: 'postgres',
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            entities: [PetPostModel, UserModel],
            synchronize: true,
            ssl: {
                rejectUnauthorized: false,
            }
        })

    }

    /**
     * Async function to inizialize the connection with database.
     * 
     * @example
     * ```
     * DataBase = new PostgreDataBase({ config... });
     * 
     * await DataBase.connect();
     * ```
     */

    async connect() {

        try {
            await this.dataSource.initialize()
            console.log('Se conecto a la base de datos 🙂')
        } catch (error) {
            console.error(error)
        }

    }

}