import { Zap, ShieldCheck, Star, ArrowRight } from 'lucide-react';

export default function SubscriptionCard() {
  const ACCENT_COLOR = "#FF4500"; // Naranja Pangea

  return (
    <div className="max-w-md mx-auto my-20 relative group">
      {/* Glow de fondo */}
      <div 
        className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-sm blur opacity-20 group-hover:opacity-50 transition duration-1000"
      ></div>

      <div className="relative bg-[#050505] border border-white/10 p-8 flex flex-col items-center">
        
        {/* Header Táctico */}
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck size={20} className="text-[#FF4500]" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase">Protocol_Zero_Ads</span>
        </div>

        <h3 className="font-headline text-4xl font-black italic uppercase text-white mb-2 tracking-tighter">
          PANGEA <span className="text-[#FF4500]">ZERO</span>
        </h3>
        
        <p className="text-white/40 font-mono text-[11px] text-center mb-8 uppercase tracking-widest leading-relaxed">
          Elimina toda la publicidad, desbloquea acceso anticipado y apoya la infraestructura de BitXolo.
        </p>

        {/* Precio */}
        <div className="flex items-baseline gap-2 mb-10">
          <span className="text-white/20 font-mono text-xl">$</span>
          <span className="text-6xl font-black italic text-white tracking-tighter">3.00</span>
          <span className="text-white/40 font-mono text-xs uppercase">USD / MES</span>
        </div>

        {/* Beneficios */}
        <ul className="w-full space-y-4 mb-10 border-y border-white/5 py-8">
          <li className="flex items-center gap-3 text-[12px] font-mono uppercase tracking-wider">
            <Zap size={14} className="text-[#FF4500]" />
            <span className="text-white/80">Navegación 100% libre de Ads</span>
          </li>
          <li className="flex items-center gap-3 text-[12px] font-mono uppercase tracking-wider">
            <Star size={14} className="text-[#FF4500]" />
            <span className="text-white/80">Badge exclusivo en comunidad</span>
          </li>
          <li className="flex items-center gap-3 text-[12px] font-mono uppercase tracking-wider text-white/30">
            <ShieldCheck size={14} />
            <span>Soporte directo al desarrollo</span>
          </li>
        </ul>

        {/* BOTÓN DE ACCIÓN */}
        <button 
          className="w-full bg-[#FF4500] text-black font-headline font-[950] italic py-4 px-6 flex items-center justify-between group/btn hover:bg-white transition-all duration-300"
          onClick={() => window.location.href = 'https://buy.stripe.com/5kQeVc33qdGh3S68Ud93y00'}
        >
          <span className="text-lg tracking-tighter">INICIAR_SUSCRIPCIÓN</span>
          <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <span className="mt-6 font-mono text-[8px] text-white/20 uppercase tracking-[0.3em]">
          Powered by Stripe Secure Encryption
        </span>
      </div>
    </div>
  );
}