import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Heart, Phone, Users, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Beautiful AI-generated high-quality images as fallbacks
const videoCallImg = "/src/assets/images/videocall_1782434354118.jpg";
const ourFamilyImg = "/src/assets/images/our_family_1782434372416.jpg";
const dreamBoardImg = "/src/assets/images/dream_board_1782434386455.jpg";

// Real uploaded photos list for the beautiful custom carousel
const CAROUSEL_SLIDES = [
  {
    src: "/images/WhatsApp Image 2026-06-26 at 00.38.58.jpeg",
    title: "Amor & Cumplicidade",
    subtitle: "O Começo de Tudo",
    quote: "O brilho nos olhos que reflete toda a nossa cumplicidade, carinho e promessa de futuro."
  },
  {
    src: "/images/WhatsApp Image 2026-06-26 at 00.38.58 (1).jpeg",
    title: "Sorrisos Compartilhados",
    subtitle: "Porto Seguro",
    quote: "Cada gargalhada ao teu lado é a prova de que fomos feitos um para o outro."
  },
  {
    src: "/images/WhatsApp Image 2026-06-26 at 00.38.58 (2).jpeg",
    title: "Chamadas de Vídeo",
    subtitle: "Ecrãs de Cumplicidade",
    quote: "Horas intermináveis a conversar no ecrã, encurtando distâncias e partilhando sonhos."
  },
  {
    src: "/images/WhatsApp Image 2026-06-26 at 00.38.58 (3).jpeg",
    title: "O Nosso Lar & Família",
    subtitle: "Presente e Futuro",
    quote: "O aconchego do nosso abraço, cuidando de cada pequeno detalhe com amor."
  },
  {
    src: "/images/WhatsApp Image 2026-06-26 at 00.38.58 (4).jpeg",
    title: "Painel de Sonhos",
    subtitle: "Aventuras Coletivas",
    quote: "Cada detalhe dos nossos planos futuros, as viagens sonhadas e a vida a construir."
  },
  {
    src: "/images/WhatsApp Image 2026-06-26 at 00.38.58 (5).jpeg",
    title: "Momentos Únicos",
    subtitle: "Felicidade Pura",
    quote: "Pequenos instantes de cumplicidade diária que tornam a nossa história tão perfeita."
  }
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === CAROUSEL_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white/80 rounded-3xl p-6 md:p-8 shadow-xl border border-rose-100 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
            <ImageIcon className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <h3 className="font-serif text-lg md:text-xl font-bold text-rose-950">
              Galeria do Nosso Amor
            </h3>
            <p className="text-xs text-rose-700/60 font-mono">
              Fotos Reais • Desliza para Recordar
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-100 flex items-center justify-center text-rose-600 transition-colors cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-100 flex items-center justify-center text-rose-600 transition-colors cursor-pointer"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-3xl aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-inner border border-rose-100/50 bg-stone-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={CAROUSEL_SLIDES[currentIndex].src}
              alt={CAROUSEL_SLIDES[currentIndex].title}
              className="w-full h-full object-cover select-none"
            />
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none"></div>
          </motion.div>
        </AnimatePresence>

        {/* Text Details Overlay on bottom of Image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 select-none bg-gradient-to-t from-black/60 to-transparent pt-12">
          <motion.div
            key={`text-${currentIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-1 md:space-y-1.5"
          >
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-rose-300 uppercase block">
              {CAROUSEL_SLIDES[currentIndex].subtitle}
            </span>
            <h4 className="font-serif text-base md:text-2xl font-bold tracking-tight text-white">
              {CAROUSEL_SLIDES[currentIndex].title}
            </h4>
            <p className="text-xs md:text-sm text-stone-200 font-light leading-relaxed max-w-2xl">
              "{CAROUSEL_SLIDES[currentIndex].quote}"
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pagination indicators and slide progress count */}
      <div className="flex flex-col items-center gap-3 mt-6 w-full">
        <div className="flex justify-center gap-2">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-rose-500" : "w-2.5 bg-rose-200 hover:bg-rose-300"
              }`}
              aria-label={`Ir para foto ${idx + 1}`}
            />
          ))}
        </div>
        <span className="text-[11px] font-mono font-medium text-rose-700/60">
          Foto {currentIndex + 1} de {CAROUSEL_SLIDES.length}
        </span>
      </div>
    </div>
  );
}

// Dynamic Fallback Image Component to prevent broken links and load high-quality placeholders if local assets aren't present
function FallbackImage({
  src,
  fallback,
  alt,
  className
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    <img
      src={currentSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
      onError={() => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );
}

export function MemoryLane() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100/80 text-rose-600 rounded-full text-sm font-semibold tracking-wide"
        >
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          A Nossa Jornada
        </motion.div>
        <h2 className="font-serif text-3xl md:text-4xl text-rose-900 font-bold tracking-tight">
          Momentos Eternizados
        </h2>
        <p className="text-rose-700/80 max-w-lg mx-auto text-sm md:text-base">
          Alguns dos pedaços de amor, conversas e sorrisos que nos trouxeram até este dia tão especial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Memory Card 1: The WhatsApp Chat */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 rounded-3xl p-6 shadow-xl border border-rose-100 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 border-b border-rose-100 pb-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <MessageCircle className="w-5 h-5 fill-emerald-500 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold text-rose-950 text-sm md:text-base">Primeiros Carinhos</h3>
              <p className="text-xs text-rose-700/60 font-mono">WhatsApp • Recordação</p>
            </div>
          </div>

          {/* Conversation Bubbles */}
          <div className="space-y-4 bg-[#efeae2] p-4 rounded-2xl overflow-y-auto max-h-[350px] border border-stone-200/50 relative">
            <div className="absolute inset-0 bg-[radial-gradient(#dfdcd6_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            
            <div className="relative z-10 space-y-4">
              {/* Bubble 1: Carol */}
              <div className="flex justify-start">
                <div className="bg-white text-stone-800 text-sm px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] relative">
                  <p className="font-medium text-rose-600 text-xs mb-1">Carol ❣️</p>
                  <p>Bom dia, gatinho ❤️ Acontece... Dormiu bem?</p>
                </div>
              </div>

              {/* Bubble 2: Paulo */}
              <div className="flex justify-end">
                <div className="bg-[#d9fdd3] text-stone-800 text-sm px-4 py-2.5 rounded-2xl rounded-tr-none shadow-sm max-w-[85%]">
                  <div className="border-l-4 border-emerald-500 bg-black/5 pl-2 py-1 pr-1 rounded text-xs mb-1.5 text-stone-600">
                    <span className="font-semibold text-emerald-700 block">Carol ❣️</span>
                    Bom dia, gatinho ❤️ Acontece... Dormiu bem?
                  </div>
                  <p>Feliz dia dos namorados 💘 Primeiro de muitos</p>
                </div>
              </div>

              {/* Bubble 3: Carol */}
              <div className="flex justify-start">
                <div className="bg-white text-stone-800 text-sm px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                  <p className="font-medium text-rose-600 text-xs mb-1">Carol ❣️</p>
                  <p>Feliz dia dos namorados, meu bem ❤️</p>
                </div>
              </div>

              {/* Bubble 4: Paulo */}
              <div className="flex justify-end">
                <div className="bg-[#d9fdd3] text-stone-800 text-sm px-4 py-2.5 rounded-2xl rounded-tr-none shadow-sm max-w-[85%]">
                  <div className="border-l-4 border-emerald-500 bg-black/5 pl-2 py-1 pr-1 rounded text-xs mb-1.5 text-stone-600">
                    <span className="font-semibold text-emerald-700 block">Carol ❣️</span>
                    Feliz dia dos namorados, meu bem ❤️
                  </div>
                  <p>Meu primeiro dia dos namorados da minha vida ❤️ Destinado a passar os...</p>
                </div>
              </div>

              {/* Bubble 5: Carol */}
              <div className="flex justify-start">
                <div className="bg-white text-stone-800 text-sm px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] relative">
                  <p className="font-medium text-rose-600 text-xs mb-1">Carol ❣️</p>
                  <p>Tbm é meu primeiro 🥰 Espero que todos os outros sejam ao teu lado ❤️</p>
                  <div className="absolute -bottom-2 -left-1 bg-white border border-rose-100 rounded-full px-1.5 py-0.5 shadow-sm text-xs flex items-center">
                    ❤️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Memory Card 2: The Instagram Chat */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 rounded-3xl p-6 shadow-xl border border-rose-100 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 border-b border-rose-100 pb-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <MessageCircle className="w-5 h-5 fill-purple-400 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-rose-950 text-sm md:text-base">Planos para o Altar</h3>
              <p className="text-xs text-rose-700/60 font-mono">Instagram • Mensagens</p>
            </div>
          </div>

          {/* Instagram Chat View */}
          <div className="space-y-4 bg-gradient-to-b from-stone-900 to-stone-950 p-4 rounded-2xl overflow-y-auto max-h-[350px] border border-stone-800 relative text-white">
            <div className="flex justify-center border-b border-stone-800 pb-2 mb-2">
              <span className="text-stone-400 text-[10px] tracking-widest font-mono">INSTAGRAM CHAT</span>
            </div>
            
            <div className="space-y-4 text-xs">
              {/* Message 1: Paulo */}
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3.5 py-2 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                  <p>Acho que é só aqui e no altar que eu quero te ver chorando</p>
                </div>
              </div>

              {/* Message 2: Paulo */}
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3.5 py-2 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                  <p>Minto, aqui, no altar e no nascimento dos nossos filhos ❤️</p>
                </div>
              </div>

              {/* Message 3: Carol */}
              <div className="flex justify-start">
                <div className="bg-[#262626] text-stone-100 px-3.5 py-2 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] relative">
                  <p>Eu tô sem palavras pra tudo isso 🥹 li tudo e fiquei até meio sem reação, porque dá pra ver o cuidado e o quanto tu me enxerga não só por fora. É muito especial pra mim saber que eu te faço sentir acompanhado, amado, leve... porque tudo isso que você descreveu é exatamente a forma como eu me sinto ctg</p>
                  <div className="absolute -bottom-2.5 -right-1.5 bg-[#262626] border border-stone-800 rounded-full px-1.5 py-0.5 shadow-sm text-[10px]">
                    ❤️
                  </div>
                </div>
              </div>

              {/* Message 4: Carol */}
              <div className="flex justify-start">
                <div className="bg-[#262626] text-stone-100 px-3.5 py-2 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                  <p>Sério mesmo</p>
                </div>
              </div>

              {/* Message 5: Carol */}
              <div className="flex justify-start">
                <div className="bg-[#262626] text-stone-100 px-3.5 py-2 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                  <p>Me sinto amada demais</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <ImageCarousel />
      </motion.div>
    </div>
  );
}
