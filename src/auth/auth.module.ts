import { jwtStrategy } from './strategies/jwt.strategy';
import { getJWTconfig } from './../config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModel } from './user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
         schemaOptions: {
          collection: 'UserModel'
        }
      }
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: getJWTconfig
    }),
    PassportModule
  ],
  providers: [AuthService,jwtStrategy]
})
export class AuthModule {}
