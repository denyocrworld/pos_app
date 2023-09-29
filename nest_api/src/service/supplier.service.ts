
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../model/supplier.entity';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async getAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }

  async create(data: Partial<Supplier>): Promise<Supplier> {
    const supplier = this.supplierRepository.create(data);
    return this.supplierRepository.save(supplier);
  }

  async update(
    id: number,
    data: Partial<Supplier>,
  ): Promise<Supplier | undefined> {
    await this.supplierRepository.update(id, data);
    return this.supplierRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.supplierRepository.delete(id);
  }

  async findOneById(id: number): Promise<Supplier | undefined> {
    return this.supplierRepository.findOneBy({ id });
  }
}
  