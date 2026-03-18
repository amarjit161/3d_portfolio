import About from "@/components/about";
import Contact from "@/components/Contact";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Services from "@/components/Services";
import Certifications from "@/components/Certifications";
import Skills from "@/components/Skills";
import Testimonials from "@/components/testimonials";
import Timeline from "@/components/Timeline";
import { Portfolio } from "@/utils/interface";

export default async function Home() {
  const portfolio = (await import("@/dummy.json")).default;

  const {
    about,
    testimonials,
    services,
    certifications,
    skills,
    projects,
    social_handles,
    timeline,
    email,
  } = portfolio as Portfolio;

  return (
    <main className="relative">
      <Header social={social_handles} />
      <Hero about={about} />
      <About about={about} timeline={timeline} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      {certifications && <Certifications certifications={certifications} />}
      <Services services={services} />
      <Timeline timeline={timeline} />
      <Testimonials testimonials={testimonials} />
      <Contact email={email} social_handle={social_handles} about={about} />
    </main>
  );
}
