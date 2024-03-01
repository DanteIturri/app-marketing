import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { Request } from 'express';

@Controller('referrals')
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Get('link/:id')
  getLink(@Req() req: Request, @Param('id') id: string) {
    console.log(id);
    return this.referralsService.getRefLink(req, id);
  }
  @Post('generate/:id')
  generateReferralLink(@Req() req: Request, @Param('id') id: string) {
    return this.referralsService.generateReferralLink(req, id);
  }
}
