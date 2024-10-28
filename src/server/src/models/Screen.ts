// src/entities/Screen.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("screen") // Specify the table name as 'screen'
export class Screen extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier for the screen

  @Column({ type: "varchar", length: 255 })
  name: string; // Name of the screen

  @Column({ nullable: true, type: "varchar", length: 255 })
  description: string; // Optional description for the screen

  @Column({ nullable: true, type: "int" })
  width: number; // Optional width of the screen

  @Column({ nullable: true, type: "int" })
  height: number; // Optional height of the screen

  @Column({ nullable: true, type: "varchar", length: 255 })
  layout: string; // Optional layout type for the screen (e.g., 'grid', 'flex')

  // Add any additional fields you need here
}
