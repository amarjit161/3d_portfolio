import Header from "@/components/header";
import About from "@/components/about";
import { constructMetadata } from "@/utils";
import { Portfolio } from "@/utils/interface";

export const metadata = constructMetadata({
  title: "About | Amarjit - IT Executive",
  description:
    "Learn about Amarjit, an IT Executive with 5+ years of experience in system administration, virtualization, and network security.",
});

export default async function AboutPage() {
  const portfolio = (await import("@/dummy.json")).default;

  const { about, social_handles, timeline } = portfolio as Portfolio;

  return (
    <main className="relative">
      <Header social={social_handles} />
      <div className="pt-20">
        <About about={about} timeline={timeline} />
      </div>
    </main>
  );
}
