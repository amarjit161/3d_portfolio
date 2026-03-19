"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "motion/react";

import { Project } from "../utils/interface";
import { ExternalLink, Github, XMark } from "./ui/Icons";

interface DialogProps {
  selectedProject: Project;
  setSelectedProject: Dispatch<SetStateAction<Project | null>>;
}

const ProjectDialog = ({
  selectedProject,
  setSelectedProject,
}: DialogProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      layoutId={selectedProject._id}
      className="fixed inset-0 z-50 grid place-items-center"
      onClick={(e) => e.target === e.currentTarget && setSelectedProject(null)}
    >
      <div className="bg-black w-11/12 md:w-1/2 h-4/5 md:h-[90%] overflow-y-auto overflow-x-hidden rounded-xl relative">
        <div className="relative ">
          <button
            className="absolute top-4 right-4 bg-black size-8 rounded-full border border-white/40 grid place-items-center text-white"
            onClick={() => setSelectedProject(null)}
          >
            <XMark />
          </button>
          <img
            src={selectedProject.image.url}
            width={300}
            height={300}
            alt={selectedProject.title}
            className="w-full h-full aspect-video md:aspect-[12/6] object-cover object-center"
          />
          <div className="p-3">
            <div className="flex items-center justify-between">
              <h5 className="text-4xl font-bold">{selectedProject.title}</h5>
              <div className="flex items-center gap-4">
                {selectedProject.githuburl && (
                  <Link href={selectedProject.githuburl} className="hover:text-white/70 transition-colors">
                    <Github />
                  </Link>
                )}
                {selectedProject.liveurl && (
                  <Link href={selectedProject.liveurl} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-1.5 rounded-full transition-colors font-medium text-sm">
                    {selectedProject.title.includes("Passbolt") ? "Open Passbolt" : selectedProject.title.includes("Wedding") ? "View Project" : "Live Demo"}
                    <div className="scale-75"><ExternalLink /></div>
                  </Link>
                )}
              </div>
            </div>
            <div className="py-3 flex items-center flex-wrap gap-2">
              {selectedProject.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/5 border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.03)] rounded-full text-xs font-medium text-white/80 hover:border-white/20 hover:brightness-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-white/80 leading-relaxed mt-4 whitespace-pre-wrap">
              {selectedProject.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDialog;
