import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig:PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password:'secret',
  database:'root',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
} 