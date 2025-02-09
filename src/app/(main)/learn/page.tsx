import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import Header from "./header";
import UserProgress from "@/components/UserProgress";
import { getUnits, getUserProgress } from "@/db/query";
import { redirect } from "next/navigation";

export default async function LearnPage() {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();

  const [userProgress] = await Promise.all([userProgressData]);

  const [units] = await Promise.all([unitsData]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

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
          <div key={index} className="mb-10">{JSON.stringify({
            ...unit,
            id: Number(unit.id)
          })}</div>
        ))}
        <div className="space-y-4">
          <div className="h-[700px] bg-green-500 w-full"></div>
          <div className="h-[700px] bg-green-500 w-full"></div>
        </div>
      </FeedWrapper>
    </div>
  );
}
