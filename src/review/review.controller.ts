import { ReviewService } from './review.service';
import { createReviewDto } from './dto/create-review.dto';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { REVIEW_NOT_FOUND } from './review.constants';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService:ReviewService){}

	@Post('create')
	async create(@Body() dto: createReviewDto){
		return await this.reviewService.create(dto);
	}

	@Delete('id')
	async delete(@Param('id') id: string){
		const DeleteDoc = await this.reviewService.delete(id);
		if(DeleteDoc!==null){
			throw new HttpException(REVIEW_NOT_FOUND,HttpStatus.NOT_FOUND)
		}
	}


	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string){
		return this.reviewService.findByProductId(productId);
	}

}
