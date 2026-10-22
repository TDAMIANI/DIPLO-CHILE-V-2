import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TOOLS } from '../data';
import { ExternalLink, Wrench, Sparkles, Send, Loader2 } from 'lucide-react';

export function ToolsView() {
  const toolsList = Object.values(TOOLS);
  const [query, setQuery] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setRecommendation('');
    
    try {
      const response = await fetch('/api/recommend-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, tools: toolsList })
      });
      
      const data = await response.json();
      if (response.ok && data.recommendation) {
        setRecommendation(data.recommendation);
      } else {
        setRecommendation(`Ocurrió un error al consultar al asistente: ${data.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error(error);
      setRecommendation('Ocurrió un error de red al consultar al asistente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-5xl mx-auto pb-12"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-10 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-300 opacity-20 blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Herramientas de IA Generativa
            </h1>
          </div>
          <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mt-4 leading-relaxed font-medium">
            Suite de herramientas recomendadas para ejecutar los laboratorios prácticos y resolver casos específicos.
          </p>
        </div>
      </motion.div>

      {/* AI Assistant Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 bg-white rounded-3xl p-8 shadow-xl shadow-teal-100/50 border border-teal-100 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-400 to-emerald-500"></div>
        <div className="flex items-center mb-6 pl-4">
          <div className="bg-gradient-to-br from-teal-400 to-emerald-500 p-3 rounded-xl mr-4 shadow-lg shadow-teal-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">Asistente de Recomendación</h2>
            <p className="text-slate-500 font-medium mt-1">
              ¿No estás seguro de qué herramienta usar? Describe lo que quieres hacer.
            </p>
          </div>
        </div>
        
        <form onSubmit={handleRecommend} className="flex gap-4 pl-4 relative z-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Quiero analizar 50 PDFs y generar un resumen financiero..."
            className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 outline-none transition-all text-slate-700 bg-slate-50 text-lg font-medium placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-bold transition-all"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
          </button>
        </form>

        <AnimatePresence>
          {recommendation && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pl-4 overflow-hidden"
            >
              <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100 relative">
                <h3 className="text-sm font-extrabold text-teal-800 mb-3 flex items-center uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 mr-2" /> Recomendación
                </h3>
                <p className="text-teal-900 text-base whitespace-pre-wrap leading-relaxed font-medium">
                  {recommendation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {toolsList.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 border border-slate-200 p-8 flex flex-col transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-extrabold text-slate-800">{tool.name}</h2>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-50 p-3 rounded-full text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                title={`Abrir ${tool.name}`}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            
            <p className="text-slate-600 text-base mb-6 leading-relaxed font-medium">
              {tool.description}
            </p>
            
            <div className="mt-auto pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Aplicación en Casos</h3>
              <p className="text-sm font-bold text-teal-700 leading-relaxed bg-teal-50 p-4 rounded-xl">
                {tool.useCase}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
