import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { LayoutSetting } from "./LayoutSetting";

@Entity("borders")
export class Border {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => LayoutSetting, (layoutSetting) => layoutSetting.border)
  @JoinColumn({ name: "layout_setting_id" })
  layoutSetting: LayoutSetting;
}
