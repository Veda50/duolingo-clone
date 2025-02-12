/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import Header from "./header";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./Challenge";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userSubscription: any; // typeof challengeOptions.$inferSelect[]
};

export default function Quiz({
  initialPercentage,
  initialHearts,
  initialLessonChallenges,
  userSubscription,
}: Props) {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges)
  const [activeIndex, setActiveIndex] = useState( () => {
    const uncompletedIndex = challenges.findIndex( challenge => !challenge.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })

  const challenge = challenges[activeIndex]
  const options = challenge?.challengeOptions ?? [];

  const title = challenge.type === "ASSIST" ? "Select the correct meaning" : challenge.question

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-cneter justify-center">
          <div className="lg:min-h-[350px] lg:w-[60opx] w-full px-6 lg:px-60 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
              options={options}
              onSelect={() => {}}
              status= "none"
              selectedOption={undefined}
              disabled={false}
              type={challenge.type}
               />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
