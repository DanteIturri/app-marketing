import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersCorporateService } from './users-corporate.service';
import { CreateUsersCorporateDto } from './dto/create-users-corporate.dto';

@Controller('users-corporate')
export class UsersCorporateController {
  constructor(private readonly usersCorporateService: UsersCorporateService) {}

  @Get()
  findAll() {
    return this.usersCorporateService.findAll();
  }

  @Post('create')
  create(@Body() createUsersCorporateDto: CreateUsersCorporateDto) {
    return this.usersCorporateService.create(createUsersCorporateDto);
  }

  @Delete(':email')
  deleteUser(@Param('email') email: string) {
    return this.usersCorporateService.deleteUser(email);
  }

  @Put(':email')
  updateUser(
    @Param('email') email: string,
    @Body() updateUserDto: CreateUsersCorporateDto,
  ) {
    return this.usersCorporateService.updateUser(email, updateUserDto);
  }
}
