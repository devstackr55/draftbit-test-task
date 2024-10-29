import api from "./api";

export interface SpacingConfig {
  paddingTopValue: string;
  paddingRightValue: string;
  paddingBottomValue: string;
  paddingLeftValue: string;
  marginTopValue: string;
  marginRightValue: string;
  marginBottomValue: string;
  marginLeftValue: string;
}

export const getSpacingConfig = async (): Promise<SpacingConfig> => {
  const response = await api.get<SpacingConfig>("/spacing-config");
  return response.data;
};

export const updateSpacingConfig = async (
  config: SpacingConfig
): Promise<SpacingConfig> => {
  const response = await api.put<SpacingConfig>("/spacing-config", config);
  return response.data;
};
