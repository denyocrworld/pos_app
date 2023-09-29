import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './model/customer.entity';
import { CustomerService } from './service/customer.service';
import { Product } from './model/product.entity';
import { modelConfigs } from './config/model.config';
import { controllerConfigs } from './config/controller.config';
import { serviceConfigs } from './config/service.config';
import { dbConfigs } from './config/database.config';
import { ContohControllerController } from './controller/contoh-controller/contoh-controller.controller';

@Module({
  imports: [...dbConfigs],
  controllers: [AppController, ...controllerConfigs],
  providers: [AuthMiddleware, AppService, ...serviceConfigs],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes('api/products'); // Terapkan middleware untuk route '/customer'
    // consumer.apply(AuthMiddleware).forRoutes('api/product_categories'); // Terapkan middleware untuk route '/customer'
    // consumer.apply(AuthMiddleware).forRoutes('api/products'); // Terapkan middleware untuk route '/customer'
    // consumer.apply(AuthMiddleware).forRoutes('api/products'); // Terapkan middleware untuk route '/customer'
    // consumer.apply(AuthMiddleware).forRoutes('api/*'); // Terapkan middleware untuk route '/customer'
    // api/products
    // api/product_categories x
  }
}
