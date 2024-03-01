import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptsjs from 'bcryptjs';
import { CreateUsersCorporateDto } from './dto/create-users-corporate.dto';
import { UserCorporate } from './schemas/users-corporate.shema';
@Injectable()
export class UsersCorporateService {
  constructor(
    @InjectModel(UserCorporate.name) private userModel: Model<UserCorporate>,
  ) {}
  async findAll() {
    return await this.userModel.find().exec();
  }
  async create({
    name,
    email,
    password,
    organisation,
  }: CreateUsersCorporateDto) {
    try {
      const createdUserCorporate = new this.userModel({
        name,
        email,
        password: await bcryptsjs.hash(password, 10),
        organisation,
        role: 'corporate',
      });
      return await createdUserCorporate.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneByEmail(email: string): Promise<UserCorporate> {
    const userCorporate: UserCorporate = await this.userModel
      .findOne({ email: email })
      .exec();
    return userCorporate;
  }

  async deleteUser(email: string) {
    const deleteUser = await this.userModel.findOneAndDelete({ email }).exec();
    if (!deleteUser) {
      throw new BadRequestException('User not deleted');
    }
    return { message: 'User deleted', userDelete: deleteUser };
  }

  async updateUser(
    emailUpdate: string,
    { name, email, password, organisation, role }: CreateUsersCorporateDto,
  ) {
    const updateUser = await this.userModel
      .findOneAndUpdate(
        { emailUpdate },
        {
          name,
          email,
          password: await bcryptsjs.hash(password, 10),
          organisation,
          role,
        },
      )
      .exec();
    if (!updateUser) {
      throw new BadRequestException('User not updated');
    }
    const findUpdateUser = await this.userModel.findOne({ email }).exec();
    return { message: 'User updated', user: findUpdateUser };
  }
}
