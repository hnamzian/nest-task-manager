import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'taskmanager',
  username: 'postgres',
  password: 'docker',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true
}