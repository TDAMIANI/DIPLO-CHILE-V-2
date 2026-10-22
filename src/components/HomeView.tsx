import React from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'motion/react';
import { Zap, Target, BookOpen, Layers, ArrowRight, Sparkles, Box, MonitorPlay } from 'lucide-react';

function VPContainer({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], [20, 80]);
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], [20, 80]);
  const gradientBackground = useMotionTemplate`radial-gradient(circle at ${bgX}% ${bgY}%, rgba(192, 132, 252, 0.15) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="w-full max-w-5xl mb-16 relative cursor-crosshair presentation-container"
    >
      {/* Interactive Radial Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none rounded-3xl"
        style={{ background: gradientBackground }}
      />

      {/* AR Floating Data Nodes */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {[
          { id: 1, x: "5%", y: "10%", z: 120, size: "w-16 h-16", delay: 0 },
          { id: 2, x: "88%", y: "20%", z: 80, size: "w-20 h-20", delay: 1 },
          { id: 3, x: "82%", y: "80%", z: 150, size: "w-24 h-24", delay: 2 },
          { id: 4, x: "12%", y: "75%", z: 60, size: "w-12 h-12", delay: 0.5 },
          { id: 5, x: "45%", y: "-10%", z: 100, size: "w-14 h-14", delay: 1.5 },
        ].map(node => (
          <motion.div
            key={node.id}
            className={`absolute rounded-xl border border-indigo-400/20 bg-indigo-500/10 backdrop-blur-sm ${node.size} flex items-center justify-center`}
            style={{ 
              left: node.x, 
              top: node.y,
            }}
            animate={{
              y: ["-15px", "15px", "-15px"],
              rotateX: ["-10deg", "10deg", "-10deg"],
              rotateY: ["-10deg", "10deg", "-10deg"],
              z: [node.z, node.z + 30, node.z]
            }}
            transition={{
              duration: 4 + node.id,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay
            }}
          >
            <div className="w-2 h-2 bg-fuchsia-400 rounded-full shadow-[0_0_12px_3px_rgba(232,121,249,0.6)]" />
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive Background Floor Grid */}
      <motion.div 
        style={{ 
          rotateX: useTransform(mouseYSpring, [-0.5, 0.5], ["65deg", "55deg"]),
          rotateY: useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]),
          rotateZ: useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]),
          transformStyle: "preserve-3d" 
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-20" 
          style={{
            backgroundImage: "linear-gradient(to right, #818cf8 2px, transparent 2px), linear-gradient(to bottom, #818cf8 2px, transparent 2px)",
            backgroundSize: "60px 60px",
            transform: "translateZ(-200px)",
            maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)"
          }}
        />
      </motion.div>

      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
        className="w-full text-left bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 relative border border-slate-700/50 shadow-2xl z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

export function HomeView({ setActiveTab }: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto flex flex-col items-center text-center pt-8 md:pt-16"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/40 relative"
      >
        <Zap className="w-12 h-12 text-white" />
        <div className="absolute inset-0 rounded-3xl ring-4 ring-white/20"></div>
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight"
      >
        IA Aplicada a
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mt-2">
          Productos y Servicios
        </span>
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl leading-relaxed font-medium"
      >
        Bienvenido al <span className="text-indigo-600 font-bold">Módulo 4</span> del taller. Un recorrido inmersivo de 15 horas combinando fundamentos teóricos y laboratorios prácticos.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setActiveTab('recap')}
          className="flex flex-col items-center p-8 bg-white border border-slate-200 rounded-3xl hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-100 transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <BookOpen className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 mb-4 transition-colors relative z-10" />
          <h3 className="text-lg font-extrabold text-slate-800 mb-2 relative z-10">Repaso Módulos 1-3</h3>
          <p className="text-sm text-slate-500 relative z-10">Fundamentos, LangChain y Blockchain empresarial.</p>
        </motion.button>

        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setActiveTab('s1')}
          className="flex flex-col items-center p-8 bg-gradient-to-b from-slate-900 to-indigo-950 border border-indigo-900 rounded-3xl hover:shadow-2xl hover:shadow-indigo-500/30 transition-all group relative overflow-hidden transform hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <Target className="w-10 h-10 text-fuchsia-400 group-hover:text-fuchsia-300 mb-4 transition-colors relative z-10" />
          <h3 className="text-lg font-extrabold text-white mb-2 relative z-10">Iniciar Módulo 4</h3>
          <p className="text-sm text-indigo-200 relative z-10 mb-4">Comenzar la primera sesión.</p>
          <div className="flex items-center text-xs font-bold uppercase tracking-wider text-fuchsia-400 group-hover:text-fuchsia-300 relative z-10">
            Let's go <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>

        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => setActiveTab('tools')}
          className="flex flex-col items-center p-8 bg-white border border-slate-200 rounded-3xl hover:border-purple-400 hover:shadow-xl hover:shadow-purple-100 transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <Sparkles className="w-10 h-10 text-slate-400 group-hover:text-purple-500 mb-4 transition-colors relative z-10" />
          <h3 className="text-lg font-extrabold text-slate-800 mb-2 relative z-10">Herramientas IA</h3>
          <p className="text-sm text-slate-500 relative z-10">Suite de modelos interactivos para desarrollo.</p>
        </motion.button>
      </div>

      <VPContainer>
        <div 
          style={{ transform: "translateZ(-50px)" }} 
          className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none"
        >
          {/* Background depth (LED Wall effect) */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[100px] -mr-40 -mt-40"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -ml-40 -mb-40"></div>
          
          {/* Grid lines simulating a 3D stage floor/wall */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" style={{ transform: "scale(1.5)" }}></div>
        </div>
        
        <div style={{ transformStyle: "preserve-3d" }} className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-10">
          <motion.div 
            style={{ transform: "translateZ(80px)" }}
            className="bg-gradient-to-br from-fuchsia-500 to-indigo-600 p-6 rounded-3xl shadow-xl shadow-fuchsia-500/30 shrink-0 border border-fuchsia-400/30"
          >
            <MonitorPlay className="w-12 h-12 text-white" />
          </motion.div>
          
          <div style={{ transformStyle: "preserve-3d" }} className="flex-1">
            <motion.div style={{ transform: "translateZ(60px)" }} className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-fuchsia-400" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-fuchsia-400">
                Entorno de Presentación Híbrido
              </h3>
            </motion.div>
            
            <motion.h2 style={{ transform: "translateZ(50px)" }} className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
              Arquitectura de Producción Virtual (VP) <br className="hidden md:block" /> y Realidad Extendida (XR)
            </motion.h2>
            
            <motion.p style={{ transform: "translateZ(40px)" }} className="text-slate-300 leading-relaxed font-medium mb-8 text-lg">
              Este proyecto ha sido desarrollado con una arquitectura tecnológica de nivel profesional. Iniciará su ejecución en un entorno virtual/híbrido inmersivo, y se trasladará sin problemas a un auditorio físico. Potenciado por flujos de Producción Virtual (VP) y Realidad Extendida (XR) para ofrecer una experiencia y un nivel de inmersión sin precedentes.
            </motion.p>
            
            <ul className="space-y-4" style={{ transformStyle: "preserve-3d" }}>
              <motion.li style={{ transform: "translateZ(60px)" }} className="flex items-start text-slate-300 bg-slate-800/50 p-5 rounded-2xl border border-slate-700 backdrop-blur-md shadow-lg">
                <Box className="w-8 h-8 text-fuchsia-400 mr-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">
                  <strong className="text-white text-lg block mb-1">Realidad Aumentada (AR):</strong>
                  Gráficos de datos, productos 3D o interfaces flotando en la pantalla del espectador en casa, sincronizados en vivo con la presentación.
                </span>
              </motion.li>
              <motion.li style={{ transform: "translateZ(70px)" }} className="flex items-start text-slate-300 bg-slate-800/50 p-5 rounded-2xl border border-slate-700 backdrop-blur-md shadow-lg">
                <MonitorPlay className="w-8 h-8 text-indigo-400 mr-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">
                  <strong className="text-white text-lg block mb-1">Efecto de Perspectiva (Perspectival Rendering):</strong>
                  El fondo LED cambia dinámicamente según la posición de la cámara del auditorio, creando profundidad visual real para el público presencial y virtual.
                </span>
              </motion.li>
            </ul>
          </div>
        </div>
      </VPContainer>
    </motion.div>
  );
}
