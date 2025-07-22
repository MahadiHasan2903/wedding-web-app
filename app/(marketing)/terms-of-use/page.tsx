import React from "react";
import Link from "next/link";
import { HeadingLine, SectionTitle } from "@/lib/components/heading";

const textClass = "text-[12px] sm:text-[14px] text-justify leading-[21px]";
const termsOfUseSections = [
  {
    title: "1. Purpose of the Platform",
    content: (
      <p className={textClass}>
        FrenchCubaWedding is an online matchmaking service designed to help
        adults build serious and committed relationships. While account
        registration is free, access to premium features is reserved for users
        with a premium subscription.
      </p>
    ),
  },
  {
    title: "2. Eligibility",
    content: (
      <div className={textClass}>
        To use the Platform, you must:
        <ol type="a" className="list-[lower-alpha] list-inside ml-4">
          <li>Be at least 18 years old</li>
          <li>Have full legal capacity to enter into a binding agreement</li>
          <li>Use the Platform for personal and non-commercial purposes</li>
        </ol>
        We reserve the right to suspend or remove accounts that do not meet
        these conditions.
      </div>
    ),
  },
  {
    title: "3. Account Registration and Management",
    content: (
      <div className={textClass}>
        When registering:
        <ol type="a" className="list-[lower-alpha] list-inside ml-4">
          <li>You agree to provide accurate and truthful information</li>
          <li>You may not impersonate anyone or create multiple accounts</li>
          <li>
            You are responsible for the confidentiality and security of your
            login details
          </li>
          <li>You agree to use the Platform respectfully and in good faith</li>
        </ol>
        We may suspend or delete any account violating our policies, with or
        without notice.
      </div>
    ),
  },
  {
    title: "4. Premium Membership",
    content: (
      <div className={textClass}>
        FrenchCubaWedding offers a premium membership, which provides access to
        enhanced features such as:
        <ol type="a" className="list-[lower-alpha] list-inside ml-4">
          <li>Unlimited browsing and communication tools</li>
          <li>Priority display in user searches</li>
          <li>Enhanced user experience</li>
        </ol>
        Details on pricing, duration, renewal, and cancellation are clearly
        presented at the time of purchase. All purchases are final, and refunds
        will only be issued in the case of a verified technical error caused.
      </div>
    ),
  },
  {
    title: "5. Acceptable Use Policy",
    content: (
      <div className={textClass}>
        You agree not to:
        <ol type="a" className="list-[lower-alpha] list-inside ml-4">
          <li>Harass, insult, defraud, or harm other users</li>
          <li>
            Upload or share content that is abusive, illegal, pornographic, or
            discriminatory
          </li>
          <li>
            Use the platform for spamming, advertising, or commercial promotion
          </li>
          <li>Use automated bots or unauthorized scripts</li>
          <li>Misrepresent your intentions or create misleading profiles</li>
        </ol>
        Violation of this policy may result in immediate termination of your
        account.
      </div>
    ),
  },
  {
    title: "6. Content Ownership and Responsibility",
    content: (
      <div className={textClass}>
        When you upload any content in this platform:
        <ol type="a" className="list-[lower-alpha] list-inside ml-4">
          <li>
            You retain ownership of all content you upload (text, images,
            profile information)
          </li>
          <li>
            By uploading content, you grant us a non-exclusive, worldwide,
            royalty-free license to display it on our platform
          </li>
          <li>
            We reserve the right to moderate, remove, or block any content that
            violates our guidelines or applicable laws
          </li>
        </ol>
      </div>
    ),
  },
  {
    title: "7. Privacy and Data Protection",
    content: (
      <p className={textClass}>
        FrenchCubaWedding is fully committed to GDPR compliance. Your personal
        data is collected, stored, and processed in accordance with our{" "}
        <Link href="/privacy-policy" className="underline">
          Privacy Policy
        </Link>
        . We do not share your personal data with third parties without your
        explicit consent, except where required by law.
      </p>
    ),
  },
  {
    title: "8. Limitation of Liability",
    content: (
      <div className={textClass}>
        FrenchCubaWedding is a matchmaking platform and does not:
        <ol type="a" className="list-[lower-alpha] list-inside ml-4">
          <li>Guarantee relationship outcomes or success</li>
          <li>Verify the identity or intentions of users</li>
          <li>Supervise communications between users</li>
        </ol>
        By using the platform, you accept that you are solely responsible for
        your interactions and that we are not liable for any emotional,
        psychological, or financial outcomes.
      </div>
    ),
  },
  {
    title: "9. Termination",
    content: (
      <div className={textClass}>
        You may deactivate or delete your account at any time via your account
        settings. We reserve the right to suspend or permanently terminate
        accounts that:
        <ol type="a" className="list-[lower-alpha] list-inside ml-4">
          <li>Violate our Terms</li>
          <li>Involve abusive or fraudulent behavior</li>
          <li>Harm the integrity or safety of the community</li>
        </ol>
        In case of termination due to misconduct, no refund will be issued.
      </div>
    ),
  },
  {
    title: "10. Modifications to the Terms",
    content: (
      <p className={textClass}>
        We may update these Terms from time to time. When we do, we will update
        the “Effective Date” above and notify users where appropriate. Continued
        use of the Platform after changes have been made constitutes acceptance
        of the new Terms.
      </p>
    ),
  },
  {
    title: "11. Governing Law and Jurisdiction",
    content: (
      <p className={textClass}>
        These Terms are governed by the laws of France. In the event of any
        dispute, the competent courts located in the jurisdiction of the
        company's registered office shall have exclusive authority, unless
        otherwise provided by mandatory law.
      </p>
    ),
  },
  {
    title: "12. Contact",
    content: (
      <p className={textClass}>
        If you have any questions or concerns regarding these Terms, please
        contact us at{" "}
        <Link href="mailto:support@frenchcubawedding.com">
          support@frenchcubawedding.com
        </Link>
        .
      </p>
    ),
  },
];

const Page = () => {
  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[50px]">
      <SectionTitle
        title="Terms of Use / Service Agreement"
        className="mb-[36px]"
      />
      <div className="w-full flex flex-col items-start gap-[35px] sm:gap-[48px]">
        <HeadingLine color="primary" />
        <p className={`${textClass} font-normal`}>
          <span className="font-bold">
            Effective Date: 13 July 2025 Welcome to FrenchCubaWedding.
          </span>{" "}
          <br />
          <br />
          These Terms of Use ("Terms") govern your access to and use of our
          website and services ("Platform"). By creating an account or using any
          part of the Platform, you agree to be legally bound by these Terms. If
          you do not agree to these Terms, please do not use our services.
        </p>

        {termsOfUseSections.map((section, index) => (
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
