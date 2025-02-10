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
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

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

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 3,
                title: "Unit 1",
                description: "Learn the basics of Spanish.",
                order: 1
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: 'nouns'
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: 'verbs'
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: 'verbs'
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: 'verbs'
            }
        ])

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, // Nouns
                type: "SELECT",
                order: 1,
                queston: 'which one of these is the "the man"?'
            },
            // {
            //     id: 2,
            //     lessonId: 2, // Verbs
            //     type: "SELECT",
            //     order: 2,
            //     queston: 'Mana yang termasuk "Pria"?'
            // },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: true,
                text: "el hombre",
                audioSrc: "/es_man.mp3"
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/woman.svg",
                correct: false,
                text: "la mujer",
                audioSrc: "/es_woman.mp3"
            },            {
                id: 3,
                challengeId: 1,
                imageSrc: "/robot.svg",
                correct: false,
                text: "el robot",
                audioSrc: "/es_robot.mp3"
            },
        ])

        console.log("Seeding finished")
    } catch (error) {
        console.error(error)
        throw new Error('Failed to seed the database')
    }
};

main();