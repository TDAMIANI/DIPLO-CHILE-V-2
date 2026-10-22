const fs = require('fs');
let code = fs.readFileSync('src/components/GenAILabView.tsx', 'utf8');

// Add sessionId to interface
if (!code.includes('interface GenAILabViewProps')) {
  code = code.replace(
    'export function GenAILabView() {',
    `interface GenAILabViewProps {
  sessionId?: string;
}

export function GenAILabView({ sessionId }: GenAILabViewProps) {`
  );
} else {
  code = code.replace(
    /export function GenAILabView\(\) \{/,
    `export function GenAILabView({ sessionId }: GenAILabViewProps) {`
  );
}

// Add the session mapping arrays before the phases
const mappingCode = `
  const allPhases = [
    {
      fase: "Fase 1 (H-1 a H-3)",
      title: "Investigación Académica",
      tool: "Perplexity AI",
      desc: "Búsqueda sistemática de patentes, estudios de conversión (CRO) y estado del arte de IA aplicada a la experiencia de usuario.",
      color: "border-cyan-500/30 bg-cyan-50/10",
      text: "text-cyan-600",
      bgIcon: "bg-cyan-100"
    },
    {
      fase: "Fase 2 (H-4 a H-7)",
      title: "Estructuración e Inferencia",
      tool: "Claude 3.5 Sonnet",
      desc: "Análisis lógico de descripciones crudas, deducción de metadatos técnicos, perfiles de maridaje y generación de esquemas JSON estrictos.",
      color: "border-orange-500/30 bg-orange-50/10",
      text: "text-orange-600",
      bgIcon: "bg-orange-100"
    },
    {
      fase: "Fase 3 (H-8 a H-11)",
      title: "Redacción Multi-canal",
      tool: "ChatGPT / GPT-4o",
      desc: "Ejecución de marcos de copywriting (AIDA, PAS) adaptados para anuncios globales, boletines informativos y copias de redes sociales.",
      color: "border-emerald-500/30 bg-emerald-50/10",
      text: "text-emerald-600",
      bgIcon: "bg-emerald-100"
    },
    {
      fase: "Fase 4 (H-12 a H-15)",
      title: "Prototipado de Interfaz",
      tool: "Google Gemini Pro",
      desc: "Generación acelerada de código HTML/CSS interactivo para crear la vista final del producto en una experiencia inmersiva XR.",
      color: "border-indigo-500/30 bg-indigo-50/10",
      text: "text-indigo-600",
      bgIcon: "bg-indigo-100"
    }
  ];

  const sessionPhaseMap: Record<string, number[]> = {
    s1: [0],
    s2: [1],
    s3: [2],
    s4: [3],
    s5: [0, 1, 2, 3]
  };

  const filteredPhases = sessionId && sessionPhaseMap[sessionId]
    ? allPhases.filter((_, idx) => sessionPhaseMap[sessionId].includes(idx))
    : allPhases;

  const sessionTabsMap: Record<string, ('claude' | 'chatgpt' | 'gemini' | 'preview')[]> = {
    s1: [],
    s2: ['claude'],
    s3: ['chatgpt'],
    s4: ['gemini', 'preview'],
    s5: ['claude', 'chatgpt', 'gemini', 'preview']
  };

  const availableTabs = sessionId && sessionTabsMap[sessionId]
    ? sessionTabsMap[sessionId]
    : ['claude', 'chatgpt', 'gemini', 'preview'];
`;

code = code.replace(
  '  // Simulated Outputs',
  mappingCode + '\n  // Simulated Outputs'
);

// Replace the hardcoded array in JSX
code = code.replace(
  /\{\[\s*\{\s*fase:\s*"Fase 1 \(H-1 a H-3\)",[\s\S]*?\}\s*\]\.map/,
  `{filteredPhases.map`
);

// Set active tab based on available tabs initially
code = code.replace(
  `setActiveFaseSim('claude');`,
  `setActiveFaseSim(availableTabs.length > 0 ? availableTabs[0] : 'claude');`
);

// Set default state of activeFaseSim
code = code.replace(
  `useState<'claude' | 'chatgpt' | 'gemini' | 'preview'>('claude');`,
  `useState<'claude' | 'chatgpt' | 'gemini' | 'preview'>(sessionId === 's2' ? 'claude' : sessionId === 's3' ? 'chatgpt' : sessionId === 's4' ? 'gemini' : 'claude');`
);

// Modify the tabs rendering to only show available tabs
code = code.replace(
  `            <button\n              onClick={() => setActiveFaseSim('claude')}`,
  `            {availableTabs.includes('claude') && (<button\n              onClick={() => setActiveFaseSim('claude')}`
);
code = code.replace(
  `              Estructurar JSON\n            </button>`,
  `              Estructurar JSON\n            </button>)}`
);

code = code.replace(
  `            <button\n              onClick={() => setActiveFaseSim('chatgpt')}`,
  `            {availableTabs.includes('chatgpt') && (<button\n              onClick={() => setActiveFaseSim('chatgpt')}`
);
code = code.replace(
  `              Copywriting\n            </button>`,
  `              Copywriting\n            </button>)}`
);

code = code.replace(
  `            <button\n              onClick={() => setActiveFaseSim('gemini')}`,
  `            {availableTabs.includes('gemini') && (<button\n              onClick={() => setActiveFaseSim('gemini')}`
);
code = code.replace(
  `              Generar Código\n            </button>`,
  `              Generar Código\n            </button>)}`
);

code = code.replace(
  `            <button\n              onClick={() => setActiveFaseSim('preview')}`,
  `            {availableTabs.includes('preview') && (<button\n              onClick={() => setActiveFaseSim('preview')}`
);
code = code.replace(
  `              Vista Final\n            </button>`,
  `              Vista Final\n            </button>)}`
);

// Hide the whole simulator section if no tabs available (like in s1)
code = code.replace(
  `      {/* Case Study & Interactive Playground */}`,
  `      {/* Case Study & Interactive Playground */}\n      {availableTabs.length > 0 && (`
);

code = code.replace(
  `        </div>\n      </div>\n    </motion.div>`,
  `        </div>\n      </div>\n      )}\n    </motion.div>`
);

fs.writeFileSync('src/components/GenAILabView.tsx', code);
