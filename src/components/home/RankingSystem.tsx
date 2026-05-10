import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronRight, TrendingUp, Disc, Gamepad2, Tv, Activity, Flame, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// 🔥 Importación táctica del bloque de AdSense
import { AdSlot } from '../../components/layout/AdSlot'; 

// 1. DATA MASTER (10 de cada uno)
const CATS = [
  { id: "games",    icon: <Gamepad2 size={14} />, label: "TOP_GAMES" },
  { id: "upcoming", icon: <Flame size={14} />,    label: "MOST_ANTICIPATED" },
  { id: "spotify",  icon: <Disc size={14} />,     label: "SPOTIFY_ARTISTS" },
  { id: "anime",    icon: <Activity size={14} />, label: "ANIME_CHART" },
  { id: "movies",   icon: <Tv size={14} />,       label: "CINEMA_2026" },
];

const DATA = {
  games: [
    { rank:1, title:"Fortnite", sub:"Epic Games", tag:"BATTLE_ROYALE", img:"https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=600", stat:"8.4M ACT", desc:"El Capítulo 6 mantiene la corona con el evento 'Aeterna'.", statA:"8.4M", statAL:"Pico Diario", statB:"#1", statBL:"Global" },
    { rank:2, title:"Marvel Rivals", sub:"NetEase", tag:"HERO_SHOOTER", img:"https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=600", stat:"3.1M ACT", desc:"Doom domina el meta competitivo actual.", statA:"3.1M", statAL:"Activos", statB:"S2", statBL:"Season" },
    { rank:3, title:"Elden Ring", sub:"FromSoft", tag:"ACTION_RPG", img:"https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600", stat:"2.8M ACT", desc:"Shadow of the Erdtree sigue rompiendo récords de dificultad.", statA:"2.8M", statAL:"Players", statB:"9.8", statBL:"Metacritic" },
    { rank:4, title:"Valorant", sub:"Riot Games", tag:"TACTICAL_FPS", img:"https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600", stat:"2.1M ACT", desc:"El nuevo agente Vyse redefine el control de mapa.", statA:"2.1M", statAL:"Mensual", statB:"v9.08", statBL:"Patch" },
    { rank:5, title:"Minecraft", sub:"Mojang", tag:"SANDBOX", img:"https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600", stat:"1.9M ACT", desc:"El bioma Pale Garden atrajo de vuelta a los veteranos.", statA:"1.9M", statAL:"Daily", statB:"1.21", statBL:"Update" },
    { rank:6, title:"Roblox", sub:"Roblox Corp", tag:"PLATFORM", img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600", stat:"1.7M ACT", desc:"Economía interna en máximos históricos este mes.", statA:"1.7M", statAL:"Users", statB:"380K", statBL:"Devs" },
    { rank:7, title:"League of Legends", sub:"Riot Games", tag:"MOBA", img:"https://images.unsplash.com/photo-1542751110-97427bbecf20?w=600", stat:"1.5M ACT", desc:"Arranca la pretemporada con cambios masivos al mapa.", statA:"1.5M", statAL:"Ranked", statB:"S15", statBL:"Season" },
    { rank:8, title:"CoD: BO6", sub:"Activision", tag:"FPS", img:"https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=600", stat:"1.2M ACT", desc:"Zombies Mode sigue siendo el modo más jugado.", statA:"1.2M", statAL:"Live", statB:"T2", statBL:"Season" },
    { rank:9, title:"GTA Online", sub:"Rockstar", tag:"OPEN_WORLD", img:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600", stat:"900K ACT", desc:"Expectativa por GTA VI mantiene vivo el hype.", statA:"900K", statAL:"Daily", statB:"12Y", statBL:"Years Active" },
    { rank:10, title:"Genshin Impact", sub:"HoYoverse", tag:"GACHA_RPG", img:"https://images.unsplash.com/photo-1518562923868-ff00dad09be2?w=600", stat:"850K ACT", desc:"Natlan expande sus fronteras con nuevos personajes.", statA:"850K", statAL:"Concurrent", statB:"v5.2", statBL:"Update" },
  ],
  upcoming: [
    { rank:1, title:"GTA VI", sub:"Rockstar Games", tag:"GLOBAL_HYPE", img:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600", stat:"OVR 100", desc:"El juego más esperado de la historia de la humanidad.", statA:"100", statAL:"Hype Score", statB:"2025", statBL:"Target" },
    { rank:2, title:"Resident Evil 9", sub:"Capcom", tag:"SURVIVAL_HORROR", img:"https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600", stat:"OVR 98", desc:"Leon regresa en una entrega de mundo semi-abierto.", statA:"98", statAL:"Hype Score", statB:"RE Engine", statBL:"Tech" },
    { rank:3, title:"Metroid Prime 4", sub:"Nintendo", tag:"FPS_ADVENTURE", img:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600", stat:"OVR 97", desc:"Samus Aran regresa tras una década de silencio.", statA:"97", statAL:"Hype Score", statB:"NSW", statBL:"Platform" },
    { rank:4, title:"Silksong", sub:"Team Cherry", tag:"METROIDVANIA", img:"https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600", stat:"OVR 96", desc:"La leyenda urbana que todos queremos jugar.", statA:"96", statAL:"Hype Score", statB:"TBA", statBL:"Release" },
    { rank:5, title:"Death Stranding 2", sub:"Kojima Prod", tag:"ACTION", img:"https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=600", stat:"OVR 95", desc:"Kojima elevando el cine interactivo a otro nivel.", statA:"95", statAL:"Hype Score", statB:"PS5", statBL:"Exclusive" },
    { rank:6, title:"Ghost of Yotei", sub:"Sucker Punch", tag:"SAMURAI", img:"https://images.unsplash.com/photo-1518562923868-ff00dad09be2?w=600", stat:"OVR 94", desc:"Secuela espiritual de Tsushima en una nueva era.", statA:"94", statAL:"Hype Score", statB:"2025", statBL:"Year" },
    { rank:7, title:"DOOM: Dark Ages", sub:"id Software", tag:"FAST_FPS", img:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600", stat:"OVR 93", desc:"Guerra medieval con el toque visceral de DOOM.", statA:"93", statAL:"Hype Score", statB:"Day 1", statBL:"Gamepass" },
    { rank:8, title:"Monster Hunter Wilds", sub:"Capcom", tag:"ACTION", img:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600", stat:"OVR 92", desc:"Cacería masiva con clima dinámico y ecosistemas vivos.", statA:"92", statAL:"Hype Score", statB:"FEB 2025", statBL:"Date" },
    { rank:9, title:"Wolverine", sub:"Insomniac", tag:"MARVEL", img:"https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600", stat:"OVR 91", desc:"Logan con clasificación R y combate sangriento.", statA:"91", statAL:"Hype Score", statB:"PS5", statBL:"Platform" },
    { rank:10, title:"Fable", sub:"Playground", tag:"RPG", img:"https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600", stat:"OVR 90", desc:"El regreso del humor británico y la magia de Albión.", statA:"90", statAL:"Hype Score", statB:"Xbox", statBL:"Exclusive" },
  ],
  spotify: [
    { rank:1, title:"Pink Floyd", sub:"Classic Rock / Prog", tag:"LEGENDS", img:"https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600", stat:"22M MONTHLY", desc:"Los amos del prisma. Dominando el streaming con The Wall.", statA:"22M", statAL:"Oyentes", statB:"#1", statBL:"Rock Chart" },
    { rank:2, title:"Soda Stereo", sub:"Rock en Español", tag:"LATIN_GODS", img:"https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=600", stat:"15M MONTHLY", desc:"Cerati eterno. Gracias totales al legado más grande de LATAM.", statA:"15M", statAL:"Oyentes", statB:"Eterno", statBL:"Status" },
    { rank:3, title:"Michael Jackson", sub:"Pop / R&B", tag:"KING_OF_POP", img:"https://images.unsplash.com/photo-1514525253361-bee8d407425b?w=600", stat:"40M MONTHLY", desc:"Billie Jean sigue siendo la base rítmica del pop moderno.", statA:"40M", statAL:"Oyentes", statB:"#1", statBL:"Pop Chart" },
    { rank:4, title:"The Weeknd", sub:"Contemporary Pop", tag:"STARBOY", img:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600", stat:"110M MONTHLY", desc:"El artista con más streams mensuales del planeta actualmente.", statA:"110M", statAL:"Oyentes", statB:"Top 1", statBL:"Global" },
    { rank:5, title:"Queen", sub:"Classic Rock", tag:"CHAMPIONS", img:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600", stat:"45M MONTHLY", desc:"Freddie Mercury sigue uniendo estadios a través de la red.", statA:"45M", statAL:"Oyentes", statB:"Gold", statBL:"Legacy" },
    { rank:6, title:"Linkin Park", sub:"Nu Metal / Alt", tag:"REBORN", img:"https://images.unsplash.com/photo-1459749411177-042180ce673c?w=600", stat:"35M MONTHLY", desc:"El regreso con Emily Armstrong revitalizó sus clásicos.", statA:"35M", statAL:"Oyentes", statB:"Active", statBL:"Status" },
    { rank:7, title:"Metallica", sub:"Thrash Metal", tag:"HEAVY", img:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600", stat:"25M MONTHLY", desc:"La locomotora del metal no se detiene tras 40 años.", statA:"25M", statAL:"Oyentes", statB:"Touring", statBL:"Current" },
    { rank:8, title:"Gorillaz", sub:"Alt / Trip Hop", tag:"VIRTUAL", img:"https://images.unsplash.com/photo-1542751110-97427bbecf20?w=600", stat:"18M MONTHLY", desc:"Damon Albarn sigue experimentando con el sonido del futuro.", statA:"18M", statAL:"Oyentes", statB:"Web3", statBL:"Evolution" },
    { rank:9, title:"Daft Punk", sub:"Electronic", tag:"ROBOTS", img:"https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=600", stat:"17M MONTHLY", desc:"Aunque se separaron, su sonido es el pilar de la electrónica.", statA:"17M", statAL:"Oyentes", statB:"Iconic", statBL:"Rank" },
    { rank:10, title:"Arctic Monkeys", sub:"Indie Rock", tag:"INDIE_KINGS", img:"https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=600", stat:"16M MONTHLY", desc:"Alex Turner y la elegancia del rock británico moderno.", statA:"16M", statAL:"Oyentes", statB:"Top 10", statBL:"Indie" },
  ],
  anime: [
    { rank:1, title:"Dandadan", sub:"Science Saru", tag:"WILD_RIDE", img:"https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600", stat:"9.5 RATING", desc:"Fantasmas, aliens y la mejor animación del año.", statA:"9.5", statAL:"Rating", statB:"#1", statBL:"Seasonal" },
    { rank:2, title:"Solo Leveling S2", sub:"A-1 Pictures", tag:"ACTION", img:"https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=600", stat:"9.2 RATING", desc:"Jinwoo escala hacia el poder absoluto de los Monarcas.", statA:"9.2", statAL:"Rating", statB:"S2", statBL:"Status" },
    { rank:3, title:"Re:Zero S3", sub:"White Fox", tag:"ISEKAI", img:"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600", stat:"9.0 RATING", desc:"Subaru enfrenta el arco más oscuro de la serie hasta ahora.", statA:"9.0", statAL:"Rating", statB:"Arco 5", statBL:"Current" },
    { rank:4, title:"Blue Lock S2", sub:"8bit", tag:"SPORTS", img:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600", stat:"8.8 RATING", desc:"El egoísmo en el fútbol llevado al extremo visual.", statA:"8.8", statAL:"Rating", statB:"U-20", statBL:"Arc" },
    { rank:5, title:"Bleach: TYBW", sub:"Pierrot", tag:"SHONEN", img:"https://images.unsplash.com/photo-1541562232579-512a21360020?w=600", stat:"8.7 RATING", desc:"La conclusión épica de la guerra de los mil años.", statA:"8.7", statAL:"Rating", statB:"Part 3", statBL:"Release" },
    { rank:6, title:"Sakamoto Days", sub:"TMS Ent", tag:"COMEDY_ACTION", img:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600", stat:"8.4 RATING", desc:"El asesino retirado que solo quiere proteger su tienda.", statA:"8.4", statAL:"Rating", statB:"New", statBL:"Status" },
    { rank:7, title:"One Piece", sub:"Toei Anim", tag:"ADVENTURE", img:"https://images.unsplash.com/photo-1560972550-aba3456b5564?w=600", stat:"8.5 RATING", desc:"Egghead Island revela los secretos del Siglo Vacío.", statA:"8.5", statAL:"Rating", statB:"1130+", statBL:"Episodes" },
    { rank:8, title:"Dragon Ball Daima", sub:"Toei Anim", tag:"CLASSIC", img:"https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=600", stat:"8.2 RATING", desc:"Toriyama regresa a las raíces de la aventura pura.", statA:"8.2", statAL:"Rating", statB:"Anniv", statBL:"Special" },
    { rank:9, title:"Chainsaw Man Movie", sub:"MAPPA", tag:"GORE", img:"https://images.unsplash.com/photo-1518562923868-ff00dad09be2?w=600", stat:"8.1 RATING", desc:"Reze y Denji en el arco de la Bomba. Brutalidad pura.", statA:"8.1", statAL:"Rating", statB:"Film", statBL:"Format" },
    { rank:10, title:"Kaiju No. 8", sub:"Production IG", tag:"SCI-FI", img:"https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600", stat:"8.0 RATING", desc:"Kafka Hibino y la lucha interna contra el monstruo.", statA:"8.0", statAL:"Rating", statB:"S2 Prep", statBL:"Status" },
  ],
  movies: [
    { rank:1, title:"Avengers: Doomsday", sub:"Marvel Studios", tag:"MCU_BLOCKBUSTER", img:"https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600", stat:"MOST_ANT", desc:"Robert Downey Jr. regresa como Victor Von Doom.", statA:"High", statAL:"Priority", statB:"2026", statBL:"Year" },
    { rank:2, title:"Spider-Man 4", sub:"Marvel / Sony", tag:"MCU", img:"https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600", stat:"IN_PROD", desc:"Tom Holland en una nueva trilogía más callejera.", statA:"Confirm", statAL:"Status", statB:"July", statBL:"2026" },
    { rank:3, title:"The Batman II", sub:"DC Studios", tag:"DETECTIVE", img:"https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600", stat:"NOIR_STYLE", desc:"Pattinson explora el bajo mundo de Gotham una vez más.", statA:"Dark", statAL:"Tone", statB:"Late", statBL:"2026" },
    { rank:4, title:"Joker: Folie à Deux", sub:"DC / WB", tag:"DRAMA", img:"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600", stat:"STREAMING", desc:"Arthur Fleck y Harley Quinn en un musical de locura.", statA:"9.0", statAL:"Visuals", statB:"HBO", statBL:"Platform" },
    { rank:5, title:"Dune: Part Three", sub:"Legendary", tag:"SCI-FI", img:"https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600", stat:"MASTERPIECE", desc:"Paul Atreides desata la guerra santa galáctica.", statA:"Final", statAL:"Part", statB:"Denis", statBL:"Director" },
    { rank:6, title:"Gladiator II", sub:"Paramount", tag:"EPIC", img:"https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600", stat:"BOX_OFFICE", desc:"Ridley Scott regresa al Coliseo con Paul Mescal.", statA:"A+", statAL:"Critics", statB:"Huge", statBL:"Budget" },
    { rank:7, title:"Nosferatu", sub:"Focus Features", tag:"HORROR", img:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600", stat:"GOTHIC", desc:"Robert Eggers revive al vampiro más aterrador del cine.", statA:"100%", statAL:"Vibe", statB:"Dec", statBL:"2024" },
    { rank:8, title:"Superman", sub:"DC Studios", tag:"HEROIC", img:"https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600", stat:"NEW_ERA", desc:"James Gunn reinicia el universo con el Hombre de Acero.", statA:"Bright", statAL:"Color", statB:"July", statBL:"2025" },
    { rank:9, title:"Beetlejuice 2", sub:"Warner Bros", tag:"COMEDY", img:"https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600", stat:"CULT_CLASSIC", desc:"Burton regresa a su estilo más puro y gótico.", statA:"Fun", statAL:"Score", statB:"Live", statBL:"Action" },
    { rank:10, title:"Sonic 3", sub:"Paramount", tag:"ANIMATED", img:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600", stat:"GLOBAL_HIT", desc:"Shadow debuta en la pantalla grande para el cierre.", statA:"Shadow", statAL:"Hype", statB:"Dec", statBL:"2024" },
  ]
};

type FilterType = keyof typeof DATA;

export default function RankingSystem() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('games');
  const [activeIdx, setActiveIdx] = useState(0);
  const container = useRef<HTMLDivElement>(null);

  // 🔥 ESCUDO ANTI-CRASH DE ADSENSE 🔥
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = DATA[activeFilter] || DATA.games;
  const spotItem = items[activeIdx] || items[0];

  useGSAP(() => {
    gsap.from(".header-ranking", {
      scrollTrigger: { trigger: container.current, start: "top 80%" },
      opacity: 0, y: -20, duration: 1, ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative py-32 bg-[#020202] overflow-hidden border-y border-white/5 flex justify-center font-body">
      
      {/* ─── HUD BACKGROUND ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FF003303_1px,transparent_1px),linear-gradient(to_bottom,#FF003303_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 z-0 pointer-events-none" />

      {/* ─── ESTRUCTURA TRES COLUMNAS ─── */}
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-12 px-6 relative z-10">
        
        {/* 🔥 ADS IZQUIERDA (x2) - Montado seguro para pantallas 2xl 🔥 */}
        {screenWidth >= 1536 && (
          <aside className="flex w-[160px] sticky top-28 flex-col gap-6 h-fit z-20">
            <div className="w-full h-[600px] bg-[#050505] border border-white/5 relative group block overflow-hidden transition-all duration-500 hover:border-[#FF0033]/50 hover:shadow-[0_10px_30px_-10px_rgba(255,0,51,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-0" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] text-center">
                <span className="font-mono text-[7px] font-black tracking-[0.2em] uppercase px-2 py-1 bg-[#020202] border border-white/10 rounded-sm text-[#FF0033] block w-full">SPONSORED</span>
              </div>
              <div className="relative z-20 w-full h-full flex items-center justify-center pt-10">
                <AdSlot slot="1794581943" />
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#FF0033] transition-all duration-700 z-10 shadow-[0_0_15px_#FF0033]" />
            </div>

            <div className="w-full h-[600px] bg-[#050505] border border-white/5 relative group block overflow-hidden transition-all duration-500 hover:border-[#FF0033]/50 hover:shadow-[0_10px_30px_-10px_rgba(255,0,51,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-0" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] text-center">
                <span className="font-mono text-[7px] font-black tracking-[0.2em] uppercase px-2 py-1 bg-[#020202] border border-white/10 rounded-sm text-[#FF0033] block w-full">SPONSORED</span>
              </div>
              <div className="relative z-20 w-full h-full flex items-center justify-center pt-10">
                <AdSlot slot="1794581943" />
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#FF0033] transition-all duration-700 z-10 shadow-[0_0_15px_#FF0033]" />
            </div>
          </aside>
        )}

        {/* ─── CONTENEDOR CENTRAL ─── */}
        <div className="max-w-[1200px] w-full overflow-hidden">
          
          {/* HEADER TITÁNICO */}
          <header className="header-ranking mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div>
              <div className="flex items-center gap-3 mb-6 text-[#FF0033]">
                <Trophy size={18} className="animate-pulse" />
                <span className="font-mono text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase italic">Pangea_Charts // MASTER_SCAN</span>
              </div>
              <h2 className="font-headline text-white text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.8] uppercase italic drop-shadow-2xl">
                THE <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #FF0033' }}>CHARTS</span>
              </h2>
            </div>
            
            <div className="w-full lg:w-auto text-left lg:text-right mt-2 lg:mt-0 overflow-hidden flex flex-col items-start lg:items-end">
              <p className="text-white/60 text-xs md:text-sm italic mb-8 leading-relaxed max-w-sm">
                "El veredicto táctico de la red. Títulos, artistas y leyendas que dominan el meta global."
              </p>
              
              {/* FILTROS TÁCTICOS */}
              <div className="flex overflow-x-auto flex-nowrap gap-2 hide-scrollbar w-full pb-2 md:justify-end">
                {CATS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setActiveFilter(c.id as FilterType); setActiveIdx(0); }}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 font-mono text-[9px] font-black tracking-widest transition-all rounded-sm border 
                      ${activeFilter === c.id 
                        ? 'bg-[#FF0033] border-[#FF0033] text-white shadow-[0_0_20px_#FF0033]' 
                        : 'border-white/10 text-white/40 lg:hover:text-white lg:hover:border-white/30 backdrop-blur-sm'}`}
                  >
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* GRID LAYOUT (8/12 - 4/12) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* COLUMNA LISTA (RANKING) */}
            <div className="lg:col-span-8 flex flex-col gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-3"
                >
                  {items.map((item, idx) => (
                    <div 
                      key={`${activeFilter}-${item.rank}`}
                      onClick={() => setActiveIdx(idx)}
                      // 🔥 MODIFICADO: min-h para que pueda crecer con la descripción en móvil/hover
                      className={`group relative min-h-[5rem] md:min-h-[6rem] py-2 md:py-3 cursor-pointer overflow-hidden border transition-all duration-500 rounded-sm flex items-center
                        ${activeIdx === idx 
                          ? 'bg-[#1a0505] border-[#FF0033]/50 shadow-[0_0_30px_rgba(255,0,51,0.15)]' 
                          : 'bg-[#050505] border-white/5 lg:hover:border-[#FF0033]/30'}`}
                    >
                      {/* Número Outline de fondo */}
                      <span className={`absolute left-4 font-headline text-7xl md:text-8xl font-black italic pointer-events-none transition-colors duration-500
                        ${activeIdx === idx ? 'text-[#FF0033]/10' : 'text-white/[0.02] lg:group-hover:text-white/[0.05]'}`}>
                        {item.rank < 10 ? `0${item.rank}` : item.rank}
                      </span>

                      {/* 🔥 IMAGEN ESTÁTICA Y RESPONSIVA: Color en móvil, Gris en PC, cero zoom 🔥 */}
                      <div className="w-20 md:w-32 h-full absolute top-0 left-0 overflow-hidden [clip-path:polygon(0_0,100%_0,85%_100%,0%_100%)]">
                        <img 
                          src={item.img} 
                          className={`w-full h-full object-cover transition-all duration-700 grayscale-0 lg:grayscale lg:group-hover:grayscale-0
                            ${activeIdx === idx ? 'lg:grayscale-0' : ''}`} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/80" />
                      </div>

                      {/* Info de la fila */}
                      <div className="flex-grow pl-24 md:pl-40 pr-4 md:pr-8 flex flex-col justify-center z-10 w-full">
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <span className="font-mono text-[8px] text-[#FF0033] font-black tracking-widest uppercase">{item.tag}</span>
                            <h3 className="font-headline text-lg md:text-2xl text-white font-black italic uppercase tracking-tighter lg:group-hover:text-[#FF0033] transition-colors line-clamp-1">
                              {item.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4 md:gap-8">
                            <div className="hidden sm:flex flex-col items-end">
                              <span className="font-mono text-[8px] text-white/30 uppercase font-black tracking-tighter">DATA_ANALYSIS</span>
                              <span className="font-mono text-xs text-white font-black flex items-center gap-2">
                                <TrendingUp size={12} className="text-[#FF0033]" /> {item.stat}
                              </span>
                            </div>
                            <ChevronRight size={20} className={`transition-transform duration-500 ${activeIdx === idx ? 'text-[#FF0033] translate-x-1' : 'text-white/10'}`} />
                          </div>
                        </div>

                        {/* 🔥 DESCRIPCIÓN RESPONSIVA TAILWIND 🔥 */}
                        <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] w-full">
                          <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                            <p className="text-white/60 text-[10px] md:text-xs italic leading-relaxed line-clamp-2 mt-2">
                              "{item.desc}"
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Sweep Neón Effect */}
                      {activeIdx === idx && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF0033]/5 to-transparent -translate-x-full animate-sweep pointer-events-none" />
                      )}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* COLUMNA SPOTLIGHT (DETALLES) */}
            <div className="lg:col-span-4 sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeFilter}-${activeIdx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[#080808] border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col"
                >
                  <div className="h-48 md:h-56 relative overflow-hidden">
                    <img src={spotItem.img} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                    <span className="absolute top-4 left-6 font-headline text-8xl font-black italic text-white/10">#{spotItem.rank}</span>
                  </div>

                  <div className="p-8">
                    <span className="font-mono text-[9px] text-[#FF0033] font-black tracking-[0.3em] uppercase block mb-2">{spotItem.sub}</span>
                    <h3 className="font-headline text-3xl md:text-4xl text-white font-black italic uppercase tracking-tighter leading-none mb-4">{spotItem.title}</h3>
                    <p className="text-white/50 text-xs md:text-sm italic leading-relaxed mb-8">"{spotItem.desc}"</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-white/5 border border-white/10 p-4 rounded-sm relative overflow-hidden group/stat">
                        <span className="font-mono text-[8px] text-white/30 uppercase block mb-1">{spotItem.statAL}</span>
                        <span className="font-mono text-lg text-white font-black text-[#FF0033]">{spotItem.statA}</span>
                        <Zap size={40} className="absolute -bottom-2 -right-2 text-white/[0.03] lg:group-hover/stat:text-[#FF0033]/10 transition-colors" />
                      </div>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-sm relative overflow-hidden group/stat">
                        <span className="font-mono text-[8px] text-white/30 uppercase block mb-1">{spotItem.statBL}</span>
                        <span className="font-mono text-lg text-white font-black">{spotItem.statB}</span>
                        <Trophy size={40} className="absolute -bottom-2 -right-2 text-white/[0.03] lg:group-hover/stat:text-[#FF0033]/10 transition-colors" />
                      </div>
                    </div>

                    <button className="w-full py-4 bg-transparent border border-[#FF0033]/40 hover:bg-[#FF0033] hover:text-white transition-all duration-300 group flex items-center justify-center gap-3">
                      <span className="font-mono text-[10px] font-black tracking-widest text-[#FF0033] lg:group-hover:text-white uppercase">Abrir Base de Datos</span>
                      <ChevronRight size={16} className="lg:group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* 🔥 ADS HASTA ABAJO (Montados seguros sin romper layout) 🔥 */}
          {screenWidth > 0 && (
            <>
              {/* Desktop Bottom Ad */}
              {screenWidth >= 1024 && (
                <div className="flex w-full min-h-[150px] bg-[#050505] border border-white/5 relative group mt-12 flex-col justify-center overflow-hidden transition-all duration-500 hover:border-[#FF0033]/50 hover:shadow-[0_10px_30px_-10px_rgba(255,0,51,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-0" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="font-mono text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1 bg-[#020202] border border-white/10 rounded-sm text-[#FF0033]">SPONSORED_NODE</span>
                  </div>
                  <div className="relative z-20 w-full h-full flex items-center justify-center p-4 pt-12">
                     <AdSlot slot="4821639929" format="auto" />
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 lg:group-hover:w-full bg-[#FF0033] transition-all duration-700 z-10 shadow-[0_0_15px_#FF0033]" />
                </div>
              )}

              {/* Mobile Bottom Ad */}
              {screenWidth < 1024 && (
                <div className="flex w-full min-h-[250px] bg-[#050505] border border-white/5 relative group mt-8 flex-col justify-center overflow-hidden transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-0" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="font-mono text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1 bg-[#020202] border border-white/10 rounded-sm text-[#FF0033]">SPONSORED_NODE</span>
                  </div>
                  <div className="relative z-20 w-full h-full flex items-center justify-center p-4 pt-12">
                     <AdSlot slot="4819366386" format="auto" />
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* 🔥 ADS DERECHA (x2) - Solo si la pantalla es mayor a 1536px (2xl) 🔥 */}
        {screenWidth >= 1536 && (
          <aside className="flex w-[160px] sticky top-28 flex-col gap-6 h-fit z-20">
            <div className="w-full h-[600px] bg-[#050505] border border-white/5 relative group block overflow-hidden transition-all duration-500 hover:border-[#FF0033]/50 hover:shadow-[0_10px_30px_-10px_rgba(255,0,51,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-0" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] text-center">
                <span className="font-mono text-[7px] font-black tracking-[0.2em] uppercase px-2 py-1 bg-[#020202] border border-white/10 rounded-sm text-[#FF0033] block w-full">SPONSORED</span>
              </div>
              <div className="relative z-20 w-full h-full flex items-center justify-center pt-10">
                <AdSlot slot="2057471674" />
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#FF0033] transition-all duration-700 z-10 shadow-[0_0_15px_#FF0033]" />
            </div>

            <div className="w-full h-[600px] bg-[#050505] border border-white/5 relative group block overflow-hidden transition-all duration-500 hover:border-[#FF0033]/50 hover:shadow-[0_10px_30px_-10px_rgba(255,0,51,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-0" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] text-center">
                <span className="font-mono text-[7px] font-black tracking-[0.2em] uppercase px-2 py-1 bg-[#020202] border border-white/10 rounded-sm text-[#FF0033] block w-full">SPONSORED</span>
              </div>
              <div className="relative z-20 w-full h-full flex items-center justify-center pt-10">
                <AdSlot slot="2057471674" />
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#FF0033] transition-all duration-700 z-10 shadow-[0_0_15px_#FF0033]" />
            </div>
          </aside>
        )}

      </div>

      {/* FONDO DECORATIVO GIGANTE */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.02] hidden 2xl:block select-none pointer-events-none">
        <span className="font-black italic text-[24vw] text-white leading-none tracking-tighter uppercase">CHARTS_DATA</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-sweep { animation: sweep 2s infinite ease-in-out; }
      `}} />
    </section>
  );
}