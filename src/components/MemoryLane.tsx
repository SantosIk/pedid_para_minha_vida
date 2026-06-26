import { motion } from "motion/react";
import { MessageCircle, Heart, Phone, Users, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

// Beautiful AI-generated high-quality images as fallbacks
const videoCallImg = "/src/assets/images/videocall_1782434354118.jpg";
const ourFamilyImg = "/src/assets/images/our_family_1782434372416.jpg";
const dreamBoardImg = "/src/assets/images/dream_board_1782434386455.jpg";

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Memory Card 3: The Video Call Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 rounded-3xl p-6 shadow-xl border border-rose-100 md:col-span-1 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <Phone className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h4 className="font-semibold text-rose-950 text-sm">Chamadas de Vídeo</h4>
              <p className="text-[10px] text-rose-700/60 font-mono">Ecrãs de Cumplicidade</p>
            </div>
          </div>

          {/* Real WhatsApp image */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-rose-100 shadow-md bg-stone-50">
            <img
              src="/images/WhatsApp Image 2026-06-26 at 00.38.58 (2).jpeg"
            />
          </div>
          <p className="text-xs text-rose-800/70 mt-3 text-center italic">
            "Horas passadas em frente ao ecrã, sorrindo e partilhando sonhos..."
          </p>
        </motion.div>

        {/* Memory Card 4: Family Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 rounded-3xl p-6 shadow-xl border border-rose-100 md:col-span-1 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <Users className="w-4 h-4 text-rose-500" />
            </div>
            <div>
              <h4 className="font-semibold text-rose-950 text-sm">O Nosso Lar & Família</h4>
              <p className="text-[10px] text-rose-700/60 font-mono">Presente e Futuro</p>
            </div>
          </div>

          {/* Real WhatsApp image */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-rose-100 shadow-md bg-stone-50">
            <img
              src="/images/WhatsApp Image 2026-06-26 at 00.38.58 (3).jpeg"
              alt="O Nosso Lar & Família"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-rose-800/70 mt-3 text-center italic">
            "Saber que somos um porto seguro uns para os outros."
          </p>
        </motion.div>

        {/* Memory Card 5: Dreams Mural Collage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 rounded-3xl p-6 shadow-xl border border-rose-100 md:col-span-1 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <ImageIcon className="w-4 h-4 text-rose-500" />
            </div>
            <div>
              <h4 className="font-semibold text-rose-950 text-sm">Painel de Sonhos</h4>
              <p className="text-[10px] text-rose-700/60 font-mono">Aventuras Coletivas</p>
            </div>
          </div>

          {/* Real WhatsApp image */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-rose-100 shadow-md bg-stone-50">
            <img
              src="/images/WhatsApp Image 2026-06-26 at 00.38.58 (4).jpeg"
              
              alt="Painel de Sonhos"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-rose-800/70 mt-3 text-center italic">
            "Cada pequeno detalhe dos nossos gostos cruzados e planos futuros."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
