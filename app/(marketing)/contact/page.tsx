import React from "react";
import { FAQ, FindMatch, HeroBanner } from "@/lib/features/marketing/common";
import { ContactForm } from "@/lib/features/marketing/contact";

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
