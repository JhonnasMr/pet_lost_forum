import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    NODE_ENV: get('NODE_ENV').required().asString(),
    PORT: get('PORT').required().asPortNumber(),
    PGHOST: get('PGHOST').required().asString(),
    PGDATABASE: get('PGDATABASE').required().asString(),
    PGUSER: get('PGUSER').required().asString(),
    PGPASSWORD: get('PGPASSWORD').required().asString(),
    PGPORT: get('PGPORT').required().asPortNumber(),
    JWT_KEY: get("JWT_KEY").required().asString(),
    JWT_EXPIRE_IN: get("JWT_EXPIRE_IN").required().asString()
};