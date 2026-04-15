'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

interface ContactFormProps {
  dictionary: any;
}

const ContactForm = ({ dictionary }: ContactFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomeCognome: '',
    email: '',
    telefono: '',
    messaggio: '',
    privacyAccepted: false,
  });

  // Lock scroll when modal is open (Robust approach for mobile/iOS)
  useEffect(() => {
    let scrollY = 0;
    
    if (isModalOpen) {
      scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (top) {
        window.scrollTo(0, parseInt(top || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

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
    console.log('Form submitted:', formData);
  };

  const isFormValid = 
    formData.nomeCognome.trim() !== '' && 
    formData.email.trim() !== '' && 
    formData.messaggio.trim() !== '' && 
    formData.privacyAccepted;

  return (
    <section className="py-20 px-4 bg-[#F0F1EF] relative">
      <div className="max-w-[570px] mx-auto text-center mb-10">
        <h2 className="text-4xl md:text-[42px] font-bold text-[#5a5a5a] mb-4 tracking-premium uppercase whitespace-pre-line leading-[1.1]">
          {dictionary.contact.title}
        </h2>
        <p className="text-[#5a5a5a] text-base font-normal leading-relaxed whitespace-normal md:whitespace-nowrap">
          {dictionary.contact.subtitle}
        </p>
      </div>

      <div className="max-w-[570px] mx-auto">
        <form 
          onSubmit={(e) => {
            if (!isFormValid) {
              e.preventDefault();
              return;
            }
            handleSubmit(e);
          }} 
          className="space-y-4"
        >
          <div className="space-y-4">
            <input
              type="text"
              name="nomeCognome"
              placeholder={dictionary.contact.name}
              required
              value={formData.nomeCognome}
              onChange={handleChange}
              className="w-full p-4 bg-[#F0F1EF] border border-[#5a5a5a] focus:outline-none transition-all placeholder:text-[#5a5a5a] placeholder:font-normal font-normal text-base"
            />
            
            <input
              type="email"
              name="email"
              placeholder={dictionary.contact.email}
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 bg-[#F0F1EF] border border-[#5a5a5a] focus:outline-none transition-all placeholder:text-[#5a5a5a] placeholder:font-normal font-normal text-base"
            />

            <input
              type="tel"
              name="telefono"
              placeholder={dictionary.contact.phone}
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-4 bg-[#F0F1EF] border border-[#5a5a5a] focus:outline-none transition-all placeholder:text-[#5a5a5a] placeholder:font-normal font-normal text-base"
            />

            <div className="relative group">
              <textarea
                name="messaggio"
                placeholder={dictionary.contact.message}
                required
                rows={5}
                value={formData.messaggio}
                onChange={handleChange}
                className="w-full p-4 bg-[#F0F1EF] border border-[#5a5a5a] focus:outline-none transition-all placeholder:text-[#5a5a5a] placeholder:font-normal font-normal text-base resize-none"
              />
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-4 right-4 p-2 text-[#5a5a5a] hover:bg-[#5a5a5a]/10 transition-colors rounded-full cursor-pointer"
                title="Espandi messaggio"
              >
                <Maximize2 size={18} />
              </button>
            </div>
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
            <label htmlFor="privacy" className="text-[#5a5a5a] text-sm leading-snug cursor-pointer font-normal">
              {dictionary.contact.privacy}
            </label>
          </div>

          <div className="pt-4">
            <motion.button
              whileHover={isFormValid ? { scale: 1.01, backgroundColor: '#4a4a4a' } : {}}
              whileTap={isFormValid ? { scale: 0.99 } : {}}
              type="submit"
              className={`bg-[#5a5a5a] text-white py-4 px-12 tracking-premium font-medium text-xs transition-all uppercase ${
                !isFormValid ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {dictionary.contact.submit}
            </motion.button>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-0 md:p-8 overflow-hidden touch-none"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#F0F1EF] w-full h-[100dvh] md:h-[70vh] md:max-w-4xl flex flex-col border-0 md:border md:border-[#5a5a5a] relative shadow-2xl overflow-hidden"
            >
              {/* Header - No touch scroll */}
              <div className="flex justify-end p-6 md:p-8 pb-2 md:pb-4 flex-shrink-0 touch-none">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-[#5a5a5a] hover:bg-[#5a5a5a]/10 transition-colors rounded-full cursor-pointer"
                >
                  <X size={28} />
                </button>
              </div>
              
              {/* Textarea - Isolated scroll */}
              <div className="flex-1 min-h-0 px-6 md:px-8">
                <textarea
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleChange}
                  placeholder={dictionary.contact.message}
                  className="w-full h-full p-6 bg-[#F5F5F3] border border-[#5a5a5a] focus:outline-none transition-all placeholder:text-[#5a5a5a] placeholder:font-normal font-normal text-lg md:text-xl resize-none leading-relaxed overflow-y-auto overscroll-contain"
                  autoFocus
                />
              </div>
              
              {/* Footer - No touch scroll */}
              <div className="p-6 md:p-8 pt-4 md:pt-6 flex justify-end pb-safe flex-shrink-0 touch-none">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#5a5a5a] text-white py-5 px-10 tracking-premium font-medium text-sm transition-all uppercase w-full md:w-auto shadow-lg"
                >
                  Conferma
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactForm;
