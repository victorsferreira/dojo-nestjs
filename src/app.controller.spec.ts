import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

describe('AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('GET /shortn', () => {
    return request(app.getHttpServer())
      .get('/shortn?q=www.google.com.br')
      .expect(200)
      .expect(/http:\/\/localhost:3000\/.*/);
  });

  it('GET /shortn', () => {
    const currentApp = app.getHttpServer();
    return request(currentApp)
      .get('/shortn?q=www.google.com.br')
      .expect(200)
      .then((res) => {
        const url = res.text;
        const code = url.split('/shortn/')[1];
        
        return request(currentApp)
          .get(`/shortn/${code}`)
          .expect(200)
          .expect('www.google.com.br')
      })
  });

  afterAll(async () => {
    await app.close();
  });
});
