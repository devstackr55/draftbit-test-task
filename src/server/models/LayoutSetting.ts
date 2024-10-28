import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Component } from "./Component";
import { Border } from "./Border";
import { Layout } from "./Layout";
import { Effect } from "./Effect";
import { MarginPadding } from "./MarginPadding";
import { Position } from "./Position";

@Entity("layout_settings")
export class LayoutSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => Component, (component) => component.layoutSetting)
  @JoinColumn({ name: "component_id" })
  component: Component;

  @OneToOne(() => Border, (border) => border.layoutSetting, {
    cascade: true,
    onDelete: "CASCADE",
  })
  border: Border;

  @OneToOne(() => Layout, (layout) => layout.layoutSetting, {
    cascade: true,
    onDelete: "CASCADE",
  })
  layout: Layout;

  @OneToOne(() => Effect, (effect) => effect.layoutSetting, {
    cascade: true,
    onDelete: "CASCADE",
  })
  effect: Effect;

  @OneToOne(
    () => MarginPadding,
    (marginPadding) => marginPadding.layoutSetting,
    {
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  marginPadding: MarginPadding;

  @OneToOne(() => Position, (position) => position.layoutSetting, {
    cascade: true,
    onDelete: "CASCADE",
  })
  position: Position;
}
