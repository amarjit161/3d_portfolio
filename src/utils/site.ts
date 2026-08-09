const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://the-portfolio-lac.vercel.app";

export const siteConfig = {
  name: "Amarjit | IT Executive & Virtualization Specialist",
  description:
    "Personal portfolio website showcasing my projects and skills as an IT Executive & Virtualization Specialist",
  url: site_url,
  ogImage: `${site_url}/_static/og-image.png`,
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/amarjit161",
  },
  mailSupport: "info@amarjit.co.in",
};
