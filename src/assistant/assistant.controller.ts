import { Body, Controller, Post } from '@nestjs/common';

import { AssistantService } from './assistant.service';
import { AssistantDto } from './dto/assistant.dto';
@Controller('assistant')
export class AssistantController {
  constructor(private assistantService: AssistantService) {}
  @Post()
  getAssistants(@Body() assistantDto: AssistantDto) {
    return this.assistantService.getAssistants(assistantDto);
  }
}
