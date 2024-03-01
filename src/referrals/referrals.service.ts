import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Referral } from './schemas/referrals.shema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class ReferralsService {
  constructor(
    @InjectModel(Referral.name) private referralModel: Model<Referral>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getRefLink(req: Request, id: string) {
    const refLinkGet = await this.referralModel.findOne({ userId: id });
    if (!refLinkGet) {
      throw new NotFoundException('Este usuario no tiene link de referido');
    }
    return {
      refLink: `/register?reflink=${refLinkGet.referralsLink}`,
    };
  }
  async generateReferralLink(req: Request, id: string) {
    const userExist = await this.userModel.findById(id);

    if (!userExist) {
      throw new NotFoundException('El usuario no existe');
    }

    if (!userExist.referralLinkActivate) {
      throw new NotFoundException(
        'el usuario no puede generar Link de Referidos',
      );
    }
    const referralExist = await this.referralModel.findOne({ userId: id });
    if (referralExist) {
      throw new NotFoundException(' El usuario ya tiene link de referido');
    }
    const referralSave = new this.referralModel({
      userId: id,
      referralsLink: uuidv4(),
    });
    await referralSave.save();
    return {
      message: 'Link de referidos creado correctamente',
      refLink: `/register?reflink=${referralSave.referralsLink}`,
    };
  }
}
