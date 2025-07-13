import { FaFacebookF } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/tfi";
import { RiInstagramFill } from "react-icons/ri";
import { crown, star, heart } from "@/lib/components/image/icons";
import story1 from "@/public/images/landing-page/story-1.jpg";
import story2 from "@/public/images/landing-page/story-2.jpg";

export const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Search",
    href: "/search",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const footerLinks = [
  {
    title: "Need Help?",
    links: [
      { label: "Member Login", href: "/login" },
      { label: "Sign Up", href: "/registration" },
      { label: "VIP Membership", href: "/pricing" },
      { label: "Featured Profile", href: "/search" },
      { label: "Customer Support", href: "#" },
      { label: "Sitemap", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Awards and Recognition", href: "#" },
    ],
  },
  {
    title: "Privacy & You",
    links: [
      { label: "Terms of Use", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Be Safe Online", href: "#" },
      { label: "Report Misuse", href: "#" },
    ],
  },
];

export const socialLinks = [
  {
    href: "https://www.facebook.com",
    Icon: FaFacebookF,
  },
  {
    href: "https://www.instagram.com",
    Icon: RiInstagramFill,
  },
  {
    href: "https://www.linkedin.com",
    Icon: TfiLinkedin,
  },
];

export const whyChooseUsData = [
  {
    icon: star,
    alt: "featured",
    titleLine1: "Featured Profiles for",
    titleLine2: "Faster Matching",
    description:
      "Get noticed first. As a featured member, your profile appears at the top — increasing your chances of matching with serious users faster.",
  },
  {
    icon: crown,
    alt: "verified",
    titleLine1: "Verified Profiles that",
    titleLine2: "You Can Trust",
    description:
      "We value safety and authenticity. Verified badges help you connect confidently with real people who are here for the right reasons.",
  },
  {
    icon: heart,
    alt: "serious",
    titleLine1: "Focused on",
    titleLine2: "Serious Relationships",
    description:
      "No distractions. No games. FrenchCubaWedding is built for those who are ready to commit and looking for genuine, lasting connections.",
  },
];

export const stories = [
  {
    id: 1,
    thumbnail: story1,
    name: "Élodie & Javier",
    description:
      "A French artist meets a Cuban entrepreneur — now building a life full of passion and poetry.",
  },
  {
    id: 2,
    thumbnail: story2,
    name: "Camille & Diego",
    description:
      "What began with a message became a marriage — across borders, hearts aligned.",
  },
  {
    id: 3,
    thumbnail: story1,
    name: "Élodie & Javier",
    description:
      "A French artist meets a Cuban entrepreneur — now building a life full of passion and poetry.",
  },
  {
    id: 4,
    thumbnail: story2,
    name: "Lina & Ahmed",
    description:
      "From Cairo to Copenhagen, their love defied distance, language, and time zones.",
  },
  {
    id: 5,
    thumbnail: story1,
    name: "Sofia & Mateo",
    description:
      "A shared playlist turned into shared dreams — music was just the beginning.",
  },
  {
    id: 6,
    thumbnail: story2,
    name: "Aisha & Mahmud",
    description:
      "They crossed continents for each other — and found home in each other’s hearts.",
  },
];
