import convict from 'convict';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the schema for your configuration
const config = convict({
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4000,
    env: 'APP_PORT'
  },
  nodeEnv: {
    doc: 'The application environment.',
    format: ['development', 'production', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  jwt: {
    doc: 'JWT secret Key',
    format: String,
    default: "abcgsggsggs",
    env: 'JWT_SECRET'
  },
  database: {
    host: {
      doc: 'Database host name/IP',
      format: String,
      default: 'localhost',
      env: 'POSTGRES_HOST'
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 5432,
      env: 'POSTGRES_PORT'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'mydatabase',
      env: 'POSTGRES_DB'
    },
    username: {
      doc: 'Database username',
      format: String,
      default: 'user',
      env: 'POSTGRES_USERNAME'  
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'password',
      env: 'POSTGRES_PASSWORD'
    }
  }
});

// Load environment-dependent configuration
const env = config.get('nodeEnv');
config.loadFile(`./src/config/${env}.json`);

// Perform validation
config.validate({ allowed: 'strict' });

export default config;