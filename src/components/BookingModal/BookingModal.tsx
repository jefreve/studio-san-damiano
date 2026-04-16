"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Info, ArrowLeft, ArrowRight, CheckCircle, ChevronRight, ChevronDown, User, Calendar } from "lucide-react";

type Step = "home" | "services" | "datetime" | "doctor" | "contact" | "confirm";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  initials: string;
  photo: string;
}

interface ContactForm {
  nome: string;
  cognome: string;
  prefix: string;
  phone: string;
  email: string;
  assicurazione: string;
  note: string;
}

const SERVICES: Service[] = [
  { id: "S1", name: "Consultazione Medicina Estetica", description: "Visita e piano di trattamento personalizzato", duration: "30 min" },
  { id: "S2", name: "Visita Odontoiatrica",            description: "Controllo completo della salute orale",       duration: "45 min" },
  { id: "S3", name: "Igiene Orale Professionale",      description: "Pulizia professionale e levigatura",          duration: "60 min" },
  { id: "S4", name: "Consultazione Eaglegrid®",        description: "Trattamento ortodontico avanzato",            duration: "45 min" },
  { id: "S5", name: "Filler / Botox / Bio",            description: "Trattamenti di medicina estetica",            duration: "30 min" },
];

const DOCTORS: Doctor[] = [
  { id: "D01", name: "Dott.ssa Silvia Bonfiglio", specialty: "Co-Founder",                                    initials: "SB", photo: "/equipe-medica/dottssa-silvia-bonfiglio.jpg"   },
  { id: "D02", name: "Dott. Mario V. Longo",       specialty: "Medico Chirurgo · Founder",                    initials: "ML", photo: "/equipe-medica/dott-mario-v-longo.jpg"          },
  { id: "D03", name: "Dott.ssa Ozana G. Cristea",  specialty: "Odontoiatra",                                  initials: "OC", photo: "/equipe-medica/dottssa-ozana-g-cristea.webp"   },
  { id: "D04", name: "Dott. Alessandro Sorrenti",  specialty: "Odontoiatra",                                  initials: "AS", photo: "/equipe-medica/dott-alessandro-sorrenti.jpg"   },
  { id: "D05", name: "Dott. Gianluca Marzorati",   specialty: "Odontoiatra",                                  initials: "GM", photo: "/equipe-medica/dott-gianluca-marzorati.png"    },
  { id: "D06", name: "Dott. Roberto Logozzo",      specialty: "Odontoiatra · Ortodonzia e Gnatologia",        initials: "RL", photo: "/equipe-medica/dott-roberto-logozzo.webp"      },
  { id: "D07", name: "Dott.ssa Vittoria Risso",    specialty: "Odontoiatra",                                  initials: "VR", photo: "/equipe-medica/dottssa-vittoria-risso.webp"    },
  { id: "D08", name: "Dott. Roberto Berlusconi",   specialty: "Anestesia e Rianimazione",                     initials: "RB", photo: "/equipe-medica/dott-roberto-berlusconi.jpg"    },
  { id: "D09", name: "Dott.ssa Iole Cucinotto",    specialty: "Medico Chirurgo Oncologo · Medico Estetico",   initials: "IC", photo: "/equipe-medica/dottssa-iole-cucinotto.jpg"     },
  { id: "D10", name: "Dott.ssa Valeria Colombo",   specialty: "Medico Chirurgo Maxillo Facciale · Estetico",  initials: "VC", photo: "/equipe-medica/dottssa-valeria-colombo.jpg"    },
  { id: "D11", name: "Dott. Ruggero Tagliabue",    specialty: "Medico Chirurgo · Medicina Estetica",          initials: "RT", photo: "/equipe-medica/dott-ruggero-tagliabue.jpg"     },
];

const ASSICURAZIONI = [
  "UniSalute", "Previmedical", "Fasi", "Blu Assistance", "Altra assicurazione",
];

const TIME_SLOTS = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];
const DAY_LABELS  = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"];

