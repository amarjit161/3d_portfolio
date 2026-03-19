"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { About } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";
import { TextReveal } from "./ui/Typography";
import { ArrowUpRight } from "./ui/Icons";
import LoaderWrapper from "./LoaderWrapper";

interface HeroProps {
  about: About;
}

const Hero = ({ about }: HeroProps) => {
  return (
    <section className="h-dvh w-dvw overflow-hidden relative">
      <Transition>
        <span className="blob size-1/2 absolute top-20 left-0 blur-[100px]" />
      </Transition>
      <LoaderWrapper>
        <div className="relative h-full w-full">
          <div className="flex items-center justify-center flex-col h-full pb-10">
            <Transition>
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative size-28 md:size-32 group cursor-pointer"
              >
                {/* Diffused Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
                {/* Gradient Border Wrapper */}
                <div className="relative h-full w-full rounded-full p-[3px] bg-gradient-to-r from-blue-500 to-purple-600 group-hover:scale-105 transition-transform duration-300 shadow-xl">
                  <div className="h-full w-full rounded-full overflow-hidden bg-black grid place-items-center">
                    <img
                      src={about.avatar.url}
                      alt={about.name}
                      className="w-full h-full object-cover object-[center_20%] group-hover:brightness-110 transition-all duration-300"
                      style={{ transform: 'translateY(-6px) scale(1.05)' }}
                    />
                  </div>
                </div>
              </motion.div>
            </Transition>
            <div className="py-6 flex items-center flex-col">
              <h2 className="md:text-7xl text-4xl font-bold overflow-hidden">
                <SlideIn>Hello! I&apos;m {about.name}</SlideIn>
              </h2>
              <h1 className="md:text-7xl text-3xl overflow-hidden">
                <SlideIn>{about.title}</SlideIn>
              </h1>
            </div>
            <Transition viewport={{ once: true }} className="w-full">
              <p className="opacity-70 md:text-xl py-4 w-10/12 md:w-2/3 mx-auto flex flex-wrap justify-center gap-2">
                {about.subTitle.split(" ").map((word, index) => (
                  <span key={index}>{word}</span>
                ))}
              </p>
            </Transition>
            <Transition viewport={{ once: true }}>
              <Link
                href={"#contact"}
                className="px-5 py-3 mt-4 rounded-full border border-white/50 flex items-center gap-2 group"
              >
                <TextReveal>Let&apos;s talk</TextReveal>
                <ArrowUpRight />
              </Link>
            </Transition>
          </div>
        </div>
      </LoaderWrapper>
    </section>
  );
};

export default Hero;
