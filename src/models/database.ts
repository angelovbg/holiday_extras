import * as dotenv from 'dotenv';
import { Client, Pool } from 'pg';

dotenv.config({path: '.env'});

export class PostgresDb implements IDatabase {
    private pool: Pool;
    private static _instance: IDatabase;

    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT),
            max: parseInt(process.env.DB_POOL_MAX),
            idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT),
        });

        this.dbEvents();
    }

    /**
     *
     * @returns {IDatabase}
     * @constructor
     */
    public static Instance(): IDatabase {
        if (!PostgresDb._instance) {
            PostgresDb._instance = new PostgresDb();
        }

        return PostgresDb._instance;
    }

    /**
     *
     * @returns {Promise<T>}
     */
    public getClient(): Promise<any> {
        return new Promise((resolve) => {
            this.pool.connect()
                .then((client: any) => {
                    resolve(client);
                })
                .catch((err: any) => {
                    console.warn(err);
                    process.exit(1);
                });
        });
    }

    /**
     *
     */
    private dbEvents(): void {
        this.pool.on('connect', () => {
            // console.log('Established new pool connection');
        });

        this.pool.on('error', (err: Error) => {
            console.warn('Pool error', err);
        });

        this.pool.on('acquire', () => {
            // console.log('Client acquired to pool');
        });
    }
}