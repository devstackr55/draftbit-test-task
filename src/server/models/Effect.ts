import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { LayoutSetting } from "./LayoutSetting";

@Entity("effects")
export class Effect {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => LayoutSetting, (layoutSetting) => layoutSetting.effect)
  @JoinColumn({ name: "layout_setting_id" })
  layoutSetting: LayoutSetting;
}
