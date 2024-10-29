import { define, Factory, Seeder } from "typeorm-seeding";
import { Screen } from "../models/Screen";
import { Component } from "../models/Component";
import { Border } from "../models/Border";
import { LayoutSetting } from "../models/LayoutSetting";
import { Layout } from "../models/Layout";
import { Effect } from "../models/Effect";
import { Position } from "../models/Position";
import { MarginPadding } from "../models/MarginPadding";
import { MeasurementUnit } from "../models/MeasurementUnit";
import { DataSource } from "typeorm";

export default class CreateInitialData implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    // Create screens
    const screens = await dataSource.manager.save(Screen, [
      { name: "Home Screen" },
      { name: "Profile Screen" },
      { name: "Settings Screen" },
      { name: "Dashboard Screen" },
    ]);
    const screenIds = screens.map((screen) => screen.id);

    // Component types array for variation
    const componentTypes = ["button", "input", "text", "image", "container"];

    // Create components for each screen
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

      // Create layout settings and related entities for each component
      for (const component of components.identifiers) {
        // Create layout setting
        const layoutSetting = await dataSource
          .createQueryBuilder()
          .insert()
          .into(LayoutSetting)
          .values({
            component: component.id,
          })
          .execute();

        const layoutSettingId = layoutSetting.identifiers[0].id;

        // Create border
        await dataSource
          .createQueryBuilder()
          .insert()
          .into(Border)
          .values({
            layoutSetting: layoutSettingId,
          })
          .execute();

        // Create layout
        await dataSource
          .createQueryBuilder()
          .insert()
          .into(Layout)
          .values({
            layoutSetting: layoutSettingId,
          })
          .execute();

        // Create effect
        await dataSource
          .createQueryBuilder()
          .insert()
          .into(Effect)
          .values({
            layoutSetting: layoutSettingId,
          })
          .execute();

        // Create position
        await dataSource
          .createQueryBuilder()
          .insert()
          .into(Position)
          .values({
            layoutSetting: layoutSettingId,
          })
          .execute();

        // Create margin padding with random values
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
  screen.name = "Dashboard Screen"; // Another hardcoded name for the screen
  return screen;
});

// Define Component with hardcoded data
define(Component, () => {
  const component = new Component();
  component.name = "Text Input"; // Hardcoded name for the component
  component.type = "input"; // Another hardcoded type for the component
  return component;
});

// You can also add more components
define(Component, () => {
  const component = new Component();
  component.name = "Image Container"; // Hardcoded name
  component.type = "container"; // Hardcoded type
  return component;
});
