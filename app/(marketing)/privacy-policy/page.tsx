import React from "react";
import Link from "next/link";
import { HeadingLine, SectionTitle } from "@/lib/components/heading";

const textClass = "text-[12px] sm:text-[14px] text-justify leading-[21px]";
const privacyPolicies = [
  {
    title: "1. Who We Are",
    content: (
      <p className={textClass}>
        FrenchCubaWedding is a digital matchmaking platform focused on serious
        relationships. We act as the data controller for the personal
        information you provide when using our services.
      </p>
    ),
  },
  {
    title: "2. What We Collect",
    content: (
      <p className={textClass}>
        When you create a profile or interact with the platform, we collect
        personal information such as your name, age, gender, location, contact
        details, and profile photo. You may also provide optional but sensitive
        data such as your religious views, political preferences, health
        details, family background, and relationship expectations. We also
        collect technical data such as your IP address, browser type, activity
        logs, and subscription status. Payment details are processed securely by
        third-party providers; we do not store your card information.
      </p>
    ),
  },
  {
    title: "3. Why We Collect Your Data",
    content: (
      <div className={textClass}>
        Your data helps us provide, personalize, and improve our services. We
        use it to:
        <ol type="a" className="list-[lower-alpha] list-inside ml-4">
          <li>Create and manage your profile</li>
          <li>Match you with compatible users</li>

          <li>Process VIP subscriptions</li>
          <li>
            Ensure safety, prevent misuse, and comply with legal requirements
          </li>
          <li>
            Communicate with you regarding your account, updates, and support
          </li>
        </ol>
        We process your data based on consent, legitimate interest, contractual
        necessity, and legal obligation.
      </div>
    ),
  },
  {
    title: "4. Consent and Sensitive Data",
    content: (
      <p className={textClass}>
        Some information you share is considered sensitive under the GDPR, such
        as religion, health, or political opinions. You provide this voluntarily
        and may choose not to share it. By submitting such information, you give
        us explicit consent to use it for matchmaking purposes. You can withdraw
        your consent or update/delete this data at any time in your account
        settings.
      </p>
    ),
  },
  {
    title: "5. How We Protect Your Data",
    content: (
      <p className={textClass}>
        We take data protection seriously and implement appropriate security
        measures, including encryption, secure servers, and access controls.
        Your information is stored within the European Economic Area (EEA)
        unless required otherwise, in which case we apply legal safeguards. We
        never sell your data and only share it with trusted partners (like
        payment or hosting services) under strict confidentiality agreements.
      </p>
    ),
  },
  {
    title: "6. Your Rights",
    content: (
      <p className={textClass}>
        As a user, you have the right to access, correct, delete, or restrict
        the use of your data. You can also request a copy of your data or object
        to certain uses. If you wish to exercise any of these rights, email us
        at support@frenchcubawedding.com. If you believe your rights have been
        violated, you can lodge a complaint with your local data protection
        authority (e.g., CNIL in France).
      </p>
    ),
  },
  {
    title: "7. Data Retention",
    content: (
      <p className={textClass}>
        We retain your data as long as you use our services or as needed to
        comply with legal obligations. If you delete your account, we will erase
        your personal data within 30 days, unless retention is required for
        legal or operational reasons.
      </p>
    ),
  },
  {
    title: "8. Cookies",
    content: (
      <p className={textClass}>
        We use cookies to improve your experience, remember your preferences,
        and analyze usage. You can manage or disable cookies through your
        browser settings. More details are available in our Cookie Policy.
      </p>
    ),
  },
  {
    title: "9. Changes to This Policy",
    content: (
      <p className={textClass}>
        We may update this Privacy Policy to reflect changes in law or how we
        operate. You will be notified of significant changes through the
        platform or by email. The latest version is always available at
        www.frenchcubawedding.com/privacy.
      </p>
    ),
  },
  {
    title: "10. Contact Us",
    content: (
      <p className={textClass}>
        If you have questions or concerns about this Privacy Policy or how we
        handle your data, please contact at{" "}
        <Link href="mailto:support@frenchcubawedding.com">
          support@frenchcubawedding.com
        </Link>
      </p>
    ),
  },
];

const Page = () => {
  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[50px]">
      <SectionTitle title="Privacy Policy" className="mb-[36px]" />
      <div className="w-full flex flex-col items-start gap-[35px] sm:gap-[48px]">
        <HeadingLine color="primary" />
        <p className={`${textClass} font-normal`}>
          <span className="font-bold">Effective Date: 13 July 2025</span> <br />
          <br />
          At FrenchCubaWedding, we respect your privacy and are committed to
          protecting your personal information. This Privacy Policy explains
          what data we collect, why we collect it, how we use it, and what
          rights you have under applicable laws, including the General Data
          Protection Regulation (GDPR). By using our website or mobile app, you
          agree to the practices outlined below.
        </p>

        {privacyPolicies.map((section, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-[15px] sm:gap-[30px]"
          >
            <h2 className="text-[14px] sm:text-[24px]">{section.title}</h2>
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
