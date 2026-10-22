import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { RecapView } from './components/RecapView';
import { SessionView } from './components/SessionView';
import { ToolsView } from './components/ToolsView';
import { WorkflowsView } from './components/WorkflowsView';
import { GenAILabView } from './components/GenAILabView';
import { PptView } from './components/PptView';
import { SESSIONS_DATA } from './data';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [completedSessions, setCompletedSessions] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('completedSessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('completedSessions', JSON.stringify(completedSessions));
  }, [completedSessions]);

  const toggleSessionComplete = (id: string) => {
    setCompletedSessions(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    if (activeTab === 'home') return <HomeView setActiveTab={handleTabChange} />;
    if (activeTab === 'workflows') return <WorkflowsView />;
    if (activeTab === 'genailab') return <GenAILabView />;
    if (activeTab === 'recap') return <RecapView />;
    if (activeTab === 'tools') return <ToolsView />;
    if (activeTab === 'ppt') return (
      <PptView 
        completedSessions={completedSessions}
        onToggleComplete={toggleSessionComplete}
        onClose={() => handleTabChange('home')}
      />
    );
    
    const session = SESSIONS_DATA.find(s => s.id === activeTab);
    if (session) return (
      <SessionView 
        session={session} 
        isCompleted={completedSessions.includes(session.id)}
        onToggleComplete={() => toggleSessionComplete(session.id)}
      />
    );

    return <HomeView setActiveTab={handleTabChange} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white z-20">
        <h1 className="text-lg font-bold text-indigo-400">IA Aplicada</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile */}
      {activeTab !== 'ppt' && (
        <div className={`
          fixed top-0 left-0 h-screen z-20 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isDesktopSidebarOpen ? 'md:translate-x-0' : 'md:-translate-x-full'}
        `}>
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            completedSessions={completedSessions}
          />
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && activeTab !== 'ppt' && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className={`flex-1 p-6 md:p-12 overflow-x-hidden relative transition-all duration-300 ease-in-out ${
        activeTab !== 'ppt' ? (isDesktopSidebarOpen ? 'md:ml-64' : 'md:ml-0') : ''
      }`}>
        {activeTab !== 'ppt' && (
          <button 
            onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            className="hidden md:flex fixed top-6 z-30 bg-white hover:bg-slate-50 text-slate-500 hover:text-indigo-600 p-2 rounded-xl shadow-md border border-slate-200 transition-all cursor-pointer items-center justify-center"
            style={{
              left: isDesktopSidebarOpen ? '272px' : '16px',
              transition: 'left 300ms ease-in-out'
            }}
            title={isDesktopSidebarOpen ? "Ocultar menú" : "Mostrar menú"}
          >
            {isDesktopSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
        <div className={activeTab !== 'ppt' ? "md:pt-10" : ""}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
