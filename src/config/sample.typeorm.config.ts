import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: '222222',
  port: 222222,
  username: '222222',
  password: '222222',
  database: '222222',
  autoLoadEntities: true,
  synchronize: true
}