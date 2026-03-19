import Header from "@/components/header";
import Projects from "@/components/projects";
import { constructMetadata } from "@/utils";
import { Portfolio } from "@/utils/interface";

export const metadata = constructMetadata({
  title: "Projects | Amarjit - IT Executive",
  description:
    "Explore my portfolio of projects showcasing IT infrastructure, homelab solutions, and enterprise deployments.",
});

export default async function ProjectsPage() {
  const portfolio = (await import("@/dummy.json")).default;

  const { projects, social_handles } = portfolio as Portfolio;

  return (
    <main className="relative">
      <Header social={social_handles} />
      <div className="pt-20">
        <Projects projects={projects} />
      </div>
    </main>
  );
}
