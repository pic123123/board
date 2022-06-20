import { PickType } from '@nestjs/mapped-types';
import { BoardEntity } from 'src/board/entities/board.entity';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
////////////////////////// Input 정의 ///////////////////

export class BoardWriteInput {
  @IsString({
    message: '게시글 제목은 String Type(문자열)로 입력해 주시기 바랍니다.',
  })
  @IsNotEmpty({ message: '게시글 제목을 입력해 주시기 바랍니다' })
  title: string;

  @IsString({
    message: '게시글 내용은 String Type(문자열)로 입력해 주시기 바랍니다.',
  })
  @IsNotEmpty({ message: '게시글 내용을 입력해 주시기 바랍니다' })
  content: string;

  @IsString({
    message: '작성자는 String Type(문자열)로 입력해 주시기 바랍니다.',
  })
  @IsNotEmpty({ message: '작성자를 입력해 주시기 바랍니다' })
  writer: string;

  @IsString({
    message: '비밀번호는 String Type(문자열)로 입력해 주시기 바랍니다.',
  })
  @IsNotEmpty({ message: '비밀번호를 입력해 주시기 바랍니다' })
  password: string;
}

export class BoardUpdateInput {
  @IsNumber(
    { allowNaN: false },
    { message: 'ID는 number(숫자)로 입력해 주시기 바랍니다.' },
  )
  @IsNotEmpty({
    message: '게시글 수정시 게시글 ID는 필수로 입력해 주시기 바랍니다.',
  })
  id: number;

  @IsString({
    message: '게시글 제목은 String Type(문자열)로 입력해 주시기 바랍니다.',
  })
  @IsOptional()
  title?: string;

  @IsString({
    message: '게시글 내용은 String Type(문자열)로 입력해 주시기 바랍니다.',
  })
  @IsOptional()
  content?: string;

  @IsString({
    message: '작성자는 String Type(문자열)로 입력해 주시기 바랍니다.',
  })
  @IsNotEmpty({ message: '작성자를 입력해 주시기 바랍니다' })
  writer: string;

  @IsString({
    message: '비밀번호는 String Type(문자열)로 입력해 주시기 바랍니다.',
  })
  @IsNotEmpty({ message: '비밀번호를 입력해 주시기 바랍니다' })
  password: string;
}

export class BoardDeleteInput extends BoardUpdateInput {}

enum searchType {
  WRITER = 'WRITER',
  TITLE = 'TITLE',
}
export class BoardSearchInput {
  /**
   * 검색타입 : 작성자 or 제목
   */
  @IsEnum(searchType, {
    message: "작성자('WRITER') or 제목('TITLE')로 검색해 주시기 바랍니다.",
  })
  @IsNotEmpty({
    message: '검색타입을 입력해 주시기 바랍니다. ',
  })
  searchType: searchType;

  /**
   * 검색키워드
   */
  @IsString({
    message: '검색 키워드는 String Type(문자열)로 입력해 주시기 바랍니다.',
  })
  @IsNotEmpty({
    message: '검색하고자 하는 키워드를 입력해 주시기 바랍니다. ',
  })
  searchValue: string;

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

export class BoardWriteOutput extends CoreOutput {
  /**
   * 게시물 등록 아이디
   */
  id?: number;
}

export class BoardUpdateOutput extends CoreOutput {}

export class BoardDeleteOutput extends CoreOutput {}

export class BoardSearchOutput extends CoreOutput {
  result?: [
    {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      title: string;
      content: string;
      writer: string;
    },
  ];
  count?: number;
}
