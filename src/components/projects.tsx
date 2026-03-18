"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { SectionHeading, TextReveal } from "./ui/Typography";
import { Project } from "../utils/interface";
import ProjectDialog from "./ProjectDialog";
import { ArrowUpRight } from "./ui/Icons";
import Filters from "./filters";
import { useVariants } from "../utils/hooks";
import { SlideIn, Transition } from "./ui/Transitions";

interface ProjectsProps {
  projects: Project[];
}

function Projects({ projects }: ProjectsProps) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [filterValue, setFilterValue] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const numProjectToShow = 6;

  useEffect(() => {
    const filtered = applyFilters(projects, filterValue);
    setFilteredProjects(filtered);
  }, [filterValue, projects]);

  const applyFilters = (data: Project[], filterValues: string) => {
    if (!filterValue || filterValues === "all") {
      return data;
    }

    return data.filter((project) =>
      project.techStack.some((tech) => filterValues === tech.trim())
    );
  };

  return (
    <section className="md:p-8 p-4 mt-10 relative" id="projects">
      <SectionHeading className="md:pl-12">
        <SlideIn className="text-white/40">Selected</SlideIn>
        <br />
        <SlideIn>works</SlideIn>
      </SectionHeading>
      <Filters
        projects={projects}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />

      <motion.div className="grid md:grid-cols-3 grid-cols-2 md:gap-6 gap-3 relative">
        {filteredProjects
          .slice(0, showMore ? filteredProjects.length : numProjectToShow)
          .map((project, index) => (
            <Transition
              transition={{ delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              key={project._id}
              layoutId={project._id}
              onClick={() => {
                setSelectedProject(project);
              }}
            >
              <Card {...project} />
            </Transition>
          ))}
        <AnimatePresence>
          {selectedProject && (
            <div className="rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col">
              <ProjectDialog
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="grid place-items-center py-8">
        {filteredProjects.length > numProjectToShow && (
          <button
            className="flex items-center justify-center gap-4 py-3 px-6 rounded-full border mt-6 group relative overflow-hidden"
            onClick={() => setShowMore(!showMore)}
          >
            <TextReveal>{showMore ? "Show less" : "Show more"}</TextReveal>
          </button>
        )}
      </div>
    </section>
  );
}

export default Projects;

const Card = ({ title, image, description, techStack, liveurl }: Project) => {
  const [hover, setHover] = useState(false);
  const { setVariant } = useVariants();

  const mouseEnter = () => {
    setHover(true);
    setVariant("PROJECT");
  };
  const mouseLeave = () => {
    setHover(false);
    setVariant("DEFAULT");
  };

  return (
    <motion.div
      layout
      className="group relative rounded-xl md:rounded-3xl overflow-hidden aspect-square bg-secondary/30 md:px-4"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      {liveurl && (
        <div className="absolute top-2 right-2 w-full h-full flex justify-end md:hidden">
          <div className="bg-white size-8 rounded-full text-black grid place-items-center">
            <ArrowUpRight />
          </div>
        </div>
      )}
      <div className="md:py-8 relative">
        <motion.div
          animate={{ y: hover ? -10 : 0 }}
          className="flex justify-between items-center max-md:hidden"
        >
          <p className="text-sm md:text-xl font-semibold max-md:opacity-0">
            {title}
          </p>
          {liveurl && (
            <button className="flex gap-2 items-center justify-center max-md:px-4">
              <TextReveal className="max-md:text-sm">Visit</TextReveal>
              <span className="bg-black text-white/80 rounded-full p-1">
                <ArrowUpRight />
              </span>
            </button>
          )}
        </motion.div>
        <div className="overflow-hidden max-md:hidden">
          <motion.p
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: hover ? -10 : 0, opacity: hover ? 1 : 0 }}
            className="absolute text-white/50 line-clamp-2 pr-4"
          >
            {description}
          </motion.p>
        </div>
      </div>
      <div className="w-full h-full overflow-hidden rounded-xl md:rounded-t-3xl relative group bg-neutral-900">
        <div className="absolute inset-0 bg-black/30 z-[5] transition-opacity duration-500 group-hover:bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />

        {title.includes("Passbolt") && (
          <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-white/90 border border-white/10 shadow-xl tracking-wide">
            Self Hosted on AWS
          </div>
        )}

        <img
          src={image?.url}
          width={500}
          height={500}
          alt={title}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.nextElementSibling) {
              e.currentTarget.nextElementSibling.classList.remove('hidden');
              e.currentTarget.nextElementSibling.classList.add('flex');
            }
          }}
          className="object-cover h-full w-full object-center group-hover:scale-[1.05] transition-transform duration-700 ease-out z-[2]"
        />
        
        <div className="hidden absolute inset-0 z-[1] bg-neutral-900 flex-col items-center justify-center text-center p-6 border border-white/5 rounded-xl md:rounded-t-3xl">
          <svg className="w-10 h-10 text-white/20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span className="text-white/40 text-[13px] font-medium tracking-wide">Project Preview Unavailable</span>
        </div>
      </div>
    </motion.div>
  );
};
