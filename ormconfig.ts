import 'dotenv/config';
import * as path from "path";
import { BaseEntity } from 'src/models/base.entity';
import { Product } from 'src/models/product/product.entity';
import { Application } from 'src/models/application/application.entity';
import { Account } from 'src/models/account/account.entity';
import { Connection } from 'src/models/connection/connection.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';


const config: Readonly<PostgresConnectionOptions> = {
    type: 'postgres',

    host: process.env.databaseHost,
    database: process.env.databaseName,
    username: process.env.databaseUsername,
    port: parseInt(process.env.databasePort),
    password: process.env.databasePassword,

    useUTC: false,
    logNotifications: true,
    applicationName: `score@${ process.env.hostname }`,
    migrations: [ path.join(__dirname, 'src/migration/*.ts') ],
    entities: [
        BaseEntity,
        Product,
        Application,
        Account,
        Connection
    ],

    ...(process.env.useSSL === ('true' || true) && {
        ssl: {
            rejectUnauthorized: false
        }
    }),

    synchronize: true
};

export default config;
