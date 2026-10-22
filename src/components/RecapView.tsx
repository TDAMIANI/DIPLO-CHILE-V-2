import React from 'react';
import { motion } from 'motion/react';
import { RECAP_DATA } from '../data';
import { CheckCircle2, Target } from 'lucide-react';

export function RecapView() {
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
        className="mb-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Repaso Fundacional
            </h1>
          </div>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mt-4 leading-relaxed font-medium">
            Antes de adentrarnos en la IA aplicada, consolidemos los pilares construidos en las 3 fases previas del taller.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {RECAP_DATA.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-md shadow-indigo-100/50 border border-slate-200 p-8 flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-extrabold uppercase tracking-widest rounded-full mb-4 border border-indigo-100">
                {mod.keyConcept}
              </div>
              <h2 className="text-xl font-extrabold text-slate-800 mb-6 leading-tight">{mod.title}</h2>
              
              <ul className="space-y-4">
                {mod.sessions.map((session, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 + idx * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-600 leading-relaxed">{session}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
