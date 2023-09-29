import { TypeOrmModule } from '@nestjs/typeorm';
import { modelConfigs } from './model.config';

export const dbConfigs = [
  TypeOrmModule.forRoot({
    type: 'mysql', // Ganti dengan tipe database yang sesuai
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest_db',
    entities: modelConfigs,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(modelConfigs),
];
