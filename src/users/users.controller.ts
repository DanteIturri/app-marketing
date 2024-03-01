import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  @UseGuards(AuthGuard)
  getUser(@Param('email') email: string) {
    return this.userService.getUser(email);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.userService.updateUser(id, body);
  }
}
