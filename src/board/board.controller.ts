import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BoardService } from 'src/board/board.service';
import {
  BoardDeleteInput,
  BoardDeleteOutput,
  BoardSearchInput,
  BoardSearchOutput,
  BoardUpdateInput,
  BoardUpdateOutput,
  BoardWriteInput,
  BoardWriteOutput,
} from 'src/board/dtos/board.dto';
import {
  CommentSearchInput,
  CommentSearchOutput,
  CommentWriteInput,
  CommentWriteOutput,
} from 'src/board/dtos/comment.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /**
   * 게시글 작성 API
   */
  @Post('write')
  async boardWrite(@Body() body: BoardWriteInput): Promise<BoardWriteOutput> {
    return await this.boardService.boardWrite(body);
  }

  /**
   * 댓글 작성 API
   */
  @Post('comment-write')
  async commentWrite(
    @Body() body: CommentWriteInput,
  ): Promise<CommentWriteOutput> {
    return await this.boardService.commentWrite(body);
  }

  /**
   * 게시글 수정 API
   */
  @Post('update')
  async boardUpdate(
    @Body() body: BoardUpdateInput,
  ): Promise<BoardUpdateOutput> {
    return await this.boardService.boardUpdate(body);
  }

  /**
   * 게시글 삭세 API
   */
  @Post('delete')
  async boardDelete(
    @Body() body: BoardDeleteInput,
  ): Promise<BoardDeleteOutput> {
    return await this.boardService.boardDelete(body);
  }

  /**
   * 게시글 검색 API
   */
  @Get('search')
  async boardSearch(
    @Query() query: BoardSearchInput,
  ): Promise<BoardSearchOutput> {
    return await this.boardService.boardSearch(query);
  }

  /**
   * 댓글 검색 API
   */
  @Get('comment-search')
  async commentSearch(
    @Query() query: CommentSearchInput,
  ): Promise<CommentSearchOutput> {
    return await this.boardService.commentSearch(query);
  }
}
