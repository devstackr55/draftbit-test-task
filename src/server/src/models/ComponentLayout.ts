import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("layoutSetting") // This specifies the table name
export class ComponentLayout extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", unique: true })
  componentId: number;

  @Column({ nullable: true, type: "int" })
  marginTop: number;

  @Column({ nullable: true, type: "int" })
  marginBottom: number;

  @Column({ nullable: true, type: "int" })
  marginLeft: number;

  @Column({ nullable: true, type: "int" })
  marginRight: number;

  @Column({ nullable: true, type: "int" })
  paddingTop: number;

  @Column({ nullable: true, type: "int" })
  paddingBottom: number;

  @Column({ nullable: true, type: "int" })
  paddingLeft: number;

  @Column({ nullable: true, type: "int" })
  paddingRight: number;

  @Column({ nullable: true, type: "int" })
  width: number;

  @Column({ nullable: true, type: "int" })
  height: number;
}
