import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import Header from "./header";
import UserProgress from "@/components/UserProgress";
import { getUserProgress } from "@/db/query";
import { redirect } from "next/navigation";

export default async function LearnPage() {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses")

    return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <UserProgress
            activeCourse={{ title: userProgress.activeCourse.title , imageSrc: userProgress.activeCourse.imageSrc }}
            hearts={5}
            points={100}
            hasActiveSubscription={false}
          />
        </StickyWrapper>
        <FeedWrapper>
          <Header title={userProgress.activeCourse.title} />
          <div className="space-y-4">
            <div className="h-[700px] bg-green-500 w-full"></div>
            <div className="h-[700px] bg-green-500 w-full"></div>
          </div>
        </FeedWrapper>
      </div>
    );
}
