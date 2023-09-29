// src/model/user.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_name!: string;
}
