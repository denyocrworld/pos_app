
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Companies } from '../model/companies.entity';
import { CompaniesService } from '../service/companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getAll(): Promise<Companies[]> {
    return this.companiesService.getAll();
  }

  @Post()
  create(@Body() data: Partial<Companies>): Promise<Companies> {
    return this.companiesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Companies>): Promise<Companies> {
    return this.companiesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.companiesService.delete(id);
  }
}
  