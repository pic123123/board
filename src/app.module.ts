import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Joi from 'joi';
import { BoardEntity } from 'src/board/entities/board.entity';
import { CommentEntity } from 'src/board/entities/comment.entity';
import { KeywordEntity } from 'src/board/entities/keyword.entity';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
      validationSchema: Joi.object({
        SALT: Joi.string().required(),
        JOKER_DB_HOST: Joi.string().required(),
        JOKER_DB_USERNAME: Joi.string().required(),
        JOKER_DB_PASSWORD: Joi.string().required(),
        JOKER_DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.JOKER_DB_HOST,
      port: 3306,
      username: process.env.JOKER_DB_USERNAME,
      password: process.env.JOKER_DB_PASSWORD,
      database: process.env.JOKER_DB_DATABASE,
      entities: [BoardEntity, CommentEntity, KeywordEntity],
      synchronize: false,
      logging: true,
    }),
    BoardModule,
  ],
})
export class AppModule {}
