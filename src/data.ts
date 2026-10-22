import { ModuleRecap, Session, ToolReference } from './types';

export const RECAP_DATA: ModuleRecap[] = [
  {
    id: "mod1",
    title: "Módulo 1: APIs, LangChain y RAG",
    keyConcept: "Memoria y Contexto para la IA",
    sessions: [
      "¿Qué es una API?: Es el 'enchufe' para conectar tu aplicación a la IA.",
      "LangChain: El director de orquesta que automatiza múltiples pasos.",
      "RAG (Retrieval-Augmented Generation): Enseñar a la IA a leer tus propios documentos antes de responder."
    ]
  },
  {
    id: "mod2",
    title: "Módulo 2: Blockchain y Web3",
    keyConcept: "Registros Seguros e Imborrables",
    sessions: [
      "Blockchain: Un gran libro de contabilidad digital que nadie puede alterar ni falsificar.",
      "Smart Contracts: Contratos automáticos que se ejecutan solos bajo ciertas reglas.",
      "Web3: La nueva internet donde los usuarios son verdaderos dueños de su información."
    ]
  },
  {
    id: "mod3",
    title: "Módulo 3: Casos de Negocio",
    keyConcept: "IA y Blockchain en el Mundo Real",
    sessions: [
      "Trazabilidad: Seguir un producto desde su origen hasta el cliente final (ej. envíos).",
      "Transparencia: Prevención de fraudes en logística, salud y energía.",
      "Unión Perfecta: La IA analiza inteligentemente los datos que Blockchain guarda de forma segura."
    ]
  }
];

export const TOOLS: Record<string, ToolReference> = {
  gemini: {
    name: "Google Gemini",
    url: "https://gemini.google.com/",
    description: "Modelo multimodal avanzado de Google, ideal para tareas generales y complejas.",
    useCase: "Generación de código para visualizaciones (D3/Recharts) y estructuración analítica rápida."
  },
  claude: {
    name: "Anthropic Claude",
    url: "https://claude.ai/",
    description: "LLM destacado por su enorme ventana de contexto y capacidad de razonamiento lógico.",
    useCase: "Análisis profundo de datasets masivos y diseño de arquitecturas de datos complejas."
  },
  chatgpt: {
    name: "OpenAI ChatGPT",
    url: "https://chat.openai.com/",
    description: "Asistente conversacional con capacidades de Advanced Data Analysis.",
    useCase: "Creación de scripts ETL, limpieza de datos y generación de datos sintéticos para simulación."
  },
  notebooklm: {
    name: "Google NotebookLM",
    url: "https://notebooklm.google.com/",
    description: "Asistente de investigación personalizado fundamentado en tus propios documentos.",
    useCase: "Sintetizar grandes volúmenes de reportes, manuales técnicos y generar resúmenes ejecutivos."
  },
  perplexity: {
    name: "Perplexity AI",
    url: "https://www.perplexity.ai/",
    description: "Motor de búsqueda conversacional fundamentado en fuentes web y académicas.",
    useCase: "Investigación de estado del arte, búsqueda de fuentes académicas y validación de arquitecturas reales."
  }
};

