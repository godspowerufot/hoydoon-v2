'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
<section
  className={`bg-[#F4F4F4] max-md:w-full lg:w-[440px] 2xl:w-[34rem] rounded-[20px] shadow-md p-6 2xl:p-9 mx-auto transition-all duration-500 ease-in-out ${
    openIndex === 0 ? 'h-auto min-h-[450px]' : 'h-[420px]'
  }`}
>
      <h2 className="text-[25px] font-[500] text-[#1E1E1E]  mt-2">
        Find Your Answers Here
      </h2>
      <div className="space-y-4  ">
        {faqs.map((faq, index) => (
          <div key={index} className='mt-[22px]'>
            {/* Question Button */}
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full focus:outline-none text-left"
            >
              <h3 className=" text-[18px]   2xl:text-xl my-[5px] font-[400] text-gray-800">
                {faq.question}
              </h3>
              <span className="text-gray-500">
                {openIndex === index ?  
                <Image
                              alt="logo"
                              width={15}  
                              priority
                              quality={100}
                              objectFit='cover'
                              height={15} // Reduced size of logo
                              src={'/minus.png'}
                            /> :  <Image
                                          alt="logo"
                                          width={15}  
                                          priority
                                          quality={100}
                                          objectFit='cover'
                                          height={15} // Reduced size of logo
                                          src={'/plus.png'}
                                        />}
              </span>
            </button>

            {/* horizontal 
             */}
        {/* horizontal line, only if not last item */}
{index !== faqs.length - 1 && (
  <div className="w-full h-[2px] bg-[#D9D9D9]" />
)}


            {/* Answer Section */}
            {openIndex === index && (
              <div className={`mt-2 font-[400] text-[15px]  text-[#8F8F8F] ${index !== faqs.length - 1 && "mb-6"} `}>
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
