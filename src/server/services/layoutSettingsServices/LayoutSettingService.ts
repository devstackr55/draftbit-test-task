import { AppDataSource } from "../../data-source";

import { LayoutSetting } from "../../models/LayoutSetting";

import { ValidationError } from "../../utils/error";
import { mapErrorToErrorType } from "../../utils/helper";

interface LayoutSettingResponse {
  id: number;
  componentId: number | null;
  borderId: string | null;
  layoutId: string | null;
  effectId: string | null;
  marginPaddingId: string | null;
  positionId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

class LayoutSettingService {
  static async run(): Promise<[Error | null, LayoutSettingResponse | null]> {
    try {
      const entityManager = AppDataSource.manager;
      const layoutSettingsData = await entityManager.find(LayoutSetting, {
        relations: [
          "border",
          "layout",
          "effect",
          "marginPadding",
          "position",
          "component",
        ],
      });

      if (!layoutSettingsData || layoutSettingsData.length === 0) {
        throw new ValidationError("Layout settings not found");
      }

      const layoutSetting = layoutSettingsData[0];
      const formattedResponse: LayoutSettingResponse = {
        id: layoutSetting.id,
        componentId: layoutSetting.component?.id || null,
        borderId: layoutSetting.border?.id || null,
        layoutId: layoutSetting.layout?.id || null,
        effectId: layoutSetting.effect?.id || null,
        marginPaddingId: layoutSetting.marginPadding?.id || null,
        positionId: layoutSetting.position?.id || null,
        createdAt: layoutSetting.createdAt,
        updatedAt: layoutSetting.updatedAt,
      };

      return [null, formattedResponse];
    } catch (error: any) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default LayoutSettingService;
