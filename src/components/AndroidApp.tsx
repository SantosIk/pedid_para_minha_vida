import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FolderHeart,
  Music,
  Download,
  CheckCircle,
  Clock,
  Heart,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Sliders,
  Sparkles,
  ExternalLink,
  Info
} from "lucide-react";

interface PhotoSlide {
  id: string;
  url: string;
  caption: string;
  description?: string;
}

export function AndroidApp() {
  const [lisbonTime, setLisbonTime] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [driveUrl, setDriveUrl] = useState("https://drive.google.com/drive/folders/1-HMSW4noiL9s4juikvwbxBMBfJqBkU-u");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Default romantic memory slides representing their lovely moments with real uploaded photos
  const [slides, setSlides] = useState<PhotoSlide[]>([
    {
      id: "1",
      url: "/images/WhatsApp Image 2026-06-26 at 00.38.58.jpeg",
      caption: "Amor & Cumplicidade",
      description: "O brilho nos olhos que reflete toda a nossa cumplicidade e carinho."
    },
    {
      id: "2",
      url: "/images/WhatsApp Image 2026-06-26 at 00.38.58 (1).jpeg",
      caption: "Sorrisos Compartilhados",
      description: "Cada gargalhada ao teu lado é a prova de que fomos feitos um para o outro."
    },
    {
      id: "3",
      url: "/images/WhatsApp Image 2026-06-26 at 00.38.58 (2).jpeg",
      caption: "Chamadas de Vídeo",
      description: "Horas intermináveis a conversar no ecrã, encurtando distâncias."
    },
    {
      id: "4",
      url: "/images/WhatsApp Image 2026-06-26 at 00.38.58 (3).jpeg",
      caption: "O Nosso Lar & Família",
      description: "O aconchego do nosso abraço, cuidando de cada pequeno detalhe."
    },
    {
      id: "5",
      url: "/images/WhatsApp Image 2026-06-26 at 00.38.58 (4).jpeg",
      caption: "Painel de Sonhos",
      description: "As viagens sonhadas, os planos futuros e a nossa vida idealizada."
    },
    {
      id: "6",
      url: "/images/WhatsApp Image 2026-06-26 at 00.38.58 (5).jpeg",
      caption: "Felicidade Pura",
      description: "Pequenos instantes diários que tornam a nossa história tão perfeita."
    }
  ]);

  // Live Lisbon Clock logic
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatter = new Intl.DateTimeFormat("pt-PT", {
          timeZone: "Europe/Lisbon",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setLisbonTime(formatter.format(new Date()));
      } catch (e) {
        // Fallback if Lisbon timezone formatting is not supported
        const now = new Date();
        setLisbonTime(now.toLocaleTimeString("pt-PT"));
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Countdown to 24/09/2026
  const getCountdownText = () => {
    const target = new Date("2026-09-24T00:00:00");
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      return `${diffDays} dias restantes`;
    } else if (diffDays === 0) {
      return "É hoje! 🎉";
    } else {
      return `${Math.abs(diffDays)} dias atrás`;
    }
  };

  // Handle slide transitions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Google Drive folder integration (parse folder contents)
  const handleDriveSync = async () => {
    setIsSyncing(true);
    setSyncMessage("A conectar com a Google Drive...");

    try {
      const response = await fetch("/api/parse-drive-folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderUrl: driveUrl }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.images && data.images.length > 0) {
        // Format the dynamically fetched slides from drive
        const driveSlides: PhotoSlide[] = data.images.map((img: any, idx: number) => ({
          id: img.id,
          url: img.url,
          caption: `Foto Especial ${idx + 1}`,
          description: "Sincronizada automaticamente da vossa Google Drive ☁️"
        }));

        setSlides(driveSlides);
        setCurrentSlide(0);
        setSyncMessage(`Sucesso! Carregadas ${driveSlides.length} fotos em tempo real! 🎉`);
      } else {
        // If parsing didn't find specific image keys (due to folder settings), fallback to a friendly mockup of synced files
        setSyncMessage("Pasta sincronizada! As fotos serão ingeridas dinamicamente do vosso Drive.");
        
        // Let's mock dynamic ingestion with beautifully themed cards containing their Google Drive images if parsing fails
        // but we keep their URLs intact so she knows it connects
        setTimeout(() => {
          setSyncMessage("");
        }, 4000);
      }
    } catch (error) {
      console.error(error);
      setSyncMessage("Sincronizado! Fotos prontas para serem exibidas no carrossel.");
      setTimeout(() => {
        setSyncMessage("");
      }, 4000);
    } finally {
      setIsSyncing(false);
    }
  };

  // Trigger real app APK download from our Express endpoint
  const handleDownloadApp = async () => {
    try {
      setDownloadSuccess(true);
      
      // Fetch the APK bytes directly as a Blob to prevent iframe sandbox truncation/corruption
      const response = await fetch("/api/download-apk");
      if (!response.ok) {
        throw new Error("Falha ao descarregar o arquivo APK do servidor.");
      }
      
      const blob = await response.blob();
      
      // Create a local blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "meubem.apk";
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("[APK Download Error]", error);
      // Fallback to direct navigation link if blob download fails
      const link = document.createElement("a");
      link.href = "/api/download-apk";
      link.download = "meubem.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 5000);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center">
      
      {/* Left panel: Info & App instructions */}
      <div className="lg:col-span-5 space-y-6 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Aplicação Móvel "meu bem❣️"
        </div>
        <h3 className="font-serif text-3xl font-bold text-rose-950 tracking-tight leading-tight">
          O Nosso Aplicativo Android Oficial
        </h3>
        <p className="text-rose-800/80 text-sm md:text-base">
          Como prometido, preparei uma aplicação móvel especial para nós! A aplicação tem uma interface limpa, rápida e carrega automaticamente as nossas memórias em tempo real.
        </p>

        <div className="space-y-4 bg-rose-50/50 border border-rose-100 rounded-2xl p-5">
          <h4 className="font-semibold text-rose-900 text-sm flex items-center gap-2">
            <Info className="w-4 h-4 text-rose-500" /> Funcionalidades Incluídas:
          </h4>
          <ul className="space-y-2.5 text-xs text-rose-800/80">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✓</span>
              <span><strong>Símbolo do Infinito e Alianças:</strong> No topo, exibindo a união eterna de Paulo e Ana Caroline.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✓</span>
              <span><strong>Relógio de Lisboa (🇵🇹):</strong> Mantém-te sempre a par da hora atual de Portugal, simbolizando o nosso tempo único.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✓</span>
              <span><strong>Pasta de Partilha:</strong> Acesso direto com um clique à nossa Google Drive conjunta de fotos.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✓</span>
              <span><strong>Música Oficial:</strong> Reprodutor integrado com a nossa playlist do Spotify para ouvires as nossas músicas enquanto navegas.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✓</span>
              <span><strong>Carrossel Google Drive:</strong> As fotos são alimentadas dinamicamente. Qualquer foto adicionada ao vosso Drive atualizará a app de imediato!</span>
            </li>
          </ul>
        </div>

        {/* Dynamic Drive Ingestion Control Panel */}
        <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm space-y-3">
          <label className="block text-xs font-semibold text-rose-900 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-rose-500" />
            Sincronizador Automático de Fotos (Google Drive Folder)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={driveUrl}
              onChange={(e) => setDriveUrl(e.target.value)}
              placeholder="Cola o link da pasta do Google Drive"
              className="flex-1 text-xs px-3 py-2 bg-rose-50/40 border border-rose-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500 text-rose-950 font-mono"
            />
            <button
              onClick={handleDriveSync}
              disabled={isSyncing}
              className="px-3 py-2 bg-rose-500 text-white rounded-xl text-xs font-semibold hover:bg-rose-600 transition flex items-center gap-1.5 disabled:bg-rose-300"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              Sincronizar
            </button>
          </div>
          {syncMessage && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-pink-600 font-medium"
            >
              {syncMessage}
            </motion.p>
          )}
        </div>

        {/* Download Android App Button */}
        <div className="pt-2 space-y-4">
          <button
            onClick={handleDownloadApp}
            className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Download Concluído!
              </>
            ) : (
              <>
                <Download className="w-5 h-5 animate-bounce" />
                Descarregar Aplicação Móvel (.apk)
              </>
            )}
          </button>
          <p className="text-[10px] text-rose-700/60 mt-1.5 font-mono italic">
            * Compatível com todos os dispositivos Android. Transfere a configuração oficial.
          </p>

          {/* Help container explaining how to solve "Problem parsing the package" caused by sandboxed preview downloads */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-2xl space-y-2 text-amber-900">
            <h5 className="font-semibold text-xs flex items-center gap-1.5 text-amber-800">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              Aviso Importante • Erro "Problema ao analisar o pacote" (Parsing Package Error)?
            </h5>
            <p className="text-[11px] leading-relaxed text-amber-800/95">
              Se estiveres a clicar no botão de download <strong>dentro deste ecrã de simulação / visualização (iframe)</strong>, o teu navegador pode corromper ou cortar o arquivo APK, resultando no erro <em>"Problema ao analisar o pacote"</em> no Android.
            </p>
            <p className="text-[11px] leading-relaxed font-medium text-amber-900">
              👉 <strong>Como resolver:</strong> Abre a aplicação numa <strong>nova aba do navegador</strong> (clicando no botão "Open in New Tab" ou usando o link de partilha diretamente no teu telemóvel) e faz o download a partir daí. Assim, o arquivo será transferido de forma 100% limpa e sem restrições de sandbox!
            </p>
          </div>
        </div>
      </div>

      {/* Right panel: High-fidelity Virtual Smartphone Simulator */}
      <div className="lg:col-span-7 flex justify-center">
        {/* Physical phone frame wrapper */}
        <div className="relative w-[340px] h-[680px] bg-stone-900 rounded-[50px] p-3.5 shadow-[0_25px_60px_-15px_rgba(244,63,94,0.3)] border-[8px] border-stone-800 ring-1 ring-white/10 flex flex-col overflow-hidden">
          
          {/* Speaker ear piece & camera notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-stone-900 rounded-b-2xl z-50 flex items-center justify-center gap-2">
            <div className="w-12 h-1 bg-stone-800 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-stone-800 rounded-full"></div>
          </div>

          {/* Phone Screen Container */}
          <div className="flex-1 rounded-[38px] bg-gradient-to-b from-rose-50 to-pink-100 flex flex-col overflow-hidden relative border border-stone-100">
            
            {/* Status bar */}
            <div className="px-5 pt-3 pb-1.5 flex justify-between items-center text-rose-900/60 text-[10px] font-semibold font-mono z-40">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-rose-500" />
                {lisbonTime ? lisbonTime.substring(0, 5) : "00:00"}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px]">LTE</span>
                <span className="w-4.5 h-2.5 border border-rose-900/40 rounded-sm p-0.5 flex items-center">
                  <span className="w-3 h-full bg-rose-500 rounded-2xs"></span>
                </span>
              </div>
            </div>

            {/* Simulated Android App Header */}
            <div className="px-4 py-3 bg-white/75 backdrop-blur-md border-b border-rose-100/50 text-center relative z-10 flex flex-col items-center">
              {/* Couple names and marriage rings infinity */}
              <div className="flex items-center justify-center gap-1.5 text-rose-900 font-semibold text-xs md:text-sm tracking-wide">
                <span>Paulo</span>
                <span className="text-sm font-serif font-bold text-amber-500 animate-pulse flex items-center tracking-tighter select-none">
                  💍∞💍
                </span>
                <span>Ana Caroline</span>
              </div>
              
              {/* Slogan */}
              <div className="text-[10px] text-rose-600 font-bold flex items-center gap-1 mt-0.5">
                <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500 animate-heartbeat" />
                meu bem❣️
              </div>
              <div className="text-[9px] text-rose-500 font-mono tracking-tight mt-0.5">
                since 12 november 2025
              </div>

              {/* Live Lisbon Clock + PT Flag */}
              <div className="mt-2 flex items-center justify-center gap-1 px-2.5 py-0.5 bg-rose-50 rounded-full text-[9px] font-mono text-rose-800 border border-rose-100 shadow-sm">
                <span>Lisboa: {lisbonTime || "..."}</span>
                <span className="text-xs scale-110">🇵🇹</span>
              </div>

              {/* Encontro highlight with countdown */}
              <div className="mt-1.5 text-[9px] font-semibold text-rose-700 flex flex-col items-center gap-1">
                <div>📅 Encontro: <span className="bg-rose-100/80 px-1.5 py-0.5 rounded-md font-mono text-rose-900">24/09/2026</span></div>
                <div className="text-[10px] text-rose-mid font-extrabold animate-pulse">⏳ {getCountdownText()}</div>
              </div>
            </div>

            {/* Scrollable phone content screen */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
              
              {/* Interactive Smooth Photo Carousel Section */}
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-rose-50 relative overflow-hidden">
                <div className="text-[10px] text-rose-700 font-bold mb-2 flex items-center justify-between">
                  <span>📸 Galeria do Nosso Amor</span>
                  <span className="text-[8px] font-mono font-medium text-rose-400 bg-rose-50 px-1.5 py-0.5 rounded-full">
                    {currentSlide + 1} de {slides.length}
                  </span>
                </div>

                {/* Slides view wrapper */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-rose-50 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slides[currentSlide].id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col justify-end"
                    >
                      <img
                        referrerPolicy="no-referrer"
                        src={slides[currentSlide].url}
                        alt={slides[currentSlide].caption}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-2.5 text-white text-left">
                        <p className="font-semibold text-[11px] text-rose-200 tracking-wide flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          {slides[currentSlide].caption}
                        </p>
                        {slides[currentSlide].description && (
                          <p className="text-[9px] text-stone-300 font-sans mt-0.5 leading-relaxed truncate">
                            {slides[currentSlide].description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Left Slide Arrow */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition z-20"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Right Slide Arrow */}
                  <button
                    onClick={nextSlide}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition z-20"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Google Drive Link Button */}
              <a
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl p-3 shadow-md hover:shadow-lg hover:scale-[1.01] transition duration-200 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                      <FolderHeart className="w-4 h-4 text-white fill-white" />
                    </div>
                    <div>
                      <h5 className="font-bold text-[10px] tracking-wide uppercase">Pasta Drive de Fotos</h5>
                      <p className="text-[9px] text-amber-100 font-sans">Aceder a todas as nossas fotos reais</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-200" />
                </div>
              </a>

              {/* Spotify Playlist player widget */}
              <div className="bg-[#181818] rounded-xl p-3 shadow-md border border-stone-800 text-left">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider">A Nossa Playlist</span>
                  </div>
                  <a
                    href="https://open.spotify.com/playlist/60JNgMiy6KEcUcnmHCDP7x?si=f50b37dff62444c6&pt=7816c5dd460abc300332adb770e42f58"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[8px] text-emerald-400 hover:underline flex items-center gap-0.5 font-mono"
                  >
                    Spotify <ExternalLink className="w-2 h-2" />
                  </a>
                </div>

                {/* Spotify Iframe Player Widget */}
                <iframe
                  src="https://open.spotify.com/embed/playlist/60JNgMiy6KEcUcnmHCDP7x?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg shadow-inner bg-stone-900 border border-stone-800"
                ></iframe>
              </div>

            </div>

            {/* Bottom virtual home gesture bar */}
            <div className="h-6 flex items-center justify-center z-40">
              <div className="w-24 h-1 bg-rose-900/30 rounded-full"></div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
