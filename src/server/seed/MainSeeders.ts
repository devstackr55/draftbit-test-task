import { define, Factory, Seeder } from "typeorm-seeding";
import { Screen } from "../models/Screen";
import { Component } from "../models/Component";
import { Border } from "../models/Border";
import { LayoutSetting } from "../models/LayoutSetting";
import { Layout } from "../models/Layout";
import { Effect } from "../models/Effect";
import { Position } from "../models/Position";
import { MarginPadding } from "../models/MarginPadding";
import { MeasurementUnit } from "../constant/MeasurementUnit";
import { DataSource } from "typeorm";

export default class CreateInitialData implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    const screens = await dataSource.manager.save(Screen, [
      { name: "Home Screen" },
      { name: "Profile Screen" },
      { name: "Settings Screen" },
      { name: "Dashboard Screen" },
    ]);
    const screenIds = screens.map((screen) => screen.id);

    const componentTypes = ["button", "input", "text", "image", "container"];

    for (const screenId of screenIds) {
      const components = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Component)
        .values(
          Array(3)
            .fill(null)
            .map((_, index) => ({
              name: `Component ${index + 1}`,
              type: componentTypes[
                Math.floor(Math.random() * componentTypes.length)
              ],
              screenId: screenId,
            }))
        )
        .execute();

      for (const component of components.identifiers) {
        const layoutSetting = await dataSource
          .createQueryBuilder()
          .insert()
          .into(LayoutSetting)
          .values({
            component: component.id,
          })
          .execute();

        const layoutSettingId = layoutSetting.identifiers[0].id;

        await dataSource
          .createQueryBuilder()
          .insert()
          .into(Border)
          .values({
            layoutSetting: layoutSettingId,
          })
          .execute();

        await dataSource
          .createQueryBuilder()
          .insert()
          .into(Layout)
          .values({
            layoutSetting: layoutSettingId,
          })
          .execute();

        await dataSource
          .createQueryBuilder()
          .insert()
          .into(Effect)
          .values({
            layoutSetting: layoutSettingId,
          })
          .execute();

        await dataSource
          .createQueryBuilder()
          .insert()
          .into(Position)
          .values({
            layoutSetting: layoutSettingId,
          })
          .execute();

        await dataSource
          .createQueryBuilder()
          .insert()
          .into(MarginPadding)
          .values({
            layoutSetting: layoutSettingId,
            marginLeftValue: Math.floor(Math.random() * 20),
            marginLeftUnit: MeasurementUnit.PX,
            marginRightValue: Math.floor(Math.random() * 20),
            marginRightUnit: MeasurementUnit.PX,
            marginTopValue: Math.floor(Math.random() * 20),
            marginTopUnit: MeasurementUnit.PX,
            marginBottomValue: Math.floor(Math.random() * 20),
            marginBottomUnit: MeasurementUnit.PX,
            paddingLeftValue: Math.floor(Math.random() * 20),
            paddingLeftUnit: MeasurementUnit.PX,
            paddingRightValue: Math.floor(Math.random() * 20),
            paddingRightUnit: MeasurementUnit.PX,
            paddingTopValue: Math.floor(Math.random() * 20),
            paddingTopUnit: MeasurementUnit.PX,
            paddingBottomValue: Math.floor(Math.random() * 20),
            paddingBottomUnit: MeasurementUnit.PX,
          })
          .execute();
      }
    }
  }
}

define(Screen, () => {
  const screen = new Screen();
  screen.name = "Dashboard Screen";
  return screen;
});

define(Component, () => {
  const component = new Component();
  component.name = "Text Input";
  component.type = "input";
  return component;
});

define(Component, () => {
  const component = new Component();
  component.name = "Image Container";
  component.type = "container";
  return component;
});
