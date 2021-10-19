import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { request } from 'express';

export const UserEmail = createParamDecorator(
	(data:unknown,ctx:ExecutionContext)=>
	{	const request = ctx.switchToHttp().getRequest();
		return request.user;
	})