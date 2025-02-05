import List from "@/app/(main)/courses/List";
import { getCourses, getUserProgress } from "@/db/query";

export default async function CoursesPage() {
    const coursesData = await getCourses();
    const userProgressData = await getUserProgress();

    const [courses, userProgress] = await Promise.all([
      coursesData,
      userProgressData,
    ])

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
}
