
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Supplier } from '../model/supplier.entity';
import { SupplierService } from '../service/supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  getAll(): Promise<Supplier[]> {
    return this.supplierService.getAll();
  }

  @Post()
  create(@Body() data: Partial<Supplier>): Promise<Supplier> {
    return this.supplierService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Supplier>): Promise<Supplier> {
    return this.supplierService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.supplierService.delete(id);
  }
}
  