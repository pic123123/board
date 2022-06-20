import { PickType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CommentEntity } from 'src/board/entities/comment.entity';
////////////////////////// Input 정의 ///////////////////

export class CommentWriteInput {
  @IsNumber(
    { allowNaN: false },
    {
      message: '게시글 아이디는 Number Type(숫자)로 입력해 주시기 바랍니다.',
    },
  )
  @IsNotEmpty({ message: '게시글 아이디를 입력해 주시기 바랍니다' })
  boardId: number;

  @IsNumber(
    { allowNaN: false },
    {
      message: '댓글 아이디는 Number Type(숫자)로 입력해 주시기 바랍니다.',
    },
  )
  @IsOptional()
  commentId?: number;

  @IsString({
    message: '댓글 내용은 String Type(문자열)로 입력해 주시기 바랍니다.',
  })
  @IsNotEmpty({ message: '댓글 내용을 입력해 주시기 바랍니다' })
  content: string;

  @IsString({
    message: '작성자는 String Type(문자열)로 입력해 주시기 바랍니다.',
  })
  @IsNotEmpty({ message: '작성자를 입력해 주시기 바랍니다' })
  writer: string;
}

export class CommentSearchInput {
  /**
   * 현재 페이지
   */
  nowPage: string;

  /**
   * 현재 페이지에서 총 보여줄 게시물 갯수
   */

  viewCount: string;
}
////////////////////////// Output 정의 ///////////////////

class CoreOutput {
  /**
   * 성공여부
   */
  success: boolean;

  /**
   * 메시지나 에러 내용
   */
  message?: string;
}

export class CommentWriteOutput extends CoreOutput {
  /**
   * 게시물 등록 아이디
   */
  id?: number;
}

export class CommentSearchOutput extends CoreOutput {
  result?: CommentEntity[];
  count?: number;
}

// export class CommentSearchOutput extends PickType(CommentEntity, [
//   'id' | 'createdAt' | 'content' | 'writer' | 'boardId',
// ]) {}

// export class CommentSearchOutput extends CoreOutput {
//   result?: [
//     {
//       id: number;
//       createdAt: Date;
//       content: string;
//       writer: string;
//     },
//   ];
//   count?: number;
// }
