import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { LayoutSetting } from "./LayoutSetting";

@Entity("positions")
export class Position {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => LayoutSetting, (layoutSetting) => layoutSetting.position)
  @JoinColumn({ name: "layout_setting_id" })
  layoutSetting: LayoutSetting;
}
