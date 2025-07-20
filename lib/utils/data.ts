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
    label: "Find Match",
    href: "/find-match",
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
    secondaryLine: "Featured Profiles for",
    primaryLine: "Faster Matching",
    description:
      "Get noticed first. As a featured member, your profile appears at the top — increasing your chances of matching with serious users faster.",
  },
  {
    icon: crown,
    alt: "verified",
    secondaryLine: "Verified Profiles that",
    primaryLine: "You Can Trust",
    description:
      "We value safety and authenticity. Verified badges help you connect confidently with real people who are here for the right reasons.",
  },
  {
    icon: heart,
    alt: "serious",
    secondaryLine: "Focused on",
    primaryLine: "Serious Relationships",
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
      "A French artist meets a Cuban entrepreneur — now building a life full of passion.",
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
      "A French artist meets a Cuban entrepreneur — now building a life full of passion.",
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

export const faqData = [
  {
    question: "Is FrenchCubaWedding only for French or Cuban users?",
    answer:
      "No, FrenchCubaWedding is open to everyone, regardless of nationality. While the platform celebrates French and Cuban cultural values, we welcome users from all backgrounds who are seeking meaningful, committed relationships.",
  },
  {
    question: "What is a Featured Profile?",
    answer:
      "A Featured Profile is highlighted across the platform to gain extra visibility. This feature increases your chances of connecting by showcasing your profile more prominently in search results and suggestions.",
  },
  {
    question: "What is a Verified Profile?",
    answer:
      "A Verified Profile means the user's identity has been confirmed through our verification process. It adds trust and credibility, helping you feel more confident about who you're interacting with.",
  },
  {
    question: "Is FrenchCubaWedding free to use?",
    answer:
      "Yes, you can join and use FrenchCubaWedding for free. We also offer premium features that enhance your experience, such as boosting your profile visibility and accessing advanced filters.",
  },
  {
    question: "What’s the difference between Featured and Verified Profiles?",
    answer:
      "A Verified Profile confirms the user's identity for safety and trust, while a Featured Profile is promoted on the platform for more visibility. They serve different purposes but can be used together for better results.",
  },
  {
    question: "How do I verify my profile?",
    answer:
      "To verify your profile, go to your account settings and follow the verification steps. This may involve submitting a government-issued ID or taking a live photo. Our team will review and approve your request.",
  },
];

export const uniqueSellingPointsData = [
  {
    icon: star,
    alt: "featured",
    title: "Featured Profiles",
    description: "One-time featured boosts help you get noticed quickly.",
  },
  {
    icon: crown,
    alt: "verified",
    title: "Verified Profiles",
    description: "Serious members can verify their profiles to stand out.",
  },
  {
    icon: heart,
    alt: "serious",
    title: "Focus on Commitment",
    description:
      "No swiping, no games — just people looking for real, lasting love.",
  },
];

export const membershipPlans = [
  {
    icon: heart,
    title: "Free Forever",
    price: "₣0.00",
    features: [
      "Create & Edit Profile",
      "Browse Profiles",
      "Get Match Suggestions",
      "Send & Receive Messages",
    ],
    color: "black",
  },
  {
    icon: star,
    title: "Monthly Premium",
    price: "₣19.99",
    frequency: "month",
    features: [
      "Create & Edit Profile",
      "Browse Profiles",
      "Priority in Match Suggestions",
      "Send & Receive Messages",
      "Premium Badge (Stand Out)",
      "Priority Customer Support",
    ],
    color: "primary",
  },
  {
    icon: crown,
    title: "Yearly Premium",
    price: "₣144.99",
    frequency: "year",
    features: [
      "Create & Edit Profile",
      "Browse Profiles",
      "Priority in Match Suggestions",
      "Send & Receive Messages",
      "Premium Badge (Stand Out)",
      "Priority Customer Support",
      "Save 40% with annual billing",
    ],
    color: "red",
    badge: "Save 40%",
  },
];
