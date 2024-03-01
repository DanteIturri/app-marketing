import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanDto } from './dto/plan.dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  getAllPlans() {
    return this.planService.findAll();
  }
  @Get(':id')
  getPlan(@Param('id') id: string) {
    return this.planService.getPlan(id);
  }
  @Post('create')
  createPlan(@Body() planDto: PlanDto) {
    return this.planService.create(planDto);
  }
  @Put(':id')
  updatePlan(@Param('id') id: string, @Body() planDto: PlanDto) {
    return this.planService.update(id, planDto);
  }

  @Delete(':id')
  deletePlan(@Param('id') id: string) {
    return this.planService.deletePlan(id);
  }
}
