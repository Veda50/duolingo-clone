import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { challengeProgress, courses, units, userProgress } from "./schema";

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();

    return data;
})

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) return null

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    })

    return data
})

//  TODO: Confirm wheter order is needed
export const getUnits = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userProgress?.activeCourseId || !userId) return []

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }
    })

    const normalizedData = data.map(unit => {
        const lessonsWithCompletedStatus = unit.lessons.map(lesson => {
            const allCompletedChallenges = lesson.challenges.length > 0 &&
                lesson.challenges.every(challenge =>
                    challenge.challengeProgress?.length > 0 &&
                    challenge.challengeProgress.every(progress => progress.completed)
                );
    
            return { 
                ...lesson, 
                id: Number(lesson.id), 
                completed: allCompletedChallenges
            };
        });
    
        return { 
            ...unit, 
            id: Number(unit.id), 
            lessons: lessonsWithCompletedStatus 
        };
    });
    
    return normalizedData;
})

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        // TODO: Populate units and lessons
        // NEXT STEP
    })

    return data
})