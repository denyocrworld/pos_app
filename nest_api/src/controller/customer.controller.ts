
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Customer } from '../model/customer.entity';
import { CustomerService } from '../service/customer.service';

@Controller('api/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getAll(): Promise<Customer[]> {
    return this.customerService.getAll();
  }

  @Post()
  create(@Body() data: Partial<Customer>): Promise<Customer> {
    return this.customerService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Customer>): Promise<Customer> {
    return this.customerService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.customerService.delete(id);
  }
}