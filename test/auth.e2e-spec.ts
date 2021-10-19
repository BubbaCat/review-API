import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { createReviewDto } from '../src/review/dto/create-review.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { access } from 'fs';
import { PassportStrategy } from '@nestjs/passport';

const loginDto: AuthDto = {
	login:"2@mail.ru",
	password:"lul"
};

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

	});

	it('/auth/login (POST) - succes', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({body}:request.Response)=>{
				const access_token = body.access_token;
				expect(access_token).toBeDefined();
			});
		});

	it('/auth/login (POST) password - fail', async () => {
	return request(app.getHttpServer())
		.post('/auth/login')
		.send({...loginDto,password:"ls"})
		.expect(401,{
			"statusCode":401,
			"message":"Неверный пароль",
			"error": "Unauthorized"
		})
	});
	
	it('/auth/login (POST) email - fail', async () => {
	return request(app.getHttpServer())
		.post('/auth/login')
		.send({...loginDto, login:"ls"})
		.expect(401,{
			"statusCode":401,
			"message":"Пользователь не был найден",
			"error": "Unauthorized"
		})
	});

	afterAll(()=>{
		disconnect();
	})

}); 
