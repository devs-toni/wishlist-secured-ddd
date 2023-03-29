export interface ParametersConfig {
  application: { PORT?: number; URL: string };
  database: { URL: string };
}

export interface Configuration {
  dev: ParametersConfig;
  deploy: ParametersConfig;
}

export type env = "dev" | "deploy";
