import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!)

const db = drizzle(sql, { schema })

const main = async () => {
    try {
        console.log("Seeding database...")

        await db.delete(schema.courses);
        await db.delete(schema.userProgress)

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "english",
                imageSrc: '/us.svg',
            },
            {
                id: 2,
                title: "italian",
                imageSrc: '/it.svg',
            },
            {
                id: 3,
                title: "spanish",
                imageSrc: '/es.svg',
            },
            {
                id: 4,
                title: "french",
                imageSrc: '/fr.svg',
            },
            {
                id: 5,
                title: "japan",
                imageSrc: '/jp.svg',
            },
            {
                id: 6,
                title: "indonesian",
                imageSrc: '/id.svg',
            },
        ])
    } catch (error) {
        console.error(error)
        throw new Error('Failed to seed the database')
    }
};

main();