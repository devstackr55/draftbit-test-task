import api from "./api";

export interface SpacingConfig {
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
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
