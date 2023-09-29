import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { Product } from '../model/product.entity';
import { ProductService } from '../service/product.service';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Get()
  // getAll(): Promise<Product[]> {
  //   return this.productService.getAll();
  // }

  @Get()
  async getAll(
    @Query('page') page = 1, // Halaman yang diminta
    @Query('limit') limit = 10, // Jumlah item per halaman
    @Query('sort_field') sortField = 'product_name', // Kolom untuk pengurutan
    @Query('sort_order') sortOrder: 'asc' | 'desc' = 'asc', // Urutan pengurutan (ASC atau DESC)
    @Query('search') search: string, // Pencarian berdasarkan nama produk
  ): Promise<any> {
    const { data, meta } = await this.productService.getAll({
      page,
      limit,
      sortField,
      sortOrder,
      search,
    });

    return { data, meta };
  }

  @Post()
  create(@Body() data: Partial<Product>): Promise<Product> {
    return this.productService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<Product>,
  ): Promise<Product> {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }
}
