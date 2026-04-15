"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ChevronLeft } from "lucide-react";

// TODO: sostituire con valori reali
const WHATSAPP_NUMBER = "39XXXXXXXXXX"; // es. 393331234567
const MESSENGER_PAGE = "StudioSanDamianoMilano";
const SMS_NUMBER = "+39XXXXXXXXXX";

type View = "menu" | "sms" | "whatsapp" | "messenger";

const WAIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="white" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MSGIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="white" width={size} height={size}>
    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
  </svg>
);

const SMSIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="white" width={size} height={size}>
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z" />
  </svg>
);

const panelVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

function PanelHeader({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  return (
    <div className="bg-gradient-to-br from-[#43d854] to-[#1faa2f] px-4 py-5 flex items-start gap-3">
      <button onClick={onBack} className="mt-0.5 text-white/80 hover:text-white transition-colors shrink-0">
        <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
      </button>
      <p className="text-white font-bold text-lg leading-snug font-open-sans flex-1">
        Ciao,<br />come possiamo aiutarti?
      </p>
      <button onClick={onClose} className="mt-0.5 text-white/80 hover:text-white transition-colors shrink-0">
        <X className="w-5 h-5" strokeWidth={2} />
      </button>
    </div>
  );
}

function QRPlaceholder({ color, Icon }: { color: string; Icon: React.ComponentType<{ size?: number }> }) {
  return (
    <div className="relative w-[160px] h-[160px] mx-auto my-4 border border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
      {/* Fake QR pattern */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-px p-2 opacity-15">
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} className={`rounded-[1px] ${Math.random() > 0.45 ? "bg-black" : "bg-transparent"}`} />
        ))}
      </div>
      {/* Center brand icon */}
      <div className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-md" style={{ background: color }}>
        <Icon size={22} />
      </div>
    </div>
  );
}

function MenuView({ onSelect }: { onSelect: (v: View) => void }) {
  const channels = [
    { id: "sms" as View, label: "SMS", bg: "#FF9500", Icon: SMSIcon },
    { id: "whatsapp" as View, label: "WhatsApp", bg: "#25D366", Icon: WAIcon },
    { id: "messenger" as View, label: "Messenger", bg: "#0084FF", Icon: MSGIcon },
  ];
  return (
    <div className="p-4 grid grid-cols-2 gap-3">
      {channels.map(({ id, label, bg, Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className="flex flex-col items-center gap-2 border border-gray-100 rounded-xl py-4 px-3 hover:bg-gray-50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: bg }}>
            <Icon size={24} />
          </div>
          <span className="text-sm font-semibold text-gray-700 font-open-sans">{label}</span>
        </button>
      ))}
    </div>
  );
}

function SMSView() {
  const [form, setForm] = useState({ nome: "", telefono: "", messaggio: "", privacy: false });
  const isValid = form.nome && form.telefono && form.messaggio && form.privacy;

  const handleSubmit = () => {
    if (!isValid) return;
    window.open(`sms:${SMS_NUMBER}?body=${encodeURIComponent(`Nome: ${form.nome}\n${form.messaggio}`)}`, "_self");
  };

  return (
    <div className="px-5 pt-5 pb-6">
      <p className="font-bold text-gray-800 text-base mb-4 font-open-sans">Ti ricontatteremo tramite SMS.</p>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 font-open-sans mb-1 block">Nome</label>
          <input
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#25D366] transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 font-open-sans mb-1 block">Numero di telefono</label>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#25D366] transition-colors">
            <span className="px-3 py-2.5 text-sm border-r border-gray-200 bg-gray-50 text-gray-600 shrink-0">🇮🇹 +39</span>
            <input
              type="tel"
              placeholder="3XX XXX XXXX"
              value={form.telefono}
              onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value }))}
              className="flex-1 px-3 py-2.5 text-sm text-gray-700 outline-none bg-transparent"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-open-sans mb-1 block">Il tuo messaggio</label>
          <textarea
            placeholder="Hai una domanda?"
            value={form.messaggio}
            onChange={(e) => setForm((p) => ({ ...p, messaggio: e.target.value }))}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#25D366] transition-colors resize-none"
          />
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.privacy}
            onChange={(e) => setForm((p) => ({ ...p, privacy: e.target.checked }))}
            className="mt-0.5 accent-[#25D366]"
          />
          <span className="text-[11px] text-gray-500 leading-snug font-open-sans">
            Spuntando questa casella, acconsenti a ricevere messaggi SMS. Per ulteriori informazioni, consulta la nostra{" "}
            <a href="#" className="text-[#0084FF] underline">informativa sulla privacy</a>.
          </span>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="mt-4 w-full py-3 rounded-lg text-sm font-bold font-open-sans text-white transition-colors"
        style={{ background: isValid ? "#25D366" : "#d1d5db" }}
      >
        Invia un messaggio
      </button>
    </div>
  );
}

function QRView({ channel }: { channel: "whatsapp" | "messenger" }) {
  const config = {
    whatsapp: {
      label: "WhatsApp",
      color: "#25D366",
      Icon: WAIcon,
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      btnLabel: "WhatsApp Web",
    },
    messenger: {
      label: "Messenger",
      color: "#0084FF",
      Icon: MSGIcon,
      href: `https://m.me/${MESSENGER_PAGE}`,
      btnLabel: "Messenger Web",
    },
  }[channel];

  return (
    <div className="px-5 pt-5 pb-6 text-center">
      <p className="text-sm text-gray-600 font-open-sans leading-relaxed">
        Scansiona il QR code per inviare<br />
        un messaggio dal tuo cellulare su<br />
        <strong>{config.label}</strong>.
      </p>
      <QRPlaceholder color={config.color} Icon={config.Icon} />
      <p className="text-sm text-[#0084FF] font-open-sans mb-3">Oppure</p>
      <a
        href={config.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full border border-gray-200 rounded-lg py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors font-open-sans"
      >
        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: config.color }}>
          <config.Icon size={12} />
        </div>
        {config.btnLabel}
      </a>
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("menu");

  const close = () => { setIsOpen(false); setTimeout(() => setView("menu"), 300); };
  const back = () => setView("menu");

  return (
    <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden w-[300px] origin-bottom-right"
          >
            {/* Header verde solo per sotto-viste */}
            <AnimatePresence mode="wait" initial={false}>
              {view !== "menu" && (
                <motion.div key="header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <PanelHeader onBack={back} onClose={close} />
                </motion.div>
              )}
              {view === "menu" && (
                <motion.div key="menu-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="bg-gradient-to-br from-[#43d854] to-[#1faa2f] px-5 py-5 flex items-start justify-between">
                    <p className="text-white font-bold text-lg leading-snug font-open-sans">
                      Ciao,<br />come possiamo aiutarti?
                    </p>
                    <button onClick={close} className="mt-0.5 text-white/80 hover:text-white transition-colors">
                      <X className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Body */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={view} variants={panelVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
                {view === "menu" && <MenuView onSelect={setView} />}
                {view === "sms" && <SMSView />}
                {view === "whatsapp" && <QRView channel="whatsapp" />}
                {view === "messenger" && <QRView channel="messenger" />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottone trigger */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileTap={{ scale: 0.88 }}
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        aria-label={isOpen ? "Chiudi chat" : "Contattaci"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
