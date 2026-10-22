import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Eye,
  RotateCcw,
  Users,
  UserCheck,
  MessageSquare,
  Award
} from 'lucide-react';
import {
  SESSION_QUIZ_DATA,
  InteractionMode,
  QuizQuestion
} from '../data/interactiveModulesData';

interface SessionQuizProps {
  sessionId: string;
  mode: InteractionMode;
}

export function SessionQuiz({ sessionId, mode }: SessionQuizProps) {
  const questions: QuizQuestion[] = SESSION_QUIZ_DATA[sessionId] || SESSION_QUIZ_DATA.s1;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(`session_quiz_answers_${sessionId}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`session_quiz_answers_${sessionId}`);
      setSelectedAnswers(saved ? JSON.parse(saved) : {});
    } catch {
      setSelectedAnswers({});
    }
    setRevealedQuestions({});
  }, [sessionId]);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    const updated = { ...selectedAnswers, [questionId]: optionIdx };
    setSelectedAnswers(updated);
    try {
      localStorage.setItem(`session_quiz_answers_${sessionId}`, JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }

    if (mode === 'individual') {
      setRevealedQuestions(prev => ({ ...prev, [questionId]: true }));
    }
  };

  const toggleRevealQuestion = (questionId: string) => {
    setRevealedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setRevealedQuestions({});
    try {
      localStorage.removeItem(`session_quiz_answers_${sessionId}`);
    } catch {
      // Ignore storage error
    }
  };

  const isQuestionRevealed = (questionId: string) => {
    if (mode === 'individual') {
      return selectedAnswers[questionId] !== undefined;
    }
    return !!revealedQuestions[questionId];
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = questions.reduce((acc, q) => {
    const chosen = selectedAnswers[q.id];
    if (chosen !== undefined && chosen === q.correctIndex && isQuestionRevealed(q.id)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="mt-10 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="px-6 py-5 md:px-8 md:py-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="bg-indigo-600 p-2.5 rounded-xl text-white shrink-0 mt-0.5 shadow-sm">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Estación Interactiva 1 • Autoevaluación Teórica
              </span>
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-200/80 text-slate-700 whitespace-nowrap">
                {mode === 'live' ? (
                  <>
                    <Users className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                    Modo Debate en Clase
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    Práctica Individual
                  </>
                )}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Validación de Conceptos Clave de la Sesión
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              {mode === 'live'
                ? 'Selecciona la opción votada por la clase; la respuesta correcta permanecerá oculta hasta que actives "Revelar Análisis Docente".'
                : 'Pon a prueba lo aprendido en el Módulo Teórico con feedback pedagógico inmediato.'}
            </p>
          </div>
        </div>

        {/* Score & Controls */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Dominio Logrado
            </div>
            <div className="text-base font-extrabold text-slate-900 tabular-nums">
              {correctCount} / {questions.length}{' '}
              <span className="text-xs font-semibold text-slate-500">
                ({Math.round((correctCount / questions.length) * 100)}%)
              </span>
            </div>
          </div>

          {answeredCount > 0 && (
            <button
              onClick={handleResetQuiz}
              className="inline-flex items-center px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors whitespace-nowrap"
              title="Reiniciar respuestas"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reiniciar
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="divide-y divide-slate-200">
        {questions.map((q, qIdx) => {
          const chosenIdx = selectedAnswers[q.id];
          const hasAnswered = chosenIdx !== undefined;
          const revealed = isQuestionRevealed(q.id);
          const isCorrect = hasAnswered && chosenIdx === q.correctIndex;

          return (
            <div key={q.id} className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Pregunta {qIdx + 1} de {questions.length} • {q.conceptTag}
                </span>

                {/* Explicit status badge */}
                {hasAnswered && revealed && (
                  <span
                    className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                        Correcto
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                        Por reforzar
                      </>
                    )}
                  </span>
                )}

                {hasAnswered && !revealed && mode === 'live' && (
                  <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                    Voto del Grupo Registrado (Respuesta Oculta)
                  </span>
                )}
              </div>

              <h4 className="text-base md:text-lg font-bold text-slate-900 leading-snug mb-5">
                {q.question}
              </h4>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((optText, optIdx) => {
                  const isSelected = chosenIdx === optIdx;
                  const isOptionCorrect = optIdx === q.correctIndex;

                  let cardStyle =
                    'bg-white border-slate-200 hover:border-indigo-300 text-slate-700';
                  let badgeStyle = 'bg-slate-100 text-slate-600';

                  if (revealed) {
                    if (isOptionCorrect) {
                      cardStyle =
                        'bg-emerald-50/70 border-emerald-400 text-emerald-950 ring-1 ring-emerald-400';
                      badgeStyle = 'bg-emerald-600 text-white';
                    } else if (isSelected && !isOptionCorrect) {
                      cardStyle =
                        'bg-amber-50/70 border-amber-400 text-amber-950';
                      badgeStyle = 'bg-amber-600 text-white';
                    } else {
                      cardStyle = 'bg-slate-50/60 border-slate-200 text-slate-400';
                      badgeStyle = 'bg-slate-100 text-slate-400';
                    }
                  } else if (isSelected) {
                    cardStyle =
                      'bg-indigo-50/80 border-indigo-500 text-indigo-950 ring-1 ring-indigo-500';
                    badgeStyle = 'bg-indigo-600 text-white';
                  }

                  const optionLetter = String.fromCharCode(65 + optIdx);

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${cardStyle}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${badgeStyle}`}
                      >
                        {optionLetter}
                      </span>
                      <div className="flex-1 text-sm font-medium leading-relaxed">
                        {optText}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Live Class Controls & Debate Prompt */}
              {mode === 'live' && (
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <div className="flex items-start text-xs text-slate-600">
                    <MessageSquare className="w-4 h-4 text-indigo-600 mr-2 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-800">Pregunta Detonadora en Vivo:</strong>{' '}
                      {q.liveDebatePrompt}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleRevealQuestion(q.id)}
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      revealed
                        ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    {revealed ? 'Ocultar Análisis Docente' : 'Revelar Análisis Docente'}
                  </button>
                </div>
              )}

              {/* Pedagogical Explanation Box */}
              <AnimatePresence initial={false}>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`mt-4 p-4 rounded-2xl border text-sm leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="font-bold text-slate-900 mb-1 flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600 shrink-0" />
                        Fundamento Técnico y de Negocio (Opción {String.fromCharCode(65 + q.correctIndex)}):
                      </div>
                      <p className="text-slate-700">{q.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
