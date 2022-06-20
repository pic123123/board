import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Crypto from 'crypto';
import { Repository, Like } from 'typeorm';

import {
  BoardDeleteInput,
  BoardSearchInput,
  BoardSearchOutput,
  BoardUpdateInput,
  BoardUpdateOutput,
  BoardWriteInput,
  BoardWriteOutput,
} from 'src/board/dtos/board.dto';
import { BoardEntity } from 'src/board/entities/board.entity';
import { hashPassword } from 'src/common/common.function';
import {
  CommentSearchInput,
  CommentSearchOutput,
  CommentWriteInput,
  CommentWriteOutput,
} from 'src/board/dtos/comment.dto';
import { CommentEntity } from 'src/board/entities/comment.entity';
import { KeywordEntity } from 'src/board/entities/keyword.entity';
import { IKeywordAlertList } from 'src/board/interfaces/keyword.interface';
import { keywordInput, keywordOutput } from 'src/board/dtos/keyword.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(KeywordEntity)
    private readonly keywordRepository: Repository<KeywordEntity>,
  ) {}
  /**
   * 게시글 작성
   */
  async boardWrite({
    writer,
    title,
    content,
    password,
  }: BoardWriteInput): Promise<BoardWriteOutput> {
    try {
      //작성자+제목+내용이 똑같은건 도배글이라고 판단, 등록안함
      const existsBoard = await this.boardRepository.findOne({
        where: {
          writer,
          title,
          content,
        },
      });
      if (existsBoard) {
        return {
          success: false,
          message: '동일한 게시물은 작성 할 수 없습니다.',
        };
      }

      const board = new BoardEntity();
      board.writer = writer;
      board.title = title;
      board.content = content;
      board.password = hashPassword(password);

      const boardInfo = await this.boardRepository.save(board);
      await this.keywordAlert({ title, content });
      return { success: true, id: boardInfo.id };
    } catch (e) {
      console.log(e);
      return { success: false, message: '게시글 등록에 실패하였습니다.' };
    }
  }

  /**
   * 댓글 작성
   */
  async commentWrite({
    boardId,
    commentId,
    writer,
    content,
  }: CommentWriteInput): Promise<CommentWriteOutput> {
    try {
      //게시판아이디+작성자+내용이 똑같은건 도배댓글이라고 판단, 등록안함
      const existsComment = await this.commentRepository.findOne({
        where: {
          boardId,
          writer,
          content,
        },
      });
      if (existsComment) {
        return {
          success: false,
          message: '동일한 댓글은 작성 할 수 없습니다.',
        };
      }
      // 댓글 아이디가 있으면 대댓글이다
      if (commentId) {
        const comment = new CommentEntity();
        comment.boardId = boardId;
        comment.writer = writer;
        comment.parentId = commentId;
        comment.content = content;
        const commentInfo = await this.commentRepository.save(comment);
        await this.keywordAlert({ content });
        return { success: true, id: commentInfo.id };
      }

      const comment = new CommentEntity();
      comment.boardId = boardId;
      comment.writer = writer;
      comment.content = content;
      const commentInfo = await this.commentRepository.save(comment);

      return { success: true, id: commentInfo.id };
    } catch (e) {
      console.log(e);
      return { success: false, message: '게시글 등록에 실패하였습니다.' };
    }
  }

  /**
   * 게시글 수정
   */
  async boardUpdate({
    id,
    writer,
    title,
    content,
    password,
  }: BoardUpdateInput): Promise<BoardUpdateOutput> {
    try {
      //게시글 ID가 있는지 검수
      const board = await this.boardRepository.findOne({
        where: {
          id,
        },
      });

      if (!board) {
        return {
          success: false,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      //작성자가 입력한 게시글인지 확인
      if (board.writer !== writer) {
        return {
          success: false,
          message: '게시판 글을 작성한 사람만 글을 삭제 할 수 있습니다.',
        };
      }

      //저장된 게시글의 비밀번호화 입력받은 비밀번호가 다를경우 에러처리
      if (board.password !== hashPassword(password)) {
        return {
          success: false,
          message: '게시글의 비밀번호가 일치하지 않습니다.',
        };
      }

      board.writer = writer;
      board.title = title;
      board.content = content;
      board.password = hashPassword(password);

      await this.keywordAlert({ title, content });
      await this.boardRepository.save(board);

      return { success: true };
    } catch (e) {
      console.log(e);
      return { success: false, message: '게시글 수정에 실패하였습니다.' };
    }
  }

  /**
   * 게시글 삭제
   */
  async boardDelete({
    id,
    password,
    writer,
  }: BoardDeleteInput): Promise<BoardWriteOutput> {
    try {
      //게시글 ID + password가 동일할 경우만 삭제해줄것
      const board = await this.boardRepository.findOne({
        where: {
          id,
        },
      });
      if (!board) {
        return {
          success: false,
          message: '게시글이 존재하지 않습니다.',
        };
      }

      //작성자가 입력한 게시글인지 확인
      if (board.writer !== writer) {
        return {
          success: false,
          message: '게시판 글을 작성한 사람만 글을 삭제 할 수 있습니다.',
        };
      }

      //저장된 게시글의 비밀번호화 입력받은 비밀번호가 다를경우 에러처리
      if (board.password !== hashPassword(password)) {
        return {
          success: false,
          message: '게시글의 비밀번호가 일치하지 않습니다.',
        };
      }

      await this.boardRepository.delete(id);
      return {
        success: true,
      };
    } catch (e) {
      console.log(e);
      return { success: false, message: '게시글 삭제에 실패하였습니다.' };
    }
  }

  /**
   * 게시글 검색
   */
  async boardSearch({
    searchType,
    searchValue,
    nowPage,
    viewCount,
  }: BoardSearchInput): Promise<BoardSearchOutput> {
    try {
      let searchResult;
      if (searchType === 'TITLE' || searchType === 'WRITER') {
        const limitStart = (parseInt(nowPage) - 1) * parseInt(viewCount);

        searchResult = await this.boardRepository.find({
          //배열로 where절 검색하면 or로 사용 할 수 있음
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            title: true,
            content: true,
            writer: true,
            password: false,
          },
          where: [
            { title: searchType === 'TITLE' ? Like(`%${searchValue}%`) : '' },
            { writer: searchType === 'WRITER' ? Like(`%${searchValue}%`) : '' },
          ],
          skip: limitStart,
          take: parseInt(viewCount),
        });
      } else {
        return { success: false, message: '게시글 검색에 실패하였습니다..(1)' };
      }

      return {
        success: true,
        result: searchResult,
        count: searchResult.length,
      };
    } catch (e) {
      console.log(e);
      return { success: false, message: '게시글 검색에 실패하였습니다.' };
    }
  }

  /**
   * 댓글 검색
   */
  async commentSearch({
    nowPage,
    viewCount,
  }: CommentSearchInput): Promise<CommentSearchOutput> {
    try {
      const limitStart = (parseInt(nowPage) - 1) * parseInt(viewCount);

      const CommentResult = await this.commentRepository.find({
        skip: limitStart,
        take: parseInt(viewCount),
      });
      console.log(CommentResult);
      return {
        success: true,
        result: CommentResult,
        count: CommentResult.length,
      };
    } catch (e) {
      console.log(e);
      return { success: false, message: '댓글 검색에 실패하였습니다.' };
    }
  }

  /**
   * 키워드 알림
   */
  async keywordAlert({ title, content }: keywordInput): Promise<keywordOutput> {
    try {
      const keywordResult = await this.keywordRepository.find();

      const keywordAlertList: IKeywordAlertList[] = [];
      keywordResult.map((one) => {
        if (title.includes(one.keyword) || content.includes(one.keyword)) {
          keywordAlertList.push({
            keyword: one.keyword,
            writer: one.writer,
            title: title,
            content: content,
          });
        }
      });
      //등록된 게시글 제목,내용 및 댓글이 등록된 키워드를 모두 조회해서 배열에 담은값, 이걸 가지고 알림 기능 구현해야함
      console.log(keywordAlertList);
      return { success: true };
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  }
}
