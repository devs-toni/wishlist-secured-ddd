export interface ParametersConfig {
  application: { PORT?: number; URL: string };
  database: { URL: string };
}

export interface ConfigurationI {
  development: ParametersConfig;
  deployment: ParametersConfig;
}

export type env = "development" | "deployment";
