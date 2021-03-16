import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product, ProductDocument } from '../schemas/products.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productsModule: Model<ProductDocument>,
  ) {}

  //   private products = [];

  async getAll(): Promise<Product[]> {
    return this.productsModule.find().exec();
  }

  async getById(id: string): Promise<Product> {
    return this.productsModule.findById(id);
  }

  async cerate(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productsModule(productDto);
    return newProduct.save();
  }

  async remove(id: string): Promise<Product> {
    return this.productsModule.findByIdAndRemove(id);
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productsModule.findByIdAndUpdate(id, productDto, { new: true });
  }
}
