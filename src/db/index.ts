import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

/*Comments:
* Changed to singleton pattern to prevent multiple instances of db
* Better to throw a hard exception and know something is wrong that return dummy data in prod
* Easier to write __tests__ against
 */
let dbInstance: ReturnType<typeof drizzle> | null = null;

export const setupDb = () => {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  if (!dbInstance) {
    const queryClient = postgres(dbUrl, { /*client-pool*/ max: 10 });
    dbInstance = drizzle(queryClient);
  }

  return dbInstance;
};
