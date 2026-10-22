import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Session } from '../types';
import { Clock, Beaker, BookOpen, Wrench, ChevronDown, Link as LinkIcon, Loader2, FileText, Search, CheckCircle2, Database, Users, UserCheck } from 'lucide-react';
import { TOOLS } from '../data';

import { WorkflowsView } from './WorkflowsView';
import { GenAILabView } from './GenAILabView';
import { TopicInfographic } from './TopicInfographic';
import { TopicSandbox } from './TopicSandbox';
import { SessionQuiz } from './SessionQuiz';
import { DecisionSimulator } from './DecisionSimulator';
import { LivePromptEvaluator } from './LivePromptEvaluator';
import { InteractionMode } from '../data/interactiveModulesData';

interface Resource {
  title: string;
  url: string;
  description: string;
}

function TopicResources({ topic }: { topic: string }) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchResources = async () => {
    if (hasFetched || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await res.json();
      if (data.resources) {
        setResources(data.resources);
      }
      setHasFetched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-indigo-100/50">
      {!hasFetched && !isLoading && (
        <button 
          onClick={fetchResources}
          className="flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg"
        >
          <Search className="w-4 h-4 mr-2" />
          Buscar recursos actualizados (AI)
        </button>
      )}
      
      {isLoading && (
        <div className="flex items-center text-sm text-indigo-500 font-medium">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Buscando whitepapers y documentación...
        </div>
      )}

      {hasFetched && resources.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h4 className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            <FileText className="w-4 h-4 mr-2" />
            Recursos Sugeridos
          </h4>
          {resources.map((res, idx) => (
            <a 
              key={idx} 
              href={res.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start">
                <div className="bg-indigo-50 p-2 rounded-lg mr-4 shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <LinkIcon className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors leading-tight mb-1">
                    {res.title}
                  </h5>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {res.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      )}

      {hasFetched && resources.length === 0 && (
        <div className="text-sm text-slate-500 italic">No se encontraron recursos recientes para este tema.</div>
      )}
    </div>
  );
}

interface SessionViewProps {
  session: Session;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

export function SessionView({ session, isCompleted = false, onToggleComplete }: SessionViewProps) {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>(() => {
    const saved = localStorage.getItem('course_interaction_mode');
    return saved === 'live' ? 'live' : 'individual';
  });
  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem(`session_notes_${session.id}`) || '';
  });

  React.useEffect(() => {
    setNotes(localStorage.getItem(`session_notes_${session.id}`) || '');
  }, [session.id]);

  const handleModeChange = (newMode: InteractionMode) => {
    setInteractionMode(newMode);
    localStorage.setItem('course_interaction_mode', newMode);
  };

  const handleNotesChange = (val: string) => {
    setNotes(val);
    localStorage.setItem(`session_notes_${session.id}`, val);
  };

  return (
    <motion.div
      key={session.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-5xl mx-auto pb-12"
    >
      {/* Presentation Header */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center shadow-sm">
                <Clock className="w-4 h-4 mr-1.5" />
                {session.hours} Horas
              </span>
              <span className="text-indigo-100 font-medium bg-black/10 px-4 py-1.5 rounded-full backdrop-blur-sm text-sm">
                {session.date}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              {session.title}
            </h1>
          </div>
          
          {onToggleComplete && (
            <button
              onClick={onToggleComplete}
              className={`flex items-center px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-md shrink-0 border ${
                isCompleted 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400' 
                  : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-white/20'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Sesión Completada
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2 opacity-50" />
                  Marcar como Completada
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>

      {/* Hybrid Mode Control Bar */}
      <div className="mb-10 bg-white rounded-2xl border border-slate-200 p-4 px-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Modalidad de Dinámicas Interactivas (3 Estaciones Activas)
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            {interactionMode === 'live'
              ? 'Modo Clase en Vivo (19:00 a 22:00 hrs): Oculta respuestas e impactos hasta que el grupo vote y el docente las revele.'
              : 'Modo Práctica Individual: Revela resultados, explicaciones y métricas al instante tras cada selección.'}
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-center shrink-0">
          <button
            onClick={() => handleModeChange('individual')}
            className={`inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              interactionMode === 'individual'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
            Práctica Individual
          </button>
          <button
            onClick={() => handleModeChange('live')}
            className={`inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              interactionMode === 'live'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 mr-1.5" />
            Clase en Vivo (Debate)
          </button>
        </div>
      </div>

      {session.id === 's1' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 bg-indigo-50/50 rounded-3xl p-8 border border-indigo-100 shadow-sm"
        >
          <div className="flex items-center mb-4">
            <div className="bg-indigo-600 p-2.5 rounded-xl mr-4 shadow-lg shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800">Metodología de Trabajo</h2>
          </div>
          <div className="space-y-4 text-slate-700 leading-relaxed text-[15px]">
            <p>
              ¡Bienvenido! Este curso está diseñado para ser <strong>100% práctico y aplicado</strong>. En cada sesión, exploraremos primero una <strong>base teórica</strong> (el "qué" y el "por qué"), validaremos el aprendizaje con un <strong>Quiz Interactivo</strong>, y a continuación, en el <strong>Laboratorio Práctico</strong>, ejecutaremos el <strong>Simulador de Toma de Decisiones</strong> y el <strong>Optimizador de Prompts con IA</strong>.
            </p>
            <p>
              En lugar de tener la teoría y la práctica en columnas divididas, hemos organizado la información de forma secuencial. Esto te permitirá <strong>hacer scroll hacia abajo</strong> y acompañar la explicación de cada caso de uso paso a paso, viendo exactamente cómo interactuamos con las diferentes herramientas de IA (Perplexity, Claude, ChatGPT, Gemini, etc.) para llegar a la solución.
            </p>
            <p>
              Analizaremos el contexto, el problema y ejecutaremos prototipos en vivo. ¡Comencemos con el Módulo Teórico!
            </p>
          </div>
        </motion.div>
      )}

      <div className="space-y-12">
        {/* Theory Section - Presentation Mode */}
        <div>
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-xl mr-4 shadow-lg shadow-blue-500/30">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800">Módulo Teórico: {session.theory.title}</h2>
          </div>
          
          <div className="space-y-4">
            {session.theory.points.map((point, idx) => {
              const isExpanded = expandedTopic === idx;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? 'border-indigo-400 shadow-lg shadow-indigo-100/50 ring-1 ring-indigo-400' 
                      : 'border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setExpandedTopic(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <span className="flex items-start">
                      <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mt-0.5 mr-4 shrink-0 transition-colors ${
                        isExpanded ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`text-lg font-bold transition-colors ${
                        isExpanded ? 'text-indigo-900' : 'text-slate-800'
                      }`}>
                        {point.title}
                      </span>
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-2 rounded-full ${isExpanded ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                          hidden: { height: 0, opacity: 0 },
                          visible: { 
                            height: 'auto', 
                            opacity: 1,
                            transition: {
                              height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                              opacity: { duration: 0.3 },
                              staggerChildren: 0.1,
                              delayChildren: 0.1
                            }
                          },
                          exit: { 
                            height: 0, 
                            opacity: 0,
                            transition: {
                              height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                              opacity: { duration: 0.2 }
                            }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 pl-16">
                          <div className="bg-gradient-to-br from-indigo-50/50 to-white rounded-xl p-6 border border-indigo-100/50 shadow-inner">
                            <ul className="space-y-4">
                              {point.details.map((detail, dIdx) => {
                                const parts = detail.split(' | ');
                                const mainText = parts[0];
                                const reasoning = parts[1];

                                return (
                                  <motion.li 
                                    key={dIdx}
                                    variants={{
                                      hidden: { opacity: 0, x: -20, filter: 'blur(4px)' },
                                      visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: "easeOut" } }
                                    }}
                                    className="flex flex-col text-slate-700 leading-relaxed font-medium"
                                  >
                                    <div className="flex items-start">
                                      <motion.span 
                                        whileHover={{ scale: 1.2, rotate: 90 }}
                                        className="text-indigo-500 mr-3 shrink-0 mt-0.5 inline-block cursor-pointer"
                                      >
                                        ✦
                                      </motion.span>
                                      <span>{mainText}</span>
                                    </div>
                                    {reasoning && (
                                      <div className="ml-7 mt-3 mb-1 text-sm bg-indigo-50/80 p-3.5 rounded-xl border border-indigo-100 text-slate-700 shadow-sm">
                                        {reasoning.split(' ¿Para qué? ').map((str, idx) => {
                                          if (idx === 0) {
                                            return <div key={idx} className="mb-2"><span className="font-bold text-indigo-700 tracking-wide">¿Por qué?</span> {str.replace('¿Por qué? ', '')}</div>;
                                          }
                                          return <div key={idx}><span className="font-bold text-indigo-700 tracking-wide">¿Para qué?</span> {str}</div>;
                                        })}
                                      </div>
                                    )}
                                  </motion.li>
                                );
                              })}
                            </ul>

                            <TopicInfographic sessionId={session.id} topicIdx={idx} />

                            <TopicSandbox sessionId={session.id} topicIdx={idx} />

                            <TopicResources topic={point.title} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Station 1: Session Self-Assessment Quiz */}
          <SessionQuiz sessionId={session.id} mode={interactionMode} />
        </div>

        {/* Practice Section - Lab Mode */}
        <div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900 rounded-3xl shadow-xl border border-slate-800 p-8 text-white"
          >
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-fuchsia-500 to-purple-600 p-3 rounded-xl mr-4 shadow-lg shadow-purple-500/30">
                <Beaker className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Laboratorio Práctico</h2>
            </div>
            
            <h3 className="text-xl font-bold text-fuchsia-300 mb-4">{session.practice.title}</h3>
            
            <div className="mb-6 bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-500"></div>
              <p className="text-slate-300 italic mb-3 text-sm leading-relaxed">"{session.practice.scenario}"</p>
              <p className="text-sm font-semibold text-white leading-relaxed">{session.practice.description}</p>
            </div>

            {session.practice.realExample && (
              <div className="mb-8 border border-fuchsia-500/20 rounded-2xl p-5 bg-fuchsia-950/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <h4 className="text-sm font-bold text-fuchsia-300 mb-3 flex items-center">
                  <Database className="w-4 h-4 mr-2 shrink-0" />
                  Ejemplo Real
                </h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <p><strong className="text-slate-100 block mb-1">Contexto:</strong> {session.practice.realExample.context}</p>
                  <p><strong className="text-slate-100 block mb-1">Problema:</strong> {session.practice.realExample.problem}</p>
                  <p><strong className="text-fuchsia-200 block mb-1">Solución Práctica:</strong> {session.practice.realExample.solution}</p>
                </div>
              </div>
            )}

            {session.practice.teacherExplanation && (
              <div className="mb-8 border border-indigo-500/20 rounded-2xl p-5 bg-indigo-900/20 relative overflow-hidden">
                <h4 className="text-sm font-bold text-indigo-300 mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 shrink-0" />
                  Guía Docente: Lógica y Objetivo
                </h4>
                <div className="text-sm text-slate-300 leading-relaxed">
                  {session.practice.teacherExplanation}
                </div>
              </div>
            )}

            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Paso a Paso</h4>
            <motion.ul 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.5 }
                }
              }}
              className="space-y-4 mb-8"
            >
              {session.practice.steps.map((step, idx) => (
                <motion.li 
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 15, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                  }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                  className="flex items-start text-slate-300 text-sm bg-slate-800/40 p-4 rounded-xl border border-slate-700 hover:border-fuchsia-500/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-xs font-extrabold mr-4 shrink-0 shadow-inner shadow-fuchsia-500/20">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed mt-0.5 font-medium">{step}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="border-t border-slate-700 pt-6">
              <h4 className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                <Wrench className="w-4 h-4 mr-2" />
                Suite IA Requerida
              </h4>
              <div className="flex flex-wrap gap-2">
                {session.practice.toolsUsed.map(toolKey => {
                  const tool = TOOLS[toolKey];
                  if (!tool) return null;
                  return (
                    <a
                      key={toolKey}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-fuchsia-600 border border-slate-700 hover:border-fuchsia-500 text-sm font-bold text-slate-200 transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/20"
                    >
                      {tool.name}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Interactive Station 2: Business Decision Simulator */}
            <DecisionSimulator sessionId={session.id} mode={interactionMode} />

            {/* Interactive Station 3: Live AI Prompt Optimizer & Evaluator */}
            <LivePromptEvaluator
              sessionId={session.id}
              sessionTitle={session.title}
              mode={interactionMode}
            />
          </motion.div>
        </div>
      </div>

      {/* Flujos y Casos Reales (Relacionados) */}
      <div className="mt-16 space-y-16">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-8 border-b border-slate-200 pb-4">
            Flujos y Casos Reales
          </h2>
          <WorkflowsView sessionId={session.id} />
        </div>
        
        {/* Laboratorio de IA Generativa */}
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-8 border-b border-slate-200 pb-4">
            Laboratorio de IA Generativa
          </h2>
          <GenAILabView sessionId={session.id} />
        </div>

        {/* Block de Notas Personales */}
        <div className="bg-amber-50/70 rounded-3xl p-8 border border-amber-200 shadow-md relative overflow-hidden mt-16">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/40 rounded-bl-full pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-100 p-2.5 rounded-xl text-amber-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-amber-950">Block de Notas Personales</h3>
                <p className="text-xs text-amber-700 mt-0.5">Tus anotaciones se guardan automáticamente en tu navegador.</p>
              </div>
            </div>
            <span className="text-xs bg-amber-200/60 text-amber-800 px-3 py-1 rounded-full font-bold">
              Sesión {session.id.toUpperCase()}
            </span>
          </div>
          <textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Escribe aquí tus apuntes de clase, prompts probados, ideas de proyectos o dudas..."
            className="w-full min-h-[140px] p-4 bg-white/95 rounded-2xl border border-amber-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all text-slate-800 font-medium placeholder:text-amber-800/40 resize-y text-[15px] leading-relaxed shadow-sm"
          />
        </div>
      </div>
    </motion.div>
  );
}
