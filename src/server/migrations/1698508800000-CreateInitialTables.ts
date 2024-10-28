import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { MeasurementUnit } from "../models/MeasurementUnit";

export class CreateInitialTables1698508800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create screens table
    await queryRunner.createTable(
      new Table({
        name: "screens",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Create components table
    await queryRunner.createTable(
      new Table({
        name: "components",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "type",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
          {
            name: "screen_id",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Create layout_settings table
    await queryRunner.createTable(
      new Table({
        name: "layout_settings",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "component_id",
            type: "int",
            isUnique: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Create borders table
    await queryRunner.createTable(
      new Table({
        name: "borders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "layout_setting_id",
            type: "int",
            isUnique: true,
          },
        ],
      }),
      true
    );

    // Create layouts table
    await queryRunner.createTable(
      new Table({
        name: "layouts",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "layout_setting_id",
            type: "int",
            isUnique: true,
          },
        ],
      }),
      true
    );

    // Create effects table
    await queryRunner.createTable(
      new Table({
        name: "effects",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "layout_setting_id",
            type: "int",
            isUnique: true,
          },
        ],
      }),
      true
    );

    // Create positions table
    await queryRunner.createTable(
      new Table({
        name: "positions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "layout_setting_id",
            type: "int",
            isUnique: true,
          },
        ],
      }),
      true
    );

    // Create margin_paddings table
    await queryRunner.createTable(
      new Table({
        name: "margin_paddings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "layout_setting_id",
            type: "int",
            isUnique: true,
          },
          {
            name: "margin_left_value",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "margin_left_unit",
            type: "enum",
            enum: Object.values(MeasurementUnit),
            isNullable: true,
          },
          {
            name: "margin_right_value",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "margin_right_unit",
            type: "enum",
            enum: Object.values(MeasurementUnit),
            isNullable: true,
          },
          {
            name: "margin_top_value",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "margin_top_unit",
            type: "enum",
            enum: Object.values(MeasurementUnit),
            isNullable: true,
          },
          {
            name: "margin_bottom_value",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "margin_bottom_unit",
            type: "enum",
            enum: Object.values(MeasurementUnit),
            isNullable: true,
          },
          {
            name: "padding_left_value",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "padding_left_unit",
            type: "enum",
            enum: Object.values(MeasurementUnit),
            isNullable: true,
          },
          {
            name: "padding_right_value",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "padding_right_unit",
            type: "enum",
            enum: Object.values(MeasurementUnit),
            isNullable: true,
          },
          {
            name: "padding_top_value",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "padding_top_unit",
            type: "enum",
            enum: Object.values(MeasurementUnit),
            isNullable: true,
          },
          {
            name: "padding_bottom_value",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "padding_bottom_unit",
            type: "enum",
            enum: Object.values(MeasurementUnit),
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Add foreign key constraints
    await queryRunner.createForeignKey(
      "components",
      new TableForeignKey({
        columnNames: ["screen_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "screens",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "layout_settings",
      new TableForeignKey({
        columnNames: ["component_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "components",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "borders",
      new TableForeignKey({
        columnNames: ["layout_setting_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "layout_settings",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "layouts",
      new TableForeignKey({
        columnNames: ["layout_setting_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "layout_settings",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "effects",
      new TableForeignKey({
        columnNames: ["layout_setting_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "layout_settings",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "positions",
      new TableForeignKey({
        columnNames: ["layout_setting_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "layout_settings",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "margin_paddings",
      new TableForeignKey({
        columnNames: ["layout_setting_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "layout_settings",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order to avoid foreign key constraints
    await queryRunner.dropTable("margin_paddings");
    await queryRunner.dropTable("positions");
    await queryRunner.dropTable("effects");
    await queryRunner.dropTable("layouts");
    await queryRunner.dropTable("borders");
    await queryRunner.dropTable("layout_settings");
    await queryRunner.dropTable("components");
    await queryRunner.dropTable("screens");
  }
}
