import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Supplier } from '../model/supplier.entity';
import { SupplierService } from '../service/supplier.service';

@Controller('api/samples')
export class SampleController {
  constructor() {}

  @Get()
  getAll(): any {
    return {
        "message" : "OKSz"
    };
  }
}
