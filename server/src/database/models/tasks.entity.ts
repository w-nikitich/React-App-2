import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Tasks extends Model {
  @Column
  name: string;

  @Column
  listId: number;

  @Column
  status: string;

  @Column
  date: string;

  @Column
  priority: string;

  @Column
  description: string;
}
