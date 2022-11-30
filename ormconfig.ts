import 'dotenv/config';
import * as path from "path";
import { ModelEntity } from 'src/models/model.entity';
import { Item } from 'src/models/item/item.entity';
import { Application } from 'src/models/application/application.entity';
import { Account } from 'src/models/account/account.entity';
import { Connection } from 'src/models/account/connection/connection.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Discount } from 'src/models/item/discount/discount.entity';
import { Order } from 'src/models/account/order/order.entity';


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
        ModelEntity,
        Item,
        Discount,
        Application,
        Account,
        Order,
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
