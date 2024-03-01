import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterCorporateDto } from './dto/register-corporate.dto';
import { Role } from './enums/rol.enum';
import { RequestWithUser } from './interfaces/request.interface';
import { Auth } from './decorators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }

  @Post('register-corporate')
  registerCorporate(@Body() registerDto: RegisterCorporateDto) {
    return this.authService.registerCorporate(registerDto);
  }

  @Get('profile')
  @Auth(Role.CORPORATE)
  profile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  faceboookLogin() {
    return HttpStatus.OK;
  }
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request, @Res() res: Response) {
    return this.authService.registerFace(req, res);
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return HttpStatus.OK;
  }

  @Get('google/google-callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return this.authService.registerGoogle(req, res);
  }
}
