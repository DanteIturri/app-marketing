import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptsjs from 'bcryptjs';
import { CreateUserDto } from './dto';
import { CreateSocialDto } from './dto/create-social';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create({ name, email, password }: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel({
        name,
        email,
        password: await bcryptsjs.hash(password, 10),
        referralLinkActivate: false,
      });
      return await createdUser.save();
    } catch (error) {}
  }

  async createSocialMedia({ name, email, role }: CreateSocialDto) {
    try {
      const existUser = await this.userModel.findOne({ email: email });
      if (!existUser) {
        const createUserSocial = new this.userModel({
          name,
          email,
          role,
          referralLinkActivate: false,
        });
        if (!createUserSocial) {
          throw new BadRequestException('no se pudo crear al usuario error');
        }
        return await createUserSocial.save();
      }
      return existUser;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userModel
      .find()
      .populate({ path: 'products', select: '-userId -__v -posts -plans' })
      .populate({ path: 'plans', select: '-userId -productId -__v -posts' })
      .populate({ path: 'posts', select: '-userId -planId -productId -__v' });

    return users;
  }

  async getUser(email: string): Promise<User> {
    const user: User = await this.userModel
      .findOne({ email: email })
      .select('email name role posts')
      .populate({ path: 'posts', select: '-userId -planId -productId -__v' })
      .populate({ path: 'plans', select: '-userId -productId -__v -posts' })
      .populate({ path: 'products', select: '-userId -__v -posts -plans' });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user: User = await this.userModel.findOne({ email: email });
    return user;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new BadRequestException('User not deleted');
    }
    return { message: 'User deleted' };
  }
  async updateUser(id: string, updateUserDto: CreateUserDto) {
    const updatedUser: User = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) {
      throw new BadRequestException('User not updated');
    }
    return { message: 'User Update' };
  }
}
