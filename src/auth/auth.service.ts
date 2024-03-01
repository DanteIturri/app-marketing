import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { UsersCorporateService } from 'src/users-corporate/users-corporate.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterCorporateDto } from './dto/register-corporate.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcryptsjs from 'bcryptjs';
import { Request, Response } from 'express';
import { UserFace } from './interfaces/user.interface';
import { RegisterSocialDto } from './dto/register-social.dto';
import { EmailService } from 'src/email/email.service';
import { randomBytes } from 'crypto';
import { EmailDto } from './dto/email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly usersCorporateService: UsersCorporateService,
    private readonly emailService: EmailService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('El usuario ya existe con el email');
    }

    await this.usersService.create({
      name,
      email,
      password,
      role: 'user',
    });
    const userlogin: LoginDto = {
      email,
      password,
      role: 'user',
    };
    const returnLogin = await this.login(userlogin);
    const code = randomBytes(6).toString('hex');
    const userRegistrado = await this.usersService.findOneByEmail(email);
    const payload = { sub: userRegistrado.email, code };
    const codeEncoded = await this.jwtService.signAsync(payload, {
      // expiresIn: 5,
      expiresIn: '1h',
    });
    this.emailService.sendEmail({
      sendTo: userRegistrado.email,
      title: 'Recuperar contraseña',
      template: 'welcome',
    });
    return {
      message: 'Usuario creado correctamente',
      user: returnLogin.email,
      token: returnLogin.accessToken,
    };
  }

  async registerCorporate({
    name,
    email,
    password,
    organisation,
  }: RegisterCorporateDto) {
    const user = await this.usersCorporateService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('El usuario ya existe con el email');
    }

    await this.usersCorporateService.create({
      name,
      email,
      password,
      role: 'corporate',
      organisation,
    });

    const userlogin: LoginDto = {
      email,
      password,
      role: 'corporate',
    };
    const returnLogin = await this.login(userlogin);

    return {
      message: 'Usuario creado correctamente',
      user: returnLogin.email,
      token: returnLogin.accessToken,
    };
  }

  async registerFace(req: Request, res: Response) {
    const user = req.user as UserFace;
    const userFace = new RegisterSocialDto();

    userFace.name = user.email;
    userFace.email = user.firstName;
    userFace.role = 'user';

    this.usersService.createSocialMedia(userFace);

    const payload = {
      email: user.email,
      role: 'user',
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return res.redirect(`${process.env.HOST_FRONT}?token=${accessToken}`);
    // return 'red facebook';
  }

  async registerGoogle(req: Request, res: Response) {
    const user = req.user as UserFace;
    const userFace = new RegisterSocialDto();

    userFace.name = user.email;
    userFace.email = user.firstName;
    userFace.role = 'user';

    this.usersService.createSocialMedia(userFace);

    const payload = {
      email: user.email,
      role: 'user',
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return res.redirect(
      `${process.env.HOST_FRONT}/auth/signin?token=${accessToken}`,
    );
    // return 'red google';
  }

  async login({ email, password, role }: LoginDto) {
    let user: LoginDto;

    if (role === 'corporate') {
      user = await this.usersCorporateService.findOneByEmail(email);
    } else {
      user = await this.usersService.findOneByEmail(email);
    }

    if (!user) {
      throw new BadRequestException('El email no existe');
    }
    const isPasswordValid = await bcryptsjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña no es correcta');
    }

    const payload = {
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      email,
    };
  }
}
