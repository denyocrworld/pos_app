import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, Repository, useContainer } from 'typeorm';
import { CustomerService } from './service/customer.service';
import { Customer } from './model/customer.entity';
import { AppModule } from './app.module'; // Ganti dengan jalur yang sesuai
import { modelConfigs } from './config/model.config';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: Repository<Customer>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
        // AppModule,
      ],
      providers: [CustomerService],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
  });

  describe('getAll', () => {
    it('should return an array of customers from the actual database', async () => {
      const response = await customerService.getAll();
      console.log(response);
    });
  });
});
