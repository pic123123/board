import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('keyword')
export class KeywordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', comment: '작성일시' })
  createdAt: Date;

  @Column({ comment: '키워드', type: 'varchar' })
  keyword: string;

  @Column({ comment: '작성자 이름', type: 'varchar' })
  writer: string;
}
