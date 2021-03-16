import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductService } from './productService/product.service';
import { Product, ProductSchema } from './schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductService],
  controllers: [ProductsController],
})
export class ProductsModule {}
