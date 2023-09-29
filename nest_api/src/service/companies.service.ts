
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Companies } from '../model/companies.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
  ) {}

  async getAll(): Promise<Companies[]> {
    return this.companiesRepository.find();
  }

  async create(data: Partial<Companies>): Promise<Companies> {
    const companies = this.companiesRepository.create(data);
    return this.companiesRepository.save(companies);
  }

  async update(
    id: number,
    data: Partial<Companies>,
  ): Promise<Companies | undefined> {
    await this.companiesRepository.update(id, data);
    return this.companiesRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.companiesRepository.delete(id);
  }

  async findOneById(id: number): Promise<Companies | undefined> {
    return this.companiesRepository.findOneBy({ id });
  }
}
  