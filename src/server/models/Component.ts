import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";

import { LayoutSetting } from "./LayoutSetting";
import { Screen } from "./Screen";

@Entity("components")
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  type: string;

  @Column({ name: "screen_id", type: "int" })
  screenId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Screen, (screen) => screen.components, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "screen_id" })
  screen: Screen;

  @OneToOne(() => LayoutSetting, (layoutSetting) => layoutSetting.component, {
    cascade: true,
    onDelete: "CASCADE",
  })
  layoutSetting: LayoutSetting;
}
