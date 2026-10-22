import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Database, BrainCircuit, Users, Zap, FileSearch, LineChart, Code, ArrowRight, Lightbulb, Building2, Target, Cpu, TrendingUp, MessageSquare, FileText, Search } from 'lucide-react';

const industryCases = [
  {
    id: 1,
    company: "Walmart Chile",
    objective: "Mejorar predicción de demanda y asignación de mercadería.",
    modType: "Data science aplicado a forecast de promociones y reposición.",
    benefit: "Mejor uso de inventario, menos quiebres y mejor reposición.",
    message: "Ejemplo fuerte de cómo la analítica mejora supply chain y ventas."
  },
  {
    id: 2,
    company: "Walmart Chile (Desafío Global)",
    objective: "Resolver un problema real de pronóstico con talento externo.",
    modType: "Open innovation + plataforma de colaboración en datos.",
    benefit: "Participación de cientos de equipos y selección de soluciones para operación real.",
    message: "Muestra madurez digital y apertura a innovación escalable."
  },
  {
    id: 3,
    company: "Supermercados Chilenos",
    objective: "Obtener visibilidad de góndola y ejecución comercial.",
    modType: "Automatización en tienda + captura inteligente de datos.",
    benefit: "Optimización de ubicación de productos y eficiencia operativa.",
    message: "Modernización orientada a tienda, no solo a back office."
  },
  {
    id: 4,
    company: "Retail Operativo",
    objective: "Pasar de intuición a decisiones basadas en información.",
    modType: "Analítica operacional para quiebres, faltantes y ejecución.",
    benefit: "Mejor detección de desvíos y reacción más rápida.",
    message: "Caso ideal para explicar valor de tiempo casi real."
  },
  {
    id: 5,
    company: "Falabella",
    objective: "Escalar automatización y uso de IA en un retailer grande.",
    modType: "Transformación digital con foco en datos e IA.",
    benefit: "Mayor integración omnicanal y eficiencia en procesos.",
    message: "Útil como caso de escala y complejidad empresarial."
  },
  {
    id: 6,
    company: "Oracle Retail en Chile",
    objective: "Unificar visión del cliente y mejorar decisiones comerciales.",
    modType: "Plataforma de retail + integración de datos transaccionales.",
    benefit: "Mejor visibilidad del negocio y soporte a decisiones.",
    message: "Sirve para mostrar modernización de plataformas core."
  },
  {
    id: 7,
    company: "AWS y Retail en Chile",
    objective: "Migrar y escalar capacidades de datos e IA en la nube.",
    modType: "Cloud + automatización + comercio agentivo.",
    benefit: "Base tecnológica para analítica avanzada y nuevos casos de uso.",
    message: "Mensaje clave: modernizar datos es también modernizar arquitectura."
  },
  {
    id: 8,
    company: "Ecosistema Chileno de IA",
    objective: "Incorporar datos e IA como ventaja competitiva.",
    modType: "Adopción transversal de IA en empresas chilenas.",
    benefit: "Señal de madurez del mercado y presión competitiva.",
    message: "Buen cierre para conectar retail con la transformación país."
  }
];

