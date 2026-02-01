import CoursesList from "./CoursesList";

export const metadata = {
  title: "CodePion Courses",
  description: "Explore our courses"
}

// Server Component: fetch data directly from the database
async function getCourses() {
  const res = await fetch('https://codepion.com/api/courses',{
    next: { revalidate: 60 } // Revalidate every minute
  });

  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }

  return res.json()
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <section className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Available Courses</h1>

      <CoursesList courses={courses} />
    </section>
  )
}
