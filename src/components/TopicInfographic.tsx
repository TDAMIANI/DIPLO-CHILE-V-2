import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, Server, Cpu, Layers, ArrowRight, Shuffle, BarChart3, 
  Zap, Activity, Eye, RefreshCw, FileText, Check, AlertTriangle, 
  Radio, TrendingUp, Sparkles, AlertCircle, Play, ShieldAlert,
  Sliders, Layout, Maximize2, Trash2, Smartphone, Video
} from 'lucide-react';

interface TopicInfographicProps {
  sessionId: string;
  topicIdx: number;
}

export function TopicInfographic({ sessionId, topicIdx }: TopicInfographicProps) {
  // --- STATE FOR S1 T1.1: Ciclo de vida ---
  const [s1Phase, setS1Phase] = useState<number>(0);
  const s1Phases = [
    {
      title: "1. Creación e Ingesta",
      desc: "Los datos nacen de dispositivos móviles, clicks en la web, sensores de IoT, y transacciones de compra.",
      dataFlow: "Dato Crudo ➔ Ingesta vía API / Event Streams",
      color: "bg-blue-500",
      icon: Radio,
      details: "Se utilizan brokers de mensajes como Apache Kafka o Google Pub/Sub para encolar de forma segura millones de eventos por segundo."
    },
    {
      title: "2. Almacenamiento & Limpieza",
      desc: "Los datos se guardan en lagos de datos (Data Lakes) en su formato original y luego se limpian mediante procesos ETL/ELT.",
      dataFlow: "Almacenamiento Crudo ➔ Validación ➔ Formato Parquet / SQL",
      color: "bg-indigo-500",
      icon: Database,
      details: "Se eliminan duplicados, se formatean fechas y se eliminan valores corruptos o nulos utilizando scripts automatizados."
    },
    {
      title: "3. Procesamiento & Enriquecimiento",
      desc: "Se procesa el dato mediante motores analíticos y se enriquece agregando variables y score de modelos de IA.",
      dataFlow: "Dato Estructurado ➔ Modelo predictivo / Clasificación de IA",
      color: "bg-purple-500",
      icon: Cpu,
      details: "Modelos de Machine Learning calculan probabilidades de fraude, afinidad de compra o segmentan clientes en tiempo récord."
    },
    {
      title: "4. Consumo & Impacto Comercial",
      desc: "La información procesada se expone en tableros ejecutivos en tiempo real o se consume a través de APIs de negocio.",
      dataFlow: "Insights en Dashboard ➔ Toma de decisión estratégica rentable",
      color: "bg-emerald-500",
      icon: TrendingUp,
      details: "El gerente de operaciones o marketing ajusta ofertas y logística basándose en evidencia empírica en vez de intuición."
    }
  ];

  // --- STATE FOR S1 T1.2: Lake vs Warehouse ---
  const [s1StorageType, setS1StorageType] = useState<'warehouse' | 'lake'>('warehouse');

  // --- STATE FOR S1 T1.3: No estructurado ---
  const [s1UnstructuredFile, setS1UnstructuredFile] = useState<'pdf' | 'email' | 'audio'>('pdf');
  const [s1IsProcessingFile, setS1IsProcessingFile] = useState(false);
  const [s1ProcessedResult, setS1ProcessedResult] = useState<any>(null);

  const runS1TextProcessing = () => {
    setS1IsProcessingFile(true);
    setS1ProcessedResult(null);
    setTimeout(() => {
      setS1IsProcessingFile(false);
      if (s1UnstructuredFile === 'pdf') {
        setS1ProcessedResult({
          sku: "CL-MIE-8921",
          proveedor: "Apícola Bosque Valdiviano",
          certificacion: "Orgánica USDA & IMO",
          humedad: "17.4% (Cumple norma)"
        });
      } else if (s1UnstructuredFile === 'email') {
        setS1ProcessedResult({
          categoria_ticket: "Logística / Reclamo",
          sentimiento: "Negativo (Frustración alta)",
          urgencia: "ALTA",
          accion: "Enrutar a supervisor de despachos"
        });
      } else {
        setS1ProcessedResult({
          duracion_seg: "124 seg",
          motivo_llamada: "Consulta sobre saldo y cupón",
          transcripcion_resumen: "Cliente solicita activación de código de descuento de retail presencial en web.",
          es_fuga_riesgo: "No"
        });
      }
    }, 1200);
  };

  // --- STATE FOR S2 T2.1: ETL vs ELT ---
  const [s2EtlStep, setS2EtlStep] = useState<number>(0);
  const [s2PipelineMode, setS2PipelineMode] = useState<'etl' | 'elt'>('etl');

  // --- STATE FOR S2 T2.3: Batch vs Streaming ---
  const [s2RunStream, setS2RunStream] = useState(false);
  const [s2StreamPackets, setS2StreamPackets] = useState<{ id: number; value: number; type: string }[]>([]);
  const [s2BatchProgress, setS2BatchProgress] = useState(0);
  const [s2IsBatchRunning, setS2IsBatchRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (s2RunStream) {
      interval = setInterval(() => {
        setS2StreamPackets(prev => {
          const newPacket = {
            id: Date.now() + Math.random(),
            value: Math.floor(Math.random() * 40) + 80,
            type: Math.random() > 0.85 ? 'ANOMALÍA' : 'OK'
          };
          return [newPacket, ...prev.slice(0, 5)];
        });
      }, 1000);
    } else {
      setS2StreamPackets([]);
    }
    return () => clearInterval(interval);
  }, [s2RunStream]);

  const triggerBatchProcess = () => {
    if (s2IsBatchRunning) return;
    setS2IsBatchRunning(true);
    setS2BatchProgress(0);
    const interval = setInterval(() => {
      setS2BatchProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setS2IsBatchRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // --- STATE FOR S3 T3.1: Cognitive Load Dashboard ---
  const [s3DashboardType, setS3DashboardType] = useState<'bad' | 'good'>('bad');

  // --- STATE FOR S4 T4.3: IoT End-to-End ---
  const [s4SensorTemp, setS4SensorTemp] = useState<number>(92);
  const [s4IsSending, setS4IsSending] = useState(false);
  const [s4BrokerQueue, setS4BrokerQueue] = useState<{ id: number; temp: number; timestamp: string }[]>([]);
  const [s4PipelineLog, setS4PipelineLog] = useState<string[]>(["[Broker] Conectado e inactivo"]);

  const triggerSensorEmission = () => {
    setS4IsSending(true);
    const newTemp = Math.floor(Math.random() * 35) + 85; // 85 to 120
    setS4SensorTemp(newTemp);
    
    // Log emission
    setS4PipelineLog(prev => [`[Sensor] Temperatura emitida: ${newTemp}°C`, ...prev.slice(0, 4)]);
    
    setTimeout(() => {
      // Ingest into broker
      const newEvent = { id: Date.now(), temp: newTemp, timestamp: new Date().toLocaleTimeString() };
      setS4BrokerQueue(prev => [newEvent, ...prev.slice(0, 3)]);
      setS4PipelineLog(prev => [`[Kafka/PubSub] Mensaje encolado en partición #0`, ...prev.slice(0, 4)]);
      
      setTimeout(() => {
        // Process
        const isCritical = newTemp > 110;
        setS4PipelineLog(prev => [
          isCritical 
            ? `[Flink Process] ¡ALERTA! Filtro activado: ${newTemp}°C supera límite crítico de 110°C` 
            : `[Flink Process] Valor ${newTemp}°C dentro del rango de operación seguro`,
          ...prev.slice(0, 4)
        ]);
        
        setTimeout(() => {
          // Push to dashboard
          setS4PipelineLog(prev => [`[Websocket] Dashboard actualizado con último estado`, ...prev.slice(0, 4)]);
          setS4IsSending(false);
        }, 500);
      }, 500);
    }, 500);
  };

  // --- RENDERING S1 T1.1: Ciclo de vida ---
  if (sessionId === 's1' && topicIdx === 0) {
    return (
      <div className="mt-6 border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Infografía Interactiva: El Flujo del Ciclo de Vida del Dato</h4>
        </div>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Haz clic en cada fase para ver cómo se transforma un dato desde su generación cruda hasta convertirse en una decisión de negocio de alto impacto comercial.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          {s1Phases.map((phase, idx) => {
            const IconComponent = phase.icon;
            const isSelected = s1Phase === idx;
            return (
              <button
                key={idx}
                onClick={() => setS1Phase(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 relative ${
                  isSelected 
                    ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-400' 
                    : 'bg-white border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg ${phase.color} text-white flex items-center justify-center mb-3`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h5 className="text-xs font-bold text-slate-800 mb-1">{phase.title}</h5>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">{phase.desc}</p>
                {isSelected && (
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
              Flujo de Información Interno en Producción
            </span>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full mt-1 md:mt-0">
              {s1Phases[s1Phase].dataFlow}
            </span>
          </div>
          <h4 className="text-base font-extrabold text-slate-800 mb-2">{s1Phases[s1Phase].title}</h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">{s1Phases[s1Phase].desc}</p>
          <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/60 text-xs text-indigo-950 flex items-start space-x-3">
            <Activity className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block mb-0.5">Cómo se integra en la Arquitectura de Negocios:</strong>
              {s1Phases[s1Phase].details}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING S1 T1.2: Warehouse vs Lake ---
  if (sessionId === 's1' && topicIdx === 1) {
    return (
      <div className="mt-6 border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-indigo-500" />
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Flujograma Comparativo: ¿Dónde guardamos la información?</h4>
          </div>
          <div className="flex bg-slate-200 p-1 rounded-lg">
            <button
              onClick={() => setS1StorageType('warehouse')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                s1StorageType === 'warehouse' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Data Warehouse
            </button>
            <button
              onClick={() => setS1StorageType('lake')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                s1StorageType === 'lake' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Data Lake
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Alterna entre las opciones para visualizar cómo los datos fluyen a través de cada arquitectura de almacenamiento e identitica sus diferencias fundamentales en un proyecto corporativo.
        </p>

        {s1StorageType === 'warehouse' ? (
          <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-extrabold text-slate-800">Estructura Rígida & Consultas de Alta Velocidad (SQL)</h5>
                <p className="text-[11px] text-slate-500">Ejemplos: Google BigQuery, Snowflake, Amazon Redshift</p>
              </div>
            </div>

            {/* Visual Pipeline representation */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
              <div className="text-center p-3 bg-white rounded-lg border border-slate-200 w-full md:w-1/4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">1. Entrada</span>
                <span className="block font-bold text-xs text-slate-700 mt-1">Datos Transaccionales</span>
                <span className="text-[9.5px] text-indigo-500 block">Facturas, Registros ERP</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0 shrink-0" />
              <div className="text-center p-3 bg-white rounded-lg border border-indigo-200 w-full md:w-1/4 ring-1 ring-indigo-100">
                <span className="text-[10px] font-bold text-indigo-500 uppercase">2. Esquema Fijo</span>
                <span className="block font-bold text-xs text-slate-700 mt-1">Estructura ETL</span>
                <span className="text-[9.5px] text-slate-500 block">Columnas estructuradas</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0 shrink-0" />
              <div className="text-center p-3 bg-indigo-600 text-white rounded-lg w-full md:w-1/4 shadow-md">
                <span className="text-[10px] font-bold text-indigo-200 uppercase">3. Destino Analítico</span>
                <span className="block font-bold text-xs mt-1">Tablas BigQuery / SQL</span>
                <span className="text-[9.5px] text-indigo-200 block">Consultas inmediatas</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50/50">
                <strong className="block text-slate-800 mb-1">✓ Tipo de Datos:</strong>
                <span className="text-slate-600">Únicamente estructurados y semiestructurados procesados de antemano.</span>
              </div>
              <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50/50">
                <strong className="block text-slate-800 mb-1">✓ Usuarios Clave:</strong>
                <span className="text-slate-600">Analistas de Negocios (BI), Control de Gestión, Directivos.</span>
              </div>
              <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50/50">
                <strong className="block text-slate-800 mb-1">✓ Costo:</strong>
                <span className="text-slate-600">Almacenamiento moderado, pero procesamiento optimizado para queries pesadas.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-extrabold text-slate-800">Flexibilidad Infinita: Datos No Estructurados Crudos</h5>
                <p className="text-[11px] text-slate-500">Ejemplos: Amazon S3, Google Cloud Storage, Hadoop</p>
              </div>
            </div>

            {/* Visual Pipeline representation */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
              <div className="text-center p-3 bg-white rounded-lg border border-slate-200 w-full md:w-1/4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">1. Entrada</span>
                <span className="block font-bold text-xs text-slate-700 mt-1">Cualquier Archivo</span>
                <span className="text-[9.5px] text-emerald-600 block">PDFs, Audios, IoT, Video</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0 shrink-0" />
              <div className="text-center p-3 bg-white rounded-lg border border-emerald-200 w-full md:w-1/4 ring-1 ring-emerald-100">
                <span className="text-[10px] font-bold text-emerald-600 uppercase">2. Almacenamiento Crudo</span>
                <span className="block font-bold text-xs text-slate-700 mt-1">Sin Esquema (No schema)</span>
                <span className="text-[9.5px] text-slate-500 block">Formato nativo directo</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0 shrink-0" />
              <div className="text-center p-3 bg-emerald-600 text-white rounded-lg w-full md:w-1/4 shadow-md">
                <span className="text-[10px] font-bold text-emerald-200 uppercase">3. Uso de Ciencia / IA</span>
                <span className="block font-bold text-xs mt-1">Entrenamiento de LLM</span>
                <span className="text-[9.5px] text-emerald-100 block">Estructura on-read (al leer)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50/50">
                <strong className="block text-slate-800 mb-1">✓ Tipo de Datos:</strong>
                <span className="text-slate-600">Cualquier tipo de datos (No estructurados, texto libre, imágenes, logs de sistemas).</span>
              </div>
              <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50/50">
                <strong className="block text-slate-800 mb-1">✓ Usuarios Clave:</strong>
                <span className="text-slate-600">Científicos de Datos, Ingenieros de IA, Desarrolladores.</span>
              </div>
              <div className="border border-slate-100 p-3.5 rounded-xl bg-slate-50/50">
                <strong className="block text-slate-800 mb-1">✓ Costo:</strong>
                <span className="text-slate-600">Almacenamiento extremadamente barato a escala petabyte.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- RENDERING S1 T1.3: No estructurado ---
  if (sessionId === 's1' && topicIdx === 2) {
    return (
      <div className="mt-6 border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
        <div className="flex items-center space-x-2 mb-4">
          <Layers className="w-5 h-5 text-indigo-500" />
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Infografía Interactiva: Estructurando el Caos con LLM</h4>
        </div>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Selecciona un archivo no estructurado de ejemplo y presiona <strong>"Ejecutar Procesamiento de IA"</strong> para visualizar cómo los datos libres se mapean en un esquema JSON relacional y limpio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          {[
            { id: 'pdf', title: 'Ficha Técnica (PDF)', desc: 'Documento técnico con texto libre y rangos químicos.', color: 'border-red-200 bg-red-50 text-red-700' },
            { id: 'email', title: 'Correo de Cliente', desc: 'Mensaje quejándose sobre retraso en entrega.', color: 'border-blue-200 bg-blue-50 text-blue-700' },
            { id: 'audio', title: 'Transcripción Call Center', desc: 'Audio convertido a texto libre de soporte.', color: 'border-purple-200 bg-purple-50 text-purple-700' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setS1UnstructuredFile(item.id as any);
                setS1ProcessedResult(null);
              }}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                s1UnstructuredFile === item.id 
                  ? `${item.color} ring-2 ring-indigo-500/50 font-bold shadow-sm` 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <h5 className="text-xs font-bold mb-0.5">{item.title}</h5>
              <p className="text-[10px] text-slate-500 font-medium leading-tight">{item.desc}</p>
            </button>
          ))}
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-slate-100 flex flex-col md:flex-row items-stretch gap-6 relative overflow-hidden">
          {/* File Column */}
          <div className="flex-1 space-y-3">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              Documento Crudo de Entrada
            </span>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[120px] font-mono text-[11px] leading-relaxed text-slate-300">
              {s1UnstructuredFile === 'pdf' && (
                <p className="italic">
                  "El lote de miel silvestre cosechada el 15 de Noviembre de 2025 cumple con certificaciones vigentes IMO Control y cumple con estándares USDA Organic. Humedad analizada en laboratorio dio un valor de 17.4%. Identificador de bodega CL-MIE-8921..."
                </p>
              )}
              {s1UnstructuredFile === 'email' && (
                <p className="italic">
                  "Hola, escribo porque compré ayer con despacho express en Santiago y todavía no me llega el producto. Es una vergüenza, lo necesitaba para un regalo hoy en la mañana. Por favor quiero cancelar la compra si no llega en 1 hora..."
                </p>
              )}
              {s1UnstructuredFile === 'audio' && (
                <p className="italic">
                  "Operador: Buenas tardes le habla Juan. Cliente: Hola quería saber si el cupón de descuento que me llegó por SMS sirve para comprar online o solo en tienda física física... el código es DESCUENTO15..."
                </p>
              )}
            </div>
            
            <button
              disabled={s1IsProcessingFile}
              onClick={runS1TextProcessing}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              {s1IsProcessingFile ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Procesando Texto con LLM...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ejecutar Procesamiento de IA</span>
                </>
              )}
            </button>
          </div>

          {/* Transformation Indicator */}
          <div className="flex md:flex-col items-center justify-center text-indigo-500 shrink-0">
            <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0" />
          </div>

          {/* Clean JSON Column */}
          <div className="flex-1 space-y-3">
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider flex items-center">
              <Database className="w-3 h-3 mr-1" />
              Objeto JSON Estructurado para Base de Datos
            </span>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[120px] font-mono text-[11px] text-emerald-400 flex items-center justify-center">
              {s1IsProcessingFile ? (
                <div className="text-center space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-indigo-500 mx-auto" />
                  <span className="text-[10px] text-slate-500 block">Extrayendo llaves...</span>
                </div>
              ) : s1ProcessedResult ? (
                <pre className="w-full text-left leading-tight">
                  {JSON.stringify(s1ProcessedResult, null, 2)}
                </pre>
              ) : (
                <span className="text-slate-500 italic text-[11px] text-center">
                  Presiona el botón izquierdo para extraer metadatos estructurados.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING S2 T2.1: ETL vs ELT ---
  if (sessionId === 's2' && topicIdx === 0) {
    return (
      <div className="mt-6 space-y-6">
        {/* Video Explicativo: Proceso ETL */}
        <div className="border border-indigo-200/90 rounded-2xl p-6 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 pb-3 border-b border-indigo-100">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                    Video Explicativo: Proceso ETL en Acción
                  </h4>
                  <span className="hidden sm:inline-flex text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    MP4 HD
                  </span>
                </div>
                <p className="text-xs text-indigo-700 font-medium mt-0.5">
                  De datos dispersos a decisiones confiables en 3 etapas fundamentales
                </p>
              </div>
            </div>
            <span className="self-start md:self-auto text-[11px] font-bold text-indigo-700 bg-indigo-100/80 px-3.5 py-1 rounded-full border border-indigo-200 shrink-0">
              Recurso Didáctico de Sesión 2
            </span>
          </div>

          {/* Reproductor de Video */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 shadow-xl border border-slate-800/80">
            <video
              src="/assets/aistudio/proceso-etl_fb815ce8.mp4"
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-video object-contain bg-black"
            >
              Tu navegador no soporta la reproducción de video HTML5. Puedes ver el archivo directamente en <a href="/assets/aistudio/proceso-etl_fb815ce8.mp4" className="text-indigo-400 underline">este enlace</a>.
            </video>
          </div>

          {/* Desglose didáctico de las 3 fases ilustradas en el video */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-4 bg-white/90 rounded-xl border border-indigo-100 shadow-xs hover:border-indigo-300 transition-colors">
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
                  1
                </span>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Paso 1: Extraer</span>
              </div>
              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                Captura de registros desde múltiples fuentes heterogéneas (<strong>Ventas, Facturación y Web</strong>) sin interrumpir la operación transaccional.
              </p>
            </div>

            <div className="p-4 bg-white/90 rounded-xl border border-indigo-100 shadow-xs hover:border-indigo-300 transition-colors">
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Paso 2: Transformar</span>
              </div>
              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                <strong>Limpiar, unir y validar:</strong> eliminación de duplicados y vacíos, unificación a una sola vista y cumplimiento de reglas de negocio.
              </p>
            </div>

            <div className="p-4 bg-white/90 rounded-xl border border-indigo-100 shadow-xs hover:border-indigo-300 transition-colors">
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">
                  3
                </span>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Paso 3: Cargar</span>
              </div>
              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                Depósito en el destino analítico (<strong>Data Warehouse</strong>) para generar métricas consolidadas: <strong>ventas mensuales y KPIs</strong> para decidir.
              </p>
            </div>
          </div>
        </div>

        {/* Flujograma de Datos: Arquitectura ETL vs ELT */}
        <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Shuffle className="w-5 h-5 text-indigo-500" />
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Flujograma de Datos: Arquitectura ETL vs ELT</h4>
            </div>
            <div className="flex bg-slate-200 p-1 rounded-lg">
              <button
                onClick={() => {
                  setS2PipelineMode('etl');
                  setS2EtlStep(0);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                  s2PipelineMode === 'etl' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                ETL Tradicional
              </button>
              <button
                onClick={() => {
                  setS2PipelineMode('elt');
                  setS2EtlStep(0);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                  s2PipelineMode === 'elt' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                ELT Moderno (Cloud)
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Visualiza cómo viajan los datos y en qué etapa se realiza la transformación computacional de la información dependiendo del paradigma seleccionado.
          </p>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            {s2PipelineMode === 'etl' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                  {/* E */}
                  <div className={`p-4 rounded-xl border text-center transition-all ${s2EtlStep === 0 ? 'border-indigo-400 bg-indigo-50/50 shadow-sm' : 'border-slate-100 bg-slate-50'}`}>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">Fase 1</span>
                    <h5 className="font-extrabold text-xs text-slate-800 mt-1">E - Extraction</h5>
                    <p className="text-[10.5px] text-slate-500 mt-1">Se extrae el dato desde ERPs o APIs externas.</p>
                  </div>
                  {/* T */}
                  <div className={`p-4 rounded-xl border text-center transition-all ${s2EtlStep === 1 ? 'border-indigo-400 bg-indigo-50/50 shadow-sm' : 'border-slate-100 bg-slate-50'}`}>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">Fase 2 (Servidor ETL)</span>
                    <h5 className="font-extrabold text-xs text-slate-800 mt-1">T - Transformation</h5>
                    <p className="text-[10.5px] text-slate-500 mt-1">Limpieza y formateo en un servidor intermediario.</p>
                  </div>
                  {/* L */}
                  <div className={`p-4 rounded-xl border text-center transition-all ${s2EtlStep === 2 ? 'border-indigo-400 bg-indigo-50/50 shadow-sm' : 'border-slate-100 bg-slate-50'}`}>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">Fase 3</span>
                    <h5 className="font-extrabold text-xs text-slate-800 mt-1">L - Loading</h5>
                    <p className="text-[10.5px] text-slate-500 mt-1">Ingreso de datos ya limpios en la base final SQL.</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Inconveniente del ETL Tradicional:</strong> Requiere un servidor intermedio robusto y dedicado para procesar y transformar los datos antes de cargarlos. Si las transformaciones fallan, la carga se bloquea por completo.
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                  {/* E */}
                  <div className={`p-4 rounded-xl border text-center border-slate-100 bg-slate-50`}>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Fase 1</span>
                    <h5 className="font-extrabold text-xs text-slate-800 mt-1">E - Extraction</h5>
                    <p className="text-[10.5px] text-slate-500 mt-1">Se extraen los datos en bruto desde cualquier fuente origen.</p>
                  </div>
                  {/* L */}
                  <div className={`p-4 rounded-xl border text-center border-slate-100 bg-slate-50`}>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Fase 2 (Inmediata)</span>
                    <h5 className="font-extrabold text-xs text-slate-800 mt-1">L - Loading</h5>
                    <p className="text-[10.5px] text-slate-500 mt-1">Se cargan directamente crudos en un Data Lake / Cloud Warehouse.</p>
                  </div>
                  {/* T */}
                  <div className="p-4 rounded-xl border text-center border-emerald-400 bg-emerald-50/50 shadow-sm">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Fase 3 (Interna en Nube)</span>
                    <h5 className="font-extrabold text-xs text-slate-800 mt-1">T - Transformation</h5>
                    <p className="text-[10.5px] text-slate-500 mt-1">La potencia escalable de la nube (BigQuery) transforma los datos usando SQL interno.</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Ventaja del ELT Moderno:</strong> Es mucho más rápido de implementar. Almacenas primero todos los datos originales sin riesgo de perder detalles históricos, y transformas sólo lo necesario directamente en el almacén de datos de la nube.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING S2 T2.3: Batch vs Streaming ---
  if (sessionId === 's2' && topicIdx === 2) {
    return (
      <div className="mt-6 border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-indigo-500" />
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Simulador de Ingesta: Procesamiento Batch vs. Streaming</h4>
        </div>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Compara los dos grandes esquemas de procesamiento técnico. Puedes ver la latencia en acción simulando una ingesta continua (Streaming) o una carga periódica pesada (Batch).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Batch panel */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Procesamiento por Lotes</span>
              <h5 className="text-sm font-extrabold text-slate-800 mt-1 mb-2">Carga por Lote (Batch)</h5>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Los datos se acumulan (ej. transacciones del día) y se procesan juntos en un solo lote nocturno de alta demanda computacional.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Progreso de Lote Nocturno</span>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${s2BatchProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] text-slate-500 font-bold">{s2BatchProgress}% Completado</span>
                  <span className="text-[10px] text-indigo-600 font-bold">
                    {s2IsBatchRunning ? 'PROCESANDO...' : s2BatchProgress === 100 ? 'LOTE FINALIZADO' : 'INACTIVO'}
                  </span>
                </div>
              </div>

              <button
                disabled={s2IsBatchRunning}
                onClick={triggerBatchProcess}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-xs rounded-lg transition-all"
              >
                {s2IsBatchRunning ? 'Cargando Lote de Datos...' : 'Iniciar Carga de Lote Diaria'}
              </button>
            </div>
          </div>

          {/* Streaming panel */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Ingesta de Eventos en Vivo</span>
                {s2RunStream && (
                  <span className="flex items-center text-[10px] font-extrabold text-emerald-500 animate-pulse">
                    ● EN VIVO
                  </span>
                )}
              </div>
              <h5 className="text-sm font-extrabold text-slate-800 mt-1 mb-2">Procesamiento en Vivo (Streaming)</h5>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Cada evento se captura e integra al instante de nacer. Vital para seguridad, fraudes o alertas inmediatas de IoT.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[95px] font-mono text-[10.5px] text-emerald-400 space-y-1 overflow-hidden">
                {s2StreamPackets.length > 0 ? (
                  s2StreamPackets.map((packet) => (
                    <div key={packet.id} className="flex justify-between items-center border-b border-slate-900 pb-1">
                      <span>➔ Valor Recibido: <strong className="font-bold">{packet.value}°C</strong></span>
                      <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold ${
                        packet.type === 'ANOMALÍA' ? 'bg-red-500 text-white animate-bounce' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {packet.type}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 italic text-center py-6">
                    Presiona el botón de abajo para activar el flujo de eventos.
                  </div>
                )}
              </div>

              <button
                onClick={() => setS2RunStream(!s2RunStream)}
                className={`w-full py-2 font-bold text-xs rounded-lg transition-all ${
                  s2RunStream 
                    ? 'bg-red-600 hover:bg-red-500 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {s2RunStream ? 'Detener Transmisión de Eventos' : 'Simular Sensor en Streaming'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING S3 T3.1: Cognitive Load Dashboard ---
  if (sessionId === 's3' && topicIdx === 0) {
    return (
      <div className="mt-6 border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Layout className="w-5 h-5 text-indigo-500" />
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Infografía Interactiva: UX del Dashboard & Carga Cognitiva</h4>
          </div>
          <div className="flex bg-slate-200 p-1 rounded-lg">
            <button
              onClick={() => setS3DashboardType('bad')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                s3DashboardType === 'bad' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Dashboard Saturado (Mal diseño)
            </button>
            <button
              onClick={() => setS3DashboardType('good')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                s3DashboardType === 'good' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Dashboard Limpio (Diseño Eficaz)
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Compara cómo la disposición espacial de los elementos, el exceso de color y la saturación de datos reducen drásticamente la capacidad analítica y de decisión de un usuario.
        </p>

        {s3DashboardType === 'bad' ? (
          <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-sm">
            <div className="flex items-center space-x-2 text-red-600 mb-3">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Carga Cognitiva Crítica (Falla UX)</span>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              <strong>Problemas detectados:</strong> Hay demasiados colores compitiendo por la atención al mismo tiempo, sin jerarquía visual. La información secundaria está mezclada con los KPIs más importantes. El usuario no sabe dónde mirar primero (falla de patrón de lectura en Z).
            </p>

            {/* Simulated overloaded dashboard */}
            <div className="bg-slate-900 p-4 rounded-xl text-[10px] space-y-3 font-mono opacity-80 border border-slate-800">
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-red-500/20 border border-red-500 p-2 text-red-300">
                  <span>KPI-VENTAS-EST:</span>
                  <span className="block font-bold text-xs">$84,120 USD</span>
                </div>
                <div className="bg-purple-500/20 border border-purple-500 p-2 text-purple-300">
                  <span>CPU-SERVER-PING:</span>
                  <span className="block font-bold text-xs">12 ms</span>
                </div>
                <div className="bg-cyan-500/20 border border-cyan-500 p-2 text-cyan-300">
                  <span>CLICKS-HIST:</span>
                  <span className="block font-bold text-xs">2.4M</span>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500 p-2 text-yellow-300">
                  <span>PROCESSED-JOB:</span>
                  <span className="block font-bold text-xs">99.8%</span>
                </div>
              </div>
              <div className="h-24 bg-slate-950 border border-slate-800 rounded flex items-center justify-center relative">
                <span className="text-slate-500 absolute top-1 left-2 text-[8px]">LOGS TRANSACCIONALES DETALLADOS EN VIVO (Saturación)</span>
                <span className="text-red-400 text-center">45 líneas de código hex decimal fluyendo continuamente sin resúmenes...</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm">
            <div className="flex items-center space-x-2 text-emerald-600 mb-3">
              <Check className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Diseño Limpio enfocado en Acción</span>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              <strong>Beneficios:</strong> Se utiliza el patrón de lectura en Z. Se destacan únicamente las métricas que requieren que el negocio tome acción. Los colores neutros reducen la carga cognitiva y se usa el color brillante solo para anomalías graves.
            </p>

            {/* Simulated clean dashboard */}
            <div className="bg-slate-900 p-4 rounded-xl text-[10px] space-y-3 font-sans border border-slate-800">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Resumen de Operación Comercial</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[8px] font-bold px-2 py-0.5 rounded">Estado: Óptimo</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[9px] uppercase font-bold block mb-1">Ventas Q3</span>
                  <span className="text-sm font-bold text-slate-100">$84,120 USD</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[9px] uppercase font-bold block mb-1">Tasa Conversión</span>
                  <span className="text-sm font-bold text-emerald-400">3.4% (+0.2%)</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[9px] uppercase font-bold block mb-1">Satisfacción</span>
                  <span className="text-sm font-bold text-slate-100">96.8%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- RENDERING S4 T4.3: IoT End-to-End ---
  if (sessionId === 's4' && topicIdx === 2) {
    return (
      <div className="mt-6 border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="w-5 h-5 text-indigo-500" />
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Flujograma End-to-End: Del Sensor Físico al Dashboard de Monitoreo</h4>
        </div>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Haz clic en <strong>"Simular Lectura de Sensor"</strong> para enviar un paquete de temperatura en tiempo real y ver cómo viaja por cada capa técnica de la infraestructura distribuida.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Capa 1: Sensor */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Capa 1: Sensor IoT</span>
              <h5 className="font-bold text-xs text-slate-800 mt-1 mb-2">Medición de Motor</h5>
              <div className="text-center py-3 bg-slate-50 rounded-lg border border-slate-100 mb-2">
                <span className="block text-xs font-bold text-slate-500 uppercase">Temperatura</span>
                <span className={`block text-xl font-extrabold tracking-tight ${s4SensorTemp > 110 ? 'text-red-600 animate-pulse' : 'text-indigo-600'}`}>
                  {s4SensorTemp}°C
                </span>
              </div>
            </div>
            <button
              disabled={s4IsSending}
              onClick={triggerSensorEmission}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] rounded-lg transition-all flex items-center justify-center space-x-1"
            >
              {s4IsSending ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  <span>Simular Lectura</span>
                </>
              )}
            </button>
          </div>

          {/* Capa 2: Broker */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Capa 2: Broker</span>
              <h5 className="font-bold text-xs text-slate-800 mt-1 mb-2">Kafka / PubSub</h5>
              <p className="text-[10px] text-slate-500 leading-normal mb-3">Encola y asegura la entrega de eventos masivos de forma inmutable.</p>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[9px] text-indigo-400 space-y-1 min-h-[60px]">
              {s4BrokerQueue.length > 0 ? (
                s4BrokerQueue.map((ev) => (
                  <div key={ev.id} className="border-b border-slate-900 pb-0.5">
                    <span>Temp: {ev.temp}°C ({ev.timestamp})</span>
                  </div>
                ))
              ) : (
                <span className="text-slate-600 italic block text-center pt-3">Cola vacía</span>
              )}
            </div>
          </div>

          {/* Capa 3: Stream Processor */}
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Capa 3: Procesamiento</span>
            <h5 className="font-bold text-xs text-slate-800 mt-1 mb-2">Motor de Stream (Flink)</h5>
            <p className="text-[10px] text-slate-500 leading-normal mb-3">Evalúa reglas de negocio e identifica anomalías complejas sobre la marcha.</p>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[10px] text-slate-700 font-medium">
              <span className="font-bold text-indigo-600 block mb-0.5">Regla de Alerta</span>
              Si temp &gt; 110°C emitir flag crítico de inmediato.
            </div>
          </div>

          {/* Capa 4: Dashboard Vivos */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Capa 4: Presentación</span>
              <h5 className="font-bold text-xs text-slate-800 mt-1 mb-2">Websockets & UI</h5>
              <p className="text-[10px] text-slate-500 leading-normal mb-3">Empuja alertas instantáneas al operador sin requerir actualización manual de pantalla.</p>
            </div>
            <div className={`p-3 rounded-lg text-center font-bold text-xs border ${
              s4SensorTemp > 110 
                ? 'bg-red-500/20 border-red-500 text-red-700 animate-pulse' 
                : 'bg-emerald-500/20 border-emerald-500 text-emerald-700'
            }`}>
              {s4SensorTemp > 110 ? '🔴 MOTOR RECALENTADO' : '🟢 ESTADO ÓPTIMO'}
            </div>
          </div>
        </div>

        {/* Live system logs console */}
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-slate-300 font-mono text-[10.5px]">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-2 mb-2 flex items-center">
            <Sliders className="w-3.5 h-3.5 mr-1 text-indigo-500" />
            Consola del Sistema End-to-End
          </span>
          <div className="space-y-1">
            {s4PipelineLog.map((log, idx) => (
              <div key={idx} className="flex space-x-2">
                <span className="text-slate-600 shrink-0">[{idx}]</span>
                <span className={log.includes('ALERTA') || log.includes('RECALENTADO') ? 'text-red-400 font-bold' : 'text-emerald-400'}>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING S5 T5.1: Repaso 4 pilares ---
  if (sessionId === 's5' && topicIdx === 0) {
    return (
      <div className="mt-6 border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
        <div className="flex items-center space-x-2 mb-4">
          <Layers className="w-5 h-5 text-indigo-500" />
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Infografía Síntesis: Integración de los 4 Pilares de Datos</h4>
        </div>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Un producto de datos profesional no opera de forma aislada. Mira cómo interactúan e integran sus componentes en la arquitectura unificada de negocio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-blue-200 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <h5 className="font-extrabold text-blue-700 mb-1">1. Ingesta Continua</h5>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Captura datos crudos de sensores, clicks, o APIs. Conecta fuentes externas con scripts robustos de ETL o ELT en tiempo real.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-indigo-200 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
            <h5 className="font-extrabold text-indigo-700 mb-1">2. Almacenamiento</h5>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Los datos se almacenan en lagos masivos (Data Lake) para flexibilidad, o en almacenes de alto rendimiento (Data Warehouse) para reportería estructurada SQL.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-purple-200 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-50" />
            <h5 className="font-extrabold text-purple-700 mb-1">3. Inteligencia & LLMs</h5>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Agentes de IA procesan el texto no estructurado, limpian duplicados, estiman predicciones y catalogan metadatos clave para búsquedas automáticas.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-50" />
            <h5 className="font-extrabold text-emerald-700 mb-1">4. Storytelling & UI</h5>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Dashboard interactivo que reduce la carga cognitiva, aplicando el patrón de lectura en Z para alertar al gerente sobre desvíos críticos y KPIs reales del negocio.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for topics that don't have a specific interactive widget
  return null;
}