const workflows = [
  {
    id: "ai-exploration",
    title: "Investigación y Búsqueda de IA",
    description: "Uso de IA para investigar tendencias de mercado y sintetizar documentos.",
    icon: <Search className="w-8 h-8 text-cyan-500" />,
    color: "cyan",
    steps: [
      { title: "Búsqueda", desc: "Recopilación de reportes.", icon: <Search className="w-5 h-5" /> },
      { title: "Extracción", desc: "Identificar métricas clave.", icon: <FileSearch className="w-5 h-5" /> },
      { title: "Síntesis", desc: "Resumen automático.", icon: <FileText className="w-5 h-5" /> },
      { title: "Distribución", desc: "Envío a stakeholders.", icon: <Users className="w-5 h-5" /> }
    ],
    caseStudy: {
      company: "Consultora Estratégica",
      challenge: "Análisis de competidores tomaba semanas.",
      solution: "Agente de investigación autónomo.",
      result: "Reportes generados en horas con mayor cobertura de fuentes."
    }
  },
  {
    id: "data-analysis",
    title: "Análisis de Datos Asistido por IA",
    description: "Flujo para transformar datos crudos en insights visuales y accionables.",
    icon: <LineChart className="w-8 h-8 text-blue-500" />,
    color: "blue",
    steps: [
      { title: "Recolección", desc: "Subida de CSV/Excel o conexión a BD.", icon: <Database className="w-5 h-5" /> },
      { title: "Limpieza", desc: "IA sugiere correcciones y normaliza datos.", icon: <FileSearch className="w-5 h-5" /> },
      { title: "Análisis", desc: "LLM extrae tendencias y patrones clave.", icon: <BrainCircuit className="w-5 h-5" /> },
      { title: "Visualización", desc: "Generación automática de dashboards.", icon: <LineChart className="w-5 h-5" /> }
    ],
    caseStudy: {
      company: "Retail Analytics Corp",
      challenge: "Procesamiento manual de ventas semanales tomaba 3 días.",
      solution: "Automatización con IA para ingesta y análisis de datos.",
      result: "Reportes en 2 horas, identificando 15% más de oportunidades de ventas."
    }
  },
  {
    id: "content-generation",
    title: "Generación de Contenido Multi-canal",
    description: "Creación automatizada de piezas de marketing adaptadas a cada plataforma.",
    icon: <Network className="w-8 h-8 text-fuchsia-500" />,
    color: "fuchsia",
    steps: [
      { title: "Briefing", desc: "Ingreso de idea o tema principal.", icon: <Lightbulb className="w-5 h-5" /> },
      { title: "Ideación", desc: "Generación de variantes por IA.", icon: <BrainCircuit className="w-5 h-5" /> },
      { title: "Adaptación", desc: "Ajuste de tono para Twitter, LinkedIn, Blog.", icon: <Users className="w-5 h-5" /> },
      { title: "Publicación", desc: "Programación y distribución automática.", icon: <Zap className="w-5 h-5" /> }
    ],
    caseStudy: {
      company: "Agencia Creativa Global",
      challenge: "Cuellos de botella en la creación de copys para campañas.",
      solution: "Sistema de generación de borradores con IA basado en guías de estilo.",
      result: "Aumento del 200% en volumen de publicación manteniendo consistencia de marca."
    }
  },
  {
    id: "ecosystem-integration",
    title: "Automatización de Procesos",
    description: "Orquestación de herramientas (ERP, CRM) para flujos sin intervención.",
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    color: "orange",
    steps: [
      { title: "Trigger", desc: "Evento en sistema.", icon: <Zap className="w-5 h-5" /> },
      { title: "Enriquecimiento", desc: "IA añade contexto.", icon: <Database className="w-5 h-5" /> },
      { title: "Decisión", desc: "Lógica basada en IA.", icon: <BrainCircuit className="w-5 h-5" /> },
      { title: "Acción", desc: "Actualización en ERP.", icon: <Target className="w-5 h-5" /> }
    ],
    caseStudy: {
      company: "Logística Express",
      challenge: "Validación manual de órdenes.",
      solution: "Pipeline de IA integrado con API de despachos.",
      result: "99% de precisión en ruteo automático."
    }
  },
  {
    id: "dev-assistant",
    title: "Desarrollo Asistido (Coding Companion)",
    description: "Integración de IA en el ciclo de vida del desarrollo de software.",
    icon: <Code className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    steps: [
      { title: "Requerimientos", desc: "Traducción de historias de usuario a specs.", icon: <FileSearch className="w-5 h-5" /> },
      { title: "Generación", desc: "Creación de boilerplate y lógica core.", icon: <Code className="w-5 h-5" /> },
      { title: "Testing", desc: "Escritura automática de pruebas unitarias.", icon: <Zap className="w-5 h-5" /> },
      { title: "Revisión", desc: "Code review automatizado por IA.", icon: <BrainCircuit className="w-5 h-5" /> }
    ],
    caseStudy: {
      company: "Tech Startups Inc.",
      challenge: "Tiempo excesivo escribiendo código repetitivo y tests.",
      solution: "Implementación de IA integrada en el IDE y CI/CD.",
      result: "Reducción del 40% en tiempo de desarrollo y 60% menos bugs en producción."
    }
  }
];