function getDayLabel(i: number) {
  if (i === 0) return "OGGI";
  if (i === 1) return "DOMANI";
  const d = new Date(); d.setDate(d.getDate() + i);
  return DAY_LABELS[d.getDay()];
}
function getDateStr(i: number) {
  const d = new Date(); d.setDate(d.getDate() + i);
  return d.toLocaleDateString("it-IT", { day: "numeric", month: "short" }).replace(".", "");
}
function isSunday(i: number) {
  const d = new Date(); d.setDate(d.getDate() + i); return d.getDay() === 0;
}
function isAvailable(day: number, slot: number) {
  if (isSunday(day)) return false;
  if (slot === 0 && day < 2) return false;
  return (day * 5 + slot * 3) % 7 !== 1;
}

const EMPTY_FORM: ContactForm = { nome: "", cognome: "", prefix: "+39", phone: "", email: "", assicurazione: "", note: "" };

// ── Shared footer chips (steps 4 & 5) ────────────────────────────────────────
function FooterChips({ service, dateStr, time, onContinue }: {
  service: Service; dateStr: string; time: string | null; onContinue?: () => void;
}) {
  return (
    <div className="flex-shrink-0 border-t border-[#e0e0e0] px-6 py-4 flex items-center gap-2">
      <div className="flex items-center gap-1.5 bg-[#f0f0f0] px-3 py-1.5 min-w-0">
        <CheckCircle className="w-3.5 h-3.5 text-[#3d3d3d] flex-shrink-0" />
        <span className="text-[#1a1a1a] text-[11px] font-open-sans font-bold uppercase tracking-wider truncate max-w-[110px]">
          {service.name}
        </span>
      </div>
      {time && (
        <div className="flex items-center gap-1.5 bg-[#f0f0f0] px-3 py-1.5 flex-shrink-0">
          <CheckCircle className="w-3.5 h-3.5 text-[#3d3d3d] flex-shrink-0" />
          <span className="text-[#1a1a1a] text-[11px] font-open-sans font-bold uppercase tracking-wider whitespace-nowrap">
            {dateStr} · {time}
          </span>
        </div>
      )}
      {onContinue && (
        <button onClick={onContinue} className="ml-auto flex-shrink-0 w-8 h-8 bg-[#3d3d3d] text-white flex items-center justify-center hover:bg-black transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ── Summary row used in confirm step ─────────────────────────────────────────
function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-[#f0f0f0] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-open-sans font-bold uppercase tracking-[0.15em] text-[#aaaaaa]">{label}</p>
        <p className="font-raleway font-bold text-[#1a1a1a] text-base leading-snug">{value}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function BookingModal() {
  const [isOpen, setIsOpen]                   = useState(false);
  const [step, setStep]                       = useState<Step>("home");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [dateOffset, setDateOffset]           = useState(0);
  const [selectedDate, setSelectedDate]       = useState(0);
  const [selectedTime, setSelectedTime]       = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor]   = useState<Doctor | null>(null);
  const [form, setForm]                       = useState<ContactForm>(EMPTY_FORM);
  const [acceptedTerms, setAcceptedTerms]     = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    (window as any).rbOpenWidget = () => setIsOpen(true);
    (window as any).rbCloseWidget = () => setIsOpen(false);
    return () => { delete (window as any).rbOpenWidget; delete (window as any).rbCloseWidget; };
  }, []);

  const resetAll = () => {
    setStep("home"); setSelectedService(null); setSelectedTime(null);
    setDateOffset(0); setSelectedDate(0); setSelectedDoctor(null);
    setForm(EMPTY_FORM); setAcceptedTerms(false);
  };

  const handleClose = () => { setIsOpen(false); setTimeout(resetAll, 300); };

  const handleBack = () => {
    if (step === "contact") setStep("doctor");
    else if (step === "doctor") setStep("datetime");
    else if (step === "datetime") setStep("services");
    else if (step === "services") setStep("home");
  };

  const setField = (k: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const visibleDays = [0, 1, 2].map(i => dateOffset * 3 + i);
  const dateLabel   = getDateStr(selectedDate);

  const canSubmit = form.nome && form.cognome && form.phone && form.email && acceptedTerms;

  const inputCls = "w-full bg-[#f5f5f5] border border-[#e8e8e8] px-4 py-3.5 text-[#1a1a1a] text-sm font-open-sans placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#3d3d3d] transition-colors";
  const labelCls = "block text-[11px] font-open-sans font-bold uppercase tracking-[0.15em] text-[#3d3d3d] mb-2";

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center md:justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

          <div className="relative w-full h-full md:h-[640px] md:w-[480px] bg-white flex flex-col overflow-hidden shadow-2xl">

            {/* ── HEADER (hidden on confirm) ── */}
            {step !== "confirm" && (
              <div className="bg-[#3d3d3d] px-4 py-5 flex items-center justify-between flex-shrink-0">
                {step === "home" ? (
                  <div className="w-9" />
                ) : (
                  <button onClick={handleBack} className="w-9 h-9 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0">
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </button>
                )}
                <h2 className="flex-1 text-center text-white font-raleway font-semibold text-base tracking-wide">
                  Prenota il tuo appuntamento
                </h2>
                <button onClick={handleClose} className="w-9 h-9 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            )}

            {/* ── STEP: HOME ── */}
            {step === "home" && (
              <div className="flex-1 flex flex-col items-center justify-end px-8 pb-16 pt-8 gap-4">
                <button onClick={() => setStep("services")} className="w-full bg-[#3d3d3d] text-white py-[18px] font-raleway font-bold text-base tracking-wide hover:bg-black transition-colors">
                  Prenota Ora
                </button>
                <button className="w-full bg-white text-[#5a5a5a] py-[18px] font-raleway font-semibold text-base border border-[#e0e0e0] hover:bg-[#f5f5f5] transition-colors">
                  Area Personale
                </button>
                <Info className="w-[18px] h-[18px] text-[#c0c0c0] mt-1" />
                <div className="mt-10">
                  <Image src="/san-damiano-assets/logo-sito-studio-san-damiano-1.png" alt="Studio San Damiano" width={160} height={56} className="object-contain opacity-40 grayscale" />
                </div>
              </div>
            )}

            {/* ── STEP: SERVICES ── */}
            {step === "services" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-6 pt-6 pb-2 flex-shrink-0">
                  <h3 className="text-[#1a1a1a] font-raleway font-bold text-xl">Scegli un servizio</h3>
                </div>
                <div className="flex-1 overflow-y-auto px-6 pb-8 pt-2 space-y-3">
                  {SERVICES.map(service => (
                    <button key={service.id} onClick={() => { setSelectedService(service); setStep("datetime"); }}
                      className="w-full text-left border border-[#e0e0e0] px-5 py-4 hover:border-[#3d3d3d] hover:shadow-sm transition-all">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-raleway font-bold text-[#1a1a1a] text-base leading-snug">{service.name}</p>
                          <p className="text-[#777777] text-sm mt-1 font-open-sans leading-snug">{service.description}</p>
                        </div>
                        <span className="flex-shrink-0 bg-[#f0f0f0] text-[#777777] text-xs font-open-sans font-medium px-3 py-1 mt-0.5">{service.duration}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP: DATETIME ── */}
            {step === "datetime" && selectedService && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-6 pt-5 pb-3 flex-shrink-0 flex items-center gap-3">
                  <h3 className="font-raleway font-bold text-xl text-[#1a1a1a]">Scegli data e orario</h3>
                  <span className="bg-[#f0f0f0] text-[#777777] text-xs font-open-sans font-semibold px-3 py-1 tracking-wider">{selectedService.duration.toUpperCase()}</span>
                </div>
                <div className="mx-6 border-t border-[#e0e0e0]" />

                {/* Date headers — arrows flank a 3-col grid */}
                <div className="flex-shrink-0 px-4 pt-4 pb-3 flex items-center">
                  <button
                    onClick={() => { if (dateOffset > 0) { setDateOffset(d => d - 1); setSelectedTime(null); } }}
                    disabled={dateOffset === 0}
                    className={`w-9 h-9 flex-shrink-0 border flex items-center justify-center transition-colors ${dateOffset === 0 ? "border-[#e0e0e0] opacity-25 cursor-not-allowed" : "border-[#e0e0e0] hover:border-[#3d3d3d]"}`}
                  >
                    <ArrowLeft className="w-4 h-4 text-[#3d3d3d]" />
                  </button>
                  <div className="flex-1 grid grid-cols-3">
                    {visibleDays.map(absIdx => (
                      <button key={absIdx} onClick={() => { setSelectedDate(absIdx); setSelectedTime(null); }}
                        className={`flex flex-col items-center py-2 transition-colors ${selectedDate === absIdx ? "bg-[#f0f0f0]" : "hover:bg-[#f5f5f5]"}`}>
                        <span className="text-[10px] font-open-sans font-semibold text-[#aaaaaa] tracking-wider mb-1">{getDayLabel(absIdx)}</span>
                        <span className={`text-sm font-raleway font-bold ${isSunday(absIdx) ? "text-[#cccccc]" : "text-[#1a1a1a]"}`}>{getDateStr(absIdx)}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => { setDateOffset(d => d + 1); setSelectedTime(null); }}
                    className="w-9 h-9 flex-shrink-0 border border-[#e0e0e0] flex items-center justify-center hover:border-[#3d3d3d] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-[#3d3d3d]" />
                  </button>
                </div>

                <div className="mx-6 border-t border-[#e0e0e0]" />

                {/* Time slots — same w-9 spacers so columns align with date headers */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <div className="flex">
                    <div className="w-9 flex-shrink-0" />
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((time, slotIdx) =>
                        visibleDays.map(absIdx => {
                          const avail = isAvailable(absIdx, slotIdx);
                          const sel   = selectedDate === absIdx && selectedTime === time;
                          return avail ? (
                            <button key={`${absIdx}-${time}`} onClick={() => { setSelectedDate(absIdx); setSelectedTime(time); }}
                              className={`py-3 text-sm font-open-sans font-semibold transition-all ${sel ? "bg-[#3d3d3d] text-white" : "bg-[#f0f0f0] text-[#3d3d3d] hover:bg-[#e0e0e0]"}`}>
                              {time}
                            </button>
                          ) : (
                            <div key={`${absIdx}-${time}`} className="flex items-center justify-center py-3 text-[#d0d0d0] text-sm font-open-sans select-none">×</div>
                          );
                        })
                      )}
                    </div>
                    <div className="w-9 flex-shrink-0" />
                  </div>
                </div>
                <div className="flex-shrink-0 border-t border-[#e0e0e0] px-6 py-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle className="w-4 h-4 text-[#3d3d3d] flex-shrink-0" />
                    <span className="text-[#1a1a1a] text-xs font-open-sans font-bold uppercase tracking-wider truncate">{selectedService.name}</span>
                  </div>
                  {selectedTime && (
                    <button onClick={() => setStep("doctor")}
                      className="flex-shrink-0 bg-[#3d3d3d] text-white text-xs font-open-sans font-bold uppercase tracking-wider px-4 py-2 hover:bg-black transition-colors flex items-center gap-1">
                      Continua <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ── STEP: DOCTOR ── */}
            {step === "doctor" && selectedService && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-6 pt-5 pb-1 flex-shrink-0">
                  <h3 className="font-raleway font-bold text-xl text-[#1a1a1a]">Scegli il tuo medico</h3>
                  <p className="text-[#777777] text-sm font-open-sans mt-1">Opzioni disponibili in base a servizio e data scelti</p>
                </div>
                <div className="mx-6 mt-4 border-t border-[#e0e0e0]" />
                <div className="flex-1 overflow-y-auto px-6 pb-4 pt-4 space-y-3">
                  {DOCTORS.map(doctor => {
                    const sel = selectedDoctor?.id === doctor.id;
                    return (
                      <button key={doctor.id} onClick={() => setSelectedDoctor(doctor)}
                        className={`w-full text-left border px-5 py-4 transition-all flex items-center gap-4 ${sel ? "border-[#3d3d3d] shadow-sm" : "border-[#e0e0e0] hover:border-[#3d3d3d] hover:shadow-sm"}`}>
                        {/* Photo stays circular — it's an avatar, not a card */}
                        <div className={`w-14 h-14 rounded-full flex-shrink-0 overflow-hidden relative border-2 transition-colors ${sel ? "border-[#3d3d3d]" : "border-transparent"}`}>
                          <Image src={doctor.photo} alt={doctor.name} fill className="object-cover object-top grayscale" sizes="56px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-raleway font-bold text-base leading-snug ${sel ? "text-[#3d3d3d]" : "text-[#1a1a1a]"}`}>{doctor.name}</p>
                          <p className="text-[#777777] text-sm font-open-sans mt-0.5">{doctor.specialty}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <FooterChips service={selectedService} dateStr={dateLabel} time={selectedTime}
                  onContinue={selectedDoctor ? () => setStep("contact") : undefined} />
              </div>
            )}

            {/* ── STEP: CONTACT ── */}
            {step === "contact" && selectedService && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-6 pt-5 pb-1 flex-shrink-0">
                  <h3 className="font-raleway font-bold text-xl text-[#1a1a1a]">I tuoi dati</h3>
                </div>
                <div className="mx-6 mt-4 border-t border-[#e0e0e0]" />

                <div className="flex-1 overflow-y-auto px-6 pt-5 pb-6 space-y-5">

                  {/* Nome + Cognome */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Nome <span>*</span></label>
                      <input type="text" placeholder="Es: Mario" value={form.nome} onChange={setField("nome")} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Cognome <span>*</span></label>
                      <input type="text" placeholder="Es: Rossi" value={form.cognome} onChange={setField("cognome")} className={inputCls} />
                    </div>
                  </div>

                  {/* Telefono */}
                  <div>
                    <label className={labelCls}>Il tuo numero di telefono cellulare <span>*</span></label>
                    <div className="flex gap-2">
                      <div className="relative flex-shrink-0">
                        <select value={form.prefix} onChange={setField("prefix")}
                          className="appearance-none bg-[#f5f5f5] border border-[#e8e8e8] pl-4 pr-8 py-3.5 text-[#1a1a1a] text-sm font-open-sans focus:outline-none focus:border-[#3d3d3d] transition-colors cursor-pointer">
                          <option>+39</option><option>+44</option><option>+33</option><option>+49</option><option>+34</option><option>+1</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#777777]" />
                      </div>
                      <input type="tel" placeholder="Numero cellulare" value={form.phone} onChange={setField("phone")} className={`${inputCls} flex-1`} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelCls}>Indirizzo email <span>*</span></label>
                    <input type="email" placeholder="mario.rossi@email.com" value={form.email} onChange={setField("email")} className={inputCls} />
                  </div>

                  {/* Assicurazione */}
                  <div>
                    <label className={labelCls}>Assicurazione o Convenzione</label>
                    <div className="relative">
                      <select value={form.assicurazione} onChange={setField("assicurazione")} className={`${inputCls} appearance-none pr-10 cursor-pointer`}>
                        <option value="">Scegli un&apos;opzione</option>
                        {ASSICURAZIONI.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label className={labelCls}>Informazioni aggiuntive</label>
                    <textarea placeholder="Es: allergie, note particolari…" value={form.note} onChange={setField("note")} rows={3} className={`${inputCls} resize-none`} />
                  </div>

                  {/* Privacy + submit */}
                  <div className="pt-1 space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input type="checkbox" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)} className="sr-only peer" />
                        <div className="w-5 h-5 border-2 border-[#d0d0d0] rounded peer-checked:border-[#3d3d3d] peer-checked:bg-[#3d3d3d] transition-colors flex items-center justify-center">
                          {acceptedTerms && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                      </div>
                      <span className="text-[#5a5a5a] text-sm font-open-sans leading-relaxed">
                        Prenotando l&apos;appuntamento, accetti i nostri{" "}
                        <span className="font-bold text-[#3d3d3d] underline cursor-pointer">termini e condizioni</span>{" "}
                        e confermi di aver letto e compreso la nostra{" "}
                        <span className="font-bold text-[#3d3d3d] underline cursor-pointer">informativa privacy</span>.
                      </span>
                    </label>

                    <p className="text-[#1a1a1a] text-sm font-open-sans font-bold leading-relaxed text-center">
                      Se questa è la tua prima prenotazione, creeremo il tuo account gratuito per salvare e gestire le tue visite.
                    </p>

                    <button
                      onClick={() => canSubmit && setStep("confirm")}
                      disabled={!canSubmit}
                      className={`w-full py-[18px] font-raleway font-bold text-base uppercase tracking-widest transition-all ${
                        canSubmit ? "bg-[#3d3d3d] text-white hover:bg-black" : "bg-[#e0e0e0] text-[#aaaaaa] cursor-not-allowed"
                      }`}
                    >
                      Prenota Ora
                    </button>
                  </div>

                </div>

                {/* Footer chips — info only, no continue arrow */}
                <FooterChips service={selectedService} dateStr={dateLabel} time={selectedTime} />
              </div>
            )}

            {/* ── STEP: CONFIRM ── */}
            {step === "confirm" && selectedService && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col items-center">

                  {/* Close button (no header on this step) */}
                  <div className="w-full flex justify-end mb-2">
                    <button onClick={handleClose} className="w-9 h-9 bg-[#f0f0f0] flex items-center justify-center hover:bg-[#e0e0e0] transition-colors">
                      <X className="w-4 h-4 text-[#5a5a5a]" />
                    </button>
                  </div>

                  {/* Success icon + title */}
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-8 h-8 text-[#3d3d3d]" strokeWidth={2} />
                    <h3 className="font-raleway font-bold text-2xl text-[#1a1a1a]">Prenotazione Confermata!</h3>
                  </div>
                  <p className="text-[#777777] text-sm font-open-sans text-center mb-8">
                    Riceverai un&apos;email di conferma a breve.
                  </p>

                  {/* Summary card */}
                  <div className="w-full bg-[#f7f7f7] px-6 py-5 space-y-5 mb-8">
                    <SummaryRow
                      icon={<CheckCircle className="w-5 h-5 text-[#777777]" />}
                      label="Servizio"
                      value={selectedService.name}
                    />
                    <div className="border-t border-[#e8e8e8]" />
                    <SummaryRow
                      icon={<Calendar className="w-5 h-5 text-[#777777]" />}
                      label="Data e ora"
                      value={selectedTime ? `${getDateStr(selectedDate)} alle ${selectedTime}` : dateLabel}
                    />
                    {selectedDoctor && (
                      <>
                        <div className="border-t border-[#e8e8e8]" />
                        <SummaryRow
                          icon={<User className="w-5 h-5 text-[#777777]" />}
                          label="Dottore"
                          value={selectedDoctor.name}
                        />
                      </>
                    )}
                  </div>

                  {/* Account upsell */}
                  <p className="text-[#5a5a5a] text-sm font-open-sans text-center leading-relaxed mb-6">
                    Accedi alla{" "}
                    <span className="font-bold text-[#3d3d3d]">dashboard</span>{" "}
                    del tuo{" "}
                    <span className="font-bold text-[#1a1a1a]">Account Paziente</span>{" "}
                    gratuito per gestire questa e altre prenotazioni.
                  </p>

                  {/* Buttons */}
                  <div className="w-full grid grid-cols-2 gap-3 mb-4">
                    <button className="w-full bg-[#3d3d3d] text-white py-4 font-raleway font-bold text-sm uppercase tracking-widest hover:bg-black transition-colors">
                      Dashboard
                    </button>
                    <button
                      onClick={() => { resetAll(); }}
                      className="w-full bg-white text-[#1a1a1a] py-4 font-raleway font-bold text-sm uppercase tracking-widest border border-[#e0e0e0] hover:bg-[#f5f5f5] transition-colors"
                    >
                      Prenota di nuovo
                    </button>
                  </div>

                  <button onClick={handleClose} className="text-[#aaaaaa] text-sm font-open-sans hover:text-[#5a5a5a] transition-colors">
                    Chiudi
                  </button>

                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
