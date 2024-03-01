import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { UsersCorporateModule } from 'src/users-corporate/users-corporate.module';
import { FacebookStrategy } from './strategys/facebook.strategy';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategys/google.strategy';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    UsersModule,
    UsersCorporateModule,
    EmailModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FacebookStrategy, GoogleStrategy],
})
export class AuthModule {}