const colorStyles: Record<string, {
  border: string;
  bgHover: string;
  shadow: string;
  bgIcon: string;
  textText: string;
  bgCard: string;
  borderCard: string;
  bgGlow: string;
  resultBg: string;
  resultBorder: string;
}> = {
  blue: {
    border: 'border-blue-500',
    bgHover: 'bg-blue-50',
    shadow: 'shadow-blue-500/20',
    bgIcon: 'bg-blue-100',
    textText: 'text-blue-600',
    bgCard: 'bg-blue-50',
    borderCard: 'border-blue-100',
    bgGlow: 'bg-blue-200/20',
    resultBg: 'bg-blue-100/50',
    resultBorder: 'border-blue-200/50'
  },
  fuchsia: {
    border: 'border-fuchsia-500',
    bgHover: 'bg-fuchsia-50',
    shadow: 'shadow-fuchsia-500/20',
    bgIcon: 'bg-fuchsia-100',
    textText: 'text-fuchsia-600',
    bgCard: 'bg-fuchsia-50',
    borderCard: 'border-fuchsia-100',
    bgGlow: 'bg-fuchsia-200/20',
    resultBg: 'bg-fuchsia-100/50',
    resultBorder: 'border-fuchsia-200/50'
  },
  emerald: {
    border: 'border-emerald-500',
    bgHover: 'bg-emerald-50',
    shadow: 'shadow-emerald-500/20',
    bgIcon: 'bg-emerald-100',
    textText: 'text-emerald-600',
    bgCard: 'bg-emerald-50',
    borderCard: 'border-emerald-100',
    bgGlow: 'bg-emerald-200/20',
    resultBg: 'bg-emerald-100/50',
    resultBorder: 'border-emerald-200/50'
  },
  cyan: {
    border: 'border-cyan-500',
    bgHover: 'bg-cyan-50',
    shadow: 'shadow-cyan-500/20',
    bgIcon: 'bg-cyan-100',
    textText: 'text-cyan-600',
    bgCard: 'bg-cyan-50',
    borderCard: 'border-cyan-100',
    bgGlow: 'bg-cyan-200/20',
    resultBg: 'bg-cyan-100/50',
    resultBorder: 'border-cyan-200/50'
  },
  orange: {
    border: 'border-orange-500',
    bgHover: 'bg-orange-50',
    shadow: 'shadow-orange-500/20',
    bgIcon: 'bg-orange-100',
    textText: 'text-orange-600',
    bgCard: 'bg-orange-50',
    borderCard: 'border-orange-100',
    bgGlow: 'bg-orange-200/20',
    resultBg: 'bg-orange-100/50',
    resultBorder: 'border-orange-200/50'
  }
};

interface WorkflowsViewProps {
  sessionId?: string;
}

