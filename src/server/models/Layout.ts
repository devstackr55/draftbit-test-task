import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { LayoutSetting } from "./LayoutSetting";

@Entity("layouts")
export class Layout {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => LayoutSetting, (layoutSetting) => layoutSetting.layout)
  @JoinColumn({ name: "layout_setting_id" })
  layoutSetting: LayoutSetting;
}
