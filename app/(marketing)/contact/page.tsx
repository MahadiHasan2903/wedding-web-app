import React from "react";
import dynamic from "next/dynamic";
import { FAQ, FindMatch, HeroBanner } from "@/lib/features/marketing/common";

const ContactForm = dynamic(
  () =>
    import("@/lib/features/marketing/contact").then((mod) => mod.ContactForm),
  { ssr: false }
);

const ContactPage = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <HeroBanner title="Contact" />
      <ContactForm />
      <FindMatch />
      <FAQ />
    </div>
  );
};

export default ContactPage;
