'use client';

import React, { useState } from 'react';

const FAQComponent: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What services do you offer?',
      answer:
        'We offer a wide range of real estate services, including buying and selling properties, property management, and investment consultation.',
    },
    {
      question: 'Are there hidden fees?',
      answer:
        'No, we ensure transparency in all our transactions. Any fees will be communicated upfront.',
    },
    {
      question: 'What is the process of buying a property?',
      answer:
        'The process involves consultation, property selection, legal formalities, and finalizing the transaction.',
    },
    {
      question: 'Do you offer properties for commercial use?',
      answer: 'Yes, we have a variety of properties suitable for commercial use.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can contact our support team via phone, email, or the live chat option on our website.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-white max-md:w-full rounded-lg shadow-md p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Find Your Answers Here
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            {/* Question Button */}
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full focus:outline-none text-left"
            >
              <h3 className="text-base font-medium text-gray-800">
                {faq.question}
              </h3>
              <span className="text-gray-500">
                {openIndex === index ? '-' : '+'}
              </span>
            </button>

            {/* Answer Section */}
            {openIndex === index && (
              <div className="mt-2 text-sm text-gray ">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQComponent;