export function WorkflowsView({ sessionId }: WorkflowsViewProps) {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  
  const sessionDownloads: Record<string, { title: string; desc: string; files: any[] }> = {
    s1: {
      title: "Recursos de Investigación Estratégica",
      desc: "Descarga estos reportes base para utilizarlos como contexto en Perplexity o Claude. Puedes pedir a la IA que cruce esta información con datos de tu propia empresa.",
      files: [
        {
          name: "Tendencias E-Commerce",
          ext: "Reporte Markdown (.md)",
          icon: "BookOpen",
          color: "cyan",
          file: "Reporte_Tendencias.md",
          content: "%23%20Tendencias%20E-Commerce%202024%0A%0A1.%20Omnicanalidad%0A2.%20IA%20Generativa%20en%20Retail%0A3.%20Sustentabilidad%20y%20Trazabilidad"
        }
      ]
    },
    s3: {
      title: "Casos Reales de Retail (Data & Analytics)",
      desc: "Utiliza estos casos de estudio reales chilenos. Carga este archivo en ChatGPT y pídele que proponga una arquitectura de solución similar para tu propio modelo de negocio.",
      files: [
        {
          name: "Casos Retail Chile",
          ext: "Resumen Markdown (.md)",
          icon: "LineChart",
          color: "emerald",
          file: "Casos_Retail_Chile.md",
          content: "%23%20Casos%20Reales%3A%20Data%20%26%20IA%20en%20Retail%20Chileno%0A%0A##%201.%20Supermercados%20Chilenos%0A-**Objetivo**:Obtener%20visibilidad%20de%20g%C3%B3ndola.%0A-**Beneficio**:Optimizaci%C3%B3n%20de%20ubicaci%C3%B3n%20de%20productos."
        }
      ]
    },
    s4: {
      title: "Arquitecturas Base (Diagramas y Flujos)",
      desc: "Descarga el esquema técnico de arquitectura. Puedes pegarlo en Gemini y solicitar que te genere el código de integración o los endpoints de API necesarios.",
      files: [
        {
          name: "Arquitecturas Base",
          ext: "Esquema Técnico (.txt)",
          icon: "Network",
          color: "fuchsia",
          file: "Arquitectura_Flujos.txt",
          content: "ESQUEMA%20DE%20ARQUITECTURA:%20ANAL%C3%8DTICA%20OPERACIONAL%0A%0A1.%20Ingesta%20de%20Datos%0A2.%20Procesamiento%20(ETL%20+%20ML)%0A3.%20Capa%20de%20Inferencia%0A4.%20Visualizaci%C3%B3n"
        }
      ]
    },
    s5: {
      title: "Recursos para Ejemplo Integrador de IA",
      desc: "Descarga el paquete completo del flujo end-to-end. Utiliza el Reporte de Supply Chain como input para diseñar un flujo autónomo, pasando desde la predicción de demanda hasta la automatización de órdenes.",
      files: [
        {
          name: "Supply Chain IA",
          ext: "Reporte de Caso (.txt)",
          icon: "Database",
          color: "blue",
          file: "Reporte_Supply_Chain.txt",
          content: "REPORTE:%20OPTIMIZACI%C3%93N%20DE%20SUPPLY%20CHAIN%20CON%20IA%0A%0ALa%20implementaci%C3%B3n%20de%20modelos%20predictivos%20reduce%20quiebres%20en%2018%25."
        },
        {
          name: "Arquitecturas Base",
          ext: "Esquema Técnico (.txt)",
          icon: "Network",
          color: "fuchsia",
          file: "Arquitectura_Flujos.txt",
          content: "ESQUEMA%20DE%20ARQUITECTURA:%20ANAL%C3%8DTICA%20OPERACIONAL%0A%0A1.%20Ingesta%20de%20Datos%0A2.%20Procesamiento%20(ETL%20+%20ML)%0A3.%20Capa%20de%20Inferencia%0A4.%20Visualizaci%C3%B3n"
        }
      ]
    }
  };

  const currentDownloads = sessionId && sessionDownloads[sessionId] ? sessionDownloads[sessionId] : null;

  const sessionWorkflowsMap: Record<string, string[]> = {
    s1: ["ai-exploration"],
    s2: ["content-generation"],
    s3: ["data-analysis"],
    s4: ["ecosystem-integration"],
    s5: ["dev-assistant"]
  };

  const sessionCasesMap: Record<string, number[]> = {
    s1: [8],
    s2: [4],
    s3: [1, 5, 6],
    s4: [3, 7],
    s5: [2]
  };

  const filteredWorkflows = sessionId && sessionWorkflowsMap[sessionId]
    ? workflows.filter(wf => sessionWorkflowsMap[sessionId].includes(wf.id))
    : workflows;

  const filteredCases = sessionId && sessionCasesMap[sessionId]
    ? industryCases.filter(c => sessionCasesMap[sessionId].includes(c.id))
    : industryCases;

  if (filteredWorkflows.length === 0 && filteredCases.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Flujos y Casos Reales</h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Explora arquitecturas comunes y cómo la Inteligencia Artificial se integra en escenarios de la vida real para resolver problemas complejos y optimizar tareas operativas.
        </p>
      </div>

      {currentDownloads && (
      <div className="mb-12 bg-slate-50 border border-slate-200 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
          <FileText className="w-6 h-6 text-blue-600 mr-2" />
          {currentDownloads.title}
        </h2>
        <p className="text-slate-600 mb-6 max-w-3xl leading-relaxed text-sm">
          {currentDownloads.desc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentDownloads.files.map((f, idx) => (
            <a
              key={idx}
              href={`data:text/plain;charset=utf-8,${f.content}`}
              download={f.file}
              className={`flex items-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-${f.color}-400 hover:shadow-md transition-all group`}
            >
              <div className={`bg-${f.color}-50 p-3 rounded-xl mr-4 group-hover:bg-${f.color}-100 transition-colors`}>
                <Database className={`w-5 h-5 text-${f.color}-600`} />
              </div>
              <div>
                <span className="block text-sm font-bold text-slate-800">{f.name}</span>
                <span className="block text-xs text-slate-500 mt-0.5">{f.ext}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
      )}
      
      {filteredWorkflows.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {filteredWorkflows.map((wf) => {
            const styles = colorStyles[wf.color] || colorStyles.blue;
            return (
              <motion.div
                key={wf.id}
                whileHover={{ y: -5 }}
                onClick={() => setActiveWorkflow(activeWorkflow === wf.id ? null : wf.id)}
                className={`cursor-pointer bg-white rounded-3xl p-6 border-2 transition-all ${
                  activeWorkflow === wf.id 
                    ? `${styles.border} ${styles.shadow}` 
                    : 'border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl ${styles.bgHover} flex items-center justify-center mb-6 transition-colors ${
                  activeWorkflow === wf.id ? styles.bgIcon : ''
                }`}>
                  {wf.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{wf.title}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-1">{wf.description}</p>
                <div className={`text-sm font-semibold flex items-center ${
                  activeWorkflow === wf.id ? styles.textText : 'text-slate-500'
                }`}>
                  {activeWorkflow === wf.id ? 'Ocultar flujo' : 'Ver flujo interactivo'}
                  <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${activeWorkflow === wf.id ? 'rotate-90' : ''}`} />
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {activeWorkflow && (
          <motion.div
            key={activeWorkflow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12"
          >
            {workflows.filter(w => w.id === activeWorkflow).map(wf => {
              const styles = colorStyles[wf.color] || colorStyles.blue;
              return (
              <div key={`detail-${wf.id}`} className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                  <Network className={`w-6 h-6 ${styles.textText} mr-3`} />
                  Visualización del Flujo: {wf.title}
                </h2>
                
                {/* Pipeline Flowchart */}
                <div className="relative mb-16">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden md:block rounded-full"></div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                    {wf.steps.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center md:items-start bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative group">
                        <div className={`w-12 h-12 rounded-full ${styles.bgIcon} ${styles.textText} flex items-center justify-center mb-4 border-4 border-white shadow-md relative z-10 mx-auto md:mx-0`}>
                          {step.icon}
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2 text-center md:text-left w-full">{idx + 1}. {step.title}</h4>
                        <p className="text-xs text-slate-500 text-center md:text-left">{step.desc}</p>
                        
                        {idx < wf.steps.length - 1 && (
                          <div className="hidden md:block absolute -right-3 top-10 text-slate-300">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        )}
                        <div className="md:hidden mt-4 text-slate-300 mx-auto">
                          {idx < wf.steps.length - 1 && <ArrowRight className="w-5 h-5 rotate-90" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case Study */}
                <div className={`${styles.bgCard} rounded-2xl p-8 border ${styles.borderCard} relative overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-64 h-64 ${styles.bgGlow} rounded-full blur-3xl -mr-20 -mt-20`}></div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-6 relative z-10 flex items-center">
                    <Database className={`w-5 h-5 ${styles.textText} mr-2`} />
                    Caso de Uso Real
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    <div className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-white/40">
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Desafío</div>
                      <p className="text-sm font-medium text-slate-700">{wf.caseStudy.challenge}</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-white/40">
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Solución IA</div>
                      <p className="text-sm font-medium text-slate-700">{wf.caseStudy.solution}</p>
                    </div>
                    <div className={`${styles.resultBg} backdrop-blur-sm p-5 rounded-xl border ${styles.resultBorder}`}>
                      <div className={`text-xs font-bold uppercase tracking-widest ${styles.textText} mb-2`}>Resultado</div>
                      <p className="text-sm font-bold text-slate-800">{wf.caseStudy.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </motion.div>
        )}
      </AnimatePresence>

      {filteredCases.length > 0 && (
        <div className="mt-8">
          <div className="mb-10 text-center md:text-left">
            <div className="inline-flex items-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase mb-4 border border-indigo-100">
              <Building2 className="w-4 h-4 mr-2" />
              Casos Reales
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Aplicaciones en la Industria</h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Ejemplos concretos de modernización y transformación digital impulsada por Inteligencia Artificial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCases.map((c) => (
              <motion.div
                key={c.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:shadow-xl hover:border-indigo-200 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-indigo-50 w-10 h-10 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">Caso #{c.id}</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-3 leading-tight">{c.company}</h3>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center">
                      <Target className="w-3 h-3 mr-1" /> Objetivo
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.objective}</p>
                  </div>
                  
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center">
                      <Cpu className="w-3 h-3 mr-1" /> Modernización
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.modType}</p>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" /> Beneficio
                    </div>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">{c.benefit}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-start bg-indigo-50/50 p-3 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-indigo-500 mr-2 shrink-0 mt-0.5" />
                    <p className="text-xs text-indigo-900 font-medium italic">{c.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
