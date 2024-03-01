import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PlanModule } from './plans/plan.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { AssistantController } from './assistant/assistant.controller';
import { AssistantService } from './assistant/assistant.service';
import { AssistantModule } from './assistant/assistant.module';
import { UsersCorporateModule } from './users-corporate/users-corporate.module';
import { ReferralsModule } from './referrals/referrals.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    UsersModule,
    ProductsModule,
    PlanModule,
    PostsModule,
    AuthModule,
    AssistantModule,
    UsersCorporateModule,
    ReferralsModule,
    EmailModule,
  ],
  controllers: [AppController, AssistantController],
  providers: [AppService, AssistantService],
})
export class AppModule {}
