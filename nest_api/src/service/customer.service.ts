import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../model/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async getAll(): Promise<Customer[]> {
    return this.customerRepository.find({ relations: ['product_category'] });
  }

  async create(data: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepository.create(data);
    return this.customerRepository.save(customer);
  }

  async update(
    id: number,
    data: Partial<Customer>,
  ): Promise<Customer | undefined> {
    await this.customerRepository.update(id, data);
    return this.customerRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }

  async findOneById(id: number): Promise<Customer | undefined> {
    return this.customerRepository.findOneBy({ id });
  }
}
