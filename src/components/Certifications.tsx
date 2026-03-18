"use client";

import { Service } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";
import { HoverImage } from "./ui/HoverImage";

interface CertificationsProps {
  certifications: Service[];
}

function Certifications({ certifications }: CertificationsProps) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section className="px-2 py-20 relative" id="certifications">
      <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10 opacity-50" />
      <SectionHeading className="md:pl-16 overflow-hidden tracking-tighter">
        <SlideIn className="text-white/40">Professional</SlideIn> <br />
        <SlideIn>Certifications</SlideIn>
      </SectionHeading>
      <div className="mx-auto pt-10">
        {certifications.map((cert) => (
          <Transition key={cert._id}>
            <HoverImage
              heading={cert.name}
              price=""
              imgSrc={cert.image.url}
              subheading={cert.desc}
              linkTarget={(cert as any).linkTarget}
              actionText={(cert as any).actionText || "View Certificate"}
            />
          </Transition>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
