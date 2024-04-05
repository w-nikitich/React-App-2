import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Lists extends Model {
  @Column
  deskId: number;

  @Column
  name: string;

  @Column
  amount: number;
}
