import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('Should login', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });
  it.todo('Should login');
});
