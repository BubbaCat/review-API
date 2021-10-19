import { ProductService } from './product.service';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';
import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
	constructor(private readonly productService:ProductService){}

	@Post('create')
	async create(@Body() dto: CreateProductDto){
		return this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id') id: string){
		const product = await this.productService.findById(id);
		if(product === null){
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		
		return product;
	}

	@Patch(':id')
	async patch(@Param('id') id:string,@Body() dto:ProductModel){
		const updatedProduct = await this.productService.updateById(id,dto);
		if(updatedProduct === null){
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return updatedProduct;
	}
	
	@Delete(':id')
	async delete(@Param('id') id:string){
		const deletedProduct = await this.productService.deleteById(id);
		if(deletedProduct === null){
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return deletedProduct;
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto:FindProductDto){
		return this.productService.findWithReviews(dto);
	}
}
