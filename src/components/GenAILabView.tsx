import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, BrainCircuit, Search, Code, Sparkles, ShoppingBag, 
  Terminal, CheckCircle2, Copy, FileText, ArrowRight, Play, 
  RefreshCw, Layers, Award, BookOpen, Quote, HelpCircle
} from 'lucide-react';

interface CaseProduct {
  id: string;
  name: string;
  category: string;
  origin: string;
  rawSpecs: string;
}

const PRODUCTS: CaseProduct[] = [
  {
    id: "vino",
    name: "Vino Carménère Gran Reserva",
    category: "Vinos y Licores",
    origin: "Valle de Colchagua, Chile",
    rawSpecs: "Cosecha 2023. Grado alcohólico: 14%. Notas de cata: ciruela madura, especias, chocolate negro. Guarda de 12 meses en barrica de roble francés. Producción orgánica y sustentable."
  },
  {
    id: "mimbre",
    name: "Chupalla Tradicional de Mimbre",
    category: "Artesanías",
    origin: "Chimbarongo, O'Higgins, Chile",
    rawSpecs: "Tejido manual fino de mimbre seleccionado. Diámetro: 38cm. Resistente a la humedad y sol directo. Diseño de copa tradicional chilena. 100% biodegradable, hecho por artesano local de 3ra generación."
  },
  {
    id: "merquen",
    name: "Merquén Ahumado Premium",
    category: "Gourmet / Especias",
    origin: "Región de la Araucanía, Chile",
    rawSpecs: "Ají cacho de cabra secado y ahumado artesanalmente en madera de roble autóctono. Mezclado con cilantro tostado y sal de mar de Cahuil. Sabor intensamente ahumado con picor equilibrado. Sin aditivos."
  },
  {
    id: "miel",
    name: "Miel Silvestre de Ulmo Orgánica",
    category: "Gourmet / Endulzantes",
    origin: "Bosque Templado Lluvioso de Valdivia, Chile",
    rawSpecs: "Floración exclusiva de Ulmo (Eucryphia cordifolia). Textura cremosa, color ámbar extra claro. Propiedades antibacterianas naturales certificadas. Cosecha sustentable de primavera profunda."
  }
];

interface GenAILabViewProps {
  sessionId?: string;
}

