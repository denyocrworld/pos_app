import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../model/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // async getAll(): Promise<Product[]> {
  //   return this.productRepository.find();
  // }

  async getAll(options: {
    page: number;
    limit: number;
    sortField: string;
    sortOrder: 'asc' | 'desc';
    search: string;
  }): Promise<{ data: Product[]; meta: any }> {
    const { page, limit, sortField, sortOrder, search } = options;

    const query = this.productRepository.createQueryBuilder('product');

    if (search) {
      query.where('product.product_name LIKE :search', {
        search: `%${search}%`,
      });
    }

    let sortQuery: 'ASC' | 'DESC' = sortOrder == 'asc' ? 'ASC' : 'DESC';
    query.orderBy(`product.${sortField}`, sortQuery);

    const [data, count] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(count / limit);

    const meta = {
      page: parseInt(page.toString()),
      limit: parseInt(limit.toString()),
      total_items: count,
      total_pages: totalPages,
    };

    return { data, meta };
  }

  async create(data: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    data: Partial<Product>,
  ): Promise<Product | undefined> {
    await this.productRepository.update(id, data);
    return this.productRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async findOneById(id: number): Promise<Product | undefined> {
    return this.productRepository.findOneBy({ id });
  }
}
