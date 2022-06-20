import { PickType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CommentEntity } from 'src/board/entities/comment.entity';
////////////////////////// Input 정의 ///////////////////

export class keywordInput {
  title?: string;
  content: string;
}

export class keywordOutput {
  success: boolean;
}
