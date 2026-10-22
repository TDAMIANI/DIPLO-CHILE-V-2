import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, ChevronLeft, ChevronRight, Maximize2, Minimize2, Target, 
  BookOpen, Tv, Settings, Volume2, VolumeX, Eye, Info, PenTool, 
  Sparkles, CheckCircle2, RefreshCw, Layers, List, Bookmark, 
  Flame, HelpCircle, Terminal, Download, ArrowUpRight, Copy, Check,
  ExternalLink, Table, ShieldAlert, Award, FileText, Compass, Edit3, Trash2, X
} from 'lucide-react';
import pptxgen from "pptxgenjs";
import { SESSIONS_DATA, TOOLS } from '../data';
import { TopicInfographic } from './TopicInfographic';
import { TopicSandbox } from './TopicSandbox';
import { WorkflowsView } from './WorkflowsView';
import { GenAILabView } from './GenAILabView';

interface PptViewProps {
  completedSessions: string[];
  onToggleComplete: (id: string) => void;
  onClose: () => void;
}

type ThemeType = 'executive-dark' | 'academic-light' | 'cyber-neon' | 'warm-ochre';

interface Slide {
  id: string;
  type: 'cover' | 'agenda' | 'theory' | 'infographic' | 'sandbox' | 'lab' | 'workflows' | 'genailab' | 'conclusion';
  title: string;
  subtitle?: string;
  topicIdx?: number;
  pointData?: {
    title: string;
    details: string[];
  };
}

const getSlideImageUrl = (slide: Slide, sessionId: string): string => {
  if (slide.type === 'cover') {
    return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop";
  }
  if (slide.type === 'agenda') {
    return "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop";
  }
  if (slide.type === 'lab') {
    return "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600&auto=format&fit=crop";
  }
  if (slide.type === 'workflows') {
    return "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop";
  }
  if (slide.type === 'genailab') {
    return "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop";
  }
  if (slide.type === 'conclusion') {
    return "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop";
  }
  
  if (slide.type === 'theory' && slide.topicIdx !== undefined) {
    const images: Record<string, string[]> = {
      s1: [
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&auto=format&fit=crop", // lifecycle
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop", // warehouses
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop", // unstructured
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"  // genai
      ],
      s2: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop", // ETL
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop", // APIs
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop", // streaming
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop"  // genai ETL
      ],
      s3: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop", // dashboard design
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop", // KPIs
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop", // storytelling
        "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop"  // programming component
      ],
      s4: [
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=600&auto=format&fit=crop", // real time
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop", // event architectures
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop", // end-to-end iot
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop"  // agents stream
      ],
      s5: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop", // 4 pillars
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop", // product design methodology
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop", // ethics/privacy
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"  // scaling up production
      ]
    };
    const sessionImages = images[sessionId] || images.s1;
    return sessionImages[slide.topicIdx % sessionImages.length];
  }
  return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop";
};

