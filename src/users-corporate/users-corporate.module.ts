import { Module } from '@nestjs/common';
import { UsersCorporateService } from './users-corporate.service';
import { UsersCorporateController } from './users-corporate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCorporateSchema } from './schemas/users-corporate.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserCorporate', schema: UserCorporateSchema },
    ]),
  ],
  providers: [UsersCorporateService],
  controllers: [UsersCorporateController],
  exports: [UsersCorporateService],
})
export class UsersCorporateModule {}
