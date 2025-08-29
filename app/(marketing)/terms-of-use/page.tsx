"use client";

import React from "react";
import Link from "next/link";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { HeadingLine, SectionTitle } from "@/lib/components/heading";

const textClass = "text-[12px] sm:text-[14px] text-justify leading-[21px]";

const translations = {
  en: {
    pageTitle: "Terms of Use / Service Agreement",
    effectiveDate: "Effective Date: 13 July 2025 Welcome to FrenchCubaWedding.",
    intro: `These Terms of Use ("Terms") govern your access to and use of our website and services ("Platform"). By creating an account or using any part of the Platform, you agree to be legally bound by these Terms. If you do not agree to these Terms, please do not use our services.`,
    sections: [
      {
        title: "1. Purpose of the Platform",
        content: (
          <p className={textClass}>
            FrenchCubaWedding is an online matchmaking service designed to help
            adults build serious and committed relationships. While account
            registration is free, access to premium features is reserved for
            users with a premium subscription.
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
              <li>
                Have full legal capacity to enter into a binding agreement
              </li>
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
              <li>
                You may not impersonate anyone or create multiple accounts
              </li>
              <li>
                You are responsible for the confidentiality and security of your
                login details
              </li>
              <li>
                You agree to use the Platform respectfully and in good faith
              </li>
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
            FrenchCubaWedding offers a premium membership, which provides access
            to enhanced features such as:
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Unlimited browsing and communication tools</li>
              <li>Priority display in user searches</li>
              <li>Enhanced user experience</li>
            </ol>
            Details on pricing, duration, renewal, and cancellation are clearly
            presented at the time of purchase. All purchases are final, and
            refunds will only be issued in the case of a verified technical
            error caused.
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
                Upload or share content that is abusive, illegal, pornographic,
                or discriminatory
              </li>
              <li>
                Use the platform for spamming, advertising, or commercial
                promotion
              </li>
              <li>Use automated bots or unauthorized scripts</li>
              <li>
                Misrepresent your intentions or create misleading profiles
              </li>
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
                We reserve the right to moderate, remove, or block any content
                that violates our guidelines or applicable laws
              </li>
            </ol>
          </div>
        ),
      },
      {
        title: "7. Privacy and Data Protection",
        content: (
          <p className={textClass}>
            FrenchCubaWedding is fully committed to GDPR compliance. Your
            personal data is collected, stored, and processed in accordance with
            our{" "}
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
            By using the platform, you accept that you are solely responsible
            for your interactions and that we are not liable for any emotional,
            psychological, or financial outcomes.
          </div>
        ),
      },
      {
        title: "9. Termination",
        content: (
          <div className={textClass}>
            You may deactivate or delete your account at any time via your
            account settings. We reserve the right to suspend or permanently
            terminate accounts that:
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
            We may update these Terms from time to time. When we do, we will
            update the “Effective Date” above and notify users where
            appropriate. Continued use of the Platform after changes have been
            made constitutes acceptance of the new Terms.
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
    ],
  },

  fr: {
    pageTitle: "Conditions d'utilisation / Accord de service",
    effectiveDate:
      "Date d'entrée en vigueur : 13 juillet 2025 Bienvenue sur FrenchCubaWedding.",
    intro: `Ces Conditions d'utilisation ("Conditions") régissent votre accès et votre utilisation de notre site Web et de nos services ("Plateforme"). En créant un compte ou en utilisant une partie de la Plateforme, vous acceptez d'être légalement lié par ces Conditions. Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser nos services.`,
    sections: [
      {
        title: "1. Objet de la Plateforme",
        content: (
          <p className={textClass}>
            FrenchCubaWedding est un service de rencontres en ligne conçu pour
            aider les adultes à établir des relations sérieuses et engagées.
            Bien que l'inscription soit gratuite, l'accès aux fonctionnalités
            premium est réservé aux utilisateurs disposant d'un abonnement
            premium.
          </p>
        ),
      },
      {
        title: "2. Conditions d'éligibilité",
        content: (
          <div className={textClass}>
            Pour utiliser la Plateforme, vous devez :
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Avoir au moins 18 ans</li>
              <li>
                Avoir la pleine capacité légale pour conclure un contrat
                contraignant
              </li>
              <li>
                Utiliser la Plateforme à des fins personnelles et non
                commerciales
              </li>
            </ol>
            Nous nous réservons le droit de suspendre ou de supprimer les
            comptes ne remplissant pas ces conditions.
          </div>
        ),
      },
      {
        title: "3. Inscription et gestion du compte",
        content: (
          <div className={textClass}>
            Lors de l'inscription :
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>
                Vous acceptez de fournir des informations exactes et véridiques
              </li>
              <li>
                Vous ne devez pas usurper l'identité de quelqu'un ou créer
                plusieurs comptes
              </li>
              <li>
                Vous êtes responsable de la confidentialité et de la sécurité de
                vos identifiants
              </li>
              <li>
                Vous acceptez d'utiliser la Plateforme de manière respectueuse
                et de bonne foi
              </li>
            </ol>
            Nous pouvons suspendre ou supprimer tout compte enfreignant nos
            politiques, avec ou sans préavis.
          </div>
        ),
      },
      {
        title: "4. Abonnement Premium",
        content: (
          <div className={textClass}>
            FrenchCubaWedding propose un abonnement premium, qui permet
            d'accéder à des fonctionnalités améliorées telles que :
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Navigation et outils de communication illimités</li>
              <li>Affichage prioritaire dans les recherches d'utilisateurs</li>
              <li>Expérience utilisateur améliorée</li>
            </ol>
            Les détails concernant le prix, la durée, le renouvellement et
            l'annulation sont clairement présentés au moment de l'achat. Tous
            les achats sont définitifs et les remboursements ne seront effectués
            qu'en cas d'erreur technique vérifiée.
          </div>
        ),
      },
      {
        title: "5. Politique d'utilisation acceptable",
        content: (
          <div className={textClass}>
            Vous acceptez de ne pas :
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>
                Harceler, insulter, frauder ou nuire à d'autres utilisateurs
              </li>
              <li>
                Publier ou partager du contenu abusif, illégal, pornographique
                ou discriminatoire
              </li>
              <li>
                Utiliser la plateforme pour le spam, la publicité ou la
                promotion commerciale
              </li>
              <li>Utiliser des bots automatisés ou scripts non autorisés</li>
              <li>Fausser vos intentions ou créer des profils trompeurs</li>
            </ol>
            Toute violation de cette politique peut entraîner la résiliation
            immédiate de votre compte.
          </div>
        ),
      },
      {
        title: "6. Propriété et responsabilité du contenu",
        content: (
          <div className={textClass}>
            Lorsque vous téléchargez du contenu sur cette plateforme :
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>
                Vous conservez la propriété de tout contenu que vous téléchargez
                (texte, images, informations de profil)
              </li>
              <li>
                En téléchargeant du contenu, vous nous accordez une licence non
                exclusive, mondiale et gratuite pour l'afficher sur notre
                plateforme
              </li>
              <li>
                Nous nous réservons le droit de modérer, supprimer ou bloquer
                tout contenu violant nos directives ou les lois applicables
              </li>
            </ol>
          </div>
        ),
      },
      {
        title: "7. Vie privée et protection des données",
        content: (
          <p className={textClass}>
            FrenchCubaWedding respecte pleinement le RGPD. Vos données
            personnelles sont collectées, stockées et traitées conformément à
            notre{" "}
            <Link href="/privacy-policy" className="underline">
              Politique de confidentialité
            </Link>
            . Nous ne partageons pas vos données personnelles avec des tiers
            sans votre consentement explicite, sauf si la loi l'exige.
          </p>
        ),
      },
      {
        title: "8. Limitation de responsabilité",
        content: (
          <div className={textClass}>
            FrenchCubaWedding est une plateforme de rencontres et ne :
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Ne garantit pas les résultats ou le succès des relations</li>
              <li>
                Ne vérifie pas l'identité ou les intentions des utilisateurs
              </li>
              <li>Ne supervise pas les communications entre utilisateurs</li>
            </ol>
            En utilisant la plateforme, vous acceptez d'être seul responsable de
            vos interactions et que nous ne sommes pas responsables des
            conséquences émotionnelles, psychologiques ou financières.
          </div>
        ),
      },
      {
        title: "9. Résiliation",
        content: (
          <div className={textClass}>
            Vous pouvez désactiver ou supprimer votre compte à tout moment via
            les paramètres de votre compte. Nous nous réservons le droit de
            suspendre ou de résilier définitivement les comptes qui :
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Violent nos Conditions</li>
              <li>Sont impliqués dans un comportement abusif ou frauduleux</li>
              <li>
                Portent atteinte à l'intégrité ou à la sécurité de la communauté
              </li>
            </ol>
            En cas de résiliation pour mauvaise conduite, aucun remboursement ne
            sera effectué.
          </div>
        ),
      },
      {
        title: "10. Modifications des Conditions",
        content: (
          <p className={textClass}>
            Nous pouvons mettre à jour ces Conditions de temps à autre. Lorsque
            nous le faisons, nous mettons à jour la "Date d'entrée en vigueur"
            ci-dessus et informons les utilisateurs si nécessaire. L'utilisation
            continue de la Plateforme après ces modifications constitue une
            acceptation des nouvelles Conditions.
          </p>
        ),
      },
      {
        title: "11. Droit applicable et juridiction",
        content: (
          <p className={textClass}>
            Ces Conditions sont régies par les lois de la France. En cas de
            litige, les tribunaux compétents situés dans la juridiction du siège
            social de la société ont compétence exclusive, sauf disposition
            contraire de la loi impérative.
          </p>
        ),
      },
      {
        title: "12. Contact",
        content: (
          <p className={textClass}>
            Si vous avez des questions ou des préoccupations concernant ces
            Conditions, veuillez nous contacter à{" "}
            <Link href="mailto:support@frenchcubawedding.com">
              support@frenchcubawedding.com
            </Link>
            .
          </p>
        ),
      },
    ],
  },

  es: {
    pageTitle: "Términos de uso / Acuerdo de servicio",
    effectiveDate:
      "Fecha de vigencia: 13 de julio de 2025 Bienvenido a FrenchCubaWedding.",
    intro: `Estos Términos de Uso ("Términos") rigen su acceso y uso de nuestro sitio web y servicios ("Plataforma"). Al crear una cuenta o utilizar cualquier parte de la Plataforma, usted acepta estar legalmente sujeto a estos Términos. Si no está de acuerdo con estos Términos, por favor no utilice nuestros servicios.`,
    sections: [
      {
        title: "1. Propósito de la Plataforma",
        content: (
          <p className={textClass}>
            FrenchCubaWedding es un servicio de citas en línea diseñado para
            ayudar a los adultos a construir relaciones serias y comprometidas.
            Aunque el registro es gratuito, el acceso a funciones premium está
            reservado para usuarios con suscripción premium.
          </p>
        ),
      },
      {
        title: "2. Elegibilidad",
        content: (
          <div className={textClass}>
            Para utilizar la Plataforma, debe:
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Tener al menos 18 años</li>
              <li>
                Tener plena capacidad legal para celebrar un acuerdo vinculante
              </li>
              <li>Usar la Plataforma para fines personales y no comerciales</li>
            </ol>
            Nos reservamos el derecho de suspender o eliminar cuentas que no
            cumplan con estas condiciones.
          </div>
        ),
      },
      {
        title: "3. Registro y gestión de cuentas",
        content: (
          <div className={textClass}>
            Al registrarse:
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Acepta proporcionar información precisa y veraz</li>
              <li>No puede suplantar a nadie ni crear varias cuentas</li>
              <li>
                Es responsable de la confidencialidad y seguridad de sus datos
                de inicio de sesión
              </li>
              <li>
                Acepta usar la Plataforma de manera respetuosa y de buena fe
              </li>
            </ol>
            Podemos suspender o eliminar cualquier cuenta que viole nuestras
            políticas, con o sin previo aviso.
          </div>
        ),
      },
      {
        title: "4. Membresía Premium",
        content: (
          <div className={textClass}>
            FrenchCubaWedding ofrece una membresía premium, que brinda acceso a
            funciones mejoradas como:
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Navegación y herramientas de comunicación ilimitadas</li>
              <li>Visualización prioritaria en búsquedas de usuarios</li>
              <li>Mejora de la experiencia del usuario</li>
            </ol>
            Los detalles sobre precios, duración, renovación y cancelación se
            presentan claramente al momento de la compra. Todas las compras son
            finales y solo se reembolsarán en caso de un error técnico
            verificado.
          </div>
        ),
      },
      {
        title: "5. Política de uso aceptable",
        content: (
          <div className={textClass}>
            Usted se compromete a no:
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Hostigar, insultar, defraudar o dañar a otros usuarios</li>
              <li>
                Subir o compartir contenido abusivo, ilegal, pornográfico o
                discriminatorio
              </li>
              <li>
                Usar la plataforma para spam, publicidad o promoción comercial
              </li>
              <li>Usar bots automatizados o scripts no autorizados</li>
              <li>Falsificar sus intenciones o crear perfiles engañosos</li>
            </ol>
            La violación de esta política puede resultar en la terminación
            inmediata de su cuenta.
          </div>
        ),
      },
      {
        title: "6. Propiedad y responsabilidad del contenido",
        content: (
          <div className={textClass}>
            Cuando sube contenido en esta plataforma:
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>
                Usted conserva la propiedad de todo el contenido que suba
                (texto, imágenes, información del perfil)
              </li>
              <li>
                Al subir contenido, nos concede una licencia no exclusiva,
                mundial y libre de regalías para mostrarlo en nuestra plataforma
              </li>
              <li>
                Nos reservamos el derecho de moderar, eliminar o bloquear
                cualquier contenido que viole nuestras pautas o leyes aplicables
              </li>
            </ol>
          </div>
        ),
      },
      {
        title: "7. Privacidad y protección de datos",
        content: (
          <p className={textClass}>
            FrenchCubaWedding cumple plenamente con el RGPD. Sus datos
            personales se recopilan, almacenan y procesan de acuerdo con nuestra{" "}
            <Link href="/privacy-policy" className="underline">
              Política de Privacidad
            </Link>
            . No compartimos sus datos personales con terceros sin su
            consentimiento explícito, excepto cuando lo exija la ley.
          </p>
        ),
      },
      {
        title: "8. Limitación de responsabilidad",
        content: (
          <div className={textClass}>
            FrenchCubaWedding es una plataforma de citas y no:
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Garantiza resultados o éxito en las relaciones</li>
              <li>Verifica la identidad o las intenciones de los usuarios</li>
              <li>Supervisa las comunicaciones entre usuarios</li>
            </ol>
            Al usar la plataforma, acepta que es el único responsable de sus
            interacciones y que no somos responsables de resultados emocionales,
            psicológicos o financieros.
          </div>
        ),
      },
      {
        title: "9. Terminación",
        content: (
          <div className={textClass}>
            Puede desactivar o eliminar su cuenta en cualquier momento desde la
            configuración de su cuenta. Nos reservamos el derecho de suspender o
            terminar permanentemente cuentas que:
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Violent nuestros Términos</li>
              <li>Involucren comportamientos abusivos o fraudulentos</li>
              <li>Perjudiquen la integridad o seguridad de la comunidad</li>
            </ol>
            En caso de terminación por mala conducta, no se emitirá reembolso.
          </div>
        ),
      },
      {
        title: "10. Modificaciones a los Términos",
        content: (
          <p className={textClass}>
            Podemos actualizar estos Términos ocasionalmente. Cuando lo hagamos,
            actualizaremos la "Fecha de vigencia" anterior y notificaremos a los
            usuarios según corresponda. El uso continuo de la Plataforma después
            de los cambios constituye la aceptación de los nuevos Términos.
          </p>
        ),
      },
      {
        title: "11. Ley aplicable y jurisdicción",
        content: (
          <p className={textClass}>
            Estos Términos se rigen por las leyes de Francia. En caso de
            disputa, los tribunales competentes ubicados en la jurisdicción de
            la sede de la empresa tendrán autoridad exclusiva, salvo que la ley
            obligatoria disponga lo contrario.
          </p>
        ),
      },
      {
        title: "12. Contacto",
        content: (
          <p className={textClass}>
            Si tiene alguna pregunta o inquietud sobre estos Términos,
            comuníquese con nosotros a{" "}
            <Link href="mailto:support@frenchcubawedding.com">
              support@frenchcubawedding.com
            </Link>
            .
          </p>
        ),
      },
    ],
  },
};

const Page = () => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[50px]">
      <SectionTitle title={t.pageTitle} className="mb-[36px]" />
      <div className="w-full flex flex-col items-start gap-[35px] sm:gap-[48px]">
        <HeadingLine color="primary" />
        <p className={`${textClass} font-normal`}>
          <span className="font-bold">{t.effectiveDate}</span>
          <br />
          <br />
          {t.intro}
        </p>

        {t.sections.map((section, index) => (
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
