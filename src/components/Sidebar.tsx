import React from 'react';
import { BookOpen, Target, Box, Database, BarChart, Zap, LayoutTemplate, PenTool, Sparkles, CheckCircle2, Tv, FileText } from 'lucide-react';
import { SESSIONS_DATA } from '../data';
import { exportCompletedSessionsPDF } from '../utils/pdfExport';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  completedSessions: string[];
}

export function Sidebar({ activeTab, setActiveTab, completedSessions }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Inicio', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'recap', label: 'Repaso Módulos 1-3', icon: <Target className="w-5 h-5" /> },
    { id: 'tools', label: 'Herramientas IA', icon: <PenTool className="w-5 h-5" /> }
  ];

  const totalSessions = SESSIONS_DATA.length;
  const completedCount = completedSessions.length;
  const progressPercentage = totalSessions > 0 ? (completedCount / totalSessions) * 100 : 0;

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-2xl z-50">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight mb-1 text-indigo-400">IA Aplicada</h1>
        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Taller - Chile</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">General</div>
        <ul className="space-y-1 px-3 mb-6">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="px-4 mb-4">
          <div className="flex justify-between items-center mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Módulo 4 (15 Hrs)</span>
            <span className="text-indigo-400">{completedCount}/{totalSessions}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-3">
            <div 
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <button
            onClick={() => exportCompletedSessionsPDF(completedSessions)}
            disabled={completedCount === 0}
            className={`w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md border ${
              completedCount > 0 
                ? 'bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border-indigo-500/30 hover:border-indigo-500 cursor-pointer' 
                : 'bg-slate-800 text-slate-500 border-slate-700/50 cursor-not-allowed opacity-50'
            }`}
            title="Exportar resumen PDF de tus sesiones completadas"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Exportar Resumen PDF</span>
          </button>
        </div>

        <ul className="space-y-1 px-3">
          {SESSIONS_DATA.map((session, index) => {
            let Icon = Box;
            if (index === 0) Icon = Database;
            if (index === 1) Icon = Zap;
            if (index === 2) Icon = BarChart;
            if (index === 3) Icon = LayoutTemplate;
            if (index === 4) Icon = Target;

            const isCompleted = completedSessions.includes(session.id);

            return (
              <li key={session.id}>
                <button
                  onClick={() => setActiveTab(session.id)}
                  className={`w-full flex items-start space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left relative overflow-hidden group ${
                    activeTab === session.id ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 mt-0.5 shrink-0 transition-colors ${isCompleted && activeTab !== session.id ? 'text-emerald-400' : ''}`} />
                  <div className="flex flex-col overflow-hidden flex-1">
                    <span className="font-medium text-sm truncate">Sesión {index + 1}</span>
                    <span className={`text-[10px] leading-snug mt-0.5 transition-colors ${
                      activeTab === session.id ? 'text-indigo-100' : 'text-slate-400 group-hover:text-slate-300'
                    }`}>{session.date}</span>
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Presentation Mode Button at the bottom */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => setActiveTab('ppt')}
          className={`w-full flex items-center justify-center space-x-2 px-3 py-3 rounded-xl transition-colors font-bold shadow-lg ${
            activeTab === 'ppt' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-slate-800 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 hover:border-indigo-500'
          }`}
        >
          <Tv className="w-5 h-5" />
          <span>Iniciar Presentación</span>
        </button>
      </div>
    </div>
  );
}
