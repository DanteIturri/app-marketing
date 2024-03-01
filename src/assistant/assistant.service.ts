import { Injectable } from '@nestjs/common';
import { AssistantDto } from './dto/assistant.dto';
import { OpenAI } from 'openai';

@Injectable()
export class AssistantService {
  async getAssistants({ question }: AssistantDto) {
    const apiKey = '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';
    const openai = new OpenAI({ apiKey });
    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Háblame sobre ${question} en el contexto del marketing digital.`,
    });
    return completion.choices[0].text.trim();
  }
}