export const SESSIONS_DATA: Session[] = [
  {
    id: "s1",
    date: "Martes 20 de octubre de 2026, en horario 19:00 a 22:00 hrs.",
    title: "Minería y almacenamiento de datos a gran escala",
    hours: 3,
    theory: {
      title: "Fundamentos de Datos Masivos",
      points: [
        {
          title: "Tema 1.1: El ciclo de vida del dato moderno y su impacto en el negocio.",
          details: [
            "Creación e Ingesta: ¿De dónde vienen los datos hoy? (IoT, Redes Sociales, Sistemas Transaccionales). | ¿Por qué? Para entender el origen. ¿Para qué? Para capturar la información en su fuente original.",
            "Almacenamiento y Procesamiento: Cómo mantener los datos seguros, accesibles y limpios. | ¿Por qué? Los datos crudos suelen contener errores. ¿Para qué? Para garantizar calidad y disponibilidad continua.",
            "Consumo y Análisis: Transformar datos crudos en decisiones de negocio (Dashboards, APIs, Modelos Predictivos). | ¿Por qué? El dato en sí no tiene valor sin interpretación. ¿Para qué? Para tomar decisiones informadas y estratégicas.",
            "Impacto real: Empresas basadas en datos vs. empresas tradicionales. Cómo la información reduce la incertidumbre comercial. | ¿Por qué? Evidencia la necesidad de transformación digital. ¿Para qué? Para ganar ventaja competitiva en el mercado."
          ]
        },
        {
          title: "Tema 1.2: ¿Dónde guardamos tanta información? (Data Lakes vs Data Warehouses).",
          details: [
            "Bases de Datos Relacionales (SQL): Excelentes para transacciones estructuradas (ej. cuentas bancarias), pero rígidas. Ejemplos: PostgreSQL, MySQL, Oracle. | ¿Por qué? Requieren consistencia absoluta (ACID). ¿Para qué? Para operaciones financieras y registros exactos.",
            "Data Warehouses: Almacenes optimizados para consultas analíticas rápidas sobre datos históricos y estructurados. Ejemplos: Google BigQuery, Amazon Redshift, Snowflake. | ¿Por qué? SQL tradicional colapsa con analítica pesada. ¿Para qué? Para generar reportes corporativos consolidados.",
            "Data Lakes: Repositorios inmensos que guardan datos en su formato nativo (crudo), ideales para Machine Learning y exploración. Ejemplos: Amazon S3, Google Cloud Storage, Azure Data Lake. | ¿Por qué? Estructurar todo por adelantado es lento y caro. ¿Para qué? Para guardar flexibilidad y entrenar modelos de IA.",
            "Arquitectura Híbrida (Lakehouse): Lo mejor de ambos mundos, combinando la flexibilidad del lago con el rendimiento del almacén. Ejemplos: Databricks. | ¿Por qué? Rompe los silos entre equipos de datos. ¿Para qué? Para simplificar la infraestructura y acelerar el análisis."
          ]
        },
        {
          title: "Tema 1.3: El gran desafío de los datos no estructurados (texto libre, PDFs, imágenes).",
          details: [
            "El 80% de los datos empresariales son no estructurados: Correos electrónicos, reseñas de clientes, manuales en PDF, audios de call center. | ¿Por qué? Reflejan la comunicación humana natural. ¿Para qué? Para extraer valor oculto en interacciones diarias.",
            "Dificultad de análisis tradicional: Un motor SQL no puede 'leer' la emoción en una queja escrita. | ¿Por qué? Carecen de un esquema de columnas definido. ¿Para qué? Para evidenciar la necesidad de nuevas tecnologías como NLP.",
            "El problema del almacenamiento masivo: Archivos pesados que requieren metadatos inteligentes para poder ser encontrados luego. | ¿Por qué? Buscar en texto completo es computacionalmente inviable a gran escala. ¿Para qué? Para catalogar y recuperar documentos eficientemente."
          ]
        },
        {
          title: "Tema 1.4: El rol clave de la IA Generativa en la extracción y limpieza masiva.",
          details: [
            "Procesamiento de Lenguaje Natural (NLP) avanzado: Los LLMs (como Claude o GPT) pueden leer miles de PDFs y extraer campos específicos (ej. montos, nombres, fechas). | ¿Por qué? Automatiza la lectura humana. ¿Para qué? Para convertir texto plano en datos tabulares usables.",
            "Clasificación automática: Asignar categorías, detectar sentimientos o identificar urgencias en texto libre. | ¿Por qué? Permite escalar el soporte y análisis. ¿Para qué? Para enrutar tickets, alertas o priorizar atenciones al cliente.",
            "Data Augmentation y Limpieza: La IA puede inferir datos faltantes, estandarizar formatos (ej. fechas, direcciones) y preparar la data para el almacenamiento estructurado. | ¿Por qué? La data real siempre viene sucia. ¿Para qué? Para asegurar que los sistemas downstream reciban datos impecables."
          ]
        }
      ]
    },
    practice: {
      title: "Laboratorio: Estructuración Inteligente",
      description: "Analizar y estructurar un gran volumen de información desordenada utilizando IA para prepararla para su almacenamiento.",
      scenario: "Una empresa de retail chilena tiene miles de reseñas de texto libre y PDFs de reportes mensuales que necesitan ser clasificados y estructurados en formato JSON/CSV.",
      realExample: {
        context: "Caso similar a Falabella procesando feedback de despachos.",
        problem: "15,000 comentarios mensuales en texto libre ('llegó tarde', 'el empaque roto') imposibles de tabular a mano.",
        solution: "Uso de un LLM para leer cada reseña, extraer 'Sentimiento' (Positivo/Negativo), 'Categoría' (Logística/Producto) y 'Urgencia' (Alta/Baja), guardándolo en una base de datos estructurada."
      },
      teacherExplanation: "Esta sección sirve para demostrar cómo la Inteligencia Artificial nos permite estructurar datos que antes requerían lectura humana manual. Les mostramos a los alumnos que, sin escribir código, podemos convertir texto desordenado en un formato organizado (como una tabla) listo para ser analizado, ahorrando horas de trabajo administrativo.",
      steps: [
        "Abrir Claude o ChatGPT y asignar el rol ('Eres un analista de datos experto en retail').",
        "Proveer 5 ejemplos manuales de cómo quieres que se categoricen las reseñas (Few-Shot Prompting).",
        "Pegar un lote de 20 reseñas de prueba y pedirle que genere el resultado en formato JSON estricto.",
        "Validar que el JSON generado contenga las llaves 'sentimiento', 'categoria' y 'urgencia' correctamente mapeadas."
      ],
      toolsUsed: ["perplexity", "notebooklm", "claude"]
    }
  },
  {
    id: "s2",
    date: "Jueves 22 de octubre de 2026, en horario 19:00 a 22:00 hrs.",
    title: "Tecnologías de ingesta de datos",
    hours: 3,
    theory: {
      title: "Arquitecturas de Ingesta",
      points: [
        {
          title: "Tema 2.1: ¿Cómo viajan los datos? Conceptos de ETL (Extraer, Transformar, Cargar).",
          details: [
            "Extraer: Conectarse a la fuente origen (Bases de datos antiguas, SaaS, archivos planos) sin impactar su rendimiento. | ¿Por qué? Los datos nacen aislados en distintos sistemas. ¿Para qué? Para centralizarlos sin romper la operación diaria.",
            "Transformar: Limpiar, filtrar, enriquecer y convertir los datos a un formato estándar. (El paso más costoso computacionalmente). | ¿Por qué? Cada sistema habla un 'idioma' de datos diferente. ¿Para qué? Para homologar la información y hacerla comparable.",
            "Cargar: Insertar los datos procesados en el destino final (Data Warehouse o Data Lake). | ¿Por qué? Se necesita un lugar único de la verdad. ¿Para qué? Para que analistas y modelos consulten un solo repositorio.",
            "Paradigma moderno (ELT): Extraer y cargar crudo, dejando que la potencia de la nube transforme los datos internamente. | ¿Por qué? El almacenamiento en la nube es ahora barato y masivo. ¿Para qué? Para agilizar la ingesta y no perder datos en transformaciones tempranas.",
            "Nota: Diferencias clave frente a un CSV (Parquet vs CSV). | Estructura: Binario/Columnas (Parquet) vs Texto plano/Filas (CSV). Tamaño: Muy compacto (Parquet) vs Pesado (CSV). Legibilidad: Requiere herramientas (Parquet) vs Bloc de notas/Excel (CSV). Rendimiento: Ideal para Big Data (Parquet) vs Lento (CSV)."
          ]
        },
        {
          title: "Tema 2.2: Conectando fuentes externas mediante APIs y Scraping automatizado.",
          details: [
            "¿Qué es una API REST?: Interfaces estandarizadas que permiten a los sistemas hablar entre sí usando protocolos web (HTTP). | ¿Por qué? Es el estándar universal de la web. ¿Para qué? Para integrar servicios externos de forma segura y controlada.",
            "Web Scraping: Técnicas para extraer información de sitios web que no ofrecen APIs, útil para inteligencia competitiva (ej. precios de mercado). | ¿Por qué? No todos los datos públicos tienen un acceso programático fácil. ¿Para qué? Para recopilar datos estratégicos que la competencia muestra online.",
            "Manejo de rate limits, autenticación (Tokens/OAuth) y paginación al consumir APIs masivas. | ¿Por qué? Los servidores protegen sus recursos de abusos. ¿Para qué? Para crear conexiones estables que no bloqueen nuestra ingesta."
          ]
        },
        {
          title: "Tema 2.3: Procesamiento por lotes (Batch) vs. Procesamiento en vivo (Streaming).",
          details: [
            "Procesamiento Batch: Los datos se recolectan durante un periodo y se procesan todos juntos (ej. cierre contable nocturno). | ¿Por qué? Optimiza recursos cuando la inmediatez no es requerida. ¿Para qué? Para reportes diarios, facturación mensual o cálculos históricos pesados.",
            "Procesamiento Streaming: Cada dato se procesa individualmente en el instante en que se genera (ej. detección de fraudes con tarjetas de crédito). | ¿Por qué? El valor del dato decae rápidamente en segundos. ¿Para qué? Para reaccionar instantáneamente ante anomalías o eventos críticos.",
            "Cuándo usar cuál: Batch es más barato y fácil de mantener; Streaming es vital cuando la latencia cuesta dinero o vidas. | ¿Por qué? El diseño arquitectónico dicta el costo mensual. ¿Para qué? Para balancear presupuesto vs. necesidades reales del negocio."
          ]
        },
        {
          title: "Tema 2.4: IA Generativa como herramienta directa de ETL (Sin Código).",
          details: [
            "Extracción directa de documentos: Subir PDFs, imágenes o textos desordenados a modelos como ChatGPT o Claude para extraer tablas y datos específicos. | ¿Por qué? Elimina la barrera técnica de programar integraciones. ¿Para qué? Para democratizar el acceso a la extracción de datos.",
            "Transformación con lenguaje natural: Pedirle al LLM que limpie formatos (ej. 'cambia las fechas a DD/MM/AAAA' o 'homologa las categorías'). | ¿Por qué? Las reglas de limpieza manuales son tediosas en Excel. ¿Para qué? Para estandarizar datos rápidamente conversando con la IA.",
            "Carga y exportación: Generar el resultado final limpio en formato de tabla o descargable (CSV/Excel) directamente desde el chat. | ¿Por qué? Permite usar los datos inmediatamente. ¿Para qué? Para conectar la salida de la IA con el flujo de trabajo habitual de los usuarios."
          ]
        }
      ]
    },
    practice: {
      title: "Laboratorio: ETL con IA Generativa sin programar",
      description: "Usar un LLM conversacional para extraer, transformar y estructurar datos directamente desde documentos desordenados.",
      scenario: "Tenemos una serie de rendiciones de gastos en texto desordenado o recibos sueltos, y necesitamos consolidarlos en una tabla contable limpia.",
      realExample: {
        context: "Caso similar a la rendición mensual de gastos comerciales.",
        problem: "El equipo entrega facturas en PDF o textos sueltos por WhatsApp, obligando a las áreas administrativas a digitar y limpiar los datos manualmente.",
        solution: "Subir los documentos a ChatGPT o Claude, pidiéndole que actúe como un extractor de datos para generar automáticamente un archivo Excel estructurado."
      },
      teacherExplanation: "La lógica de este laboratorio es que vean que el proceso de ETL (Extraer, Transformar y Cargar) ya no es exclusivo de ingenieros. Con un simple chat podemos sacar datos de una factura (Extraer), pedirle que limpie los símbolos (Transformar) y entregarlo en un Excel (Cargar). El objetivo es desmitificar la preparación de datos.",
      steps: [
        "Abrir ChatGPT o Claude y proporcionar un texto simulado de gastos (ej. un mail desordenado con compras de la semana).",
        "Darle la instrucción: 'Actúa como asistente de datos. Extrae de este texto la Fecha, el Comercio y el Monto gastado'.",
        "Aplicar una transformación: 'Asegúrate de que todos los montos vengan sin símbolos y las fechas en formato DD/MM/AAAA'.",
        "Solicitar el entregable: 'Muéstrame el resultado como una tabla y, si es posible, genera un archivo CSV/Excel para descargarlo'."
      ],
      toolsUsed: ["chatgpt", "claude"]
    }
  },
  {
    id: "s3",
    date: "Martes 27 de octubre de 2026, en horario 19:00 a 22:00 hrs.",
    title: "Visualización avanzada",
    hours: 3,
    theory: {
      title: "Storytelling Analítico",
      points: [
        {
          title: "Tema 3.1: Principios de diseño de dashboards efectivos: Menos es más.",
          details: [
            "Carga Cognitiva: La mente humana solo puede procesar una cantidad limitada de información a la vez. Evitar el desorden visual. | ¿Por qué? Demasiada información paraliza al tomador de decisión. ¿Para qué? Para facilitar una lectura intuitiva e inmediata del tablero.",
            "Ley de la Proximidad y Contraste: Agrupar métricas relacionadas y usar el color solo para destacar anomalías, no para decorar. | ¿Por qué? Nuestro cerebro busca patrones visuales instintivamente. ¿Para qué? Para que las alertas o problemas resalten sin esfuerzo.",
            "El patrón 'Z' y 'F': Cómo lee el ojo humano en pantallas occidentales. Ubicar la información más importante arriba a la izquierda. | ¿Por qué? Seguimos un hábito de lectura cultural. ¿Para qué? Para asegurar que los KPIs vitales se vean en el primer segundo."
          ]
        },
        {
          title: "Tema 3.2: KPIs accionables y útiles vs. Métricas engañosas (Métricas de vanidad).",
          details: [
            "Métricas de Vanidad: Números que siempre suben pero no reflejan salud del negocio (ej. 'Total de descargas históricas' o 'Visitas a la página'). | ¿Por qué? Dan una falsa sensación de éxito. ¿Para qué? Para identificar qué evitar medir en reportes serios.",
            "KPIs Accionables: Métricas que, al cambiar, obligan a tomar una decisión (ej. 'Costo de Adquisición de Cliente', 'Tasa de Abandono'). | ¿Por qué? Impulsan la mejora continua. ¿Para qué? Para ejecutar estrategias de corrección inmediatas.",
            "Alineación estratégica: Cada gráfico en un dashboard debe responder a una pregunta de negocio específica. | ¿Por qué? Los tableros sin propósito son ignorados. ¿Para qué? Para que el dashboard sea una herramienta diaria indispensable."
          ]
        },
        {
          title: "Tema 3.3: De los datos a la decisión: Cómo contar la historia correcta (Storytelling).",
          details: [
            "El arco narrativo de los datos: Contexto (qué pasó), Conflicto (por qué es un problema), Resolución (qué debemos hacer). | ¿Por qué? Los humanos conectan mejor con historias que con tablas. ¿Para qué? Para convencer e influir a la audiencia directiva.",
            "Uso de títulos asertivos: Cambiar 'Ventas Q3' por 'Las ventas cayeron un 15% en Q3 debido a problemas logísticos'. | ¿Por qué? El título es lo más leído de un gráfico. ¿Para qué? Para entregar el insight principal incluso si no se lee el detalle.",
            "Anotaciones y llamadas de atención: Guiar al usuario directamente hacia la conclusión importante dentro del gráfico. | ¿Por qué? Los picos o valles de un gráfico requieren contexto de negocio. ¿Para qué? Para explicar eventos anómalos de forma explícita."
          ]
        },
        {
          title: "Tema 3.4: Uso de IA Generativa para programar componentes visuales interactivos rápidamente.",
          details: [
            "Del texto al gráfico: Cómo usar Gemini o Claude para generar código frontend (React, D3.js, Recharts, Chart.js) a partir de una descripción natural. | ¿Por qué? Codificar gráficos complejos manualmente es propenso a errores. ¿Para qué? Para iterar rápidamente sobre distintas visualizaciones visuales.",
            "Análisis visual automatizado: Pasar un CSV a la IA para que sugiera el tipo de gráfico ideal (dispersión, barras, líneas) según la naturaleza de los datos. | ¿Por qué? Cada tipo de relación requiere un gráfico específico. ¿Para qué? Para evitar distorsionar la interpretación de los datos (ej. usar un pie chart para evolución temporal).",
            "Accesibilidad y Paletas: Pedir a la IA generar paletas de colores inclusivas para daltonismo y alto contraste. | ¿Por qué? Un porcentaje de usuarios sufre de condiciones visuales. ¿Para qué? Para garantizar que todos puedan interpretar los reportes sin barreras."
          ]
        }
      ]
    },
    practice: {
      title: "Laboratorio: Visualización de Datos y Análisis Visual con IA (Sin Código)",
      description: "Crear reportes y componentes visuales interactivos utilizando la capacidad de análisis de datos de modelos generativos.",
      scenario: "El equipo directivo necesita visualizar el rendimiento de ventas regionales de inmediato para tomar decisiones estratégicas.",
      realExample: {
        context: "Caso similar a la visualización de cumplimiento de metas por tienda en un supermercado.",
        problem: "Los reportes en Excel de 20 páginas nadie los lee; los gerentes necesitan ver de un vistazo qué tiendas van perdiendo.",
        solution: "Un dashboard o gráfico interactivo generado directamente en el chat por la IA, destacando en rojo los locales con problemas, acompañado de un resumen ejecutivo."
      },
      teacherExplanation: "El objetivo de este ejercicio es evidenciar que no dependemos de complejas herramientas de BI (como PowerBI o Tableau) para análisis rápidos. La IA procesa el Excel directamente, dibuja el gráfico e interpreta los números (storytelling). Esto empodera a cualquier rol a generar sus reportes visuales en segundos.",
      steps: [
        "Subir un archivo Excel/CSV con datos de ventas a ChatGPT (usando Advanced Data Analysis) o Claude.",
        "Copiar y pegar el Prompt de KPI de ventas para procesar la planilla y calcular el % de cumplimiento por sucursal.",
        "Generar la visualización con resaltado de sucursales críticas (< 80%) y la minuta ejecutiva dirigida al Gerente Comercial."
      ],
      toolsUsed: ["chatgpt", "claude"]
    }
  },
  {
    id: "s4",
    date: "Jueves 29 de octubre de 2026, en horario 19:00 a 22:00 hrs.",
    title: "Agentes de IA Generativa en Tiempo Real y Stream de Datos",
    hours: 3,
    theory: {
      title: "IA Generativa y el Ecosistema en Tiempo Real",
      points: [
        {
          title: "Tema 4.1: ¿Qué aporta la IA Generativa al Procesamiento en Tiempo Real?",
          details: [
            "De condicionales estáticos a comprensión semántica en vivo: La IA generativa no solo verifica si un valor supera un límite, interpreta el contexto del evento, mensajes de clientes o logs de error en tiempo real. | ¿Por qué? El contexto permite distinguir anomalías reales de falsas alarmas. ¿Para qué? Para razonar sobre problemas complejos al instante.",
            "Razonamiento y síntesis continua: Modelos generativos procesando flujos vivos para emitir diagnósticos explicativos en lenguaje humano en segundos. | ¿Por qué? Un número no explica la causa raíz. ¿Para qué? Para que el operador comprenda qué ocurre sin revisar miles de líneas de log.",
            "Casos de uso de IA Generativa en streaming: Asistentes de soporte en vivo con sugerencias en tiempo real, monitoreo conversacional de seguridad e inspección predictiva en terreno. | ¿Por qué? Maximiza la velocidad de respuesta del negocio. ¿Para qué? Para convertir datos en vivo en decisiones instantáneas."
          ]
        },
        {
          title: "Tema 4.2: Redis y Redis Iris como Capa Intermedia para Agentes de IA",
          details: [
            "Redis como base de datos en memoria: Una base de datos ultrarrápida diseñada para gestionar grandes volúmenes de eventos por segundo (sensores o transacciones). | ¿Por qué? Las bases tradicionales son lentas para latencias de milisegundos. ¿Para qué? Actúa como una 'cinta transportadora' que entrega datos en tiempo real al agente.",
            "Redis Iris y Context Retriever: Permite buscar y recuperar al instante los datos más relevantes (estructurados y no estructurados) mediante búsqueda vectorial. | ¿Por qué? Entrega contexto preciso mediante búsqueda semántica rápida, reduciendo el consumo excesivo de tokens. ¿Para qué? Garantiza que el modelo trabaje siempre con información fresca y sincronizada.",
            "Redis Agent Memory: Gestiona tanto la memoria a corto plazo (hilo de conversación) como a largo plazo (preferencias y atributos persistentes). | ¿Por qué? Los agentes suelen perder el historial. ¿Para qué? Para que los agentes mantengan coherencia entre múltiples sesiones e interacciones.",
            "Gobernanza y Esquemas Seguros: En lugar de consultas directas (Text-to-SQL), expone entidades y reglas de acceso controladas. | ¿Por qué? Evita riesgos de seguridad y exposición de datos sensibles. ¿Para qué? Aplica filtros a nivel de servidor según los permisos del agente, integrando LangCache, Redis Search y Data Integration."
          ]
        },
        {
          title: "Tema 4.3: Arquitecturas de Eventos impulsadas por IA Generativa (Event-Driven GenAI).",
          details: [
            "El Evento como disparador de Inferencia (Trigger): Cada mensaje, log o lectura de sensor activa un prompt o micro-agente generativo. | ¿Por qué? Desacopla la captura del procesamiento inteligente. ¿Para qué? Para escalar la capacidad de análisis según el volumen de eventos.",
            "Agentes Autónomos Asíncronos: Agentes generativos consumiendo flujos de eventos, evaluando el contexto histórico y redactando minutas automáticas. | ¿Por qué? Automatiza la supervisión continua sin fatigar a los equipos. ¿Para qué? Para mantener vigilancia las 24 horas con respuestas coherentes.",
            "Streaming de Tokens (LLM Streaming): Entrega de respuestas token por token (WebSockets / Server-Sent Events) para latencia ultrabaja en tableros. | ¿Por qué? Esperar la generación completa aumenta la percepción de lentitud. ¿Para qué? Para mostrar recomendaciones vivas en el instante en que se generan."
          ]
        },
        {
          title: "Tema 4.4: Apache Flink como Motor de Procesamiento",
          details: [
            "Procesamiento distribuido con estado: Framework de código abierto diseñado para realizar cálculos sobre flujos de datos acotados (batch) y no acotados (streaming). | ¿Por qué? Se necesita unificar el manejo de eventos en tiempo real e históricos. ¿Para qué? Para procesar y analizar grandes volúmenes de datos a altísima velocidad.",
            "Garantía Exactly-Once y Tolerancia a Fallos: Mecanismo de puntos de control (checkpoints) que asegura que ningún evento se pierda o procese dos veces. | ¿Por qué? En analítica de misión crítica no pueden haber datos duplicados ni faltantes. ¿Para qué? Para recuperarse de fallos sin perder información ni interrumpir la aplicación.",
            "Procesamiento basado en el Tiempo de Evento (Event-time): Procesa los datos según el momento exacto en que ocurrió el evento, no cuando llegó al sistema. | ¿Por qué? Los datos en red pueden sufrir retrasos y llegar desordenados. ¿Para qué? Para manejar datos tardíos con elegancia en tableros y sistemas de alerta.",
            "Casos de uso y APIs (SQL, DataStream): Detección de fraudes, alertas inteligentes y ETL en vivo usando SQL/Table API o DataStream API. | ¿Por qué? Ofrece distintos niveles de abstracción según el perfil del desarrollador. ¿Para qué? Para transformar y mover datos entre sistemas (ej. Kafka a Bases de Datos) en tiempo real."
          ]
        },
        {
          title: "Tema 4.5: Conexión End-to-End: Del Stream de Datos al Agente Generativo y Tablero Ejecutivo.",
          details: [
            "Ingesta y transmisión continua: Entrada en vivo de logs, llamadas de voz o eventos operativos hacia el broker de streaming. | ¿Por qué? Captura la realidad operativa sin demoras. ¿Para qué? Para no perder eventos críticos durante picos de actividad.",
            "Capa de Inteligencia Generativa (GenAI Layer): Un LLM orquestado procesa el evento, deduce la causa raíz y genera el plan de acción sugerido. | ¿Por qué? Transforma datos crudos en conocimiento accionable. ¿Para qué? Para reducir el tiempo de resolución de incidentes (MTTR).",
            "Visualización viva y minutas automáticas: Paneles que reciben la salida generativa y presentan alertas coloreadas junto con resúmenes ejecutivos listos para enviar. | ¿Por qué? Facilita la toma de decisiones directiva en momentos de crisis. ¿Para qué? Para comunicar el estado del sistema en lenguaje humano."
          ]
        },
        {
          title: "Tema 4.6: Monitoreo Inteligente, Alertas Narrativas y Protocolos Generativos Automáticos.",
          details: [
            "De alertas crípticas a explicaciones narrativas: La IA Generativa traduce un 'ErrorCode 504' o 'Temp 115°C' en un diagnóstico claro sobre la falla en el motor o sistema. | ¿Por qué? Los operadores en terreno necesitan instrucciones directas. ¿Para qué? Para acelerar la respuesta operativa.",
            "Reducción semántica de fatiga de alertas: Agrupación y síntesis inteligente de ráfagas de miles de logs repetidos en un único informe ejecutivo. | ¿Por qué? Las alertas repetitivas hacen que los humanos las ignoren. ¿Para qué? Para resaltar solo lo verdaderamente importante.",
            "Generación automática de protocolos de emergencia: Creación instantánea de correos de contingencia, pautas de evacuación o tickets de soporte con IA. | ¿Por qué? Durante una emergencia no hay tiempo para redactar de cero. ¿Para qué? Para estandarizar las respuestas de seguridad al instante."
          ]
        },
        {
          title: "Tema 4.7: Ejemplo Práctico: Armar un Agente en LangChain",
          details: [
            "Definición del Agente y Prompt Básico: Configuración inicial usando Python y LangChain. | ¿Por qué? Se necesita un marco robusto para orquestar LLMs con herramientas externas. ¿Para qué? Para crear un agente autónomo que procese datos. Ejemplo Prompt: 'Eres un Analista Industrial experto. Tu tarea es monitorear alertas de temperatura. Si la Temp > 110°C, genera un informe crítico de inmediato. Datos actuales: {input_datos}'",
            "Uso de Herramientas (Tools): Conectar el agente a bases de datos vectoriales (como Redis Iris) o APIs de notificación. | ¿Por qué? El LLM por sí solo no tiene acceso a datos en tiempo real. ¿Para qué? Para que el agente pueda recuperar contexto técnico (RAG) antes de responder.",
            "Despliegue en Plataforma (Producción): Empaquetar el agente como una API (usando FastAPI o LangServe) y contenerizarlo con Docker. | ¿Por qué? Un script local no es accesible por los sistemas de la empresa. ¿Para qué? Para subirlo a un entorno Cloud (GCP Cloud Run o AWS) y exponer su endpoint webhook a los sistemas de streaming (ej. Apache Flink).",
            "Material de Apoyo (Video): 'LangChain Agents Tutorial' (https://www.youtube.com/watch?v=WfHJ_Zfaqjs) | ¿Por qué? Permite visualizar de forma guiada cómo se programa y ejecuta un agente paso a paso. ¿Para qué? Para que los alumnos asimilen cómo el agente toma decisiones (Reasoning) y utiliza herramientas en la práctica antes de ser desplegado."
          ]
        },
        {
          title: "Tema 4.8: Observabilidad y Trazabilidad con LangSmith",
          details: [
            "Registro de Trazas (Traces): Plataforma para registrar y visualizar el flujo completo de ejecución de cada interacción con el LLM. | ¿Por qué? Cuando los agentes fallan o actúan extraño, el código no muestra el proceso cognitivo del modelo. ¿Para qué? Para inspeccionar exactamente cada paso, prompt enviado y herramientas consultadas.",
            "Monitoreo de Costos y Latencia: Panel de control que expone el tiempo de ejecución (milisegundos) y tokens consumidos. | ¿Por qué? Sin esto, es imposible calcular el ROI o diagnosticar cuellos de botella. ¿Para qué? Para medir el impacto financiero y optimizar el rendimiento antes de producción.",
            "Comparación de Prompts (A/B Testing): Capacidad de registrar ejecuciones con diferentes system prompts para evaluar resultados. | ¿Por qué? Un pequeño cambio en el prompt puede alterar el consumo de tokens y el tono. ¿Para qué? Para iterar y mejorar de manera guiada por datos.",
            "El equivalente a Grafana o Datadog para IA: LangSmith no reemplaza al modelo de IA, actúa como una plataforma de observabilidad y depuración orientada al ciclo de vida de aplicaciones basadas en LLMs. | ¿Por qué? Identificar por qué un agente tomó una decisión es más difícil que escribir el código. ¿Para qué? Para diagnosticar problemas y optimizar el rendimiento de la IA en producción."
          ]
        },
        {
          title: "Tema 4.9: El Nivel Máximo de Autonomía (El Caso de Antigravity)",
          details: [
            "Agentes de Propósito General vs Específicos: Evolución desde agentes de monitoreo de una sola herramienta, hacia sistemas de propósito general y autónomos. | ¿Por qué? Los casos de uso reales de ingeniería exigen que la IA controle múltiples sistemas. ¿Para qué? Para entender el potencial de la autonomía total en entornos complejos.",
            "Antigravity de Google DeepMind: Es el poderoso agente que potencia Google AI Studio Build. A diferencia de un chatbot, puede leer código, crear archivos, ejecutar comandos de terminal y compilar aplicaciones completas. | ¿Por qué? Muestra la capacidad del modelo para operar como un ingeniero de software. ¿Para qué? Para ejemplificar cómo un agente usa un ecosistema de herramientas para construir software.",
            "Razonamiento Dinámico y Corrección Autónoma: Si Antigravity escribe código y falla al compilar, lee el mensaje de error de la terminal, razona sobre la falla y reescribe el código para solucionarlo de forma autónoma (ReAct en su máxima expresión). | ¿Por qué? Un prompt no basta para resolver problemas de múltiples pasos; se requiere iteración y validación. ¿Para qué? Para demostrar el ciclo de 'Pensamiento -> Acción -> Observación -> Corrección' en agentes de última generación."
          ]
        }
      ]
    },
    practice: {
      title: "Laboratorio: Agente de IA Generativa para Monitoreo en Tiempo Real y Alertas Narrativas sin Código",
      description: "Configurar un Agente de IA Generativa en un chat interactivo para simular el monitoreo en tiempo real de eventos críticos, diagnosticar incidentes al vuelo y generar protocolos de emergencia redactados automáticamente.",
      scenario: "Una empresa de minería y logística en Antofagasta requiere que un Agente de IA Generativa evalúe lecturas de sensores y logs en vivo de camiones de extracción, emitiendo no solo alertas, sino diagnósticos narrativos e instrucciones de seguridad en tiempo real.",
      realExample: {
        context: "Caso del monitoreo inteligente con IA Generativa para camiones de extracción (CAEX) en operación minera.",
        problem: "Los tableros tradicionales solo muestran luces rojas sin explicar el porqué; si el motor supera 110°C, el chofer no sabe si detenerse inmediatamente o llegar al taller.",
        solution: "Un Agente de IA Generativa actuando como guardián en vivo que recibe el evento, redacta un diagnóstico narrativo sobre la falla probable y genera la pauta de acción para la cabina y el correo de contingencia para mantenimiento."
      },
      teacherExplanation: "Demostramos cómo la IA Generativa revoluciona el monitoreo en tiempo real: pasa de ser un simple termómetro que pita a un analista experto en vivo que explica la causa probable del sobrecalentamiento, redacta la orden de detención para el chofer y genera el correo de contingencia para la jefatura.",
      steps: [
        "Configurar un chat en ChatGPT/Claude con el Prompt Maestro: 'Actúa como un Agente de IA Generativa Guardián de Operaciones Industriales...'",
        "Simular el 'streaming' de datos e incidentes enviando lecturas continuas (ej. 'Lectura 1: 88°C - Normal', 'Lectura 2: 104°C - Advertencia', 'Lectura 3: 116°C - Crítico + Fuga de Refrigerante').",
        "Observar cómo la IA Generativa analiza en vivo, diagnostica la falla probable y genera instrucciones de seguridad en lenguaje natural para la cabina.",
        "Pedirle al Agente Generativo que redacte inmediatamente la Minuta de Contingencia y el Correo Urgente de Traslado para el Jefe de Mantenimiento de la mina."
      ],
      toolsUsed: ["claude", "chatgpt"]
    }
  },
  {
    id: "s5",
    date: "Martes 03 de noviembre de 2026, en horario 19:00 a 22:00 hrs.",
    title: "Actividad práctica",
    hours: 3,
    theory: {
      title: "Integración de Conceptos",
      points: [
        {
          title: "Tema 5.1: Repaso de los 4 pilares: Almacenamiento, Ingesta, Visualización y Tiempo Real.",
          details: [
            "Conexión de los módulos: Cómo los datos extraídos (Tema 2) se guardan (Tema 1) para ser consultados en vivo (Tema 4) y presentados al usuario (Tema 3). | ¿Por qué? Una solución real requiere de todas las piezas funcionando juntas. ¿Para qué? Para entender el rol de cada componente en un producto de datos completo.",
            "Debate interactivo: Identificación de cuellos de botella comunes en la integración de estas capas. | ¿Por qué? La integración es donde suelen fallar los proyectos. ¿Para qué? Para anticipar problemas arquitectónicos en proyectos futuros."
          ]
        },
        {
          title: "Tema 5.2: Metodología de diseño para productos de datos impulsados por IA.",
          details: [
            "Empezar por el problema, no por la IA: La tecnología es el habilitador, el foco es el valor para el usuario final. | ¿Por qué? La tecnología sin propósito no se adopta. ¿Para qué? Para asegurar que el producto resuelva dolores reales.",
            "Prototipado rápido (MVP): Validar la idea de negocio usando IA generativa antes de construir costosas tuberías de datos. | ¿Por qué? Desarrollar sistemas completos es lento y riesgoso. ¿Para qué? Para fallar barato y rápido, validando hipótesis iniciales.",
            "Iteración basada en métricas: Medir si las recomendaciones o insights de la IA realmente están moviendo la aguja del negocio. | ¿Por qué? El éxito se define por el impacto medible. ¿Para qué? Para ajustar y mejorar el producto continuamente (Data-driven decisions)."
          ]
        },
        {
          title: "Tema 5.3: Consideraciones éticas, sesgos algorítmicos y privacidad de datos en IA.",
          details: [
            "Basura entra, sesgo sale: Si los datos históricos tienen sesgos (género, raza, nivel socioeconómico), la IA los amplificará. | ¿Por qué? La IA aprende patrones del pasado, incluyendo los nocivos. ¿Para qué? Para auditar datasets y diseñar sistemas justos.",
            "Privacidad: Anonimización de datos personales (PII) antes de enviarlos a modelos de lenguaje o repositorios analíticos. | ¿Por qué? Cumplir normativas (GDPR, ley local) es obligatorio. ¿Para qué? Para proteger a los clientes y evitar multas millonarias.",
            "Explicabilidad (XAI): La importancia de que los usuarios entiendan 'por qué' la IA tomó cierta decisión, crucial en sectores regulados como salud o finanzas. | ¿Por qué? La adopción requiere confianza en el sistema. ¿Para qué? Para poder auditar y defender las predicciones automatizadas."
          ]
        },
        {
          title: "Tema 5.4: Cómo escalar el prototipo y llevarlo a producción en una empresa real.",
          details: [
            "De scripts sueltos a MLOps / DataOps: Versionado de datos, monitoreo continuo de modelos y despliegue automatizado. | ¿Por qué? Un modelo que no se actualiza pierde precisión rápidamente (concept drift). ¿Para qué? Para operar IA en producción de forma predecible y segura.",
            "Gestión de costos de nube y llamadas a APIs de LLMs. | ¿Por qué? Facturar por token puede salirse de control en procesos masivos. ¿Para qué? Para mantener el ROI del producto positivo.",
            "Alineación cultural: Capacitar al equipo para confiar y colaborar con agentes de IA. | ¿Por qué? El rechazo cultural es la principal causa de fracaso en adopción de IA. ¿Para qué? Para transicionar suavemente hacia equipos humano-máquina."
          ]
        }
      ]
    },
    practice: {
      title: "Laboratorio: Conceptualización de Producto de Datos Integral (Sin Código)",
      description: "Diseño y conceptualización de un producto de datos completo orquestando herramientas de IA generativa.",
      scenario: "Trabajo en grupos. Cada grupo elige un problema de una industria chilena y diseña un producto de datos de principio a fin, validándolo con IA.",
      realExample: {
        context: "Desarrollo completo de un 'Data Product' para predecir fuga de clientes en una Fintech.",
        problem: "La tasa de cancelación de tarjetas de crédito aumentó a un 8% mensual sin un patrón claro y se requiere una solución integral.",
        solution: "Un ecosistema orquestado donde investigamos el problema, generamos datos simulados, los analizamos visualmente y creamos un plan de retención utilizando únicamente conversaciones con IA."
      },
      teacherExplanation: "Este es el ejercicio integrador. La lógica es que vivan el ciclo completo de un producto de datos: investigar el problema, definir los datos, simularlos y analizarlos. Al hacerlo sin código, el foco se mantiene en la estrategia de negocio y la capacidad de orquestar inteligencias artificiales para resolver problemas reales.",
      steps: [
        "Usar Perplexity para investigar 'Causas principales de fuga de clientes en tarjetas Fintech en LATAM'.",
        "Solicitar a Claude que diseñe la estrategia: '¿Qué información del cliente deberíamos recopilar en un Excel para predecir si se irá?'.",
        "Generar un dataset simulado: Pedir a ChatGPT que invente una tabla con 20 clientes ficticios y su comportamiento de uso.",
        "Usar ChatGPT o Claude para analizar esa tabla: pedirle que dibuje un gráfico con los clientes en riesgo y redacte un plan de retención.",
        "Ensamblar todos los hallazgos en un pitch directivo de 5 minutos presentando la solución conceptual."
      ],
      toolsUsed: ["perplexity", "claude", "chatgpt"]
    }
  }
];
