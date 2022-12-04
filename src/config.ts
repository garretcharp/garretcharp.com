import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://garretcharp.com/",
  author: "Garret Harp",
  desc: "Software Engineer who loves to build things",
  title: "Garret Harp",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerPage: 10,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/garretcharp",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/garretcharp/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:garretcharp@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];
