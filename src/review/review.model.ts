import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface reviewModel extends Base{}

export class ReviewModel extends TimeStamps{
	@prop()
	name:string;

	@prop()
	titile:string;
	
	@prop()
	description:string;
	
	@prop()
	rating:number;

	@prop()
	prdocutId:Types.ObjectId;
}

