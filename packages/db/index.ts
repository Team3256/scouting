import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export { schema };

export * from "drizzle-orm";

const connectionString = process.env.POSTGRES_URL!;
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
