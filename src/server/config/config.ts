import convict from "convict";
import dotenv from "dotenv";

dotenv.config();

const config = convict({
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 4000,
    env: "APP_PORT",
  },
  nodeEnv: {
    doc: "The application environment.",
    format: ["development", "production", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  database: {
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "localhost",
      env: "PGHOST",
    },
    port: {
      doc: "Database port",
      format: "port",
      default: 5432,
      env: "PGPORT",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "mydatabase",
      env: "PGDATABASE",
    },
    username: {
      doc: "Database username",
      format: String,
      default: "user",
      env: "PGUSER",
    },
    password: {
      doc: "Database password",
      format: String,
      default: "password",
      env: "PGPASSWORD",
    },
  },
});

// Load environment-dependent configuration
const env = config.get("nodeEnv");
config.loadFile(`./src/server/config/${env}.json`);

// Perform validation
config.validate({ allowed: "strict" });

export default config;
