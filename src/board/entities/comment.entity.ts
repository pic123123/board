import { BoardEntity } from 'src/board/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'board_id' })
  boardId: number;

  @ManyToOne(() => BoardEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity;

  @Column({ nullable: true })
  parentId: number;

  // @ManyToOne(() => BoardEntity, (board) => board.id, {
  //   nullable: false,
  // })
  // @JoinColumn({ name: 'board_id' })
  // boardId: number;

  @CreateDateColumn({ name: 'created_at', comment: '작성일시' })
  createdAt: Date;

  @Column({ comment: '내용', type: 'varchar' })
  content: string;

  @Column({ comment: '작성자 이름', type: 'varchar' })
  writer: string;
}
