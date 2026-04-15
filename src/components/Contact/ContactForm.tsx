'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactFormProps {
  dictionary: any;
}

const ContactForm = ({ dictionary }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    nomeCognome: '',
    email: '',
    telefono: '',
    messaggio: '',
    privacyAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 px-4 bg-[#F0F1EF]">
      <div className="max-w-[570px] mx-auto text-center mb-10">
        <h2 className="text-4xl md:text-[42px] font-bold text-[#5a5a5a] mb-4 tracking-premium uppercase whitespace-pre-line leading-[1.1]">
          {dictionary.contact.title}
        </h2>
        <p className="text-[#5a5a5a] text-base max-w-[450px] mx-auto font-light leading-relaxed">
          {dictionary.contact.subtitle}
        </p>
      </div>

      <div className="max-w-[570px] mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <input
              type="text"
              name="nomeCognome"
              placeholder={dictionary.contact.name}
              required
              value={formData.nomeCognome}
              onChange={handleChange}
              className="w-full p-4 bg-[#F0F1EF] border border-[#5a5a5a] focus:outline-none transition-all placeholder:text-[#5a5a5a] font-light text-sm"
            />
            
            <input
              type="email"
              name="email"
              placeholder={dictionary.contact.email}
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 bg-[#F0F1EF] border border-[#5a5a5a] focus:outline-none transition-all placeholder:text-[#5a5a5a] font-light text-sm"
            />

            <input
              type="tel"
              name="telefono"
              placeholder={dictionary.contact.phone}
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-4 bg-[#F0F1EF] border border-[#5a5a5a] focus:outline-none transition-all placeholder:text-[#5a5a5a] font-light text-sm"
            />

            <textarea
              name="messaggio"
              placeholder={dictionary.contact.message}
              required
              rows={5}
              value={formData.messaggio}
              onChange={handleChange}
              className="w-full p-4 bg-[#F0F1EF] border border-[#5a5a5a] focus:outline-none transition-all placeholder:text-[#5a5a5a] font-light text-sm resize-none"
            />
          </div>

          <div className="flex items-start gap-3 mt-6">
            <div className="relative flex items-center h-5">
              <input
                type="checkbox"
                id="privacy"
                name="privacyAccepted"
                required
                checked={formData.privacyAccepted}
                onChange={handleChange}
                className="h-4 w-4 rounded border-[#5a5a5a] text-[#5a5a5a] focus:ring-[#5a5a5a] cursor-pointer"
              />
            </div>
            <label htmlFor="privacy" className="text-[#5a5a5a] text-[12px] leading-snug cursor-pointer font-light">
              {dictionary.contact.privacy}
            </label>
          </div>

          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.01, backgroundColor: '#4a4a4a' }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="bg-[#5a5a5a] text-white py-4 px-12 tracking-premium font-medium text-xs transition-all uppercase"
            >
              {dictionary.contact.submit}
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
