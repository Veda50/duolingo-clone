import { defineConfig } from "drizzle-kit"

// export default defineConfig{
//     schema: "./db/schema.ts",
//     out: "./drizzle",
//     driver: "pglite",
//     dbCredentials: {
//         url: process.env.DATABASE_URL || "postgresql://neondb_"
//     },
//     dialect: "postgresql"
// }

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    // driver: "pg",
    out: "drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL || "postgresql://neondb_"
    }
})