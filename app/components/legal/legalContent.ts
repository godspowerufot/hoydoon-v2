export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  image?: {
    src: string;
    alt: string;
  };
};

export type LegalPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  heroImagePosition?: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};

export const TERMS_CONTENT: LegalPageContent = {
  eyebrow: "Legal",
  title: "Terms of use",
  description:
    "These terms govern your access to and use of Hoydoon, including browsing listings, creating an account, and communicating on the platform.",
  heroImage:
    "https://hoydoonstorage.blob.core.windows.net/web-images/terms.png",
  heroImageAlt: "Hoydoon terms and conditions",
  heroImagePosition: "object-[50%_35%] md:object-[50%_30%]",
  lastUpdated: "October 20, 2025",
  intro: [
    "Welcome to Hoydoon (the “Website”). These Terms and Conditions (“Terms”) govern your use of www.hoydoon.com and any related services provided through the site. By accessing or using Hoydoon, you agree to comply with and be bound by these Terms. If you do not agree, please do not use this website.",
  ],
  sections: [
    {
      id: "about-hoydoon",
      title: "About Hoydoon",
      paragraphs: [
        "Hoydoon is a property listing and discovery platform designed to connect individuals and businesses looking to buy, sell, or rent property. We provide tools to browse listings, communicate with other users, and access information about available homes and spaces.",
        "Hoydoon does not own, manage, or sell properties listed on the platform. All listings are created and managed by independent users or agents.",
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility",
      paragraphs: ["To use Hoydoon, you must:"],
      bullets: [
        "Be at least 18 years of age (or the legal age of majority in your country).",
        "Have the authority to enter into binding agreements.",
        "Provide accurate and up-to-date information when creating an account or submitting listings.",
      ],
    },
    {
      id: "user-accounts",
      title: "User accounts",
      paragraphs: [
        "Users may need to create an account to access certain features of the website. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
        "Hoydoon reserves the right to suspend or terminate accounts that violate these Terms or our Community Guidelines.",
      ],
    },
    {
      id: "property-listings",
      title: "Property listings",
      paragraphs: [
        "By posting a listing on Hoydoon, you agree that all information you provide—including photos, pricing, and descriptions—is accurate and lawful, that you have the legal right to advertise the property, and that you’ll update or remove the listing once it’s no longer available. You also acknowledge that Hoydoon may edit, reject, or remove any listing that violates our Terms, policies, or applicable law.",
        "Hoydoon reserves the right to suspend or terminate accounts that violate these Terms or our Community Guidelines.",
      ],
    },
    {
      id: "terms-visual-1",
      title: "",
      paragraphs: [],
      image: {
        src: "/terms3.png",
        alt: "People reviewing property information together",
      },
    },
    {
      id: "user-responsibilities",
      title: "User responsibilities",
      paragraphs: [
        "You agree not to post any false, misleading, or fraudulent information, use the website for illegal or harmful activities, or engage in behavior that harasses, abuses, or sends inappropriate messages to other users. You also agree not to attempt to damage, hack, or interfere with the proper functioning of the website in any way. Violating these rules may lead to suspension or permanent removal of your account.",
      ],
    },
    {
      id: "communication",
      title: "Communication between users",
      paragraphs: [
        "Hoydoon offers a secure communication channel for buyers, sellers, and agents to connect and conduct business. Users are solely responsible for their conversations and are expected to maintain a respectful and professional tone at all times. Personal, financial, or sensitive information should never be shared outside the platform to ensure safety and privacy. Although Hoydoon does not actively monitor all messages, it reserves the right to review, investigate, and take appropriate action in response to any reports of abuse, harassment, or misuse.",
      ],
    },
    {
      id: "fees-payments",
      title: "Fees and payments",
      paragraphs: [
        "Most of Hoydoon’s services are free to use, allowing users to browse and connect without cost. However, certain premium features, promotional listings, or optional upgrades may come with associated fees. All fees will be clearly presented before you make a purchase, ensuring full transparency. Payments are handled securely through trusted third-party payment providers to protect your financial information. Please note that all payments are final and non-refundable unless a refund is required by applicable law or specific policy exceptions.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      paragraphs: [
        "All content on the Hoydoon website, including its logos, designs, text, graphics, and overall layout, is the property of Hoydoon or its licensors and is protected by applicable intellectual property laws. Users are not permitted to copy, reproduce, modify, or distribute any part of the website or its materials without prior written permission from Hoydoon. Any unauthorized use of this content is strictly prohibited and may result in legal action.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy",
      paragraphs: [
        "Your use of Hoydoon is governed by our Privacy Policy, which details how we collect, use, store, and protect your personal information. This includes information you provide directly, as well as data gathered through your use of the platform. By accessing or using Hoydoon, you acknowledge and consent to the data practices described in our Privacy Policy, including the use of your information to enhance user experience, maintain platform security, and deliver personalized services. We are committed to safeguarding your privacy and handling your data responsibly in accordance with applicable laws and regulations.",
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      paragraphs: [
        "Hoydoon provides its services on an “as is” basis, without any warranties or guarantees of any kind. While we strive to maintain a reliable and accurate platform, we do not guarantee the accuracy, completeness, or reliability of any listings, user information, or property-related content. We also cannot ensure that the website will always be available, error-free, or completely secure. All use of the Hoydoon platform and its services is at your own risk, and users are encouraged to verify information independently before making any property-related decisions or transactions.",
      ],
    },
    {
      id: "terms-visual-2",
      title: "",
      paragraphs: [],
      image: {
        src: "/terms2.png",
        alt: "Modern home exterior",
      },
    },
    {
      id: "limitation-liability",
      title: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, Hoydoon shall not be held responsible for any indirect, incidental, or consequential damages resulting from your use of the website or its services. This includes, but is not limited to, loss of data, profits, goodwill, or business opportunities. In any case, Hoydoon’s total liability for any claim arising from your use of the platform will not exceed the total amount you have paid (if any) to Hoydoon within the 12 months prior to the event giving rise to the claim.",
      ],
    },
    {
      id: "termination",
      title: "Termination",
      paragraphs: [
        "Hoydoon reserves the right to suspend or permanently terminate your access to the website at any time if you violate these Terms, engage in fraudulent activity, or misuse the platform in any way. Such actions may be taken without prior notice and can include the removal of your listings, restriction of account features, or complete deactivation of your account to maintain the integrity and safety of the platform.",
      ],
    },
    {
      id: "updates",
      title: "Updates to these terms",
      paragraphs: [
        "Hoydoon reserves the right to update or modify these Terms at any time to reflect changes in our services, policies, or legal requirements. Any updates will be posted on this page, along with a revised “Last Updated” date for transparency. By continuing to access or use the website after such changes are made, you acknowledge and agree to be bound by the updated Terms. Users are encouraged to review this page periodically to stay informed of any modifications.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      paragraphs: [
        "These Terms shall be governed by and interpreted in accordance with the laws of the Federal Republic of Nigeria and the Federal Republic of Somalia, without regard to conflict of law principles.",
        "In the event of any dispute, claim, or controversy arising from or relating to your use of Hoydoon, such matters shall be subject to the exclusive jurisdiction of the competent courts in Nigeria or Somalia, depending on the user’s country of residence.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      paragraphs: [
        "If you have any questions about these Terms or our policies, contact us through our help center or email support@hoydoon.com.",
        "By using Hoydoon, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.",
      ],
    },
  ],
};

export const PRIVACY_CONTENT: LegalPageContent = {
  eyebrow: "Legal",
  title: "Privacy policy",
  description:
    "Learn how Hoydoon collects, uses, shares, and protects your personal information when you use our website and mobile application.",
  heroImage: "/policy.jpg",
  heroImageAlt: "Hoydoon privacy policy",
  heroImagePosition: "object-[50%_35%] md:object-[50%_30%]",
  lastUpdated: "October 20, 2025",
  intro: [
    "At Hoydoon, your privacy is very important to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website (www.hoydoon.com) or mobile application (together, the “Platform”). By using Hoydoon, you agree to the terms of this Privacy Policy.",
  ],
  sections: [
    {
      id: "information-collected",
      title: "Information we collect",
      paragraphs: [
        "We collect both personal and non-personal information to deliver our services effectively, improve your experience, and maintain the smooth operation of the Hoydoon platform.",
        "This includes information you provide directly, such as your name, email address, phone number, and account login details. When creating or managing property listings, we may also collect listing-related information like photos, descriptions, and prices, as well as any messages exchanged through our platform. If you use premium or paid features, we may collect relevant payment or billing details to process transactions securely.",
        "We also collect certain information automatically when you visit our website or app. This may include your device type, browser details, IP address, and location data (if enabled). Additionally, we gather data about your activity on the platform—such as pages visited, time spent, and actions taken—along with insights from cookies and similar technologies, as described in the cookies section below.",
        "In some cases, we may receive information from third-party sources to help us improve our services and user experience. These sources may include payment processors, analytics providers, and social login services such as Google or Apple, when you choose to sign in through those accounts.",
      ],
    },
    {
      id: "how-we-use",
      title: "How we use your information",
      paragraphs: [
        "We use the information we collect to provide, manage, and improve your experience on Hoydoon. This includes creating and maintaining your account, processing listings, handling inquiries, and managing payments securely. We also use your data to send important alerts, notifications, or updates related to your activity on the platform.",
        "Your information helps us enhance the functionality, reliability, and performance of our services while preventing fraud, misuse, or security breaches. In addition, we may contact you with details about new features, special offers, or updates to our policies and terms.",
        "Hoydoon only uses your personal data for these stated purposes and always in compliance with applicable data protection and privacy laws.",
      ],
    },
    {
      id: "how-we-share",
      title: "How we share your information",
      paragraphs: [
        "We may share your information only when necessary to operate and protect the Hoydoon platform. This includes sharing details with other users when you interact with listings or messages, and with trusted service providers such as payment processors, hosting partners, and analytics tools that help us run and improve our services.",
        "We may also disclose information when required by law or during a business transaction like a merger, acquisition, or asset transfer. Hoydoon values your privacy and will never sell your personal data to third parties.",
      ],
    },
    {
      id: "privacy-visual-1",
      title: "",
      paragraphs: [],
      image: {
        src: "/policy2.jpg",
        alt: "Secure digital experience on a laptop",
      },
    },
    {
      id: "data-retention",
      title: "Data retention",
      paragraphs: [
        "We retain your information only for as long as needed to deliver our services, meet legal requirements, resolve disputes, or enforce our agreements. Once this period ends, your data is securely deleted or anonymized.",
        "You may request the deletion of your account and any associated information at any time by contacting us through the details provided in the contact section.",
      ],
    },
    {
      id: "security",
      title: "Security of your information",
      paragraphs: [
        "We employ a range of administrative, technical, and physical safeguards to protect your personal information from unauthorized access, loss, misuse, or disclosure. These measures include secure data storage, encryption, access controls, and regular monitoring to help maintain the safety and integrity of our systems.",
        "While we are committed to maintaining a high standard of security, no platform or transmission over the internet can be completely guaranteed to be secure. By using Hoydoon, you acknowledge this limitation and agree that you share information at your own discretion and risk.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      paragraphs: [
        "Depending on your country or region, you may have certain rights regarding your personal information. These may include the right to access the data we hold about you, request corrections to inaccurate information, or ask for your personal data to be deleted. You may also have the right to withdraw consent for specific processing activities or request a copy of your data in a portable format for your own use.",
        "To exercise any of these rights or make a related inquiry, please contact us at support@hoydoon.com, and our team will assist you in accordance with applicable data protection laws.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and tracking technologies",
      paragraphs: [
        "Hoydoon uses cookies and similar technologies to enhance your experience on the platform. These tools help us remember your preferences and settings, analyze how the website is used, and continuously improve overall performance and usability.",
        "You can manage or disable cookies at any time through your browser or device settings. However, please note that certain features or functions of the platform may not work properly if cookies are turned off.",
      ],
    },
    {
      id: "privacy-visual-2",
      title: "",
      paragraphs: [],
      image: {
        src: "/policy3.png",
        alt: "Family reviewing documents at home",
      },
    },
    {
      id: "children",
      title: "Children’s privacy",
      paragraphs: [
        "Hoydoon is intended for use only by individuals who are 18 years of age or older. Our services are not directed toward children, and we do not knowingly collect, store, or process personal information from anyone under 18. If it comes to our attention that a minor has provided personal data through our platform, we will take immediate steps to delete the information and restrict further access.",
        "If you believe that a child has shared personal details with us, please contact us as soon as possible so we can investigate and ensure the data is safely removed.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      paragraphs: [
        "If you have any questions about this Privacy Policy or how we handle your data, contact us at support@hoydoon.com or submit a request through our help center.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may revise or update this Privacy Policy periodically to reflect changes in our services, legal requirements, or data practices. Whenever updates are made, the “Last Updated” date at the top of this page will be revised to indicate the most recent version.",
        "By continuing to use Hoydoon after any updates are posted, you acknowledge and agree to the terms of the updated Privacy Policy. We encourage users to review this page regularly to stay informed about how we protect and handle personal information.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      paragraphs: [
        "This Privacy Policy is governed by the laws of Nigeria and Somalia, without regard to conflict of law principles. Any disputes will be resolved in the competent courts of these jurisdictions.",
        "By using Hoydoon, you acknowledge that you have read, understood, and agreed to this Privacy Policy.",
      ],
    },
  ],
};
