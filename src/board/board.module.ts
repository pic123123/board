import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from 'src/board/board.controller';
import { BoardService } from 'src/board/board.service';
import { BoardEntity } from 'src/board/entities/board.entity';
import { CommentEntity } from 'src/board/entities/comment.entity';
import { KeywordEntity } from 'src/board/entities/keyword.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity, CommentEntity, KeywordEntity]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
