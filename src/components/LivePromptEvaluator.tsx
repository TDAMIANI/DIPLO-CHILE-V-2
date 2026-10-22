import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Loader2,
  Wand2,
  FileCode2,
  ArrowUpRight,
  Lightbulb
} from 'lucide-react';
import {
  PROMPT_TEMPLATES_DATA,
  PromptEvaluationResult,
  evaluatePromptDeterministically,
  InteractionMode
} from '../data/interactiveModulesData';

interface LivePromptEvaluatorProps {
  sessionId: string;
  sessionTitle: string;
  mode: InteractionMode;
}

export function LivePromptEvaluator({
  sessionId,
  sessionTitle,
  mode
}: LivePromptEvaluatorProps) {
  const template = PROMPT_TEMPLATES_DATA[sessionId] || PROMPT_TEMPLATES_DATA.s1;

  const [promptText, setPromptText] = useState<string>(() => {
    try {
      return (
        localStorage.getItem(`session_prompt_draft_${sessionId}`) ||
        template.suboptimalPrompt
      );
    } catch {
      return template.suboptimalPrompt;
    }
  });

  const [evaluation, setEvaluation] = useState<PromptEvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [copiedOptimized, setCopiedOptimized] = useState<boolean>(false);

  useEffect(() => {
    const currentTemplate = PROMPT_TEMPLATES_DATA[sessionId] || PROMPT_TEMPLATES_DATA.s1;
    try {
      const saved = localStorage.getItem(`session_prompt_draft_${sessionId}`);
      setPromptText(saved || currentTemplate.suboptimalPrompt);
    } catch {
      setPromptText(currentTemplate.suboptimalPrompt);
    }
    setEvaluation(null);
  }, [sessionId]);

  const handlePromptChange = (val: string) => {
    setPromptText(val);
    try {
      localStorage.setItem(`session_prompt_draft_${sessionId}`, val);
    } catch {
      // Ignore storage error
    }
  };

  const handleEvaluatePrompt = async () => {
    if (!promptText.trim() || isEvaluating) return;
    setIsEvaluating(true);

    try {
      const res = await fetch('/api/evaluate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptText,
          sessionTitle,
          sessionGoal: template.challengeContext
        })
      });

      const data = await res.json();
      if (data && data.evaluation && typeof data.evaluation.overallScore === 'number') {
        setEvaluation(data.evaluation);
      } else {
        const fallbackResult = evaluatePromptDeterministically(promptText, sessionId);
        setEvaluation(fallbackResult);
      }
    } catch {
      const fallbackResult = evaluatePromptDeterministically(promptText, sessionId);
      setEvaluation(fallbackResult);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleCopyOptimized = () => {
    if (!evaluation?.optimizedPrompt) return;
    navigator.clipboard.writeText(evaluation.optimizedPrompt);
    setCopiedOptimized(true);
    setTimeout(() => setCopiedOptimized(false), 2000);
  };

  const handleApplyOptimizedToEditor = () => {
    if (!evaluation?.optimizedPrompt) return;
    handlePromptChange(evaluation.optimizedPrompt);
  };

  const getScoreBadgeStyle = (score: number) => {
    if (score >= 85) {
      return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
    }
    if (score >= 60) {
      return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
    }
    return 'bg-rose-950/80 text-rose-300 border-rose-500/40';
  };

  const getBarColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="mt-8 pt-8 border-t border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Estación Interactiva 3 • Optimizador y Evaluador de Prompts en Vivo
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-white">
            {template.challengeTitle}
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            {template.challengeContext}
          </p>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0">
          <button
            onClick={() => handlePromptChange(template.suboptimalPrompt)}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-300 transition-colors whitespace-nowrap"
          >
            Cargar Prompt Base Débil
          </button>
          <button
            onClick={() => handlePromptChange(template.idealGoldenPrompt)}
            className="px-3 py-2 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/40 text-xs font-bold text-indigo-300 transition-colors whitespace-nowrap"
          >
            Cargar Prompt Maestro
          </button>
        </div>
      </div>

      {/* Editor & Action Bar */}
      <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-4 md:p-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
            <FileCode2 className="w-4 h-4 mr-1.5 text-indigo-400" />
            Editor de Prompt del Alumno / Clase
          </label>
          <span className="text-xs text-slate-500 tabular-nums">
            {promptText.length} caracteres
          </span>
        </div>

        <textarea
          value={promptText}
          onChange={e => handlePromptChange(e.target.value)}
          rows={5}
          placeholder="Escribe o pega aquí el prompt que deseas auditar y optimizar para el caso de esta sesión..."
          className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-sm text-slate-100 font-mono leading-relaxed resize-y"
        />

        {/* Pillar Hints Bar */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] text-slate-400">
          <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <strong className="text-indigo-300 block mb-0.5">1. Rol y Contexto:</strong>
            {template.expectedPillars.roleHint}
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <strong className="text-indigo-300 block mb-0.5">2. Claridad de Tarea:</strong>
            {template.expectedPillars.taskHint}
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <strong className="text-indigo-300 block mb-0.5">3. Restricciones:</strong>
            {template.expectedPillars.constraintsHint}
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <strong className="text-indigo-300 block mb-0.5">4. Formato Salida:</strong>
            {template.expectedPillars.formatHint}
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {mode === 'live'
              ? 'Modo Clase en Vivo: Audita en pantalla cómo sube el puntaje al agregar contexto, reglas y formato JSON/Tabla.'
              : 'Evalúa tu prompt en los 4 pilares de Ingeniería de Prompts y obtén una versión optimizada lista para copiar.'}
          </span>

          <button
            onClick={handleEvaluatePrompt}
            disabled={isEvaluating || !promptText.trim()}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm transition-colors shadow-md whitespace-nowrap shrink-0"
          >
            {isEvaluating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Auditando Prompt con IA...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Evaluar y Optimizar Prompt
              </>
            )}
          </button>
        </div>
      </div>

      {/* Evaluation Results */}
      <AnimatePresence initial={false}>
        {evaluation && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Column: 4-Pillar Score & Diagnostics (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl border border-slate-800 p-5 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Índice de Calidad del Prompt
                  </span>
                  <span className="text-2xl font-extrabold text-white tabular-nums">
                    {evaluation.overallScore} / 100
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg border text-xs font-bold ${getScoreBadgeStyle(
                    evaluation.overallScore
                  )}`}
                >
                  {evaluation.overallScore >= 85
                    ? 'Nivel Producción'
                    : evaluation.overallScore >= 60
                    ? 'Intermedio Mejorable'
                    : 'Prompt Ambiguo'}
                </span>
              </div>

              {/* 4 Pillar Bars */}
              <div className="space-y-3.5">
                {[
                  { label: 'Rol y Contexto de Negocio', val: evaluation.criteria.rolContexto },
                  { label: 'Claridad y Pasos de la Tarea', val: evaluation.criteria.claridadTarea },
                  {
                    label: 'Restricciones y Gobernanza (PII)',
                    val: evaluation.criteria.restriccionesReglas
                  },
                  { label: 'Estructura y Formato de Salida', val: evaluation.criteria.formatoSalida }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="text-white tabular-nums">{item.val}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        transition={{ duration: 0.4 }}
                        className={`h-full rounded-full ${getBarColor(item.val)}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths & Improvements */}
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div>
                  <div className="font-bold text-emerald-400 mb-1.5 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                    Fortalezas Detectadas
                  </div>
                  <ul className="space-y-1 text-slate-300 pl-5 list-disc">
                    {evaluation.strengths.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-amber-400 mb-1.5 flex items-center">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                    Oportunidades de Mejora
                  </div>
                  <ul className="space-y-1 text-slate-300 pl-5 list-disc">
                    {evaluation.improvements.map((imp, i) => (
                      <li key={i}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Optimized Production Prompt (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl border border-indigo-500/30 p-5 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <h4 className="text-sm font-extrabold text-white">
                      Prompt Optimizado Recomendado (Listo para Copiar)
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleApplyOptimizedToEditor}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                      Probar en el Editor
                    </button>
                    <button
                      onClick={handleCopyOptimized}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors"
                    >
                      {copiedOptimized ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          Copiar Prompt
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-indigo-100 font-mono whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
                  {evaluation.optimizedPrompt}
                </pre>
              </div>

              {evaluation.teacherTip && (
                <div className="mt-4 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start space-x-2.5 text-xs text-indigo-200">
                  <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Tip Pedagógico: </strong>
                    {evaluation.teacherTip}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
