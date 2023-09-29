
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductCategory } from '../model/product_category.entity';
import { ProductCategoryService } from '../service/product_category.service';

@Controller('product_category')
export class ProductCategoryController {
  constructor(private readonly product_categoryService: ProductCategoryService) {}

  @Get()
  getAll(): Promise<ProductCategory[]> {
    return this.product_categoryService.getAll();
  }

  @Post()
  create(@Body() data: Partial<ProductCategory>): Promise<ProductCategory> {
    return this.product_categoryService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<ProductCategory>): Promise<ProductCategory> {
    return this.product_categoryService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.product_categoryService.delete(id);
  }
}
  