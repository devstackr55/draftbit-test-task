import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { LayoutSetting } from "./LayoutSetting";
import { MeasurementUnit } from "../constant/MeasurementUnit";

@Entity("margin_paddings")
export class MarginPadding {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Margin settings
  @Column({ name: "margin_left_value", type: "numeric", nullable: true })
  marginLeftValue: number;

  @Column({
    name: "margin_left_unit",
    type: "enum",
    enum: MeasurementUnit,
    nullable: true,
  })
  marginLeftUnit: MeasurementUnit;

  @Column({ name: "margin_right_value", type: "numeric", nullable: true })
  marginRightValue: number;

  @Column({
    name: "margin_right_unit",
    type: "enum",
    enum: MeasurementUnit,
    nullable: true,
  })
  marginRightUnit: MeasurementUnit;

  @Column({ name: "margin_top_value", type: "numeric", nullable: true })
  marginTopValue: number;

  @Column({
    name: "margin_top_unit",
    type: "enum",
    enum: MeasurementUnit,
    nullable: true,
  })
  marginTopUnit: MeasurementUnit;

  @Column({ name: "margin_bottom_value", type: "numeric", nullable: true })
  marginBottomValue: number;

  @Column({
    name: "margin_bottom_unit",
    type: "enum",
    enum: MeasurementUnit,
    nullable: true,
  })
  marginBottomUnit: MeasurementUnit;

  // Padding settings
  @Column({ name: "padding_left_value", type: "numeric", nullable: true })
  paddingLeftValue: number;

  @Column({
    name: "padding_left_unit",
    type: "enum",
    enum: MeasurementUnit,
    nullable: true,
  })
  paddingLeftUnit: MeasurementUnit;

  @Column({ name: "padding_right_value", type: "numeric", nullable: true })
  paddingRightValue: number;

  @Column({
    name: "padding_right_unit",
    type: "enum",
    enum: MeasurementUnit,
    nullable: true,
  })
  paddingRightUnit: MeasurementUnit;

  @Column({ name: "padding_top_value", type: "numeric", nullable: true })
  paddingTopValue: number;

  @Column({
    name: "padding_top_unit",
    type: "enum",
    enum: MeasurementUnit,
    nullable: true,
  })
  paddingTopUnit: MeasurementUnit;

  @Column({ name: "padding_bottom_value", type: "numeric", nullable: true })
  paddingBottomValue: number;

  @Column({
    name: "padding_bottom_unit",
    type: "enum",
    enum: MeasurementUnit,
    nullable: true,
  })
  paddingBottomUnit: MeasurementUnit;

  @OneToOne(() => LayoutSetting, (layoutSetting) => layoutSetting.marginPadding)
  @JoinColumn({ name: "layout_setting_id" })
  layoutSetting: LayoutSetting;
}