export function PptView({ completedSessions, onToggleComplete, onClose }: PptViewProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<string>('s1');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [activeTheme, setActiveTheme] = useState<ThemeType>('executive-dark');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(10); // seconds per slide
  const [showPresenterNotes, setShowPresenterNotes] = useState<boolean>(true);
  const [showOutline, setShowOutline] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Presentation aids
  const [laserPointerActive, setLaserPointerActive] = useState<boolean>(false);
  const [laserCoords, setLaserCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [blackboardActive, setBlackboardActive] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [penColor, setPenColor] = useState<string>('#ef4444');
  const [penWidth, setPenWidth] = useState<number>(3);
  
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const presentationContainerRef = useRef<HTMLDivElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const currentSession = SESSIONS_DATA.find(s => s.id === selectedSessionId) || SESSIONS_DATA[0];

  // Generate slides for the selected session
  const slides: Slide[] = [];

  // 1. Cover slide
  slides.push({
    id: 'cover',
    type: 'cover',
    title: currentSession.title,
    subtitle: `Sesión Práctica de IA Aplicada • ${currentSession.date}`
  });

  // 2. Agenda / Outline slide
  slides.push({
    id: 'agenda',
    type: 'agenda',
    title: 'Agenda de la Sesión',
    subtitle: `Estructura temática y objetivos prácticos • Duración: ${currentSession.hours} Horas`
  });

  // 3. Loop through topics, adding theory, infographic, and sandbox slide for each
  currentSession.theory.points.forEach((point, idx) => {
    // Theory Slide
    slides.push({
      id: `theory-${idx}`,
      type: 'theory',
      title: point.title,
      subtitle: `Concepto Clave • Fundamento Teórico ${idx + 1}`,
      topicIdx: idx,
      pointData: point
    });

    // Infographic Slide
    slides.push({
      id: `infographic-${idx}`,
      type: 'infographic',
      title: `Arquitectura Visual: ${point.title.split(':')[0] || 'Esquema'}`,
      subtitle: `Esquema de Flujo Analítico e Infraestructura`,
      topicIdx: idx
    });

    // Sandbox Slide
    slides.push({
      id: `sandbox-${idx}`,
      type: 'sandbox',
      title: `Sandbox Interactivo: ${point.title.split(':')[0] || 'Práctica'}`,
      subtitle: `Muestra de Datos, Prompts, Herramientas y Casos Reales`,
      topicIdx: idx
    });
  });

  // 4. Practical Lab Slide
  slides.push({
    id: 'lab',
    type: 'lab',
    title: `Proyecto de Laboratorio: ${currentSession.practice.title}`,
    subtitle: `Caso de Negocio • Aplicación Real`
  });

  // 5. Workflows Slide
  slides.push({
    id: 'workflows',
    type: 'workflows',
    title: 'Flujos y Arquitecturas Reales',
    subtitle: 'Diagramas de Secuencia e Interacciones Críticas'
  });

  // 6. GenAI Lab Slide
  slides.push({
    id: 'genailab',
    type: 'genailab',
    title: 'Laboratorio Interactivo de IA Generativa',
    subtitle: 'Pruebas de Modelos, Parámetros y Consola en Vivo'
  });

  // 7. Conclusion slide
  slides.push({
    id: 'conclusion',
    type: 'conclusion',
    title: 'Cierre y Conclusiones',
    subtitle: 'Resumen de aprendizajes clave adquiridos en el módulo'
  });

  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex];

  // Handle slide navigation
  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      clearCanvas();
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      clearCanvas();
    }
  };

  // Autoplay effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentSlideIndex < totalSlides - 1) {
          setCurrentSlideIndex(prev => prev + 1);
          clearCanvas();
        } else {
          setIsPlaying(false);
        }
      }, playSpeed * 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSlideIndex, playSpeed, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (blackboardActive) return; // Prevent typing/navigating while drawing
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, blackboardActive]);

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!presentationContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      presentationContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Error al activar pantalla completa:", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Blackboard Drawing Implementation
  useEffect(() => {
    if (blackboardActive && canvasRef.current) {
      const canvas = canvasRef.current;
      // Fit to parent size
      canvas.width = canvas.parentElement?.clientWidth || 1024;
      canvas.height = canvas.parentElement?.clientHeight || 576;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.strokeStyle = penColor;
        context.lineWidth = penWidth;
        contextRef.current = context;
      }
    }
  }, [blackboardActive, penColor, penWidth]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    if (!blackboardActive || !contextRef.current || !canvasRef.current) return;
    const { offsetX, offsetY } = nativeEvent;
    
    // Scale offset if fullscreen
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (canvasRef.current && contextRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Laser Pointer Coordinates Tracker
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!laserPointerActive || !presentationContainerRef.current) return;
    const rect = presentationContainerRef.current.getBoundingClientRect();
    setLaserCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Copy helper
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  // Define Theme Styling Classes
  const getThemeClasses = () => {
    switch (activeTheme) {
      case 'executive-dark':
        return {
          bg: 'bg-[#0f172a] text-white',
          card: 'bg-[#1e293b]/80 border-[#334155]',
          accentText: 'text-indigo-400',
          titleText: 'text-slate-100',
          bodyText: 'text-slate-300',
          border: 'border-[#334155]',
          badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
          highlightCard: 'bg-[#1e1b4b]/60 border-indigo-500/30 text-indigo-200'
        };
      case 'academic-light':
        return {
          bg: 'bg-stone-50 text-stone-900 border-stone-200',
          card: 'bg-white border-stone-200 shadow-sm',
          accentText: 'text-stone-700 font-bold',
          titleText: 'text-stone-900 font-serif',
          bodyText: 'text-stone-700',
          border: 'border-stone-200',
          badge: 'bg-stone-100 text-stone-800 border-stone-300',
          highlightCard: 'bg-stone-100 border-stone-300 text-stone-800'
        };
      case 'cyber-neon':
        return {
          bg: 'bg-black text-[#00ffcc] font-mono',
          card: 'bg-zinc-950 border-[#00ffcc]/30 shadow-[0_0_10px_rgba(0,255,204,0.05)]',
          accentText: 'text-[#ff0055]',
          titleText: 'text-white font-bold uppercase tracking-wider',
          bodyText: 'text-[#e0e0e0]',
          border: 'border-[#00ffcc]/20',
          badge: 'bg-[#00ffcc]/10 text-[#00ffcc] border-[#00ffcc]/30',
          highlightCard: 'bg-zinc-900 border-[#ff0055]/30 text-white'
        };
      case 'warm-ochre':
        return {
          bg: 'bg-[#faf6f0] text-[#3e2723]',
          card: 'bg-white border-[#efe5fd] shadow-sm',
          accentText: 'text-[#795548]',
          titleText: 'text-[#3e2723] font-serif',
          bodyText: 'text-[#5d4037]',
          border: 'border-[#d7ccc8]',
          badge: 'bg-[#efebe9] text-[#5d4037] border-[#d7ccc8]',
          highlightCard: 'bg-[#efebe9] border-[#d7ccc8] text-[#3e2723]'
        };
    }
  };

  const theme = getThemeClasses();

  // Helper to split and format bullet points
  const formatBulletDetail = (detail: string) => {
    if (detail.includes('|')) {
      const parts = detail.split('|');
      const concept = parts[0].trim();
      const explanation = parts[1] || '';
      
      // Look for "¿Por qué? / ¿Para qué?" patterns
      const whyMatch = explanation.match(/¿Por qué\?[^¿]*/i);
      const whatForMatch = explanation.match(/¿Para qué\?[^¿]*/i);

      return (
        <div className="space-y-3">
          <p className="font-extrabold text-lg md:text-2xl text-white tracking-tight">{concept}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-sm md:text-base">
            {whyMatch && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 shadow-sm">
                <span className="font-extrabold text-blue-400 block mb-1.5 flex items-center gap-1.5 text-xs md:text-sm uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  💡 ¿Por qué?
                </span>
                <span className="text-slate-200 leading-relaxed font-medium">{whyMatch[0].replace(/¿Por qué\?:?/i, '').trim()}</span>
              </div>
            )}
            {whatForMatch && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 shadow-sm">
                <span className="font-extrabold text-emerald-400 block mb-1.5 flex items-center gap-1.5 text-xs md:text-sm uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  🎯 ¿Para qué?
                </span>
                <span className="text-slate-200 leading-relaxed font-medium">{whatForMatch[0].replace(/¿Para qué\?:?/i, '').trim()}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return <p className="text-slate-200 leading-relaxed text-base md:text-xl font-bold">{detail}</p>;
  };

  // Generate customized Speaker / Presenter Notes for every slide
  const getSpeakerNotes = () => {
    switch (currentSlide.type) {
      case 'cover':
        return `Diga: "Bienvenidos a la presentación de la ${currentSession.title}. Hoy abordaremos de forma aplicada el temario teórico y completaremos laboratorios prácticos de IA." • Puntos clave: Destacar la duración de ${currentSession.hours} horas y que este taller une los fundamentos teóricos con simulación de datos en tiempo real.`;
      case 'agenda':
        return `Diga: "Esta es la hoja de ruta para hoy. Primero revisaremos los temas teóricos fundamentales: ${currentSession.theory.points.map(p => p.title.split(':')[0]).join(', ')}." • Práctica: "Luego pasaremos a un caso real de negocio enfocado en: ${currentSession.practice.title}. Haremos simulaciones en el Sandbox interactivo."`;
      case 'theory':
        return `Puntos clave para presentar el tema "${currentSlide.title}":\n1. Explique el concepto clave detallado en la slide.\n2. Conéctelo con la audiencia usando los cuadros integrados de "¿Por qué?" (origen o necesidad empresarial) y "¿Para qué?" (resultado práctico de la solución).\n3. Use ejemplos locales chilenos de cómo la falta de este pilar provoca ineficiencia o pérdida de ventaja competitiva.`;
      case 'infographic':
        return `Diga: "Veamos ahora la arquitectura visual y el flujo técnico." • Acciones: Use el PUNTERO LÁSER de la suite para señalar el flujo de izquierda a derecha. Explique cómo entran los datos a la derecha y se procesan centralmente antes de ser expuestos en las interfaces visuales. Resalte la interacción de APIs o almacenes de la nube.`;
      case 'sandbox':
        return `Sandbox en vivo: "Aquí tenemos herramientas, datos de simulación real y un caso corporativo." • Diga: "Hagamos un ejercicio rápido. Vean cómo la estructura de datos que se detalla en el dataframe simula las transacciones reales. Copien el prompt diseñado para que la IA asista en este flujo y verifiquen las herramientas de mercado que resuelven este problema."`;
      case 'lab':
        return `Exposición del Laboratorio: "Este es nuestro desafío práctico principal." • Lea el escenario de negocio con tono inspirador: "${currentSession.practice.scenario}". • Detalle los pasos a seguir del checklist en vivo. Explique que la suite IA requerida (${currentSession.practice.toolsUsed.map(t => TOOLS[t]?.name).join(', ')}) nos permitirá acelerar el desarrollo del script o diagrama requerido.`;
      case 'workflows':
        return `Demostración de Casos de Uso: "Analizaremos diagramas de secuencia reales utilizados en grandes corporaciones." • Explique que entender la interacción entre sistemas distribuidos nos permite prevenir caídas de producción en Black Friday o eventos masivos chilenos.`;
      case 'genailab':
        return `Laboratorio de IA en vivo: "Utilizaremos la consola directa de ingeniería de prompts para iterar con los LLM." • Muestre a la audiencia cómo cambiar parámetros (temperatura, tipo de modelo, prompts del sistema) afecta el nivel de creatividad y consistencia en las respuestas analíticas.`;
      case 'conclusion':
        return `Cierre de Sesión: "Hemos recorrido el módulo completo." • Pregunte a la audiencia: "¿Qué dudas quedan sobre estos conceptos?" • Acciones: Felicite al grupo y haga clic en el botón de "Marcar Sesión como Completada" para guardar el progreso corporativo en el navegador.`;
      default:
        return 'Notas de apoyo para el orador de la sesión.';
    }
  };

  const downloadPptx = () => {
    const pres = new pptxgen();
    pres.author = "Tania Damiani";
    pres.company = "IA Aplicada";
    pres.subject = currentSession.title;
    pres.title = currentSession.title;
    pres.layout = 'LAYOUT_16x9';

    slides.forEach(s => {
      let slide = pres.addSlide();
      // Premium dark background color for a high-end corporate presentation feel
      slide.background = { color: "0B0F19" };

      // Top Header
      slide.addText(`Módulo 4 • ${currentSession.id.toUpperCase()}`, { 
        x: 0.6, 
        y: 0.25, 
        w: 4.5, 
        h: 0.4, 
        fontSize: 10, 
        color: "94a3b8", 
        fontFace: "Segoe UI",
        bold: true
      });
      
      slide.addText(s.type.toUpperCase(), { 
        x: 5.5, 
        y: 0.25, 
        w: 3.9, 
        h: 0.4, 
        align: "right", 
        fontSize: 10, 
        color: "818cf8", 
        bold: true,
        fontFace: "Segoe UI"
      });

      // Split layout setup: 
      // Left side is for structured content with larger fonts (width: 5.0 inches)
      // Right side is for beautiful Unsplash imagery matching the topic (width: 3.4 inches)
      const imageUrl = getSlideImageUrl(s, selectedSessionId);
      
      // Try adding the beautiful topic image on the right side
      if (imageUrl) {
        slide.addImage({ 
          path: imageUrl, 
          x: 5.9, 
          y: 0.8, 
          w: 3.5, 
          h: 4.0
        });
      }

      if (s.type === 'cover') {
        slide.addText("TALLER CORPORATIVO DE APRENDIZAJE", { 
          x: 0.6, 
          y: 1.0, 
          w: 5.0, 
          h: 0.3, 
          fontSize: 11, 
          bold: true, 
          color: "818cf8", 
          fontFace: "Segoe UI" 
        });

        slide.addText(s.title, { 
          x: 0.6, 
          y: 1.4, 
          w: 5.0, 
          h: 2.2, 
          fontSize: 34, 
          bold: true, 
          color: "ffffff", 
          fontFace: "Segoe UI" 
        });

        if (s.subtitle) {
          slide.addText(s.subtitle, { 
            x: 0.6, 
            y: 3.7, 
            w: 5.0, 
            h: 0.8, 
            fontSize: 16, 
            color: "cbd5e1", 
            fontFace: "Segoe UI" 
          });
        }

        slide.addText("Disertante: Tania Damiani • Santiago, Chile", { 
          x: 0.6, 
          y: 4.6, 
          w: 5.0, 
          h: 0.3, 
          fontSize: 12, 
          italic: true, 
          color: "94a3b8", 
          fontFace: "Segoe UI" 
        });

      } else if (s.type === 'agenda') {
        slide.addText("HOJA DE RUTA", { 
          x: 0.6, 
          y: 0.5, 
          w: 5.0, 
          h: 0.3, 
          fontSize: 11, 
          bold: true, 
          color: "818cf8", 
          fontFace: "Segoe UI" 
        });

        slide.addText("Temario de la Sesión", { 
          x: 0.6, 
          y: 0.8, 
          w: 5.0, 
          h: 0.8, 
          fontSize: 30, 
          bold: true, 
          color: "ffffff", 
          fontFace: "Segoe UI" 
        });
        
        let yPos = 1.8;
        currentSession.theory.points.forEach((p, i) => {
          // Extract cleaner shorter titles for slides
          const shortTitle = p.title.includes(':') ? p.title.split(':')[1].replace(/\.$/, '').trim() : p.title;
          slide.addText(`•  ${shortTitle}`, { 
            x: 0.6, 
            y: yPos, 
            w: 5.0, 
            h: 0.5, 
            fontSize: 16, 
            bold: true, 
            color: "e2e8f0", 
            fontFace: "Segoe UI" 
          });
          yPos += 0.75;
        });

        // Add Practice Lab row too
        slide.addText(`•  Proyecto Práctico: ${currentSession.practice.title}`, { 
          x: 0.6, 
          y: yPos, 
          w: 5.0, 
          h: 0.5, 
          fontSize: 16, 
          bold: true, 
          color: "67e8f9", 
          fontFace: "Segoe UI" 
        });

      } else if (s.type === 'theory' && s.pointData) {
        slide.addText(`TEMA COGNITIVO ${s.topicIdx !== undefined ? s.topicIdx + 1 : ''}`, { 
          x: 0.6, 
          y: 0.5, 
          w: 5.0, 
          h: 0.3, 
          fontSize: 11, 
          bold: true, 
          color: "818cf8", 
          fontFace: "Segoe UI" 
        });

        // Use shorter clean title
        const cleanTitle = s.title.includes(':') ? s.title.split(':')[1].trim() : s.title;
        slide.addText(cleanTitle, { 
          x: 0.6, 
          y: 0.8, 
          w: 5.0, 
          h: 1.0, 
          fontSize: 24, 
          bold: true, 
          color: "ffffff", 
          fontFace: "Segoe UI" 
        });
        
        let yPos = 1.9;
        // Limit to 3 items to avoid cluttering and text-overflow, keeping letters larger!
        s.pointData.details.slice(0, 3).forEach(d => {
          const parts = d.split('|');
          const fullConcept = parts[0].trim();
          const conceptTitle = fullConcept.includes(':') ? fullConcept.split(':')[0].trim() : fullConcept;
          const conceptDesc = fullConcept.includes(':') ? fullConcept.substring(fullConcept.indexOf(':') + 1).trim() : '';

          slide.addText(`•  ${conceptTitle}`, { 
            x: 0.6, 
            y: yPos, 
            w: 5.0, 
            h: 0.35, 
            fontSize: 17, 
            bold: true, 
            color: "ffffff", 
            fontFace: "Segoe UI" 
          });

          if (conceptDesc) {
            const truncatedDesc = conceptDesc.length > 85 ? conceptDesc.substring(0, 85) + "..." : conceptDesc;
            slide.addText(truncatedDesc, { 
              x: 0.9, 
              y: yPos + 0.35, 
              w: 4.7, 
              h: 0.35, 
              fontSize: 13, 
              color: "cbd5e1", 
              fontFace: "Segoe UI" 
            });
          }
          yPos += 0.85;
        });

      } else if (s.type === 'lab') {
        slide.addText("PROYECTO DE LOGÍSTICA & DATOS", { 
          x: 0.6, 
          y: 0.5, 
          w: 5.0, 
          h: 0.3, 
          fontSize: 11, 
          bold: true, 
          color: "d946ef", 
          fontFace: "Segoe UI" 
        });

        slide.addText(currentSession.practice.title, { 
          x: 0.6, 
          y: 0.8, 
          w: 5.0, 
          h: 1.0, 
          fontSize: 24, 
          bold: true, 
          color: "ffffff", 
          fontFace: "Segoe UI" 
        });

        slide.addText(`Escenario: "${currentSession.practice.scenario.substring(0, 95)}..."`, { 
          x: 0.6, 
          y: 1.9, 
          w: 5.0, 
          h: 0.6, 
          fontSize: 12, 
          italic: true, 
          color: "c084fc", 
          fontFace: "Segoe UI" 
        });
        
        let yPos = 2.6;
        currentSession.practice.steps.slice(0, 3).forEach((st, idx) => {
          slide.addText(`${idx + 1}. ${st}`, { 
            x: 0.6, 
            y: yPos, 
            w: 5.0, 
            h: 0.5, 
            fontSize: 14, 
            bold: true, 
            color: "e2e8f0", 
            fontFace: "Segoe UI" 
          });
          yPos += 0.65;
        });

      } else if (s.type === 'infographic') {
        slide.addText("ARQUITECTURA DE DATOS", { 
          x: 0.6, 
          y: 0.5, 
          w: 5.0, 
          h: 0.3, 
          fontSize: 11, 
          bold: true, 
          color: "818cf8", 
          fontFace: "Segoe UI" 
        });

        slide.addText(s.title, { 
          x: 0.6, 
          y: 0.8, 
          w: 5.0, 
          h: 1.0, 
          fontSize: 24, 
          bold: true, 
          color: "ffffff", 
          fontFace: "Segoe UI" 
        });

        let yPos = 2.0;
        [
          "1. Capa de Ingesta: Captura segura desde fuentes distribuidas.",
          "2. Procesamiento Central: Orquestación inteligente analítica.",
          "3. Capa de Entrega: Visualizaciones y servicios de APIs en tiempo real."
        ].forEach(bullet => {
          slide.addText(bullet, { 
            x: 0.6, 
            y: yPos, 
            w: 5.0, 
            h: 0.6, 
            fontSize: 15, 
            color: "cbd5e1", 
            fontFace: "Segoe UI" 
          });
          yPos += 0.8;
        });

      } else if (s.type === 'sandbox') {
        slide.addText("SANDBOX DE EXPERIMENTACIÓN", { 
          x: 0.6, 
          y: 0.5, 
          w: 5.0, 
          h: 0.3, 
          fontSize: 11, 
          bold: true, 
          color: "818cf8", 
          fontFace: "Segoe UI" 
        });

        slide.addText(s.title, { 
          x: 0.6, 
          y: 0.8, 
          w: 5.0, 
          h: 1.0, 
          fontSize: 24, 
          bold: true, 
          color: "ffffff", 
          fontFace: "Segoe UI" 
        });

        let yPos = 2.0;
        [
          "•  Entorno de experimentación con datos sintéticos y reales.",
          "•  Consola interactiva para validar esquemas JSON y dataframes.",
          "•  Prueba directa de ingeniería de prompts con LLMs avanzados."
        ].forEach(bullet => {
          slide.addText(bullet, { 
            x: 0.6, 
            y: yPos, 
            w: 5.0, 
            h: 0.6, 
            fontSize: 15, 
            color: "cbd5e1", 
            fontFace: "Segoe UI" 
          });
          yPos += 0.8;
        });

      } else if (s.type === 'workflows') {
        slide.addText("DIAGRAMAS DE SECUENCIA", { 
          x: 0.6, 
          y: 0.5, 
          w: 5.0, 
          h: 0.3, 
          fontSize: 11, 
          bold: true, 
          color: "818cf8", 
          fontFace: "Segoe UI" 
        });

        slide.addText(s.title, { 
          x: 0.6, 
          y: 0.8, 
          w: 5.0, 
          h: 1.0, 
          fontSize: 24, 
          bold: true, 
          color: "ffffff", 
          fontFace: "Segoe UI" 
        });

        let yPos = 2.0;
        [
          "•  Modelado de interacciones críticas entre microservicios de datos.",
          "•  Identificación proactiva de cuellos de botella y errores comunes.",
          "•  Mejores prácticas para escalabilidad analítica en la nube."
        ].forEach(bullet => {
          slide.addText(bullet, { 
            x: 0.6, 
            y: yPos, 
            w: 5.0, 
            h: 0.6, 
            fontSize: 15, 
            color: "cbd5e1", 
            fontFace: "Segoe UI" 
          });
          yPos += 0.8;
        });

      } else if (s.type === 'genailab') {
        slide.addText("INGENIERÍA DE PROMPTS EN VIVO", { 
          x: 0.6, 
          y: 0.5, 
          w: 5.0, 
          h: 0.3, 
          fontSize: 11, 
          bold: true, 
          color: "818cf8", 
          fontFace: "Segoe UI" 
        });

        slide.addText(s.title, { 
          x: 0.6, 
          y: 0.8, 
          w: 5.0, 
          h: 1.0, 
          fontSize: 24, 
          bold: true, 
          color: "ffffff", 
          fontFace: "Segoe UI" 
        });

        let yPos = 2.0;
        [
          "•  Simulación interactiva directa con modelos fundacionales de IA.",
          "•  Ajuste dinámico de hiperparámetros de inferencia (temperatura, etc).",
          "•  Refinamiento de system prompts para automatizar procesos de negocio."
        ].forEach(bullet => {
          slide.addText(bullet, { 
            x: 0.6, 
            y: yPos, 
            w: 5.0, 
            h: 0.6, 
            fontSize: 15, 
            color: "cbd5e1", 
            fontFace: "Segoe UI" 
          });
          yPos += 0.8;
        });

      } else if (s.type === 'conclusion') {
        slide.addText("RESUMEN DE CONTENIDOS", { 
          x: 0.6, 
          y: 0.5, 
          w: 5.0, 
          h: 0.3, 
          fontSize: 11, 
          bold: true, 
          color: "10b981", 
          fontFace: "Segoe UI" 
        });

        slide.addText("Sesión Concluida", { 
          x: 0.6, 
          y: 0.8, 
          w: 5.0, 
          h: 1.0, 
          fontSize: 32, 
          bold: true, 
          color: "ffffff", 
          fontFace: "Segoe UI" 
        });

        let yPos = 2.0;
        [
          "•  ¡Felicitaciones! Has completado el marco de aprendizaje teórico y práctico.",
          "•  Los laboratorios resueltos quedan guardados localmente para tu consulta.",
          "•  Continúa experimentando en la suite interactiva de IA."
        ].forEach(bullet => {
          slide.addText(bullet, { 
            x: 0.6, 
            y: yPos, 
            w: 5.0, 
            h: 0.6, 
            fontSize: 15, 
            color: "cbd5e1", 
            fontFace: "Segoe UI" 
          });
          yPos += 0.8;
        });
      }
    });

    pres.writeFile({ fileName: `IA_Aplicada_${currentSession.id}.pptx` });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      
      {/* Top control bar */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl text-white">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white flex items-center">
              Modo Presentación PPT
              <span className="ml-2 bg-indigo-500/20 text-indigo-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Interactiva</span>
            </h1>
            <p className="text-xs text-slate-400">Diseñado para exposiciones, clases y proyecciones</p>
          </div>
        </div>

        {/* Selector de Sesión */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Sesión:</span>
          <select
            value={selectedSessionId}
            onChange={(e) => {
              setSelectedSessionId(e.target.value);
              setCurrentSlideIndex(0);
              clearCanvas();
            }}
            className="bg-slate-800 border border-slate-700 text-white rounded-xl text-xs px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 max-w-[120px] sm:max-w-none"
          >
            {SESSIONS_DATA.map((s, idx) => (
              <option key={s.id} value={s.id}>
                Sesión {idx + 1}
              </option>
            ))}
          </select>

          {/* Selector de Tema visual */}
          <span className="text-xs font-semibold text-slate-400 sm:ml-2">Plantilla:</span>
          <select
            value={activeTheme}
            onChange={(e) => setActiveTheme(e.target.value as ThemeType)}
            className="bg-slate-800 border border-slate-700 text-white rounded-xl text-xs px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="executive-dark">💻 Dark</option>
            <option value="academic-light">📜 Light</option>
            <option value="cyber-neon">⚡ Neon</option>
            <option value="warm-ochre">☕ Ochre</option>
          </select>
        </div>

        {/* Toolbar superior de controles */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowOutline(!showOutline)}
            className={`p-2 rounded-lg text-slate-400 hover:text-white transition-colors ${showOutline ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-slate-800'}`}
            title="Mostrar índice de diapositivas"
          >
            <List className="w-4 h-4" />
          </button>
          
          {/* Virtual laser pointer button */}
          <button
            onClick={() => {
              setLaserPointerActive(!laserPointerActive);
              if (blackboardActive) setBlackboardActive(false);
            }}
            className={`hidden sm:flex p-2 rounded-lg text-slate-400 hover:text-white transition-colors ${laserPointerActive ? 'bg-red-600/20 text-red-400' : 'hover:bg-slate-800'}`}
            title="Puntero Láser Virtual"
          >
            <Target className="w-4 h-4" />
          </button>

          {/* Blackboard annotation button */}
          <button
            onClick={() => {
              setBlackboardActive(!blackboardActive);
              if (laserPointerActive) setLaserPointerActive(false);
            }}
            className={`hidden sm:flex p-2 rounded-lg text-slate-400 hover:text-white transition-colors ${blackboardActive ? 'bg-emerald-600/20 text-emerald-400' : 'hover:bg-slate-800'}`}
            title="Pizarra táctica para dibujar anotaciones"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowPresenterNotes(!showPresenterNotes)}
            className={`p-2 rounded-lg text-slate-400 hover:text-white transition-colors ${showPresenterNotes ? 'bg-purple-600/20 text-purple-400' : 'hover:bg-slate-800'}`}
            title="Mostrar Notas del Expositor (Guión)"
          >
            <Info className="w-4 h-4" />
          </button>

          <button
            onClick={downloadPptx}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-colors"
            title="Descargar Presentación (.pptx)"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Modo Pantalla Completa"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors ml-2"
            title="Cerrar Presentación"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Blackboard colors selector if active */}
      {blackboardActive && (
        <div className="bg-slate-950 px-6 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-emerald-400">🖌️ Modo Pizarra Activo:</span>
            <span>Arrastra el cursor en la diapositiva para dibujar.</span>
            <div className="flex items-center space-x-2 ml-4">
              <span className="text-slate-400">Color:</span>
              {[
                { color: '#ef4444', label: 'Rojo' },
                { color: '#eab308', label: 'Amarillo' },
                { color: '#06b6d4', label: 'Cian' },
                { color: '#22c55e', label: 'Verde' }
              ].map(c => (
                <button
                  key={c.color}
                  onClick={() => setPenColor(c.color)}
                  className={`w-4 h-4 rounded-full border-2 transition-transform ${penColor === c.color ? 'scale-125 border-white' : 'border-transparent'}`}
                  style={{ backgroundColor: c.color }}
                  title={c.label}
                />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Ancho:</span>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={penWidth} 
                onChange={(e) => setPenWidth(Number(e.target.value))}
                className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          <button
            onClick={clearCanvas}
            className="flex items-center space-x-1.5 px-2.5 py-1 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 hover:text-white rounded-lg transition-colors border border-rose-500/20"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Borrar Dibujo</span>
          </button>
        </div>
      )}

      {/* Slide Deck Main Container */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left outline list */}
        <AnimatePresence>
          {showOutline && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-slate-950 border-r border-slate-800 overflow-y-auto flex-shrink-0"
            >
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-indigo-400" />
                  Diapositivas ({totalSlides})
                </h3>
              </div>
              <ul className="p-2 space-y-1">
                {slides.map((s, idx) => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        setCurrentSlideIndex(idx);
                        clearCanvas();
                      }}
                      className={`w-full flex items-start text-left p-2.5 rounded-xl transition-all ${
                        currentSlideIndex === idx 
                          ? 'bg-indigo-600 text-white font-semibold' 
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <span className={`w-5 h-5 flex items-center justify-center text-xs rounded-full mr-2.5 shrink-0 ${
                        currentSlideIndex === idx ? 'bg-white text-indigo-600' : 'bg-slate-800'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-xs truncate">{s.title}</p>
                        <p className="text-[10px] opacity-60 uppercase tracking-widest truncate">{s.type}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slide Stage (16:9 box or flex filling) */}
        <div 
          ref={presentationContainerRef}
          onMouseMove={handleMouseMove}
          className={`flex-1 flex flex-col justify-between p-6 md:p-12 transition-all relative overflow-y-auto min-h-[500px] ${theme.bg}`}
        >
          {/* Red Laser Pointer simulation */}
          {laserPointerActive && (
            <div 
              className="absolute pointer-events-none rounded-full bg-red-500 w-6 h-6 border-2 border-white shadow-[0_0_20px_#ef4444] mix-blend-screen z-50 transition-all duration-75 ease-out"
              style={{
                left: laserCoords.x - 12,
                top: laserCoords.y - 12
              }}
            />
          )}

          {/* Blackboard annotation drawing layer */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className={`absolute inset-0 z-40 ${blackboardActive ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'}`}
          />

          {/* Slide Header details */}
          <div className="flex items-center justify-between mb-6 border-b pb-4 border-slate-500/10 z-10">
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full ${theme.badge}`}>
                Módulo 4 • {currentSession.id.toUpperCase()}
              </span>
              <span className="text-[10px] opacity-60">• Diapositiva {currentSlideIndex + 1} de {totalSlides}</span>
            </div>
            <div className="text-xs opacity-60 font-medium">Tania Damiani • IA Aplicada</div>
          </div>

          {/* Slide Core Content Renderer */}
          <div className="flex-1 flex flex-col justify-center z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSlide.id}-${selectedSessionId}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full"
              >
                {/* 1. COVER SLIDE */}
                {currentSlide.type === 'cover' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 mb-2"
                      >
                        <Tv className="w-12 h-12 text-indigo-400" />
                      </motion.div>
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase text-white">
                        {currentSlide.title}
                      </h1>
                      <p className="text-base md:text-lg lg:text-xl text-slate-300 font-medium">
                        {currentSlide.subtitle}
                      </p>
                      <div className="pt-4 flex flex-wrap gap-3 text-xs md:text-sm">
                        <div className="px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm text-slate-200">
                          ⏳ Duración: <strong className="text-indigo-400">{currentSession.hours} Horas</strong>
                        </div>
                        <div className="px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm text-slate-200">
                          📍 Ubicación: <strong className="text-indigo-400">Santiago, Chile</strong>
                        </div>
                        <div className="px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm text-slate-200">
                          📊 Metodología: <strong className="text-indigo-400">100% Práctica</strong>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-5 w-full">
                      <div className="relative group overflow-hidden rounded-3xl border border-slate-850 shadow-2xl aspect-[4/3] w-full bg-slate-900">
                        <img 
                          src={getSlideImageUrl(currentSlide, selectedSessionId)} 
                          alt={currentSlide.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="text-[10px] uppercase font-bold tracking-widest bg-indigo-600/80 text-white px-2 py-1 rounded-md backdrop-blur-sm">
                            Concepto Visual
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. AGENDA SLIDE */}
                {currentSlide.type === 'agenda' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400 block">📌 Plan de Vuelo</span>
                      <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight uppercase">
                        Temario de la Sesión
                      </h2>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed">{currentSlide.subtitle}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="bg-slate-800/40 border border-slate-700/60 p-5 rounded-2xl shadow-sm">
                          <h3 className="font-extrabold text-indigo-400 text-xs md:text-sm uppercase mb-3 tracking-widest flex items-center">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Teoría y Fundamentos
                          </h3>
                          <ul className="space-y-3">
                            {currentSession.theory.points.map((p, i) => (
                              <li key={i} className="flex items-start text-xs md:text-sm">
                                <span className="w-5 h-5 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center text-[10px] font-bold mr-2.5 mt-0.5 shrink-0">
                                  {i + 1}
                                </span>
                                <span className="text-slate-200 font-medium">{p.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-slate-800/40 border border-slate-700/60 p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                          <div>
                            <h3 className="font-extrabold text-fuchsia-400 text-xs md:text-sm uppercase mb-3 tracking-widest flex items-center">
                              <PenTool className="w-4 h-4 mr-2" />
                              Laboratorio Práctico
                            </h3>
                            <p className="text-sm font-extrabold text-white mb-2 leading-snug">{currentSession.practice.title}</p>
                            <p className="text-[11px] text-slate-300 italic leading-normal">"{currentSession.practice.scenario.substring(0, 100)}..."</p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-wrap gap-1.5">
                            {currentSession.practice.toolsUsed.map(toolKey => (
                              <span key={toolKey} className="px-2 py-0.5 bg-slate-800/80 text-slate-200 text-[10px] rounded-md border border-slate-700 font-semibold">
                                {TOOLS[toolKey]?.name || toolKey}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-5 w-full">
                      <div className="relative group overflow-hidden rounded-3xl border border-slate-850 shadow-2xl aspect-[4/3] w-full bg-slate-900">
                        <img 
                          src={getSlideImageUrl(currentSlide, selectedSessionId)} 
                          alt={currentSlide.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="text-[10px] uppercase font-bold tracking-widest bg-indigo-600/80 text-white px-2 py-1 rounded-md backdrop-blur-sm">
                            Objetivos de Aprendizaje
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. THEORY SLIDE */}
                {currentSlide.type === 'theory' && currentSlide.pointData && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400 block">
                        Tema {currentSlide.topicIdx !== undefined ? currentSlide.topicIdx + 1 : ''} • Fundamento Teórico
                      </span>
                      <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight uppercase">
                        {currentSlide.title}
                      </h2>
                      
                      <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                        {currentSlide.pointData.details.map((detail, index) => (
                          <div 
                            key={index}
                            className="flex items-start bg-slate-800/30 border border-slate-700/40 p-5 rounded-2xl shadow-sm hover:border-indigo-500/30 transition-all"
                          >
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mr-4 shrink-0 mt-1">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              {formatBulletDetail(detail)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-5 w-full">
                      <div className="relative group overflow-hidden rounded-3xl border border-slate-850 shadow-2xl aspect-[4/3] w-full bg-slate-900">
                        <img 
                          src={getSlideImageUrl(currentSlide, selectedSessionId)} 
                          alt={currentSlide.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="text-[10px] uppercase font-bold tracking-widest bg-indigo-600/80 text-white px-2 py-1 rounded-md backdrop-blur-sm">
                            Concepto Técnico
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. INFOGRAPHIC SLIDE */}
                {currentSlide.type === 'infographic' && currentSlide.topicIdx !== undefined && (
                  <div className="w-full flex flex-col justify-center h-full space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400 block">Infografía Interactiva • Tema {currentSlide.topicIdx + 1}</span>
                        <h2 className="text-xl md:text-2xl font-bold">{currentSlide.title}</h2>
                      </div>
                      <div className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">Diagrama de Sistemas</div>
                    </div>
                    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 max-h-[420px] overflow-y-auto shadow-inner">
                      <TopicInfographic sessionId={currentSession.id} topicIdx={currentSlide.topicIdx} />
                    </div>
                  </div>
                )}

                {/* 5. SANDBOX SLIDE */}
                {currentSlide.type === 'sandbox' && currentSlide.topicIdx !== undefined && (
                  <div className="w-full flex flex-col justify-center h-full space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400 block">Sandbox Práctico • Tema {currentSlide.topicIdx + 1}</span>
                        <h2 className="text-xl md:text-2xl font-bold">{currentSlide.title}</h2>
                      </div>
                      <div className="text-xs text-indigo-300 bg-indigo-950/40 px-3 py-1.5 rounded-xl border border-indigo-500/20 flex items-center">
                        <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-400 animate-spin" />
                        Código, Prompts e Integración
                      </div>
                    </div>
                    <div className="bg-slate-950/80 p-2 rounded-2xl border border-slate-800 max-h-[440px] overflow-y-auto">
                      <TopicSandbox sessionId={currentSession.id} topicIdx={currentSlide.topicIdx} />
                    </div>
                  </div>
                )}

                {/* 6. LAB SLIDE */}
                {currentSlide.type === 'lab' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-fuchsia-400 block">🔬 Desafío de Laboratorio Práctico</span>
                      <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight uppercase">
                        {currentSession.practice.title}
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {/* Scenario & Context Card */}
                        <div className="bg-slate-800/40 border border-slate-700/60 p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                          <div>
                            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">Escenario de Negocio</h3>
                            <p className="text-slate-300 italic text-xs mb-3">"{currentSession.practice.scenario}"</p>
                            <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed">{currentSession.practice.description}</p>
                          </div>
                          {currentSession.practice.realExample && (
                            <div className="mt-4 pt-4 border-t border-slate-700/50">
                              <span className="text-[10px] uppercase font-bold text-fuchsia-400 block mb-1">Caso Corporativo:</span>
                              <span className="text-xs text-slate-300 font-medium">{currentSession.practice.realExample.context.substring(0, 80)}...</span>
                            </div>
                          )}
                        </div>

                        {/* Checklist Step-by-Step */}
                        <div className="bg-slate-800/40 border border-slate-700/60 p-5 rounded-2xl space-y-3 flex flex-col justify-between shadow-sm">
                          <div>
                            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">Paso a Paso</h3>
                            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                              {currentSession.practice.steps.map((step, idx) => (
                                <div 
                                  key={idx}
                                  className="flex items-start text-xs bg-slate-900/50 p-2.5 rounded-xl border border-slate-800 hover:border-fuchsia-500/20 transition-colors"
                                >
                                  <span className="w-5 h-5 rounded-full bg-fuchsia-500/10 text-fuchsia-300 flex items-center justify-center text-[10px] font-bold mr-2.5 shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span className="text-slate-300 font-semibold">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="pt-3 border-t border-slate-700/50 flex flex-wrap gap-1.5 items-center">
                            <span className="text-[10px] uppercase font-bold text-slate-400 mr-2">Herramientas:</span>
                            {currentSession.practice.toolsUsed.map(t => (
                              <span key={t} className="px-2 py-0.5 bg-slate-900 text-slate-300 text-[10px] rounded-md border border-slate-800 font-medium">
                                {TOOLS[t]?.name || t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-5 w-full">
                      <div className="relative group overflow-hidden rounded-3xl border border-slate-850 shadow-2xl aspect-[4/3] w-full bg-slate-900">
                        <img 
                          src={getSlideImageUrl(currentSlide, selectedSessionId)} 
                          alt={currentSlide.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="text-[10px] uppercase font-bold tracking-widest bg-fuchsia-600/80 text-white px-2 py-1 rounded-md backdrop-blur-sm">
                            Entorno de Trabajo
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. WORKFLOWS SLIDE */}
                {currentSlide.type === 'workflows' && (
                  <div className="w-full flex flex-col justify-center h-full space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400 block">Flujos y Casos Reales</span>
                        <h2 className="text-xl md:text-2xl font-bold">{currentSlide.title}</h2>
                      </div>
                    </div>
                    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 max-h-[420px] overflow-y-auto">
                      <WorkflowsView sessionId={currentSession.id} />
                    </div>
                  </div>
                )}

                {/* 8. GENAI LAB SLIDE */}
                {currentSlide.type === 'genailab' && (
                  <div className="w-full flex flex-col justify-center h-full space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs uppercase font-extrabold tracking-widest text-fuchsia-400 block">Laboratorio Interactivo de IA</span>
                        <h2 className="text-xl md:text-2xl font-bold">{currentSlide.title}</h2>
                      </div>
                    </div>
                    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 max-h-[420px] overflow-y-auto">
                      <GenAILabView sessionId={currentSession.id} />
                    </div>
                  </div>
                )}

                {/* 9. CONCLUSION SLIDE */}
                {currentSlide.type === 'conclusion' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="inline-block p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-2"
                      >
                        <Award className="w-12 h-12 text-emerald-400" />
                      </motion.div>
                      
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                        ¡Sesión Concluida!
                      </h2>
                      <p className="text-base md:text-xl text-slate-300 font-medium">
                        Has completado exitosamente todo el temario teórico, la arquitectura visual de sistemas y el laboratorio de aplicación de este módulo.
                      </p>

                      <div className="pt-4">
                        <button
                          onClick={() => onToggleComplete(currentSession.id)}
                          className={`flex items-center px-6 py-3.5 rounded-xl font-extrabold text-sm md:text-base transition-all duration-300 shadow-lg border ${
                            completedSessions.includes(currentSession.id)
                              ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400 shadow-emerald-900/20'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500 shadow-indigo-900/20'
                          }`}
                        >
                          <CheckCircle2 className="w-5 h-5 mr-2.5" />
                          {completedSessions.includes(currentSession.id) 
                            ? 'Sesión Completada • Desmarcar' 
                            : 'Marcar Sesión como Completada'}
                        </button>
                      </div>
                    </div>
                    <div className="lg:col-span-5 w-full">
                      <div className="relative group overflow-hidden rounded-3xl border border-slate-850 shadow-2xl aspect-[4/3] w-full bg-slate-900">
                        <img 
                          src={getSlideImageUrl(currentSlide, selectedSessionId)} 
                          alt={currentSlide.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-600/80 text-white px-2 py-1 rounded-md backdrop-blur-sm">
                            Módulo Completado
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Footer with page progress */}
          <div className="mt-8 border-t border-slate-500/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
            {/* Slide Navigation Remote */}
            <div className="flex items-center space-x-3 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={handlePrevSlide}
                disabled={currentSlideIndex === 0}
                className="p-2.5 rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent text-slate-300 transition-colors"
                title="Diapositiva Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-xs font-bold text-slate-200 px-3 py-1.5 bg-slate-900 rounded-lg">
                Slide {currentSlideIndex + 1} de {totalSlides}
              </span>

              <button
                onClick={handleNextSlide}
                disabled={currentSlideIndex === totalSlides - 1}
                className="p-2.5 rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent text-slate-300 transition-colors"
                title="Siguiente Diapositiva"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slideshow Auto Play control */}
            <div className="flex items-center space-x-2 bg-slate-950 px-4 py-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2 rounded-xl transition-colors ${isPlaying ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
                title={isPlaying ? "Pausar Autoplay" : "Iniciar Autoplay"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              
              <div className="flex items-center space-x-1.5 text-xs">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Velocidad:</span>
                <select
                  value={playSpeed}
                  onChange={(e) => setPlaySpeed(Number(e.target.value))}
                  className="bg-slate-900 text-slate-300 text-xs rounded-lg px-2 py-1 border border-slate-800 focus:outline-none"
                  disabled={isPlaying}
                >
                  <option value={5}>5s</option>
                  <option value={10}>10s</option>
                  <option value={15}>15s</option>
                  <option value={30}>30s</option>
                </select>
              </div>
            </div>

            {/* Visual presentation slide indicators */}
            <div className="flex space-x-1 overflow-x-auto max-w-[150px] py-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    clearCanvas();
                  }}
                  className={`h-2 rounded-full transition-all shrink-0 ${
                    currentSlideIndex === idx ? 'w-5 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  title={`Ir a Diapositiva ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Presenter Speaker Notes Tray at bottom */}
      <AnimatePresence>
        {showPresenterNotes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-950 border-t border-slate-800 overflow-hidden"
          >
            <div className="p-4 bg-slate-900/60 flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <Bookmark className="w-4 h-4 text-purple-400" />
              <span>🎙️ Guión de Exposición & Notas de Apoyo Académico</span>
            </div>
            <div className="p-4 max-h-[120px] overflow-y-auto text-xs md:text-sm text-slate-300 leading-relaxed font-sans select-text whitespace-pre-line">
              {getSpeakerNotes()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
