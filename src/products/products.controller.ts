import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  Redirect,
  HttpCode,
  HttpStatus,
  Header,
  Req,
  Res,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response, Request } from 'express';
import { ProductService } from './productService/product.service';
import { Product } from './schemas/products.schema';

//express
// app.use((req, res, next) => {
//   res.status(201).end('Poka');
// });

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}
  //   @Get()
  //   @Redirect(
  //     'https://www.google.com/search?q=dependency+injection+%D1%87%D1%82%D0%BE+%D1%8D%D1%82%D0%BE',
  //     301,
  //   )
  //   getAll(@Req() req: Request, @Res() res: Response): string {
  //     res.status(201).end('Poka');
  //     return 'getAll';
  //   }

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  oneGet(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.cerate(createProductDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }
  @Put(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }
}
