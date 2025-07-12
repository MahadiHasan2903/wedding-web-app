import { FaFacebookF } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/tfi";
import { RiInstagramFill } from "react-icons/ri";

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
