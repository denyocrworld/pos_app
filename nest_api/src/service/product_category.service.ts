
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '../model/product_category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private product_categoryRepository: Repository<ProductCategory>,
  ) {}

  async getAll(): Promise<ProductCategory[]> {
    return this.product_categoryRepository.find();
  }

  async create(data: Partial<ProductCategory>): Promise<ProductCategory> {
    const product_category = this.product_categoryRepository.create(data);
    return this.product_categoryRepository.save(product_category);
  }

  async update(
    id: number,
    data: Partial<ProductCategory>,
  ): Promise<ProductCategory | undefined> {
    await this.product_categoryRepository.update(id, data);
    return this.product_categoryRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.product_categoryRepository.delete(id);
  }

  async findOneById(id: number): Promise<ProductCategory | undefined> {
    return this.product_categoryRepository.findOneBy({ id });
  }
}
  