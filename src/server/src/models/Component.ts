import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("components") // Specify the table name as 'components'
export class Component extends BaseEntity {
  @PrimaryGeneratedColumn()
  componentId: number; // Unique identifier for the component

  @Column({ type: "int" })
  screenId: number; // Foreign key to the screen associated with this component

  @Column({ type: "varchar", length: 255 })
  name: string; // Name of the component

  @Column({ nullable: true, type: "varchar", length: 255 })
  description: string; // Optional description of the component

  @CreateDateColumn()
  createdAt: Date; // Timestamp for when the component was created

  @UpdateDateColumn()
  updatedAt: Date; // Timestamp for when the component was last updated
}
