import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Play,
  RotateCcw,
  Gauge,
  MessageSquare,
  Sliders
} from 'lucide-react';
import {
  DECISION_SIMULATOR_DATA,
  InteractionMode,
  DecisionOption
} from '../data/interactiveModulesData';

interface DecisionSimulatorProps {
  sessionId: string;
  mode: InteractionMode;
}

export function DecisionSimulator({ sessionId, mode }: DecisionSimulatorProps) {
  const scenario = DECISION_SIMULATOR_DATA[sessionId] || DECISION_SIMULATOR_DATA.s1;

  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(`session_sim_decisions_${sessionId}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [simulatedStages, setSimulatedStages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setActiveStageIdx(0);
    try {
      const saved = localStorage.getItem(`session_sim_decisions_${sessionId}`);
      setSelectedOptions(saved ? JSON.parse(saved) : {});
    } catch {
      setSelectedOptions({});
    }
    setSimulatedStages({});
  }, [sessionId]);

  const currentStage = scenario.stages[activeStageIdx] || scenario.stages[0];
  const chosenOptionId = selectedOptions[currentStage.stageNumber];
  const chosenOption: DecisionOption | undefined = currentStage.options.find(
    o => o.id === chosenOptionId
  );

  const isImpactRevealed =
    mode === 'individual'
      ? !!chosenOption
      : !!chosenOption && !!simulatedStages[currentStage.stageNumber];

  const handleChooseOption = (optionId: string) => {
    const updated = { ...selectedOptions, [currentStage.stageNumber]: optionId };
    setSelectedOptions(updated);
    try {
      localStorage.setItem(`session_sim_decisions_${sessionId}`, JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }

    if (mode === 'individual') {
      setSimulatedStages(prev => ({ ...prev, [currentStage.stageNumber]: true }));
    } else {
      setSimulatedStages(prev => ({ ...prev, [currentStage.stageNumber]: false }));
    }
  };

  const handleResetSimulator = () => {
    setSelectedOptions({});
    setSimulatedStages({});
    try {
      localStorage.removeItem(`session_sim_decisions_${sessionId}`);
    } catch {
      // Ignore storage error
    }
  };

  // Compute displayed metrics (baseline 50 if not yet revealed)
  const displayMetrics = isImpactRevealed && chosenOption
    ? chosenOption.metrics
    : { precision: 50, velocidad: 50, seguridad: 50 };

  const getMetricColor = (val: number) => {
    if (!isImpactRevealed) return 'bg-slate-600';
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 55) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="mt-8 pt-8 border-t border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">
              Estación Interactiva 2 • Simulador de Decisiones Ejecutivas
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
              {scenario.companyBadge}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-white">
            {scenario.scenarioTitle}
          </h3>
        </div>

        {/* Stage Switcher */}
        <div className="flex items-center gap-2 self-start md:self-center">
          {scenario.stages.map((st, idx) => {
            const isDone = selectedOptions[st.stageNumber] !== undefined;
            const isActive = activeStageIdx === idx;
            return (
              <button
                key={st.stageNumber}
                onClick={() => setActiveStageIdx(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-fuchsia-600 text-white border-fuchsia-500 shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                <span>Fase {st.stageNumber}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
              </button>
            );
          })}

          {Object.keys(selectedOptions).length > 0 && (
            <button
              onClick={handleResetSimulator}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
              title="Reiniciar simulación"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Executive Context Banner */}
      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-sm text-slate-300 leading-relaxed mb-6">
        <strong className="text-white font-bold">Contexto del Caso: </strong>
        {scenario.contextBrief}
      </div>

      {/* Split 2-Zone Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Dilemma & Options (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                {currentStage.title}
              </span>
              <span className="text-xs text-slate-400 tabular-nums">
                Etapa {currentStage.stageNumber} de {scenario.stages.length}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              {currentStage.situation}
            </p>

            {mode === 'live' && (
              <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-start text-xs text-indigo-300">
                <MessageSquare className="w-4 h-4 mr-2 shrink-0 mt-0.5 text-indigo-400" />
                <span>
                  <strong>Pregunta para la Clase:</strong> {currentStage.liveQuestion}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {currentStage.options.map((opt, idx) => {
              const isSelected = chosenOptionId === opt.id;
              let optionBorder =
                'bg-slate-800/40 border-slate-700/80 hover:border-slate-500 text-slate-200';

              if (isSelected && !isImpactRevealed) {
                optionBorder =
                  'bg-indigo-950/60 border-indigo-500 text-white ring-1 ring-indigo-500';
              } else if (isSelected && isImpactRevealed) {
                if (opt.verdict === 'optimo') {
                  optionBorder =
                    'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500';
                } else if (opt.verdict === 'intermedio') {
                  optionBorder =
                    'bg-amber-950/40 border-amber-500 text-white ring-1 ring-amber-500';
                } else {
                  optionBorder =
                    'bg-rose-950/40 border-rose-500 text-white ring-1 ring-rose-500';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleChooseOption(opt.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${optionBorder}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-fuchsia-600 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white leading-snug mb-1">
                      {opt.label}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {opt.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Mode Trigger Button */}
          {mode === 'live' && chosenOption && !isImpactRevealed && (
            <button
              onClick={() =>
                setSimulatedStages(prev => ({ ...prev, [currentStage.stageNumber]: true }))
              }
              className="w-full py-3 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center transition-colors shadow-md"
            >
              <Play className="w-4 h-4 mr-2" />
              Simular Impacto en Producción (Revelar Resultado)
            </button>
          )}
        </div>

        {/* Right Zone: Live Impact Matrix (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl border border-slate-800 p-5 md:p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-fuchsia-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Matriz de Impacto en Vivo
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 tabular-nums">
              Escala 0 - 100
            </span>
          </div>

          {/* 3 KPI Bars */}
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-300">Calidad y Precisión Técnica</span>
                <span className="text-white tabular-nums">
                  {isImpactRevealed ? `${displayMetrics.precision}%` : '—'}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '50%' }}
                  animate={{ width: `${displayMetrics.precision}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`h-full rounded-full ${getMetricColor(displayMetrics.precision)}`}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-300">Velocidad de Respuesta Operativa</span>
                <span className="text-white tabular-nums">
                  {isImpactRevealed ? `${displayMetrics.velocidad}%` : '—'}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '50%' }}
                  animate={{ width: `${displayMetrics.velocidad}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`h-full rounded-full ${getMetricColor(displayMetrics.velocidad)}`}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-300">Gobernanza y Control de Riesgo</span>
                <span className="text-white tabular-nums">
                  {isImpactRevealed ? `${displayMetrics.seguridad}%` : '—'}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '50%' }}
                  animate={{ width: `${displayMetrics.seguridad}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`h-full rounded-full ${getMetricColor(displayMetrics.seguridad)}`}
                />
              </div>
            </div>
          </div>

          {/* Executive Debrief Panel */}
          <AnimatePresence mode="wait">
            {isImpactRevealed && chosenOption ? (
              <motion.div
                key={chosenOption.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`p-4 rounded-xl border text-xs leading-relaxed ${
                  chosenOption.verdict === 'optimo'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                    : chosenOption.verdict === 'intermedio'
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-100'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
                }`}
              >
                <div className="flex items-center font-bold text-sm mb-2">
                  {chosenOption.verdict === 'optimo' ? (
                    <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-400 shrink-0" />
                  ) : chosenOption.verdict === 'intermedio' ? (
                    <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-400 shrink-0" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 mr-1.5 text-rose-400 shrink-0" />
                  )}
                  <span>Diagnóstico: {chosenOption.verdictLabel}</span>
                </div>
                <p className="text-slate-200">{chosenOption.executiveFeedback}</p>

                {activeStageIdx === 0 && scenario.stages.length > 1 && (
                  <button
                    onClick={() => setActiveStageIdx(1)}
                    className="mt-3 w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                  >
                    Avanzar a la Fase 2 del Escenario →
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-xs text-slate-400 flex items-start space-x-2.5"
              >
                <Sliders className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  {chosenOption && mode === 'live'
                    ? 'Opción seleccionada por la clase. Haz clic en "Simular Impacto en Producción" para revelar las métricas.'
                    : 'Selecciona una de las 3 decisiones ejecutivas a la izquierda para simular su impacto técnico y de negocio.'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
