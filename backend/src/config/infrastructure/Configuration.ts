import { env, ConfigurationI, ParametersConfig } from "../domain";
require("dotenv").config();
const { NODE_MODE, PORT, DB_ADDRESS, DB_NAME, DB_PORT } = process.env;

const DB_HOST: string = `${DB_ADDRESS as string}${DB_PORT}${DB_NAME}`;
export const ENV: env = (NODE_MODE as env) || "development";

class Configuration implements ConfigurationI {
  development: ParametersConfig = {
    application: {
      PORT: (PORT as unknown as number) || 4000,
      URL: "http://localhost:3000",
    },
    database: {
      URL: DB_HOST,
    },
  };

  deployment: ParametersConfig = {
    application: {
      PORT: (PORT as unknown as number) || 4000,
      URL: "https://tasks.arcprojects.es:",
    },
    database: {
      URL: DB_HOST,
    },
  };
}

export default new Configuration()[ENV];
