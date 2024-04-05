import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Desks extends Model {
  @Column
  name: string;

  @Column
  amount: number;
}
