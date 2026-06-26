import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Send, Sparkles, Check, ArrowRight, ShieldAlert, HeartCrack, Flame } from "lucide-react";
import { MemoryLane } from "./components/MemoryLane";
import { AndroidApp } from "./components/AndroidApp";
import { ProposalStatus } from "./types";

interface HeartParticle {
  id: number;
  x: number;
  scale: number;
  delay: number;
  duration: number;
}

export default function App() {
  const [proposalStatus, setProposalStatus] = useState<ProposalStatus>("pending");
  const [showNoPopup, setShowNoPopup] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"none" | "success" | "error">("none");
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [secondsSinceStart, setSecondsSinceStart] = useState(0);

  // Time elapsed since 12/11/2025
  useEffect(() => {
    const encounterDate = new Date("2025-11-12T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - encounterDate.getTime();
      setSecondsSinceStart(Math.floor(diff / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Generate a burst of hearts when she clicks Yes
  const triggerHeartsBurst = () => {
    const newHearts: HeartParticle[] = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      scale: Math.random() * 1.5 + 0.6,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 4,
    }));
    setHearts(newHearts);
  };

  const handleYes = () => {
    setProposalStatus("accepted");
    triggerHeartsBurst();
  };

  const handleNoAttempt = () => {
    setShowNoPopup(true);
  };

  // If she confirms "Yes, I want to lose him" on the warning pop-up, send the email
  const handleConfirmNo = async () => {
    setShowNoPopup(false);
    setProposalStatus("declined");
    setEmailSending(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "carolana.lira.s@gmail.com",
          subject: "Despedida... Foi bom enquanto durou 💔",
          text: "Foi bom enquanto durou, mas agora eu irei virar monge e ir para o tibete ou possivelmente iria engolir uma pílula em ibiza. Adeus!",
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setEmailStatus("success");
      } else {
        setEmailStatus("error");
      }
    } catch (err) {
      console.error(err);
      setEmailStatus("error");
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-vibrant-radial text-white relative overflow-x-hidden selection:bg-rose-primary selection:text-white">
      
      {/* Decorative floating hearts background layout */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] text-white/10 text-3xl font-serif">❤</div>
        <div className="absolute top-[20%] right-[8%] text-white/10 text-4xl font-serif">❤</div>
        <div className="absolute bottom-[15%] left-[10%] text-white/10 text-3xl font-serif">❤</div>
        <div className="absolute bottom-[10%] right-[5%] text-white/10 text-5xl font-serif">❤</div>
      </div>

      {/* Heart Burst Particle System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0 animate-float"
            style={{
              left: `${heart.x}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              transform: `scale(${heart.scale})`,
            }}
          >
            <Heart className="w-6 h-6 text-rose-primary fill-rose-primary opacity-80" />
          </div>
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen">
        
        {/* TOP BANNER */}
        <header className="w-full max-w-7xl mx-auto px-6 py-5 mt-6 mb-4 bg-black/20 rounded-3xl backdrop-blur-md border border-white/10 flex justify-center items-center shadow-lg">
          <div className="flex items-center gap-4 md:gap-6">
            <span className="text-lg md:text-2xl font-light uppercase tracking-[0.2em] md:tracking-[0.3em] text-white">Paulo</span>
            <span className="text-2xl md:text-3xl font-bold text-gold animate-pulse tracking-tighter select-none">💍∞💍</span>
            <span className="text-lg md:text-2xl font-light uppercase tracking-[0.2em] md:tracking-[0.3em] text-white">Ana Caroline</span>
          </div>
        </header>

        {/* CONTAINER ROUTING BASED ON STATUS */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
          
          <AnimatePresence mode="wait">
            {proposalStatus === "pending" && (
              <motion.div
                key="proposal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl glass-vibrant rounded-[40px] p-8 md:p-12 text-center relative"
              >
                {/* Floating Heart graphic decoration */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-rose-primary to-rose-mid p-5 rounded-full shadow-lg border-2 border-rose-light animate-heartbeat">
                  <Heart className="w-10 h-10 text-white fill-white" />
                </div>

                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.25em] font-sans text-rose-mid font-bold block">
                      A Nossa Promessa Solene
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl font-black text-rose-dark leading-tight tracking-tight">
                      Um Pedido do Fundo do Coração
                    </h1>
                  </div>

                  {/* Core User Proposal Letter */}
                  <div className="p-6 md:p-8 bg-rose-light/50 border border-rose-light/70 rounded-3xl text-left relative overflow-hidden shadow-inner">
                    <div className="absolute top-2 right-4 text-rose-primary/10 text-8xl font-serif leading-none select-none">
                      ”
                    </div>
                    <p className="font-sans text-stone-800 text-base md:text-lg leading-relaxed whitespace-pre-line relative z-10 font-medium">
                      "Parece que 12/11/2025 foi ontem, mas já se passaram quase 9 meses. Nestes últimos meses, nunca amei alguém como eu te amo e quero passar os restos dos meus dias sendo o teu parceiro. Eu sei que para o mundo o que vem a seguir será oficializado dia 24/set deste ano, mas eu quero já oficializar entre nós e o mundo!

                      <span className="block mt-6 text-rose-mid text-xl md:text-2xl font-serif font-black text-center animate-pulse leading-snug">
                        Ana Caroline da Silva Lira, aceitas namorar comigo?
                      </span>
                    </p>
                  </div>

                  {/* Interaction Buttons matching Vibrant Palette exactly */}
                  <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
                    {/* SIM button */}
                    <button
                      onClick={handleYes}
                      className="w-full sm:w-64 px-8 py-4 bg-gradient-to-r from-rose-primary to-rose-mid hover:from-rose-mid hover:to-rose-dark text-white text-lg font-bold rounded-full shadow-[0_10px_20px_rgba(201,24,74,0.4)] hover:shadow-[0_15px_30px_rgba(201,24,74,0.6)] hover:scale-[1.04] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-5 h-5 stroke-[3px]" />
                      Sim, eu aceito! 💖
                    </button>

                    {/* NÃO button */}
                    <button
                      onClick={handleNoAttempt}
                      className="w-full sm:w-48 px-8 py-3.5 bg-transparent border-2 border-rose-primary/80 hover:border-rose-primary text-rose-primary hover:text-rose-mid hover:bg-rose-light/30 text-base font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Não 😢
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {proposalStatus === "accepted" && (
              <motion.div
                key="accepted"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="w-full space-y-12 text-center"
              >
                {/* Header card for the accepted state using the glass-vibrant-dark styling */}
                <div className="max-w-4xl mx-auto glass-vibrant-dark rounded-[40px] p-8 md:p-12 shadow-2xl border-2 border-rose-light/15 relative overflow-hidden text-white">
                  
                  {/* Floating decorative particles */}
                  <div className="absolute top-10 left-10 w-24 h-24 bg-rose-primary/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-10 right-10 w-24 h-24 bg-rose-mid/10 rounded-full blur-3xl animate-pulse"></div>

                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-primary/20 text-rose-light rounded-full text-sm font-semibold border border-rose-primary/30">
                      <Sparkles className="w-4 h-4 fill-pink-300 text-pink-300" />
                      Oficializado! O Amor Venceu!
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl font-black text-white leading-tight">
                      Eu sou o homem mais sortudo do mundo!
                    </h1>

                    <p className="font-serif text-2xl md:text-3xl text-rose-light tracking-wide font-medium italic">
                      "Eu Te amo muito, serei sempre o seu eterno namorado!!!!" 💍✨💖
                    </p>

                    <div className="flex justify-center gap-3 text-rose-primary">
                      <Heart className="w-8 h-8 fill-rose-primary text-rose-primary animate-bounce" />
                      <Heart className="w-8 h-8 fill-rose-light text-rose-light animate-pulse" />
                      <Heart className="w-8 h-8 fill-rose-mid text-rose-mid animate-bounce" />
                    </div>
                  </div>
                </div>

                {/* Simulated Android App Container matching style */}
                <div className="bg-white/5 backdrop-blur-sm rounded-[40px] p-1 md:p-6 border border-white/10 shadow-inner">
                  <AndroidApp />
                </div>
              </motion.div>
            )}

            {proposalStatus === "declined" && (
              <motion.div
                key="declined"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl glass-vibrant-dark rounded-[40px] p-8 md:p-12 text-center border-2 border-rose-light/10 relative"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-rose-dark p-5 rounded-full shadow-lg border-2 border-rose-light animate-pulse">
                  <HeartCrack className="w-10 h-10 text-rose-primary" />
                </div>

                <div className="mt-6 space-y-6">
                  <h2 className="font-serif text-3xl font-extrabold text-white">
                    O Fim de uma História... 💔
                  </h2>

                  {emailSending && (
                    <div className="py-8 space-y-4">
                      <div className="w-12 h-12 border-4 border-rose-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-rose-light text-sm font-mono animate-pulse">
                        A enviar email de despedida para <strong>carolana.lira.s@gmail.com</strong>... ✈️
                      </p>
                    </div>
                  )}

                  {!emailSending && emailStatus === "success" && (
                    <div className="space-y-6">
                      <div className="p-5 bg-rose-dark/60 border border-rose-light/20 rounded-2xl text-left font-mono text-xs text-rose-light">
                        <span className="font-bold text-rose-primary block mb-1">E-MAIL ENVIADO COM SUCESSO:</span>
                        <p><strong>Destinatário:</strong> carolana.lira.s@gmail.com</p>
                        <p className="mt-2 italic">"Foi bom enquanto durou mas agora eu iria virar monge e ir para o tibete ou possivelmente iria engolir uma pílula em ibiza."</p>
                      </div>
                      
                      <p className="text-rose-light text-lg leading-relaxed font-sans">
                        Agora estou a preparar as minhas malas para o <strong className="text-gold">Tibete</strong>... 🧘‍♂️ ou apanhar o primeiro voo para <strong className="text-rose-primary">Ibiza</strong> 💊. Adeus, meu bem!
                      </p>

                      <button
                        onClick={() => {
                          setProposalStatus("pending");
                          setEmailStatus("none");
                        }}
                        className="px-6 py-2.5 bg-rose-primary hover:bg-rose-mid text-white text-xs font-semibold rounded-full border border-rose-light/10 transition-all cursor-pointer"
                      >
                        Recomeçar a História
                      </button>
                    </div>
                  )}

                  {!emailSending && emailStatus === "error" && (
                    <div className="space-y-4">
                      <p className="text-rose-primary text-sm">
                        O e-mail não pôde ser enviado via SMTP, mas a sua mensagem de despedida foi logada no console do servidor.
                      </p>
                      <p className="text-rose-light">
                        A arrumar as malas para o Tibete de qualquer das formas... 🎒🧘‍♂️
                      </p>
                      <button
                        onClick={() => {
                          setProposalStatus("pending");
                          setEmailStatus("none");
                        }}
                        className="px-6 py-2.5 bg-rose-primary text-white text-xs font-semibold rounded-full hover:bg-rose-mid transition-all cursor-pointer"
                      >
                        Voltar Atrás e Aceitar o Amor
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </main>

        {/* MEMORY LANE SECTION (Only visible while proposal is pending) */}
        {proposalStatus === "pending" && (
          <section className="w-full bg-[#fff0f3] text-stone-900 py-16">
            <MemoryLane />
          </section>
        )}

        {/* FOOTER */}
        <footer className="w-full text-center py-6 border-t border-white/5 text-xs text-rose-light/40">
          <p>© {new Date().getFullYear()} Paulo & Carol. Desenvolvido com amor eterno e dedicação.</p>
        </footer>

      </div>

      {/* CUSTOM CONFIRMATION POPUP MODAL (IF CLICKS NO) */}
      <AnimatePresence>
        {showNoPopup && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-rose-dark border-2 border-rose-light/20 rounded-[32px] p-6 md:p-8 max-w-md w-full text-center shadow-2xl relative text-white"
            >
              <div className="w-14 h-14 bg-rose-mid/40 rounded-full flex items-center justify-center mx-auto text-rose-primary border border-rose-primary/20 animate-bounce mb-4">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-xl md:text-2xl font-bold text-white leading-tight">
                Tens a certeza que queres perder o amor da tua vida?
              </h3>
              
              <p className="text-rose-light/80 text-sm mt-3 leading-relaxed font-sans">
                Esta escolha é definitiva e enviará uma notificação formal de despedida para <strong className="text-rose-primary">carolana.lira.s@gmail.com</strong>. Pensa bem, gatinha! 🥺
              </p>

              <div className="flex flex-col gap-3 mt-6">
                {/* Cancel No/Return to safety */}
                <button
                  onClick={() => setShowNoPopup(false)}
                  className="w-full py-3 bg-gradient-to-r from-rose-primary to-rose-mid hover:from-rose-mid hover:to-rose-dark text-white font-bold rounded-full transition shadow-md cursor-pointer"
                >
                  Não, eu quero voltar! ❤️
                </button>

                {/* Confirm No / Send email */}
                <button
                  onClick={handleConfirmNo}
                  className="w-full py-2.5 bg-transparent hover:bg-white/5 text-rose-light hover:text-white text-xs font-semibold rounded-full border border-rose-light/20 transition cursor-pointer"
                >
                  Sim, tenho a certeza... 💔
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
