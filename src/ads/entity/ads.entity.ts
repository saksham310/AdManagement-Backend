import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Ad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  group: string; // e.g., "Apple", "Samsung"

  @Column()
  app: string; // e.g., "web", "mobile"

  @Column()
  page: string; // e.g., "CameraPrompt"

  @Column({ nullable: true })
  bannerUrl?: string;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @Column({ default: 0 })
  impressionCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
