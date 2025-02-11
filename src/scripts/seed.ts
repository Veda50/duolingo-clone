import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database...");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        const courses = [
            { id: 1, title: "English", imageSrc: "/us.svg" },
            { id: 2, title: "Italian", imageSrc: "/it.svg" },
            { id: 3, title: "Spanish", imageSrc: "/es.svg" },
            { id: 4, title: "French", imageSrc: "/fr.svg" },
            { id: 5, title: "Japanese", imageSrc: "/jp.svg" },
            { id: 6, title: "Indonesian", imageSrc: "/id.svg" },
        ];

        await db.insert(schema.courses).values(courses);

        let unitId = 1;
        let lessonId = 1;
        let challengeId = 1;
        let optionId = 1;

        for (const course of courses) {
            await db.insert(schema.units).values({
                id: unitId,
                courseId: course.id,
                title: "Unit 1",
                description: `Learn the basics of ${course.title}.`,
                order: 1,
            });

            await db.insert(schema.lessons).values([
                { id: lessonId, unitId, order: 1, title: "Nouns" },
                { id: lessonId + 1, unitId, order: 2, title: "Verbs" },
            ]);

            await db.insert(schema.challenges).values([
                {
                    id: challengeId,
                    lessonId,
                    type: "SELECT",
                    order: 1,
                    question: `Which one of these is "the man" in ${course.title}?`,
                },
            ]);

            await db.insert(schema.challengeOptions).values([
                {
                    id: optionId,
                    challengeId,
                    imageSrc: "/man.svg",
                    correct: true,
                    text: course.title === "Japanese" ? "男の人 (otokonohito)" : course.title === "Indonesian" ? "pria" : "el hombre",
                    audioSrc: `/audio/${course.title.toLowerCase()}_man.mp3`,
                },
                {
                    id: optionId + 1,
                    challengeId,
                    imageSrc: "/woman.svg",
                    correct: false,
                    text: course.title === "Japanese" ? "女の人 (onnanohito)" : course.title === "Indonesian" ? "wanita" : "la mujer",
                    audioSrc: `/audio/${course.title.toLowerCase()}_woman.mp3`,
                },
                {
                    id: optionId + 2,
                    challengeId,
                    imageSrc: "/robot.svg",
                    correct: false,
                    text: "el robot",
                    audioSrc: `/audio/${course.title.toLowerCase()}_robot.mp3`,
                },
            ]);

            unitId++;
            lessonId += 2;
            challengeId++;
            optionId += 3;
        }

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();
