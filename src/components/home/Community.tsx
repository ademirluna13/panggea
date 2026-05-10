import { useState, useRef } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Community() {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // ─── ESTADOS DEL FORMULARIO ───
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useGSAP(() => {
    gsap.to(".marquee-text", { xPercent: -50, repeat: -1, duration: 20, ease: "none" });
    gsap.from(".comm-content > *", { scrollTrigger: { trigger: ".comm-content", start: "top 85%" }, x: -50, opacity: 0, stagger: 0.2, duration: 1, ease: "power4.out" });
    gsap.from(".comm-card", { scrollTrigger: { trigger: ".comm-card", start: "top 80%" }, scale: 0.9, opacity: 0, y: 40, duration: 1.2, ease: "expo.out" });
  }, { scope: container });

  // ─── LÓGICA DE ENVÍO ───
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Error de encriptación.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Conexión perdida con la terminal.');
    }
  };

  return (
    <section ref={container} className="relative bg-black py-32 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full pointer-events-none select-none overflow-hidden opacity-[0.03] whitespace-nowrap z-0">
        <div ref={marqueeRef} className="marquee-text inline-block">
          <span className="font-headline text-[25vw] font-black italic uppercase leading-none text-transparent px-20" style={{ WebkitTextStroke: '2px white' }}>PANGEA PANGEA PANGEA PANGEA</span>
          <span className="font-headline text-[25vw] font-black italic uppercase leading-none text-transparent px-20" style={{ WebkitTextStroke: '2px white' }}>PANGEA PANGEA PANGEA PANGEA</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="comm-content max-w-2xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <Sparkles size={18} className="text-pangea-tertiary shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
              <span className="font-label text-pangea-tertiary text-[11px] font-black tracking-[0.4em] uppercase">MEMBRESÍA EXCLUSIVA</span>
            </div>
            <h2 className="font-headline text-white text-6xl md:text-8xl font-[900] tracking-tighter leading-[0.85] uppercase mb-8">
              ÚNETE AL <br /><span className="text-pangea-primary">ECOSISTEMA</span>
            </h2>
            <p className="font-body text-zinc-400 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
              Recibe análisis técnicos, filtraciones de hardware y lo mejor de la cultura geek directamente en tu terminal. <span className="text-white font-bold italic">Sin spam, solo pura señal digital.</span>
            </p>
          </div>

          <div className="comm-card w-full lg:max-w-md bg-[#0a0a0a]/80 p-8 md:p-12 border border-white/5 backdrop-blur-xl rounded-sm relative group overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pangea-primary/10 blur-[100px] group-hover:bg-pangea-primary/20 transition-all duration-700" />
            
            <form className="relative z-10 flex flex-col gap-6" onSubmit={handleSubscribe}>
              <div className="space-y-2 text-left">
                <label className="font-label text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase ml-1">TU DIRECCIÓN DE CORREO</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder="USER@PanGGea.APP"
                  className="w-full bg-black/50 border-b-2 border-white/10 p-4 text-white font-label text-sm focus:border-pangea-primary focus:ring-0 transition-all placeholder:text-white/10 uppercase tracking-widest disabled:opacity-50"
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="group relative w-full bg-pangea-tertiary text-black h-16 font-label text-xs font-[900] tracking-[0.3em] uppercase overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_50px_rgba(255,215,0,0.4)] disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center gap-3">
                  {status === 'loading' ? (
                    <><Loader2 size={16} className="animate-spin" /> ENCRIPTANDO...</>
                  ) : (
                    <>ACCESO TOTAL <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-500" /></>
                  )}
                </div>
              </button>

              {/* Mensaje de Sistema */}
              {message && (
                <div className={`text-center font-mono text-[9px] uppercase tracking-widest mt-2 p-3 border ${status === 'success' ? 'border-[#00FF66]/30 text-[#00FF66] bg-[#00FF66]/5' : 'border-[#FF0055]/30 text-[#FF0055] bg-[#FF0055]/5'}`}>
                  {message}
                </div>
              )}

              <p className="text-[10px] text-zinc-600 font-medium text-center tracking-tight">
                AL UNIRTE, ACEPTAS NUESTROS PROTOCOLOS DE PRIVACIDAD.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}