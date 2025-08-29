"use client";

import React from "react";
import Link from "next/link";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { HeadingLine, SectionTitle } from "@/lib/components/heading";

const textClass = "text-[12px] sm:text-[14px] text-justify leading-[21px]";

const translations = {
  en: {
    pageTitle: "Privacy Policy",
    effectiveDate: "Effective Date: 13 July 2025",
    intro: `At FrenchCubaWedding, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains what data we collect, why we collect it, how we use it, and what rights you have under applicable laws, including the General Data Protection Regulation (GDPR). By using our website or mobile app, you agree to the practices outlined below.`,
    sections: [
      {
        title: "1. Who We Are",
        content: (
          <p className={textClass}>
            FrenchCubaWedding is a digital matchmaking platform focused on
            serious relationships. We act as the data controller for the
            personal information you provide when using our services.
          </p>
        ),
      },
      {
        title: "2. What We Collect",
        content: (
          <p className={textClass}>
            When you create a profile or interact with the platform, we collect
            personal information such as your name, age, gender, location,
            contact details, and profile photo. You may also provide optional
            but sensitive data such as your religious views, political
            preferences, health details, family background, and relationship
            expectations. We also collect technical data such as your IP
            address, browser type, activity logs, and subscription status.
            Payment details are processed securely by third-party providers; we
            do not store your card information.
          </p>
        ),
      },
      {
        title: "3. Why We Collect Your Data",
        content: (
          <div className={textClass}>
            Your data helps us provide, personalize, and improve our services.
            We use it to:
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Create and manage your profile</li>
              <li>Match you with compatible users</li>
              <li>Process VIP subscriptions</li>
              <li>
                Ensure safety, prevent misuse, and comply with legal
                requirements
              </li>
              <li>
                Communicate with you regarding your account, updates, and
                support
              </li>
            </ol>
            We process your data based on consent, legitimate interest,
            contractual necessity, and legal obligation.
          </div>
        ),
      },
      {
        title: "4. Consent and Sensitive Data",
        content: (
          <p className={textClass}>
            Some information you share is considered sensitive under the GDPR,
            such as religion, health, or political opinions. You provide this
            voluntarily and may choose not to share it. By submitting such
            information, you give us explicit consent to use it for matchmaking
            purposes. You can withdraw your consent or update/delete this data
            at any time in your account settings.
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
            unless required otherwise, in which case we apply legal safeguards.
            We never sell your data and only share it with trusted partners
            (like payment or hosting services) under strict confidentiality
            agreements.
          </p>
        ),
      },
      {
        title: "6. Your Rights",
        content: (
          <p className={textClass}>
            As a user, you have the right to access, correct, delete, or
            restrict the use of your data. You can also request a copy of your
            data or object to certain uses. If you wish to exercise any of these
            rights, email us at support@frenchcubawedding.com. If you believe
            your rights have been violated, you can lodge a complaint with your
            local data protection authority (e.g., CNIL in France).
          </p>
        ),
      },
      {
        title: "7. Data Retention",
        content: (
          <p className={textClass}>
            We retain your data as long as you use our services or as needed to
            comply with legal obligations. If you delete your account, we will
            erase your personal data within 30 days, unless retention is
            required for legal or operational reasons.
          </p>
        ),
      },
      {
        title: "8. Cookies",
        content: (
          <p className={textClass}>
            We use cookies to improve your experience, remember your
            preferences, and analyze usage. You can manage or disable cookies
            through your browser settings. More details are available in our
            Cookie Policy.
          </p>
        ),
      },
      {
        title: "9. Changes to This Policy",
        content: (
          <p className={textClass}>
            We may update this Privacy Policy to reflect changes in law or how
            we operate. You will be notified of significant changes through the
            platform or by email. The latest version is always available at
            www.frenchcubawedding.com/privacy.
          </p>
        ),
      },
      {
        title: "10. Contact Us",
        content: (
          <p className={textClass}>
            If you have questions or concerns about this Privacy Policy or how
            we handle your data, please contact at{" "}
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
    pageTitle: "Politique de confidentialité",
    effectiveDate: "Date d'entrée en vigueur : 13 juillet 2025",
    intro: `Chez FrenchCubaWedding, nous respectons votre vie privée et nous engageons à protéger vos informations personnelles. Cette politique de confidentialité explique quelles données nous collectons, pourquoi nous les collectons, comment nous les utilisons et quels droits vous avez conformément aux lois applicables, y compris le Règlement général sur la protection des données (RGPD). En utilisant notre site Web ou notre application mobile, vous acceptez les pratiques décrites ci-dessous.`,
    sections: [
      {
        title: "1. Qui nous sommes",
        content: (
          <p className={textClass}>
            FrenchCubaWedding est une plateforme de rencontres en ligne axée sur
            les relations sérieuses. Nous agissons en tant que responsable du
            traitement des informations personnelles que vous fournissez lors de
            l'utilisation de nos services.
          </p>
        ),
      },
      {
        title: "2. Quelles informations nous collectons",
        content: (
          <p className={textClass}>
            Lorsque vous créez un profil ou interagissez avec la plateforme,
            nous collectons des informations personnelles telles que votre nom,
            âge, sexe, localisation, coordonnées et photo de profil. Vous pouvez
            également fournir des informations sensibles facultatives telles que
            vos croyances religieuses, préférences politiques, informations de
            santé, antécédents familiaux et attentes relationnelles. Nous
            collectons également des données techniques comme votre adresse IP,
            type de navigateur, journaux d'activité et statut d'abonnement. Les
            détails de paiement sont traités de manière sécurisée par des
            fournisseurs tiers ; nous ne stockons pas vos informations de carte.
          </p>
        ),
      },
      {
        title: "3. Pourquoi nous collectons vos données",
        content: (
          <div className={textClass}>
            Vos données nous aident à fournir, personnaliser et améliorer nos
            services. Nous les utilisons pour :
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Créer et gérer votre profil</li>
              <li>Vous mettre en relation avec des utilisateurs compatibles</li>
              <li>Traiter les abonnements VIP</li>
              <li>
                Assurer la sécurité, prévenir les abus et respecter les
                obligations légales
              </li>
              <li>
                Communiquer avec vous concernant votre compte, mises à jour et
                assistance
              </li>
            </ol>
            Nous traitons vos données sur la base du consentement, de l'intérêt
            légitime, de la nécessité contractuelle et de l'obligation légale.
          </div>
        ),
      },
      {
        title: "4. Consentement et données sensibles",
        content: (
          <p className={textClass}>
            Certaines informations que vous partagez sont considérées comme
            sensibles au sens du RGPD, telles que la religion, la santé ou les
            opinions politiques. Vous les fournissez volontairement et pouvez
            choisir de ne pas les partager. En soumettant ces informations, vous
            nous donnez votre consentement explicite pour les utiliser à des
            fins de mise en relation. Vous pouvez retirer votre consentement ou
            mettre à jour/supprimer ces données à tout moment dans vos
            paramètres de compte.
          </p>
        ),
      },
      {
        title: "5. Comment nous protégeons vos données",
        content: (
          <p className={textClass}>
            Nous prenons la protection des données au sérieux et mettons en
            œuvre des mesures de sécurité appropriées, y compris le chiffrement,
            des serveurs sécurisés et des contrôles d'accès. Vos informations
            sont stockées dans l'Espace économique européen (EEE), sauf si la
            loi exige autrement, auquel cas nous appliquons des garanties
            légales. Nous ne vendons jamais vos données et ne les partageons
            qu'avec des partenaires de confiance (comme les services de paiement
            ou d'hébergement) sous des accords de confidentialité stricts.
          </p>
        ),
      },
      {
        title: "6. Vos droits",
        content: (
          <p className={textClass}>
            En tant qu'utilisateur, vous avez le droit d'accéder, de corriger,
            de supprimer ou de restreindre l'utilisation de vos données. Vous
            pouvez également demander une copie de vos données ou vous opposer à
            certaines utilisations. Pour exercer ces droits, envoyez un email à
            support@frenchcubawedding.com. Si vous estimez que vos droits ont
            été violés, vous pouvez déposer une plainte auprès de l'autorité
            locale de protection des données (ex : CNIL).
          </p>
        ),
      },
      {
        title: "7. Conservation des données",
        content: (
          <p className={textClass}>
            Nous conservons vos données tant que vous utilisez nos services ou
            selon les besoins pour respecter nos obligations légales. Si vous
            supprimez votre compte, nous effacerons vos données personnelles
            dans les 30 jours, sauf si la conservation est requise pour des
            raisons légales ou opérationnelles.
          </p>
        ),
      },
      {
        title: "8. Cookies",
        content: (
          <p className={textClass}>
            Nous utilisons des cookies pour améliorer votre expérience,
            mémoriser vos préférences et analyser l'utilisation. Vous pouvez
            gérer ou désactiver les cookies via les paramètres de votre
            navigateur. Plus de détails sont disponibles dans notre Politique de
            cookies.
          </p>
        ),
      },
      {
        title: "9. Modifications de cette politique",
        content: (
          <p className={textClass}>
            Nous pouvons mettre à jour cette politique de confidentialité pour
            refléter les changements législatifs ou dans nos pratiques. Vous
            serez informé des changements importants via la plateforme ou par
            email. La dernière version est toujours disponible sur
            www.frenchcubawedding.com/privacy.
          </p>
        ),
      },
      {
        title: "10. Contactez-nous",
        content: (
          <p className={textClass}>
            Pour toute question ou préoccupation concernant cette politique de
            confidentialité ou la manière dont nous traitons vos données,
            veuillez contacter{" "}
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
    pageTitle: "Política de privacidad",
    effectiveDate: "Fecha de vigencia: 13 de julio de 2025",
    intro: `En FrenchCubaWedding, respetamos su privacidad y nos comprometemos a proteger su información personal. Esta Política de privacidad explica qué datos recopilamos, por qué los recopilamos, cómo los usamos y qué derechos tiene según las leyes aplicables, incluido el Reglamento General de Protección de Datos (RGPD). Al usar nuestro sitio web o aplicación móvil, acepta las prácticas descritas a continuación.`,
    sections: [
      {
        title: "1. Quiénes somos",
        content: (
          <p className={textClass}>
            FrenchCubaWedding es una plataforma de citas en línea centrada en
            relaciones serias. Actuamos como el responsable del tratamiento de
            los datos personales que proporcione al usar nuestros servicios.
          </p>
        ),
      },
      {
        title: "2. Qué recopilamos",
        content: (
          <p className={textClass}>
            Cuando crea un perfil o interactúa con la plataforma, recopilamos
            información personal como su nombre, edad, género, ubicación, datos
            de contacto y foto de perfil. También puede proporcionar datos
            opcionales pero sensibles como sus creencias religiosas,
            preferencias políticas, información de salud, antecedentes
            familiares y expectativas de relación. También recopilamos datos
            técnicos como su dirección IP, tipo de navegador, registros de
            actividad y estado de suscripción. Los detalles de pago se procesan
            de forma segura mediante proveedores externos; no almacenamos su
            información de tarjeta.
          </p>
        ),
      },
      {
        title: "3. Por qué recopilamos sus datos",
        content: (
          <div className={textClass}>
            Sus datos nos ayudan a proporcionar, personalizar y mejorar nuestros
            servicios. Los usamos para:
            <ol type="a" className="list-[lower-alpha] list-inside ml-4">
              <li>Crear y gestionar su perfil</li>
              <li>Emparejarlo con usuarios compatibles</li>
              <li>Procesar suscripciones VIP</li>
              <li>
                Asegurar la seguridad, prevenir el mal uso y cumplir con los
                requisitos legales
              </li>
              <li>
                Comunicarnos con usted sobre su cuenta, actualizaciones y
                soporte
              </li>
            </ol>
            Procesamos sus datos basándonos en el consentimiento, interés
            legítimo, necesidad contractual y obligación legal.
          </div>
        ),
      },
      {
        title: "4. Consentimiento y datos sensibles",
        content: (
          <p className={textClass}>
            Algunos datos que comparte se consideran sensibles según el RGPD,
            como religión, salud u opiniones políticas. Los proporciona
            voluntariamente y puede optar por no compartirlos. Al enviar estos
            datos, nos da su consentimiento explícito para usarlos con fines de
            emparejamiento. Puede retirar su consentimiento o
            actualizar/eliminar estos datos en cualquier momento desde la
            configuración de su cuenta.
          </p>
        ),
      },
      {
        title: "5. Cómo protegemos sus datos",
        content: (
          <p className={textClass}>
            Tomamos la protección de datos muy en serio e implementamos medidas
            de seguridad adecuadas, incluyendo cifrado, servidores seguros y
            controles de acceso. Su información se almacena dentro del Área
            Económica Europea (EEE), salvo que se requiera lo contrario, en cuyo
            caso aplicamos salvaguardas legales. Nunca vendemos sus datos y solo
            los compartimos con socios de confianza (como servicios de pago o
            hosting) bajo acuerdos estrictos de confidencialidad.
          </p>
        ),
      },
      {
        title: "6. Sus derechos",
        content: (
          <p className={textClass}>
            Como usuario, tiene derecho a acceder, corregir, eliminar o
            restringir el uso de sus datos. También puede solicitar una copia de
            sus datos o oponerse a ciertos usos. Para ejercer estos derechos,
            envíe un correo a support@frenchcubawedding.com. Si cree que sus
            derechos han sido violados, puede presentar una queja ante la
            autoridad local de protección de datos.
          </p>
        ),
      },
      {
        title: "7. Retención de datos",
        content: (
          <p className={textClass}>
            Retenemos sus datos mientras use nuestros servicios o según sea
            necesario para cumplir con obligaciones legales. Si elimina su
            cuenta, borramos sus datos personales dentro de 30 días, salvo que
            se requiera retención por motivos legales u operativos.
          </p>
        ),
      },
      {
        title: "8. Cookies",
        content: (
          <p className={textClass}>
            Usamos cookies para mejorar su experiencia, recordar sus
            preferencias y analizar el uso. Puede administrar o desactivar
            cookies desde la configuración de su navegador. Más detalles están
            disponibles en nuestra Política de cookies.
          </p>
        ),
      },
      {
        title: "9. Cambios en esta política",
        content: (
          <p className={textClass}>
            Podemos actualizar esta Política de privacidad para reflejar cambios
            en la legislación o en nuestra forma de operar. Se le notificará
            sobre cambios significativos a través de la plataforma o por correo
            electrónico. La última versión siempre está disponible en
            www.frenchcubawedding.com/privacy.
          </p>
        ),
      },
      {
        title: "10. Contáctenos",
        content: (
          <p className={textClass}>
            Si tiene preguntas o inquietudes sobre esta Política de privacidad o
            cómo manejamos sus datos, comuníquese con{" "}
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
          <span className="font-bold">{t.effectiveDate}</span> <br />
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
