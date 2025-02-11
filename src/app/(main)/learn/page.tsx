import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import Header from "./header";
import UserProgress from "@/components/UserProgress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/query";
import { redirect } from "next/navigation";
import Unit from "./Unit";
import { lessons, units as unitsSchema } from "@/db/schema";

export default async function LearnPage() {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage()
  const unitsData = getUnits();

  const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([userProgressData, unitsData, courseProgressData, lessonPercentageData]);

  // const [units] = await Promise.all([unitsData]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) redirect("/courses");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit, index) => (
          <div key={index} className="mb-10">
            <Unit
            id={unit.id}
            order={unit.order}
            description={unit.description}
            title={unit.title}
            lessons={unit.lessons}
            activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
              unit: typeof unitsSchema.$inferSelect;
            } | undefined}
            activeLessonPercentage={lessonPercentage || 0}
            courseProgress={courseProgress}
            />
          </div>
))}
        <div className="space-y-4">
          <div className="h-[700px] bg-green-500 w-full"></div>
          <div className="h-[700px] bg-green-500 w-full"></div>
        </div>
      </FeedWrapper>
    </div>
  );
}
