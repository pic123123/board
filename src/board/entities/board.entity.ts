import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', comment: '작성일시' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: '수정일시' })
  updatedAt: Date;

  @Column({ comment: '제목', type: 'varchar' })
  title: string;

  @Column({ comment: '내용', type: 'varchar' })
  content: string;

  @Column({ comment: '작성자 이름', type: 'varchar' })
  writer: string;

  @Column({ comment: '비밀번호', type: 'varchar' })
  password: string;
}
