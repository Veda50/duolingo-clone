import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import Header from "./header";
import UserProgress from "@/components/user-progress";

export default function LearnPage() {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "english", imageSrc: "/us.svg" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="English" />
        <div className="space-y-4">
          <div className="h-[700px] bg-green-500 w-full"></div>
          <div className="h-[700px] bg-green-500 w-full"></div>
        </div>
      </FeedWrapper>
    </div>
  );
}
