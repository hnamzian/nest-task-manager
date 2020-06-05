import { TypeOrmModuleOptions } from '@nestjs/typeorm'
const path = require('path')

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'taskmanager',
  username: 'postgres',
  password: 'docker',
  entities: [path.join(__dirname, "/../**/*.entity.ts")],
  synchronize: true
}