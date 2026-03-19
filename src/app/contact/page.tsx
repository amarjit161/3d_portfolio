import Header from "@/components/header";
import Contact from "@/components/Contact";
import { constructMetadata } from "@/utils";
import { Portfolio } from "@/utils/interface";

export const metadata = constructMetadata({
  title: "Contact | Amarjit - IT Executive",
  description:
    "Get in touch with Amarjit. Reach out for collaborations, projects, or just a conversation about IT infrastructure and homelab solutions.",
});

export default async function ContactPage() {
  const portfolio = (await import("@/dummy.json")).default;

  const { about, email, social_handles } = portfolio as Portfolio;

  return (
    <main className="relative">
      <Header social={social_handles} />
      <div className="pt-20">
        <Contact email={email} social_handle={social_handles} about={about} />
      </div>
    </main>
  );
}