export function GenAILabView({ sessionId }: GenAILabViewProps) {
  const [selectedProduct, setSelectedProduct] = useState<CaseProduct>(PRODUCTS[0]);
  const [activeFaseSim, setActiveFaseSim] = useState<'claude' | 'chatgpt' | 'gemini' | 'preview'>('claude');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);


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


  const sessionDownloads: Record<string, { title: string; desc: string; files: any[] }> = {
    s2: {
      title: "Recursos de Estructuración y Datos Crudos",
      desc: "Descarga las especificaciones crudas de los productos chilenos. Cópialas y pégalas en Claude 3.5 Sonnet pidiéndole que extraiga metadatos y genere un JSON estructurado siguiendo buenas prácticas de datos.",
      files: [
        {
          name: "Specs Productos",
          ext: "Archivo de texto (.txt)",
          icon: "Database",
          color: "orange",
          file: "Specs_Productos_Chilenos.txt",
          content: "ESPECIFICACIONES%20CRUDAS%20-%20PRODUCTOS%20CHILENOS%0A%0A1.%20Vino%20Carm%C3%A9n%C3%A8re%20Gran%20Reserva%0ACosecha%202023.%20Guarda%2012%20meses."
        }
      ]
    },
    s3: {
      title: "Recursos de Copywriting, Prompts y Datasets",
      desc: "Descarga la biblioteca de Prompts de Referencia y el dataset de ventas de retail. Úsalos en ChatGPT (con Advanced Data Analysis) o Claude para generar visualizaciones y redactar campañas publicitarias.",
      files: [
        {
          name: "Biblioteca Prompts",
          ext: "Archivo de texto (.txt)",
          icon: "Terminal",
          color: "emerald",
          file: "Prompts_Referencia.txt",
          content: "Ejemplo%20de%20Prompt%20Base%3A%0A%22Act%C3%BAa%20como%20experto%20en%20Marketing.%20Redacta%20post%20de%20Instagram%20enfocado%20en%20exclusividad.%22"
        },
        {
          name: "Prompt KPI Análisis",
          ext: "Archivo de texto (.txt)",
          icon: "Terminal",
          color: "purple",
          file: "Prompt_KPI.txt",
          content: "Act%C3%BAa%20como%20un%20Director%20de%20Business%20Intelligence%20de%20nivel%20corporativo.%0AHe%20subido%20una%20planilla%20de%20Excel%20que%20contiene%20las%20ventas%20de%20nuestras%20sucursales%20en%20Chile.%0A%0APor%20favor%2C%20procesa%20la%20informaci%C3%B3n%20y%20realiza%20las%20siguientes%20tareas%20de%20an%C3%A1lisis%20y%20visualizaci%C3%B3n%3A%0A1.%20Calcula%20una%20nueva%20columna%3A%20%22%25%20de%20Cumplimiento%20de%20Meta%22%20(Ventas%20%2F%20Meta%20de%20Ventas).%0A2.%20Identifica%20y%20genera%20un%20listado%20de%20las%20sucursales%20cr%C3%ADticas%20que%20est%C3%A9n%20por%20debajo%20del%2080%25%20de%20cumplimiento.%0A3.%20Crea%20un%20gr%C3%A1fico%20de%20barras%20horizontales%20elegante%20que%20muestre%20el%20%25%20de%20cumplimiento%20por%20sucursal.%20%0A%20%20%20-%20Usa%20el%20color%20rojo%20carm%C3%ADn%20para%20resaltar%20las%20sucursales%20con%20cumplimiento%20cr%C3%ADtico%20(%3C%2080%25).%0A%20%20%20-%20Usa%20un%20tono%20azul%20slate%20o%20gris%20suave%20para%20las%20sucursales%20que%20s%C3%AD%20cumplieron%20la%20meta.%0A%20%20%20-%20Agrega%20una%20l%C3%ADnea%20promedio%20vertical%20punteada%20que%20represente%20la%20media%20nacional.%0A4.%20Redacta%20una%20minuta%20ejecutiva%20de%203%20puntos%20clave%20dirigida%20al%20Gerente%20Comercial%20que%20resuma%20el%20diagn%C3%B3stico%20y%20sugiera%20una%20acci%C3%B3n%20correctiva."
        },
        {
          name: "Ventas Retail",
          ext: "Archivo CSV (.csv)",
          icon: "Database",
          color: "cyan",
          file: "ventas_retail.csv",
          url: "/ventas_retail.csv"
        },
        {
          name: "Ventas Sucursales (KPI)",
          ext: "Archivo CSV (.csv)",
          icon: "Database",
          color: "blue",
          file: "ventas_sucursales_chile.csv",
          url: "/ventas_sucursales_chile.csv"
        }
      ]
    },
    s5: {
      title: "Recursos del Ejemplo Integrador (End-to-End)",
      desc: "Para el caso integrador, aquí tienes el archivo completo con especificaciones crudas, frameworks de prompting e insights de investigación. Usa estos inputs para pasar por las 4 fases de la simulación.",
      files: [
        {
          name: "Specs Productos",
          ext: "Archivo de texto (.txt)",
          icon: "Database",
          color: "indigo",
          file: "Specs_Productos_Chilenos.txt",
          content: "ESPECIFICACIONES%20CRUDAS%20-%20PRODUCTOS%20CHILENOS%0A%0A1.%20Vino%20Carm%C3%A9n%C3%A8re%20Gran%20Reserva%0ACosecha%202023.%20Guarda%2012%20meses."
        },
        {
          name: "Biblioteca Prompts",
          ext: "Archivo de texto (.txt)",
          icon: "Terminal",
          color: "emerald",
          file: "Prompts_Referencia.txt",
          content: "Ejemplo%20de%20Prompt%20Base%3A%0A%22Act%C3%BAa%20como%20experto%20en%20Marketing.%20Redacta%20post%20de%20Instagram%20enfocado%20en%20exclusividad.%22"
        },
        {
          name: "Reporte Búsqueda AI",
          ext: "Reporte Markdown (.md)",
          icon: "BookOpen",
          color: "cyan",
          file: "Reporte_Perplexity_ECommerce.md",
          content: "%23%20Reporte%20Perplexity%3A%20Tendencias%20E-Commerce%202024%0A%0A##%201.%20Sustentabilidad%0ALos%20consumidores%20chilenos%20prefieren%20productos%20carbono%20neutrales."
        }
      ]
    }
  };

  const currentDownloads = sessionId && sessionDownloads[sessionId] ? sessionDownloads[sessionId] : null;

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

  // Simulated Outputs
  const [simulationOutputs, setSimulationOutputs] = useState<Record<string, { prompt: string; result: string; code?: string }>>({
    claude: {
      prompt: "",
      result: ""
    },
    chatgpt: {
      prompt: "",
      result: ""
    },
    gemini: {
      prompt: "",
      result: "",
      code: ""
    }
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  
  // Auto-update prompts when product changes so they are always visible
  React.useEffect(() => {
    const prod = selectedProduct;
    
    const promptClaude = `Rol: Eres un Arquitecto de Datos y Analista de E-commerce experto en Retail Premium.
Tarea: Toma las siguientes especificaciones crudas de un producto tradicional de Chile y conviértelas en un catálogo estructurado JSON semánticamente enriquecido. Infiere campos lógicos de marketing, alérgenos, sostenibilidad, código SKU sugerido e internacionalización (traducción al inglés).
Producto: ${prod.name}
Origen: ${prod.origin}
Especificaciones: ${prod.rawSpecs}
Genera únicamente un objeto JSON con las siguientes propiedades: sku, nombre_es, nombre_en, categoria, origen, especificaciones_tecnicas (objeto), perfil_sustentabilidad, perfil_maridaje_o_uso, advertencias_alergenos.`;
      
    const promptChatGPT = `Rol: Director Creativo de Copywriting y Estratega Digital.
Contexto: Recibirás un objeto JSON generado por Claude con los metadatos de un producto chileno premium.
Tarea: Diseña una campaña publicitaria multi-canal adaptada para el lanzamiento internacional de este producto. Genera:
1. Google Ads Headline & Description (Optimizado para clics de compradores internacionales).
2. Publicación de Instagram con tono de narración de historias (Storytelling) que destaque la herencia cultural.
3. Asunto y cuerpo de un boletín de correo electrónico de fidelización (Newsletter) con un botón de llamada a la acción (CTA).

JSON de Entrada:
` + JSON.stringify({
      sku: `CL-${prod.id.toUpperCase()}-023`,
      nombre_es: prod.name,
      categoria: prod.category
    }, null, 2); // Simplified version for the prompt preview

    const promptGemini = `Rol: Desarrollador Frontend Creativo y Diseñador UI/UX.
Contexto: Estamos lanzando "${prod.name}" en un mercado internacional premium. Tenemos los metadatos y el copywriting.
Tarea: Genera un componente de React/Tailwind (Ficha de Producto) inmersiva.
Requisitos:
- Diseño oscuro (Dark Mode) premium.
- Espacio para imagen (usa un div con degradado de reemplazo).
- Incluye el precio (inventa uno acorde al mercado premium, ej: USD $40-$100).
- Usa un diseño de tarjeta (card) con efecto glassmorphism.
- Incluye un botón "Comprar Ahora" y un botón secundario "Ver en Realidad Aumentada (AR)".
- Devuelve SOLO el código HTML/Tailwind válido, sin explicaciones.`;

    setSimulationOutputs(prev => ({
      claude: { ...prev.claude, prompt: promptClaude, result: "" },
      chatgpt: { ...prev.chatgpt, prompt: promptChatGPT, result: "" },
      gemini: { ...prev.gemini, prompt: promptGemini, result: "", code: "" }
    }));
  }, [selectedProduct]);

  const runSimulation = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const prod = selectedProduct;
      
      const promptClaude = `Rol: Eres un Arquitecto de Datos y Analista de E-commerce experto en Retail Premium.
Tarea: Toma las siguientes especificaciones crudas de un producto tradicional de Chile y conviértelas en un catálogo estructurado JSON semánticamente enriquecido. Infiere campos lógicos de marketing, alérgenos, sostenibilidad, código SKU sugerido e internacionalización (traducción al inglés).
Producto: ${prod.name}
Origen: ${prod.origin}
Especificaciones: ${prod.rawSpecs}
Genera únicamente un objeto JSON con las siguientes propiedades: sku, nombre_es, nombre_en, categoria, origen, especificaciones_tecnicas (objeto), perfil_sustentabilidad, perfil_maridaje_o_uso, advertencias_alergenos.`;

      const resultClaude = JSON.stringify({
        sku: `CL-${prod.id.toUpperCase()}-023`,
        nombre_es: prod.name,
        nombre_en: prod.id === "vino" ? "Gran Reserva Carménère Wine" : 
                   prod.id === "mimbre" ? "Traditional Wicker Chupalla Hat" : 
                   prod.id === "merquen" ? "Premium Smoked Merquén Chili Blend" : "Organic Wild Ulmo Honey",
        categoria: prod.category,
        origen: prod.origin,
        especificaciones_tecnicas: {
          peso_estimado: prod.id === "vino" ? "1.3 kg (con botella)" : prod.id === "mimbre" ? "350g" : prod.id === "merquen" ? "100g" : "500g",
          material_o_ingredientes: prod.id === "vino" ? "Uva Carménère, sulfitos residuales" : prod.id === "mimbre" ? "Fibra de Mimbre Natural de Chimbarongo" : prod.id === "merquen" ? "Ají Cacho de Cabra, Semillas de Cilantro Tostado, Sal de Mar de Cahuil" : "Néctar crudo de flor de Ulmo 100%",
          certificacion: "Orgánica, Comercio Justo"
        },
        perfil_sustentabilidad: {
          huella_carbono: "Neutralizada en origen mediante reforestación nativa",
          empaque: "100% reciclable / biodegradable y libre de plástico",
          impacto_social: "Apoyo directo a pequeños productores y artesanos de la zona centro-sur de Chile"
        },
        perfil_maridaje_o_uso: prod.id === "vino" ? "Carnes rojas asadas, pastas con salsas condimentadas y quesos maduros." : 
                               prod.id === "mimbre" ? "Uso diario estival, eventos tradicionales folclóricos y decoración de interiores campestres." : 
                               prod.id === "merquen" ? "Ideal para sazonar carnes de cerdo, cordero, legumbres chilenas y aceites de oliva premium." : "Endulzante natural para infusiones, quesos frescos chilenos y postres patagónicos.",
        advertencias_alergenos: prod.id === "vino" ? "Contiene Sulfitos." : prod.id === "merquen" ? "Elaborado en instalaciones que procesan frutos secos." : "No administrar a menores de 1 año."
      }, null, 2);

      const promptChatGPT = `Rol: Director Creativo de Copywriting y Estratega Digital.
Contexto: Recibirás un objeto JSON generado por Claude con los metadatos de un producto chileno premium.
Tarea: Diseña una campaña publicitaria multi-canal adaptada para el lanzamiento internacional de este producto. Genera:
1. Google Ads Headline & Description (Optimizado para clics de compradores internacionales).
2. Publicación de Instagram con tono de narración de historias (Storytelling) que destaque la herencia cultural.
3. Asunto y cuerpo de un boletín de correo electrónico de fidelización (Newsletter) con un botón de llamada a la acción (CTA).

JSON de Entrada:
${resultClaude}`;

      const resultChatGPT = `📣 CAMPAÑA DE LANZAMIENTO MULTI-CANAL PARA: ${prod.name}

1. GOOGLE ADS COPY (Búsqueda de Google)
--------------------------------------------------
Título: ${prod.id === "vino" ? "Discover Chile's Finest Red Wine | Carménère Premium" : 
         prod.id === "mimbre" ? "Handwoven Chilean Wicker Hat | Authentic Summer Style" : 
         prod.id === "merquen" ? "Smoked Merquén Chili Blend | Exotic Chilean Spice" : "Pure Organic Ulmo Honey | Chile's Wild Rainforest"}
Descripción: ${prod.id === "vino" ? "A French oak-aged Carménère with rich plum and dark chocolate notes. Direct from Colchagua Valley." : 
               prod.id === "mimbre" ? "100% biodegradable and handcrafted by 3rd-gen artisans. Bring historic style home today." : 
               prod.id === "merquen" ? "Artisanally smoked over native oak woods. Balanced heat for the discerning palate." : "Textura cremosa y propiedades medicinales de los prístinos bosques de Valdivia. ¡Compra hoy!"}

2. INSTAGRAM STORYTELLING COPY
--------------------------------------------------
📸 Imagen sugerida: Primer plano de manos artesanas dando el toque final al producto, con luz natural de atardecer.

📝 Copiado:
Del corazón de ${prod.origin} a tu mesa. ✨ Cada detalle de nuestro *${prod.name}* cuenta una historia de generaciones, paciencia y absoluto respeto por la tierra chilena. 🇨🇱

🌿 Sostenible desde el origen: Con empaque 100% libre de plástico y huella de carbono neutralizada en origen. Porque el verdadero lujo no daña al planeta, sino que lo honra.

🔗 Haz clic en el enlace de nuestra biografía y adquiere una pieza exclusiva de edición limitada. Envíos globales express disponibles. 📦🌎
#HechoEnChile #PremiumChile #ComercioJusto #EleganciaNatural #Sustentabilidad

3. NEWSLETTER DE FIDELIZACIÓN (Email Marketing)
--------------------------------------------------
Asunto: 🍇 Tesoros de Chile: Tradición ancestral en una botella exclusiva para ti...

Cuerpo:
Estimado amante de lo auténtico,

En un mundo de producción masiva y efímera, existen elementos que detienen el tiempo. Objetos creados no por máquinas, sino por manos que heredaron un oficio ancestral.
Hoy nos enorgullece presentarte una importación sumamente limitada: el nuevo **${prod.name}**, originario directamente de **${prod.origin}**.

Como parte de nuestro círculo de fundadores, tienes acceso exclusivo a las primeras 100 unidades antes del lanzamiento oficial internacional.

👉 [ Botón: RESERVAR AHORA CON 15% DE DESCUENTO ]`;

      const codeGemini = `<div class="max-w-md mx-auto bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 backdrop-blur-xl font-sans relative">
  <div class="relative h-64 bg-slate-950 flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent opacity-60"></div>
    <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px); background-size: 20px 20px;"></div>
    
    <div class="absolute top-4 right-4 bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center shadow-lg">
      <span class="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse mr-2"></span>
      Holograma AR Activo
    </div>

    <div class="text-center z-10">
      <div class="inline-flex p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-3 text-indigo-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </div>
      <p class="text-xs uppercase tracking-widest text-indigo-400 font-bold">${prod.category}</p>
      <h4 class="text-xl font-extrabold text-slate-100 tracking-tight mt-1">${prod.name}</h4>
    </div>
  </div>
  <div class="p-6 space-y-6">
    <div>
      <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-bold text-slate-400 tracking-wider block uppercase">${prod.origin}</span>
        <span class="text-emerald-400 font-bold text-lg">USD ${prod.id === "vino" ? "45.00" : prod.id === "mimbre" ? "39.00" : prod.id === "merquen" ? "18.00" : "24.00"}</span>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3 pt-2">
      <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <span class="text-[10px] text-slate-500 block uppercase font-bold mb-1">Origen Detallado</span>
        <span class="text-xs text-slate-200 font-semibold">${prod.origin.split(",")[0]}</span>
      </div>
      <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <span class="text-[10px] text-slate-500 block uppercase font-bold mb-1">Impacto Verde</span>
        <span class="text-xs text-emerald-400 font-bold">Carbono Neutral</span>
      </div>
    </div>
    <div class="space-y-3 pt-2">
      <button class="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center">
        Comprar Ahora
      </button>
      <button class="w-full bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-300 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        <span>Simular Visualización XR (3D)</span>
      </button>
    </div>
  </div>
</div>`;

      setSimulationOutputs(prev => ({
        claude: { ...prev.claude, result: resultClaude },
        chatgpt: { ...prev.chatgpt, prompt: promptChatGPT, result: resultChatGPT },
        gemini: { ...prev.gemini, result: `Código generado con éxito para: ${prod.name}`, code: codeGemini }
      }));
      setIsGenerating(false);
      setActiveFaseSim(availableTabs.length > 0 ? availableTabs[0] : 'claude');
    }, 1800);
  };

  // Run on first load to have outputs ready
  React.useEffect(() => {
    runSimulation();
  }, [selectedProduct]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-6xl mx-auto pb-16"
    >
      {/* Header Banner */}
      {!sessionId && (
      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-12 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden border border-indigo-500/20"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Laboratorio Integrador
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              IA Generativa Aplicada
            </h1>
            <p className="text-indigo-200 text-lg mt-4 leading-relaxed font-medium">
              Aprende a coordinar múltiples IAs (Perplexity, Claude, ChatGPT y Gemini) para resolver problemas completos sin escribir código.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center justify-center text-center shrink-0 w-full md:w-auto">
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Duración del Laboratorio</span>
            <span className="text-3xl font-extrabold text-white">3 Horas</span>
          </div>
        </div>
      </motion.div>
      )}

      {currentDownloads && (
      <div className="mb-16 bg-slate-50 border border-slate-200 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
          <FileText className="w-6 h-6 text-indigo-600 mr-2" />
          {currentDownloads.title}
        </h2>
        <p className="text-slate-600 mb-6 max-w-3xl leading-relaxed text-sm">
          {currentDownloads.desc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentDownloads.files.map((f, idx) => (
            <a
              key={idx}
              href={f.url ? f.url : `data:text/plain;charset=utf-8,${f.content}`}
              download={f.file}
              className={`flex items-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-${f.color}-400 hover:shadow-md transition-all group`}
            >
              <div className={`bg-${f.color}-50 p-3 rounded-xl mr-4 group-hover:bg-${f.color}-100 transition-colors`}>
                <FileText className={`w-5 h-5 text-${f.color}-600`} />
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
      
      {/* 15-Hour Curriculum Map */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Layers className="w-6 h-6 text-indigo-600 mr-2" />
          Ruta de Aprendizaje (Plan de 15 Horas)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredPhases.map((f, index) => (
            <div key={index} className={`border rounded-2xl p-6 ${f.color} flex flex-col justify-between hover:shadow-md transition-all`}>
              <div>
                <span className={`text-[10px] font-extrabold tracking-widest uppercase ${f.text}`}>{f.fase}</span>
                <h3 className="text-base font-extrabold text-slate-800 mt-1 mb-2">{f.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{f.desc}</p>
              </div>
              <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span className="text-[11px] font-bold text-slate-500">Herramienta: {f.tool}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study & Interactive Playground */}
      {availableTabs.length > 0 && (
        <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Case details and product selector (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center">
              <Quote className="w-5 h-5 text-indigo-500 mr-2" />
              {sessionId === 's5' ? 'Ejemplo Integrador: Gourmet & Tradición' : 'Laboratorio Práctico: Gourmet & Tradición'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              La marca ficticia <strong>"Origen de Chile"</strong> busca digitalizar y expandir artesanalmente productos típicos del país a un mercado global de lujo en EE.UU y Europa.
            </p>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Desafío Técnico del Alumno</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Transformar notas manuscritas e información incompleta en especificaciones técnicas perfectas, campañas publicitarias traducidas y maquetas de interfaz interactivas usando IA en un flujo secuencial.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-2 flex items-center">
              <ShoppingBag className="w-4 h-4 text-indigo-500 mr-2" />
              Selecciona un Producto
            </h3>
            <div className="space-y-2">
              {PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    selectedProduct.id === prod.id 
                      ? "border-indigo-600 bg-indigo-50/50 shadow-sm" 
                      : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{prod.name}</h4>
                    <p className="text-[11px] text-slate-500">{prod.origin}</p>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-semibold">{prod.category.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-700 rounded-full blur-xl opacity-50 -mr-6 -mt-6"></div>
            <h4 className="text-sm font-bold mb-3 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2 text-indigo-300" />
              Sugerencia de Prompt Académico (Perplexity)
            </h4>
            <p className="text-xs text-indigo-100 leading-relaxed mb-4">
              "Investiga papers académicos y estudios de e-commerce en Chile de los últimos 2 años sobre el impacto de la personalización de fichas de producto basada en IA en la tasa de conversión (conversion rate). Genera una síntesis en 3 puntos clave con citas."
            </p>
            <button 
              onClick={() => handleCopy("Investiga papers académicos y estudios de e-commerce en Chile de los últimos 2 años sobre el impacto de la personalización de fichas de producto basada en IA en la tasa de conversión (conversion rate). Genera una síntesis en 3 puntos clave con citas.", "perplexity-prompt")}
              className="text-[11px] bg-indigo-800 hover:bg-indigo-700 px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedText === "perplexity-prompt" ? "¡Copiado!" : "Copiar Prompt de Ejemplo"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Sandbox Simulator (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
            
            {/* Simulator Control Bar */}
            <div className="bg-slate-900 p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-600 p-2 rounded-xl">
                  <Terminal className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Orquestador de Modelos (Simulador)</h3>
                  <p className="text-xs text-slate-400">Ejecución en cadena para: <strong className="text-indigo-400 font-bold">{selectedProduct.name}</strong></p>
                </div>
              </div>
              <button
                disabled={isGenerating}
                onClick={runSimulation}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-md shrink-0"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Invocando LLMs...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Ejecutar Prototipo de IA</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulated Model Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
              {[
                { id: "claude", label: "1. Claude (JSON)" },
                { id: "chatgpt", label: "2. ChatGPT (Copy)" },
                { id: "gemini", label: "3. Gemini (Ficha)" },
                { id: "preview", label: "4. Vista UI Final" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFaseSim(tab.id as any)}
                  className={`px-5 py-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeFaseSim === tab.id 
                      ? "border-indigo-600 text-indigo-600 bg-white" 
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Output Container */}
            <div className="p-6 min-h-[420px] bg-white">
              <AnimatePresence mode="wait">
                {activeFaseSim === "preview" ? (
                  <motion.div
                    key="preview-tab"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-4"
                  >
                    <div className="text-center mb-6 max-w-md">
                      <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Interactivo</span>
                      <h4 className="text-base font-extrabold text-slate-800 mt-1">Renderizado en Vivo de Gemini</h4>
                      <p className="text-xs text-slate-500 mt-1">Este componente visual fue programado de manera sintética por Gemini en base al JSON de Claude y la publicidad de ChatGPT.</p>
                    </div>

                    {simulationOutputs.gemini.code ? (
                      <div 
                        className="w-full"
                        dangerouslySetInnerHTML={{ __html: simulationOutputs.gemini.code }}
                      />
                    ) : (
                      <div className="text-sm text-slate-400 italic">Haz clic en "Ejecutar Prototipo de IA" arriba para inicializar la simulación.</div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeFaseSim}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Prompt Box */}
                    <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100/60">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest flex items-center">
                          <Code className="w-3 h-3 mr-1" />
                          Prompt de Entrada del Alumno
                        </span>
                        <button
                          onClick={() => handleCopy(simulationOutputs[activeFaseSim]?.prompt || "", `prompt-${activeFaseSim}`)}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedText === `prompt-${activeFaseSim}` ? "¡Copiado!" : "Copiar Prompt"}</span>
                        </button>
                      </div>
                      <textarea
                        className="w-full text-xs text-slate-700 leading-relaxed italic bg-transparent resize-y outline-none focus:ring-2 focus:ring-indigo-400 rounded-lg p-2 min-h-[160px] border border-transparent hover:border-indigo-200 transition-colors"
                        value={simulationOutputs[activeFaseSim]?.prompt || ""}
                        onChange={(e) => setSimulationOutputs(prev => ({
                          ...prev,
                          [activeFaseSim]: {
                            ...prev[activeFaseSim],
                            prompt: e.target.value
                          }
                        }))}
                        placeholder="Escribe tu prompt aquí o selecciona un producto para auto-completar..."
                      />
                    </div>

                    {/* Result Box */}
                    <div className="bg-slate-900 rounded-xl p-4 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner max-h-80 overflow-y-auto">
                      <div className="flex justify-between items-center mb-3 text-slate-400 border-b border-slate-800 pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest flex items-center">
                          <Terminal className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          Resultado de la IA
                        </span>
                        <button
                          onClick={() => handleCopy(simulationOutputs[activeFaseSim]?.result || "", `result-${activeFaseSim}`)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedText === `result-${activeFaseSim}` ? "¡Copiado!" : "Copiar Salida"}</span>
                        </button>
                      </div>
                      <pre className="whitespace-pre-wrap leading-relaxed text-slate-300">
                        {simulationOutputs[activeFaseSim]?.result || "Cargando..."}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Evaluation & Objectives Section */}
      {(!sessionId || sessionId === 's5') && (
        <div className="mt-16 bg-slate-100 rounded-3xl p-8 border border-slate-200">
          <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center">
            <Award className="w-5 h-5 text-indigo-600 mr-2" />
            Rúbrica de Evaluación y Entregables
          </h3>
          
          <div className="mb-6 bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm">
             <h4 className="font-bold text-base text-indigo-900 mb-3">Requisitos para la Certificación</h4>
             <p className="text-sm text-slate-700 leading-relaxed mb-4">
               Para aprobar y obtener la certificación, cada equipo deberá presentar un <strong>Producto de Datos Conceptual</strong> desarrollado íntegramente utilizando IA Generativa (No-Code). El entregable final debe incluir:
             </p>
             <ul className="list-disc list-inside text-sm text-slate-700 space-y-2 ml-2">
               <li><strong>Documento de Estrategia:</strong> Definición del problema de negocio y diseño de la solución (apoyado en Claude/Perplexity).</li>
               <li><strong>Dataset Simulado:</strong> Archivo (Excel/CSV) con datos ficticios estructurados mediante prompts (apoyado en ChatGPT/Claude).</li>
               <li><strong>Análisis Visual:</strong> Dashboard o gráfico generado a partir del dataset con insights clave (apoyado en Advanced Data Analysis de ChatGPT/Claude).</li>
               <li><strong>Pitch Ejecutivo:</strong> Presentación breve (5 mins) defendiendo la viabilidad del pipeline diseñado.</li>
             </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-sm text-slate-800 mb-2">1. Marco Teórico (Perplexity)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consistencia y rigurosidad de las fuentes académicas extraídas sobre conversión web. Deben citarse al menos dos papers reales del IEEE o ACM.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-sm text-slate-800 mb-2">2. Estructuración Lógica (Claude)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                JSON lógicamente válido sin redundancias, donde los campos opcionales hayan sido deducidos consistentemente por la IA en base a Few-shot prompting.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-sm text-slate-800 mb-2">3. Presentación & UX (ChatGPT + Gemini)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consistencia tonal de las campañas multi-canal y funcionamiento interactivo de la ficha de producto en el entorno web simulado.
              </p>
            </div>
          </div>
        </div>
      )}
      </>
      )}
    </motion.div>
  );

}
