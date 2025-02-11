/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { challengeOptions, challenges } from "@/db/schema"
import { useState } from "react"
import Header from "./header"

type Props = {
    initialPercentage: number,
    initialHearts: number,
    initialLessonId: number,
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean,
        challengeOptions: typeof challengeOptions.$inferSelect[]
    })[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userSubscription: any // typeof challengeOptions.$inferSelect[]
}

export default function Quiz({initialPercentage, initialHearts, userSubscription}: Props){
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage)

    return(<Header hearts={hearts} percentage={percentage} hasActiveSubscription={!!userSubscription?.isActive} />)
}