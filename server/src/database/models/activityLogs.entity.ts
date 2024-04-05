import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class ActivityLogs extends Model {
  @Column
  taskId: number;

  @Column
  listId: number;

  @Column
  taskName: string;

  @Column
  listName: string;

  @Column
  oldData: string;

  @Column
  newData: string;

  @Column
  type: string;
}
