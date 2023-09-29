
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Companies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_name: string;

}
  