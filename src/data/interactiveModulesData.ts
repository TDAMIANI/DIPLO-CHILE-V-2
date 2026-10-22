export type InteractionMode = 'individual' | 'live';

export interface QuizQuestion {
  id: string;
  conceptTag: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  liveDebatePrompt: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  summary: string;
  metrics: {
    precision: number; // 0-100 Calidad Técnica
    velocidad: number; // 0-100 Velocidad de Ejecución
    seguridad: number; // 0-100 Gobernanza y Control de Riesgo
  };
  verdict: 'optimo' | 'intermedio' | 'riesgoso';
  verdictLabel: string;
  executiveFeedback: string;
}

export interface DecisionStage {
  stageNumber: number;
  title: string;
  situation: string;
  liveQuestion: string;
  options: DecisionOption[];
}

export interface SessionSimulatorScenario {
  sessionId: string;
  companyBadge: string;
  scenarioTitle: string;
  contextBrief: string;
  stages: DecisionStage[];
}

export interface PromptTemplateItem {
  sessionId: string;
  challengeTitle: string;
  challengeContext: string;
  suboptimalPrompt: string;
  idealGoldenPrompt: string;
  expectedPillars: {
    roleHint: string;
    taskHint: string;
    constraintsHint: string;
    formatHint: string;
  };
}

export interface PromptEvaluationResult {
  overallScore: number;
  criteria: {
    rolContexto: number;
    claridadTarea: number;
    restriccionesReglas: number;
    formatoSalida: number;
  };
  strengths: string[];
  improvements: string[];
  optimizedPrompt: string;
  teacherTip: string;
}

export const SESSION_QUIZ_DATA: Record<string, QuizQuestion[]> = {
  s1: [
    {
      id: 's1-q1',
      conceptTag: 'Data Lake vs. Data Warehouse',
      question:
        'Un holding de retail en Chile recibe 50.000 audios de atención al cliente, PDFs de guías de despacho y tablas de ventas diarias. Quieren guardar todo en su formato nativo para entrenar modelos de IA más adelante sin perder tiempo estructurando hoy. ¿Qué arquitectura deben elegir?',
      options: [
        'Una Base de Datos Relacional SQL tradicional (PostgreSQL) con tablas estrictas.',
        'Un Data Lake o Arquitectura Lakehouse que admita datos crudos no estructurados y estructurados.',
        'Un archivo Excel compartido en la nube con pestañas por mes.',
        'Un Data Warehouse puro que rechace archivos de audio y PDFs al ingresar.'
      ],
      correctIndex: 1,
      explanation:
        'Un Data Lake (o Lakehouse moderno como Databricks/BigLake) permite almacenar datos no estructurados (audios, PDFs) en formato nativo a bajo costo, manteniendo la flexibilidad para procesarlos luego con modelos de IA Generativa.',
      liveDebatePrompt: '¿Qué pasaría con el presupuesto y el tiempo del proyecto si intentáramos forzar los 50.000 audios y PDFs dentro de un SQL tradicional desde el día 1?'
    },
    {
      id: 's1-q2',
      conceptTag: 'Datos No Estructurados e IA',
      question:
        'El 80% de la información de una empresa está en texto libre (correos, reclamos, contratos). ¿Por qué un motor SQL tradicional falla al intentar detectar qué clientes están a punto de cancelar su servicio por enojo?',
      options: [
        'Porque SQL solo funciona en servidores locales y no en la nube.',
        'Porque SQL carece de comprensión semántica para interpretar sarcasmo, tono emocional y contexto en texto libre sin estructurar.',
        'Porque los correos electrónicos pesan demasiados terabytes para ser leídos.',
        'Porque las bases de datos relacionales no permiten guardar texto de más de 50 caracteres.'
      ],
      correctIndex: 1,
      explanation:
        'Los motores SQL buscan coincidencias exactas o patrones rígidos (`LIKE "%malo%"`), pero no entienden ironía ("¡Qué gran servicio, llevo 5 días esperando!") ni urgencia implícita. Los LLMs transforman ese lenguaje natural en variables tabulares como `sentimiento` y `urgencia`.',
      liveDebatePrompt: '¿Alguien ha visto en su trabajo un reclamo escrito de forma "educada" o irónica que un filtro por palabras clave jamás detectaría?'
    },
    {
      id: 's1-q3',
      conceptTag: 'Few-Shot Prompting para Estructuración',
      question:
        'Al usar Claude o ChatGPT para convertir 500 reseñas desordenadas en un archivo JSON limpio para la base de datos, ¿cuál es la técnica más efectiva para asegurar que siempre devuelva las mismas categorías?',
      options: [
        'Pedirle "hazlo lo mejor que puedas" sin darle ejemplos para no sesgar a la IA.',
        'Proveer 3 a 5 ejemplos claros de entrada y salida esperada (Few-Shot Prompting) junto con las llaves exactas del JSON.',
        'Subir las 500 reseñas en un solo mensaje sin especificar el formato de salida.',
        'Cambiar el idioma del prompt a inglés aunque las reseñas estén en español chileno.'
      ],
      correctIndex: 1,
      explanation:
        'El Few-Shot Prompting (dar ejemplos concretos de input -> output JSON) reduce drásticamente la variabilidad del modelo y garantiza que respete la taxonomía exacta que espera la base de datos receptora.',
      liveDebatePrompt: '¿Por qué un solo cambio en el nombre de una llave JSON (ej. "Categoria" vs "categoria") puede romper la carga en producción?'
    }
  ],
  s2: [
    {
      id: 's2-q1',
      conceptTag: 'Paradigma ETL vs. ELT',
      question:
        'En una arquitectura moderna en la nube (como BigQuery o Snowflake), ¿por qué muchas empresas están migrando del clásico ETL (Extraer, Transformar, Cargar) hacia ELT (Extraer, Cargar, Transformar)?',
      options: [
        'Porque ya no es necesario limpiar ni transformar los datos nunca más.',
        'Porque permite cargar los datos crudos rápidamente y aprovechar la potencia elástica de la nube para transformarlos adentro sin perder información original.',
        'Porque ELT no requiere conexión a internet ni APIs.',
        'Porque los archivos CSV son más rápidos que el formato Parquet.'
      ],
      correctIndex: 1,
      explanation:
        'En ELT se ingesta el dato crudo de inmediato al almacén cloud y las transformaciones se hacen dentro del motor analítico. Así, si cambia una regla de negocio, puedes re-transformar desde el dato original sin volver a extraer.',
      liveDebatePrompt: '¿Qué ventaja tiene conservar el dato crudo original si el próximo mes Finanzas cambia la fórmula con la que calcula las comisiones?'
    },
    {
      id: 's2-q2',
      conceptTag: 'Batch vs. Streaming',
      question:
        'Un banco necesita dos procesos: (1) bloquear tarjetas clonadas en el segundo en que ocurre una compra sospechosa y (2) enviar el resumen mensual de puntos acumulados. ¿Qué combinación de ingesta es la correcta?',
      options: [
        'Batch para ambos procesos para ahorrar costos de servidor.',
        'Streaming para ambos procesos aunque cueste 10 veces más.',
        'Streaming (Tiempo Real) para detección de fraude y Batch (Por Lotes) para el resumen mensual de puntos.',
        'Batch para detección de fraude nocturno y Streaming para los puntos mensuales.'
      ],
      correctIndex: 2,
      explanation:
        'El valor de detener un fraude cae a cero si esperas a la noche (requiere Streaming en milisegundos). En cambio, el resumen mensual no requiere latencia en vivo, por lo que procesarlo en Batch optimiza costos.',
      liveDebatePrompt: '¿En qué procesos de sus propias empresas pagarían el costo extra de tener datos en vivo (Streaming) y en cuáles basta esperar al día siguiente (Batch)?'
    },
    {
      id: 's2-q3',
      conceptTag: 'Formatos de Almacenamiento (Parquet vs CSV)',
      question:
        'Cuando el volumen de datos escala a millones de registros, ¿por qué los equipos de ingeniería prefieren guardar datos en formato Apache Parquet en lugar de archivos CSV tradicionales?',
      options: [
        'Porque Parquet se puede editar fácilmente haciendo doble clic en el Bloc de Notas.',
        'Porque Parquet es columnar, comprimido y conserva los tipos de datos, acelerando las consultas analíticas y reduciendo el peso hasta en un 80%.',
        'Porque CSV no soporta números decimales ni fechas.',
        'Porque Parquet solo sirve para guardar imágenes y videos.'
      ],
      correctIndex: 1,
      explanation:
        'A diferencia de CSV (texto plano orientado a filas), Parquet almacena por columnas y comprime datos similares, permitiendo leer solo las columnas necesarias en una consulta en fracción de segundo.',
      liveDebatePrompt: 'Si una tabla tiene 100 columnas pero solo quieres sumar la columna "Monto_Venta", ¿por qué un CSV obliga a leer todo el archivo mientras Parquet lee solo el 1%?'
    }
  ],
  s3: [
    {
      id: 's3-q1',
      conceptTag: 'KPIs Accionables vs. Métricas de Vanidad',
      question:
        'En la reunión de directorio del lunes, el equipo de marketing presenta con orgullo: "Acumulamos 500.000 descargas históricas de la App desde 2021". ¿Por qué el Gerente General considera esto una métrica de vanidad?',
      options: [
        'Porque 500.000 es un número pequeño para el mercado chileno.',
        'Porque el acumulado histórico siempre sube y oculta cuántos usuarios activos reales compran hoy o cuántos abandonaron la app este mes (Churn Rate).',
        'Porque las descargas no se pueden graficar en barras.',
        'Porque los KPIs nunca deben expresarse en números enteros.'
      ],
      correctIndex: 1,
      explanation:
        'Una métrica de vanidad luce bien pero no guía ninguna decisión. Un KPI accionable sería la Tasa de Retención a 30 días o el Costo de Adquisición por Cliente Activo (CAC), que obligan a actuar si empeoran.',
      liveDebatePrompt: '¿Qué métrica "bonita pero inútil" suele aparecer en los reportes mensuales que les ha tocado ver?'
    },
    {
      id: 's3-q2',
      conceptTag: 'Carga Cognitiva y Patrón de Lectura',
      question:
        'Siguiendo los principios de Storytelling Analítico y el patrón de lectura en "Z" / "F", ¿dónde debe ubicarse el KPI más crítico de un dashboard ejecutivo y cómo debe usarse el color rojo?',
      options: [
        'Abajo a la derecha, usando rojo y verde brillante en todas las barras para que se vea colorido.',
        'En el cuadrante superior izquierdo, reservando el color rojo exclusivamente para alertar anomalías o sucursales bajo la meta crítica.',
        'Escondido en una segunda pestaña de detalle para no asustar al directorio.',
        'En un gráfico circular (Pie Chart) 3D con 25 tajadas de distintos tonos de rojo.'
      ],
      correctIndex: 1,
      explanation:
        'El ojo humano inicia el escaneo arriba a la izquierda. Además, mantener el dashboard en tonos neutros y usar color semántico (rojo/ámbar) solo en las desviaciones reduce la carga cognitiva y dirige la atención al instante.',
      liveDebatePrompt: 'Si todo está pintado de colores intensos en una lámina, ¿cuántos segundos tarda un gerente en descubrir dónde está el incendio real?'
    },
    {
      id: 's3-q3',
      conceptTag: 'Storytelling con Datos',
      question:
        '¿Cuál de los siguientes títulos de gráfico aplica mejor la técnica de "Título Asertivo" en una presentación ejecutiva?',
      options: [
        '"Gráfico 4: Evolución de Ventas por Región Q1-Q3 (en millones de CLP)".',
        '"Las ventas de la Zona Norte cayeron un 18% en Q3 por quiebres de stock en repuestos críticos".',
        '"Tabla comparativa de sucursales nacionales 2026".',
        '"Datos exportados desde SAP el martes a las 18:00 hrs".'
      ],
      correctIndex: 1,
      explanation:
        'Un título descriptivo dice "qué es el gráfico", mientras que un título asertivo entrega inmediatamente el hallazgo (qué pasó + por qué importa), facilitando la toma de decisión ejecutiva.',
      liveDebatePrompt: '¿Cómo cambia la conversación en una reunión cuando el título ya propone la conclusión respaldada por el gráfico?'
    }
  ],
  s4: [
    {
      id: 's4-q1',
      conceptTag: 'Redis Iris y Memoria de Agentes',
      question:
        'En una arquitectura de Agentes de IA en Tiempo Real, ¿por qué colocamos Redis / Redis Iris como capa intermedia entre el flujo de sensores y el modelo generativo (LLM)?',
      options: [
        'Para que el LLM responda más lento y consuma más tokens en cada consulta.',
        'Para entregar contexto relevante en milisegundos (búsqueda vectorial y caché en memoria), conservar el historial del agente y aplicar reglas de gobernanza sin exponer la base transaccional.',
        'Porque los modelos como Gemini o Claude no pueden procesar texto sin instalar Redis en el computador del usuario.',
        'Para reemplazar por completo las pantallas de los operadores.'
      ],
      correctIndex: 1,
      explanation:
        'Redis opera en memoria con latencia sub-milisegundo, manteniendo la memoria de corto/largo plazo del agente y recuperando solo el contexto exacto (Context Retriever), lo que evita saturar de tokens al LLM.',
      liveDebatePrompt: '¿Qué pasaría con la factura mensual de API si en cada evento de sensor le enviáramos el manual técnico completo de 400 páginas al LLM?'
    },
    {
      id: 's4-q2',
      conceptTag: 'Apache Flink y Procesamiento de Eventos',
      question:
        'En una faena minera en Antofagasta, un camión CAEX pasa por un túnel sin señal y sus alertas de temperatura llegan 4 minutos tarde al servidor. ¿Qué capacidad de Apache Flink evita que el sistema mezcle el orden real de los eventos?',
      options: [
        'El procesamiento basado en Tiempo de Evento (Event-time) junto con garantías Exactly-Once.',
        'Reiniciar la base de datos cada vez que un camión entra a un túnel.',
        'Ignorar todos los mensajes que lleguen con más de 2 segundos de retraso.',
        'Convertir los mensajes en imágenes JPG antes de procesarlos.'
      ],
      correctIndex: 0,
      explanation:
        'Apache Flink distingue entre el momento en que ocurrió el evento en el camión (Event-time) y el momento en que llegó al servidor (Ingestion-time), reconstruyendo la secuencia real sin duplicar alertas (Exactly-Once).',
      liveDebatePrompt: '¿Por qué en logística, banca o minería el orden exacto en que ocurrieron dos eventos cambia por completo el diagnóstico del incidente?'
    },
    {
      id: 's4-q3',
      conceptTag: 'Observabilidad con LangSmith y Autonomía (Antigravity)',
      question:
        '¿Cuál es la diferencia fundamental entre un Agente Autónomo de Ingeniería como Antigravity (monitoreado con trazas tipo LangSmith) frente a un chatbot tradicional?',
      options: [
        'El chatbot tradicional puede ejecutar comandos de terminal y compilar código por sí solo.',
        'Antigravity opera en un bucle ReAct (Pensamiento -> Acción -> Observación -> Corrección), usando herramientas reales y corrigiendo errores de compilación autónomamente, mientras LangSmith permite auditar cada paso.',
        'Antigravity no utiliza modelos de lenguaje, solo reglas IF/ELSE escritas a mano.',
        'LangSmith sirve únicamente para diseñar logotipos publicitarios.'
      ],
      correctIndex: 1,
      explanation:
        'Los agentes de nivel autónomo ejecutan acciones en el entorno (escribir archivos, compilar, leer errores de consola) e iteran hasta resolver el fallo, y herramientas de observabilidad como LangSmith registran cada traza para auditar costos, latencia y decisiones.',
      liveDebatePrompt: 'Si un agente autónomo toma 5 decisiones seguidas por su cuenta y la última falla, ¿cómo sabríamos en qué paso se equivocó sin una traza de observabilidad?'
    }
  ],
  s5: [
    {
      id: 's5-q1',
      conceptTag: 'Metodología de Productos de Datos con IA',
      question:
        'Un equipo quiere crear un sistema con IA para reducir la fuga de clientes (Churn) en una Fintech chilena. Según la metodología vista en la Sesión 5, ¿cuál debe ser el primer paso antes de contratar servidores e ingenieros de Big Data?',
      options: [
        'Comprar licencias anuales de 5 herramientas de nube y entrenar un modelo propio desde cero.',
        'Empezar por el dolor de negocio y validar un MVP rápido sin código (orquestando Perplexity, Claude y ChatGPT con datos simulados/anonimizados) para probar si el insight genera valor.',
        'Contratar 10 científicos de datos antes de hablar con el área comercial.',
        'Esperar 2 años hasta que toda la base de datos de la empresa esté 100% libre de errores.'
      ],
      correctIndex: 1,
      explanation:
        'El principio clave es "Empezar por el problema, no por la tecnología". Prototipar rápido con IA Generativa permite validar hipótesis e iterar en horas antes de invertir miles de dólares en infraestructura.',
      liveDebatePrompt: '¿Cuántos proyectos tecnológicos han visto fracasar porque se construyó primero una plataforma gigante que luego ningún usuario quiso usar?'
    },
    {
      id: 's5-q2',
      conceptTag: 'Privacidad (PII), Ética y Explicabilidad',
      question:
        'Antes de subir una planilla de clientes reales de un banco o clínica a un LLM público para buscar patrones de comportamiento, ¿qué protocolo ético y legal es obligatorio?',
      options: [
        'Subir el archivo completo con RUT, nombre, teléfono y dirección para que la IA sea más precisa.',
        'Anonimizar o seudonimizar todos los Datos Personales Identificables (PII) y exigir Explicabilidad (XAI) sobre por qué el modelo clasifica a un cliente en riesgo.',
        'Cambiar el nombre del archivo Excel a "confidencial_no_leer.xlsx".',
        'Pedirle por favor al chatbot que olvide los datos después de responder.'
      ],
      correctIndex: 1,
      explanation:
        'La protección de datos personales (PII) requiere eliminar o enmascarar RUT, nombres y contactos antes del análisis externo, y la Explicabilidad (XAI) garantiza que podamos auditar que el modelo no discrimine por sesgos históricos.',
      liveDebatePrompt: 'Si un algoritmo rechaza un crédito o marca a un paciente como baja prioridad, ¿basta con responder "la IA lo dijo" ante el regulador?'
    },
    {
      id: 's5-q3',
      conceptTag: 'Paso a Producción: DataOps / MLOps y ROI',
      question:
        'Una vez que el prototipo de IA demostró éxito en el taller, ¿qué desafío crítico resuelve la disciplina de MLOps / DataOps al escalar a miles de usuarios en producción?',
      options: [
        'Evita la degradación del modelo (Concept Drift), monitorea el costo por token/API para cuidar el ROI y automatiza el despliegue continuo.',
        'Hace que los modelos de IA sean 100% gratuitos e ilimitados.',
        'Elimina la necesidad de capacitar al equipo humano de la empresa.',
        'Reemplaza todas las bases de datos por archivos de texto en el escritorio.'
      ],
      correctIndex: 0,
      explanation:
        'En producción, el comportamiento de los clientes cambia (Concept Drift) y el consumo de tokens puede disparar el presupuesto. MLOps/DataOps asegura monitoreo técnico, control financiero (ROI) y adopción cultural.',
      liveDebatePrompt: '¿Cuál creen que es hoy la barrera más difícil al llevar IA a una empresa real: la tecnología o la resistencia cultural del equipo?'
    }
  ]
};

export const DECISION_SIMULATOR_DATA: Record<string, SessionSimulatorScenario> = {
  s1: {
    sessionId: 's1',
    companyBadge: 'Retail E-Commerce • CyberDay Chile',
    scenarioTitle: 'Crisis de Reclamos Desestructurados en Pleno CyberDay',
    contextBrief:
      'Son las 19:30 hrs del primer día de CyberDay. Han entrado 18.000 reclamos por redes sociales, correos y formularios web con texto libre ("mi pedido llegó roto", "me cobraron doble", "no llega el camión"). El Gerente de Operaciones necesita saber en 20 minutos qué porcentaje corresponde a falla logística grave vs. cobro duplicado.',
    stages: [
      {
        stageNumber: 1,
        title: 'Fase 1: Estrategia de Almacenamiento e Ingesta Inicial',
        situation:
          'Los 18.000 mensajes vienen en JSON de Instagram, correos en texto plano y PDFs adjuntos. ¿Dónde los depositas y cómo abordas la primera lectura?',
        liveQuestion: '¿Priorizamos estructurar todo en tablas SQL rígidas ahora mismo o depositamos en crudo y clasificamos con IA?',
        options: [
          {
            id: 's1-st1-opt1',
            label: 'Forzar carga directa en base SQL tradicional creando columnas manualmente',
            summary: 'Intentar diseñar un esquema relacional rígido mientras siguen cayendo miles de mensajes en formatos distintos.',
            metrics: { precision: 45, velocidad: 20, seguridad: 60 },
            verdict: 'riesgoso',
            verdictLabel: 'Cuello de Botella Crítico',
            executiveFeedback:
              'Los textos libres y PDFs rompen el esquema SQL. Pierdes 2 horas críticas diseñando tablas mientras el call center colapsa sin visibilidad.'
          },
          {
            id: 's1-st1-opt2',
            label: 'Centralizar en Data Lake crudo + Loteo hacia LLM con Few-Shot Prompting',
            summary: 'Guardar los mensajes íntegros en almacenamiento flexible y procesar muestras/lotes con un LLM instruido con 5 ejemplos reales.',
            metrics: { precision: 92, velocidad: 88, seguridad: 90 },
            verdict: 'optimo',
            verdictLabel: 'Arquitectura Óptima',
            executiveFeedback:
              '¡Excelente decisión ejecutiva! Preservas la evidencia original en el Data Lake y usas IA Generativa para extraer sentimiento, categoría y urgencia en minutos.'
          },
          {
            id: 's1-st1-opt3',
            label: 'Repartir un Excel entre 15 analistas para que lean y clasifiquen a mano',
            summary: 'Dividir los 18.000 reclamos en planillas compartidas para lectura humana línea por línea.',
            metrics: { precision: 58, velocidad: 15, seguridad: 45 },
            verdict: 'intermedio',
            verdictLabel: 'Inviable a Escala',
            executiveFeedback:
              'Cada analista usa criterios distintos ("Logística" vs "Despacho" vs "Envío") y tardarían más de 3 días en leer 18.000 tickets.'
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Fase 2: Estandarización del Esquema de Salida',
        situation:
          'El modelo de IA ya está leyendo los reclamos, pero necesitas inyectar el resultado en el tablero de logística sin que falle la integración.',
        liveQuestion: '¿Qué instrucción de salida le exigimos al LLM para que el sistema receptor no falle?',
        options: [
          {
            id: 's1-st2-opt1',
            label: 'Exigir JSON estricto con llaves fijas (sentimiento, categoria, urgencia) y valores cerrados',
            summary: 'Restringir la respuesta exclusivamente a un arreglo JSON validado con categorías predefinidas.',
            metrics: { precision: 96, velocidad: 92, seguridad: 94 },
            verdict: 'optimo',
            verdictLabel: 'Estándar de Producción',
            executiveFeedback:
              'Al obligar al LLM a responder solo con llaves cerradas (`"urgencia": "ALTA" | "MEDIA" | "BAJA"`), el pipeline inserta los datos directo en BigQuery sin errores de parseo.'
          },
          {
            id: 's1-st2-opt2',
            label: 'Pedirle un resumen en párrafos largos explicando cada caso con palabras libres',
            summary: 'Solicitar que la IA redacte una reflexión narrativa por cada uno de los 18.000 clientes.',
            metrics: { precision: 50, velocidad: 35, seguridad: 65 },
            verdict: 'riesgoso',
            verdictLabel: 'No Tabulable',
            executiveFeedback:
              'Transformaste texto desordenado en otro texto largo que tampoco se puede sumar ni graficar rápidamente.'
          },
          {
            id: 's1-st2-opt3',
            label: 'Pedir una tabla libre sin definir qué nombres de columnas ni categorías usar',
            summary: 'Dejar que el LLM invente las categorías según lo que le parezca en cada lote de 50 mensajes.',
            metrics: { precision: 68, velocidad: 75, seguridad: 70 },
            verdict: 'intermedio',
            verdictLabel: 'Inconsistencia Semántica',
            executiveFeedback:
              'En el lote 1 llamará a la categoría "Envíos", en el lote 2 "Transporte" y en el lote 3 "Courier", fragmentando las métricas del directorio.'
          }
        ]
      }
    ]
  },
  s2: {
    sessionId: 's2',
    companyBadge: 'Finanzas y Operaciones • Rendición Corporativa',
    scenarioTitle: 'Automatización ETL de Facturas y Flujo de Fraude',
    contextBrief:
      'Una distribuidora nacional pierde 120 horas-hombre al mes digitando rendiciones de gastos enviadas por WhatsApp, fotos de boletas y correos desordenados. Al mismo tiempo, necesitan detectar cobros duplicados antes de transferir el reembolso.',
    stages: [
      {
        stageNumber: 1,
        title: 'Fase 1: Diseño del Pipeline de Extracción y Transformación',
        situation:
          'Los vendedores envían fechas en distintos formatos ("22 oct", "22-10-2026", "10/22/26") y montos con símbolos mezclados ("$15.400.-", "15400 CLP"). ¿Cómo diseñas la transformación?',
        liveQuestion: '¿Dónde y cómo normalizamos los datos para que Contabilidad reciba una tabla limpia?',
        options: [
          {
            id: 's2-st1-opt1',
            label: 'Usar un flujo ELT asistido por IA con reglas explícitas de normalización (DD/MM/AAAA y enteros limpios)',
            summary: 'Extraer texto/imagen con IA multimodal, aplicar reglas estrictas de limpieza de tipos y exportar CSV/Parquet validado.',
            metrics: { precision: 94, velocidad: 90, seguridad: 88 },
            verdict: 'optimo',
            verdictLabel: 'ETL Inteligente y Limpio',
            executiveFeedback:
              'Desmitificas el ETL: la IA extrae Fecha, Comercio, RUT y Monto neto en entero sin puntos ni signos "$", dejando la tabla lista para el ERP contable.'
          },
          {
            id: 's2-st1-opt2',
            label: 'Cargar los textos tal cual al Excel contable y usar fórmulas BUSCARV manuales',
            summary: 'Pegar los textos crudos de WhatsApp directamente en las celdas del libro mayor.',
            metrics: { precision: 35, velocidad: 40, seguridad: 40 },
            verdict: 'riesgoso',
            verdictLabel: 'Corrupción de Tipos',
            executiveFeedback:
              'Las sumatorias fallan porque Excel interpreta "$15.400.-" como texto y mezcla meses con días en las fechas anglosajonas.'
          },
          {
            id: 's2-st1-opt3',
            label: 'Bloquear el reembolso a cualquier vendedor que no aprenda a programar en Python',
            summary: 'Exigir que la fuerza de ventas escriba scripts de limpieza antes de rendir una boleta.',
            metrics: { precision: 70, velocidad: 20, seguridad: 60 },
            verdict: 'intermedio',
            verdictLabel: 'Fricción Operativa Alta',
            executiveFeedback:
              'Técnicamente llegan datos limpios, pero el equipo comercial pierde horas de venta lidiando con formatos técnicos que la IA resuelve en segundos.'
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Fase 2: Elección de Frecuencia (Batch vs. Streaming)',
        situation:
          'Ahora debes decidir cómo procesar: (A) la alerta de boleta duplicada o adulterada al subirla, y (B) la consolidación contable para el cierre tributario mensual.',
        liveQuestion: '¿Qué arquitectura asignamos a la validación de boleta duplicada vs. el libro contable mensual?',
        options: [
          {
            id: 's2-st2-opt1',
            label: 'Validación en vivo (Streaming/API) al subir la boleta + Consolidación Batch nocturna/mensual en Parquet',
            summary: 'Combinar respuesta instantánea donde el fraude duele con procesamiento por lotes económico para el reporte tributario.',
            metrics: { precision: 95, velocidad: 91, seguridad: 95 },
            verdict: 'optimo',
            verdictLabel: 'Balance Costo-Beneficio Ideal',
            executiveFeedback:
              '¡Arquitectura impecable! Detectas al instante si una boleta ya fue rendida por otro vendedor y ahorras presupuesto corriendo el consolidado masivo en Batch.'
          },
          {
            id: 's2-st2-opt2',
            label: 'Todo en Batch una vez al mes después de haber pagado todos los reembolsos',
            summary: 'Revisar si había boletas falsas o duplicadas recién el día 30 del mes.',
            metrics: { precision: 60, velocidad: 30, seguridad: 25 },
            verdict: 'riesgoso',
            verdictLabel: 'Pérdida Financiera',
            executiveFeedback:
              'Para cuando el proceso Batch detecta que una factura de $800.000 fue rendida tres veces, el dinero ya salió de la cuenta corriente.'
          },
          {
            id: 's2-st2-opt3',
            label: 'Recalcular el balance tributario anual completo en Streaming cada segundo',
            summary: 'Mantener un clúster de alta frecuencia recalculando millones de registros históricos por cada café de $2.500.',
            metrics: { precision: 85, velocidad: 85, seguridad: 65 },
            verdict: 'intermedio',
            verdictLabel: 'Sobrecosto Innecesario',
            executiveFeedback:
              'Funciona técnicamente, pero multiplicas por 15 la factura de nube para un reporte tributario que el SII solo pide una vez al mes.'
          }
        ]
      }
    ]
  },
  s3: {
    sessionId: 's3',
    companyBadge: 'Cadena de Supermercados • Comité Ejecutivo',
    scenarioTitle: 'Rediseño del Tablero Comercial para Directorio',
    contextBrief:
      'El Gerente Comercial recibe todos los martes un Excel de 24 pestañas con las ventas de 85 sucursales. Nadie lo lee completo y tres tiendas del sur llevan dos meses perdiendo margen sin que se tomaran medidas.',
    stages: [
      {
        stageNumber: 1,
        title: 'Fase 1: Selección de KPIs y Eliminación de Ruido Visual',
        situation:
          'Debes transformar la sábana de datos en una vista ejecutiva accionable usando IA Generativa. ¿Qué métricas e indicadores priorizas en el primer pantallazo?',
        liveQuestion: '¿Qué dejamos arriba a la izquierda en el dashboard y qué eliminamos para reducir la carga cognitiva?',
        options: [
          {
            id: 's3-st1-opt1',
            label: 'Mostrar % de Cumplimiento de Meta y Margen Neto por sucursal, destacando en rojo solo locales críticos (<80%)',
            summary: 'Aplicar patrón Z, colores neutros para lo normal y alerta semántica roja en las desviaciones que exigen acción.',
            metrics: { precision: 95, velocidad: 93, seguridad: 90 },
            verdict: 'optimo',
            verdictLabel: 'Diseño Ejecutivo de Alto Impacto',
            executiveFeedback:
              'En menos de 3 segundos el Gerente identifica exactamente las 3 sucursales bajo el 80% de cumplimiento y puede activar un plan comercial.'
          },
          {
            id: 's3-st1-opt2',
            label: 'Poner un gráfico circular (Pie Chart) con las 85 sucursales y el total histórico de clientes desde 1998',
            summary: 'Usar métricas acumuladas de vanidad y un gráfico de torta con 85 colores distintos.',
            metrics: { precision: 25, velocidad: 30, seguridad: 50 },
            verdict: 'riesgoso',
            verdictLabel: 'Ceguera Analítica',
            executiveFeedback:
              'Un Pie Chart con más de 5 categorías es ilegible para el ojo humano, y la métrica histórica oculta la caída actual en el sur.'
          },
          {
            id: 's3-st1-opt3',
            label: 'Mantener las 24 tablas pero cambiar la tipografía y pintar todas las filas con colores arcoíris',
            summary: 'Decorar la tabla gigante sin resumir ni jerarquizar los KPIs.',
            metrics: { precision: 50, velocidad: 40, seguridad: 65 },
            verdict: 'intermedio',
            verdictLabel: 'Sobrecarga Cognitiva',
            executiveFeedback:
              'Cuando todo resalta con colores brillantes, nada resalta. El cerebro se fatiga antes de encontrar el problema.'
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Fase 2: Storytelling Analítico para la Toma de Decisión',
        situation:
          'Ya tienes el gráfico limpio generado con IA. Ahora debes acompañarlo del encabezado y la minuta para que el Directorio apruebe el ajuste de inventario.',
        liveQuestion: '¿Cómo redactamos el encabezado y la recomendación usando el arco narrativo (Contexto -> Conflicto -> Resolución)?',
        options: [
          {
            id: 's3-st2-opt1',
            label: 'Título asertivo con causa raíz + Minuta de 3 puntos con acción recomendada y cuantificada',
            summary: '"3 sucursales del Sur caen bajo el 75% de meta por quiebre en línea frío; reasignar stock recupera $42M este mes".',
            metrics: { precision: 96, velocidad: 94, seguridad: 92 },
            verdict: 'optimo',
            verdictLabel: 'Storytelling Accionable',
            executiveFeedback:
              'Conectas el dato con la decisión: muestras el qué, el porqué y la resolución concreta. El directorio aprueba la acción en 5 minutos.'
          },
          {
            id: 's3-st2-opt2',
            label: 'Título neutro ("Gráfico de Barras Septiembre-Octubre") sin texto explicativo',
            summary: 'Entregar el gráfico mudo esperando que cada director saque sus propias conclusiones.',
            metrics: { precision: 60, velocidad: 50, seguridad: 70 },
            verdict: 'intermedio',
            verdictLabel: 'Mensaje Ambiguo',
            executiveFeedback:
              'La reunión se desvía durante 40 minutos discutiendo cómo interpretar los ejes del gráfico en vez de decidir qué hacer.'
          },
          {
            id: 's3-st2-opt3',
            label: 'Ocultar las 3 sucursales en rojo para que el reporte se vea 100% positivo',
            summary: 'Maquillar los datos filtrando los locales con problemas.',
            metrics: { precision: 15, velocidad: 40, seguridad: 10 },
            verdict: 'riesgoso',
            verdictLabel: 'Sesgo Grave y Pérdida de Confianza',
            executiveFeedback:
              'Ocultar anomalías destruye la credibilidad del área de datos y agrava la pérdida financiera en el trimestre siguiente.'
          }
        ]
      }
    ]
  },
  s4: {
    sessionId: 's4',
    companyBadge: 'Minería y Logística • Antofagasta',
    scenarioTitle: 'Agente Guardián en Tiempo Real para Flota CAEX',
    contextBrief:
      'Una flota de 40 camiones de extracción minera transmite telemetría cada segundo. El camión CAEX-14 acaba de reportar 116°C en el motor junto con caída de presión de refrigerante en plena rampa ascendente.',
    stages: [
      {
        stageNumber: 1,
        title: 'Fase 1: Arquitectura de Streaming y Contexto del Agente',
        situation:
          'Recibes 2.000 eventos por segundo de toda la flota. Necesitas que el Agente de IA detecte la anomalía del CAEX-14, consulte el historial reciente del camión y emita un protocolo en menos de 2 segundos.',
        liveQuestion: '¿Cómo conectamos el flujo en vivo con el Agente Generativo sin colapsar la latencia ni el costo de tokens?',
        options: [
          {
            id: 's4-st1-opt1',
            label: 'Apache Flink para filtrar eventos críticos + Redis Iris para memoria/contexto en vivo + Agente LLM con Streaming',
            summary: 'Flink procesa el flujo con Event-time, Redis entrega el historial del camión en milisegundos y el Agente genera la alerta narrativa.',
            metrics: { precision: 96, velocidad: 95, seguridad: 94 },
            verdict: 'optimo',
            verdictLabel: 'Arquitectura Real-Time de Misión Crítica',
            executiveFeedback:
              '¡Solución de nivel industrial! Flink evita falsas alarmas por desorden de red, Redis Iris inyecta solo el contexto necesario y el Agente guía al operador al instante.'
          },
          {
            id: 's4-st1-opt2',
            label: 'Enviar los 2.000 logs crudos por segundo directamente al LLM sin filtro ni base en memoria',
            summary: 'Llamar a la API del LLM 2.000 veces por segundo enviando toda la base de datos en cada prompt.',
            metrics: { precision: 40, velocidad: 18, seguridad: 30 },
            verdict: 'riesgoso',
            verdictLabel: 'Colapso por Rate-Limit y Latencia',
            executiveFeedback:
              'Saturas la cuota de tokens en 3 minutos, la latencia sube a 45 segundos y el motor del camión se funde esperando respuesta.'
          },
          {
            id: 's4-st1-opt3',
            label: 'Dejar solo una alarma sonora genérica ("BEEP") en la cabina sin contexto generativo',
            summary: 'Mantener el umbral estático tradicional sin explicar la causa ni el protocolo de seguridad.',
            metrics: { precision: 55, velocidad: 80, seguridad: 45 },
            verdict: 'intermedio',
            verdictLabel: 'Fatiga de Alertas',
            executiveFeedback:
              'El chofer escucha una chicharra más entre decenas del turno, no sabe que hay fuga de refrigerante y continúa subiendo la rampa.'
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Fase 2: Observabilidad (LangSmith) y Corrección Autónoma (Antigravity)',
        situation:
          'Durante la marcha blanca, notas que en el 5% de las alertas el agente tarda 6 segundos de más y además necesitas desplegar un nuevo microservicio de notificación antes del cambio de turno.',
        liveQuestion: '¿Cómo auditamos el cuello de botella cognitivo del agente y aceleramos el despliegue del conector?',
        options: [
          {
            id: 's4-st2-opt1',
            label: 'Inspeccionar trazas en LangSmith para medir latencia/tokens por paso + Usar Antigravity (ciclo ReAct) para construir y validar el servicio',
            summary: 'Auditar el árbol de ejecución real del agente con LangSmith y apalancar un agente de ingeniería que compila y corrige errores autónomamente.',
            metrics: { precision: 95, velocidad: 94, seguridad: 96 },
            verdict: 'optimo',
            verdictLabel: 'Ingeniería Aumentada con Observabilidad',
            executiveFeedback:
              'LangSmith revela qué herramienta tardaba 5s en responder y Antigravity genera, compila y verifica el endpoint de contingencia antes del cambio de turno.'
          },
          {
            id: 's4-st2-opt2',
            label: 'Adivinar a ciegas cambiando el prompt en producción sin registrar trazas ni pruebas',
            summary: 'Modificar el System Prompt directamente en vivo esperando que por suerte baje la latencia.',
            metrics: { precision: 30, velocidad: 45, seguridad: 20 },
            verdict: 'riesgoso',
            verdictLabel: 'Ceguera en Producción',
            executiveFeedback:
              'Sin trazabilidad (LangSmith), un cambio a ciegas altera el formato de salida y deja sin alertas de seguridad a toda la flota.'
          },
          {
            id: 's4-st2-opt3',
            label: 'Apagar el Agente de IA por 3 semanas mientras se revisa línea por línea manualmente',
            summary: 'Suspender todo el monitoreo inteligente por falta de herramientas de observabilidad.',
            metrics: { precision: 60, velocidad: 20, seguridad: 65 },
            verdict: 'intermedio',
            verdictLabel: 'Parálisis Operativa',
            executiveFeedback:
              'Pierdes la ventaja competitiva del sistema en vivo por no contar con un panel de observabilidad de LLMs.'
          }
        ]
      }
    ]
  },
  s5: {
    sessionId: 's5',
    companyBadge: 'Fintech LatAm • Pitch de Directorio',
    scenarioTitle: 'Lanzamiento de Producto de Datos Anti-Fuga (Churn)',
    contextBrief:
      'Llegó el día de defender tu Producto de Datos integral ante el Directorio de una Fintech cuya fuga de tarjetas subió al 8% mensual. Tienes presupuesto limitado y el oficial de cumplimiento legal (Compliance) está en la sala.',
    stages: [
      {
        stageNumber: 1,
        title: 'Fase 1: Gobernanza, Privacidad (PII) y Validación del MVP',
        situation:
          'El área comercial te entrega una base con 50.000 clientes incluyendo RUT, nombre completo, sueldo líquido y reclamos en texto libre para que alimentes tu flujo de IA.',
        liveQuestion: '¿Cómo procesamos esta base para encontrar los patrones de fuga sin violar la Ley de Protección de Datos?',
        options: [
          {
            id: 's5-st1-opt1',
            label: 'Anonimizar PII (reemplazar RUT/Nombre por ID_Hash), validar el MVP con cohortes sintéticas/limpias y exigir explicabilidad (XAI)',
            summary: 'Proteger la identidad del cliente desde la ingesta y asegurar que cada predicción de riesgo explique sus causas de negocio.',
            metrics: { precision: 94, velocidad: 89, seguridad: 98 },
            verdict: 'optimo',
            verdictLabel: 'Ética y Negocio Alineados',
            executiveFeedback:
              'El oficial de Compliance aprueba el proyecto en el acto: cero exposición de RUT o nombres reales y cada alerta de fuga explica por qué se activó.'
          },
          {
            id: 's5-st1-opt2',
            label: 'Subir los 50.000 RUTs, nombres y sueldos sin filtro a una cuenta gratuita personal de un chatbot',
            summary: 'Enviar datos bancarios confidenciales en crudo a servicios externos sin anonimización.',
            metrics: { precision: 65, velocidad: 80, seguridad: 5 },
            verdict: 'riesgoso',
            verdictLabel: 'Infracción Legal y Riesgo Reputacional',
            executiveFeedback:
              'Fuga crítica de datos personales identificables (PII). El área legal detiene el proyecto de inmediato por incumplimiento normativo.'
          },
          {
            id: 's5-st1-opt3',
            label: 'Eliminar todas las variables de comportamiento y quedarnos solo con el color de la tarjeta',
            summary: 'Borrar tantos datos por miedo que el modelo pierde toda capacidad predictiva.',
            metrics: { precision: 20, velocidad: 60, seguridad: 85 },
            verdict: 'intermedio',
            verdictLabel: 'Modelo Sin Valor Predictivo',
            executiveFeedback:
              'Proteges la privacidad pero destruyes la utilidad analítica: lo que debía borrarse era el RUT/Nombre, no el historial de uso anonimizado.'
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Fase 2: Escalado a Producción, Control de Costos y Adopción Cultural',
        situation:
          'El MVP redujo la fuga en un 25% en el piloto. El Gerente General pregunta: "¿Cómo llevamos esto a toda la empresa el próximo mes sin que la cuenta de nube explote ni los ejecutivos rechacen la herramienta?"',
        liveQuestion: '¿Qué estrategia de escalado y gestión del cambio proponemos para cerrar el Pitch?',
        options: [
          {
            id: 's5-st2-opt1',
            label: 'Implementar pipeline MLOps/DataOps con caché de prompts, monitoreo de ROI por token y co-diseño con los ejecutivos de retención (Human-in-the-loop)',
            summary: 'Combinar control financiero de APIs, detección de Concept Drift y capacitación práctica donde la IA sugiere y el ejecutivo decide.',
            metrics: { precision: 96, velocidad: 92, seguridad: 95 },
            verdict: 'optimo',
            verdictLabel: 'Escalado Sostenible y Adoptado',
            executiveFeedback:
              '¡Pitch aprobado con presupuesto completo! Garantizas un ROI positivo controlando tokens y conviertes a los ejecutivos en aliados del copiloto de IA.'
          },
          {
            id: 's5-st2-opt2',
            label: 'Obligar a los ejecutivos a usar la herramienta sin capacitación y dejar que la IA cancele o regale bonos sin límite de presupuesto',
            summary: 'Automatización ciega sin supervisión humana ni techos de gasto en llamadas a la API.',
            metrics: { precision: 40, velocidad: 70, seguridad: 20 },
            verdict: 'riesgoso',
            verdictLabel: 'Rechazo Cultural y Descontrol Financiero',
            executiveFeedback:
              'El equipo boicotea el sistema por desconfianza y un bucle infinito de prompts consume el presupuesto trimestral en un fin de semana.'
          },
          {
            id: 's5-st2-opt3',
            label: 'Mantener el proceso 100% manual copiando y pegando prompts uno por uno para los 50.000 clientes cada lunes',
            summary: 'No automatizar la ingesta ni la visualización al pasar de 20 clientes de prueba a 50.000 reales.',
            metrics: { precision: 65, velocidad: 15, seguridad: 60 },
            verdict: 'intermedio',
            verdictLabel: 'No Escalable',
            executiveFeedback:
              'Lo que funcionó como validación rápida para 20 registros en el taller colapsa cuando intentas operarlo manualmente para 50.000 clientes.'
          }
        ]
      }
    ]
  }
};

export const PROMPT_TEMPLATES_DATA: Record<string, PromptTemplateItem> = {
  s1: {
    sessionId: 's1',
    challengeTitle: 'Estructuración Masiva de Reseñas en JSON Estricto',
    challengeContext:
      'Transformar comentarios desordenados de clientes de retail en un objeto JSON estandarizado listo para cargarse en un Data Warehouse.',
    suboptimalPrompt:
      'Lee estos reclamos de clientes de la tienda y dime qué opinan y cuáles son urgentes para guardarlos en la base de datos.',
    idealGoldenPrompt: `Actúa como un Ingeniero de Datos Senior especialista en Retail y Procesamiento de Lenguaje Natural (NLP).
Contexto: Estamos procesando lotes de reseñas de clientes post-compra en Chile para inyectarlas en Google BigQuery.

Tarea: Analiza cada reseña recibida y extrae su clasificación estructurada.
Ejemplos de referencia (Few-Shot):
- Entrada: "El repartidor llegó 4 días tarde y la caja venía abierta." -> {"sentimiento": "NEGATIVO", "categoria": "LOGISTICA", "urgencia": "ALTA", "resumen_accion": "Contactar courier y reponer"}
- Entrada: "Me encantó la calidad de la parka, talla exacta." -> {"sentimiento": "POSITIVO", "categoria": "PRODUCTO", "urgencia": "BAJA", "resumen_accion": "Sin acción requerida"}

Restricciones y Reglas:
1. Elimina o enmascara cualquier RUT, teléfono o correo personal (PII) reemplazándolo por "[CONFIDENCIAL]".
2. Usa exclusivamente los valores permitidos: sentimiento ["POSITIVO", "NEUTRO", "NEGATIVO"], categoria ["LOGISTICA", "PRODUCTO", "COBRO", "ATENCION"], urgencia ["ALTA", "MEDIA", "BAJA"].

Formato de Salida:
Devuelve ÚNICAMENTE un arreglo JSON válido sin texto introductorio ni bloques Markdown adicionales.`,
    expectedPillars: {
      roleHint: 'Definir rol de Analista/Ingeniero de Datos en Retail y propósito de ingesta.',
      taskHint: 'Incluir instrucciones claras de clasificación y ejemplos Few-Shot.',
      constraintsHint: 'Fijar listas cerradas de valores (enums) y anonimización de datos sensibles.',
      formatHint: 'Exigir salida estrictamente en JSON con llaves exactas.'
    }
  },
  s2: {
    sessionId: 's2',
    challengeTitle: 'Pipeline ETL Conversacional para Rendiciones de Gastos',
    challengeContext:
      'Extraer, limpiar y normalizar comprobantes y correos desordenados de gastos comerciales para el cierre contable.',
    suboptimalPrompt:
      'Saca los gastos de este correo desordenado y hazme una tabla limpia con las fechas y los montos para contabilidad.',
    idealGoldenPrompt: `Actúa como un Especialista en Automatización ETL y Auditoría Contable en Chile.
Contexto: Recibimos rendiciones de gastos comerciales en texto libre desde WhatsApp y correos electrónicos que deben homologarse para el ERP financiero.

Tarea:
1. Extraer cada gasto individual identificando: Fecha, Comercio, Categoría Contable y Monto en CLP.
2. Transformar todas las fechas al estándar estricto DD/MM/AAAA (asumiendo año 2026 si no se indica).
3. Limpiar los montos eliminando signos "$", puntos y guiones, dejando únicamente números enteros (ej. "$15.400.-" -> 15400).

Restricciones y Reglas:
- Si un gasto no tiene fecha o monto legible, márcalo en la columna Estado como "REVISAR_MANUAL" sin inventar cifras (cero alucinaciones).
- Clasifica cada ítem solo en: ["TRANSPORTE", "ALIMENTACION", "ALOJAMIENTO", "INSUMOS"].

Formato de Salida:
Entrega una tabla Markdown con las columnas exactas: | Fecha | Comercio | Categoria | Monto_CLP | Estado | seguida de un bloque CSV listo para descargar.`,
    expectedPillars: {
      roleHint: 'Asignar rol de especialista en ETL / Contabilidad.',
      taskHint: 'Separar explícitamente los pasos de Extraer, Transformar (fechas/montos) y Cargar.',
      constraintsHint: 'Prohibir inventar montos faltantes y estandarizar tipos numéricos.',
      formatHint: 'Solicitar tabla estructurada y bloque CSV con columnas fijas.'
    }
  },
  s3: {
    sessionId: 's3',
    challengeTitle: 'Generación de Dashboard Ejecutivo y Storytelling Analítico',
    challengeContext:
      'Analizar ventas por sucursal, detectar anomalías críticas (<80% de meta) y redactar una minuta ejecutiva con arco narrativo.',
    suboptimalPrompt:
      'Hazme un gráfico con estas ventas por sucursal y escribe un resumen para el gerente comercial.',
    idealGoldenPrompt: `Actúa como un Lead Data Storyteller y Consultor de Business Intelligence para Directorio.
Contexto: Presentaremos el cierre trimestral de ventas regionales ante el Gerente Comercial, quien dispone de solo 3 minutos para identificar sucursales críticas y aprobar acciones.

Tarea:
1. Calcula el % de Cumplimiento de Meta por cada sucursal ((Venta_Real / Meta) * 100).
2. Diseña una especificación visual de barras horizontales ordenadas de menor a mayor cumplimiento, aplicando color rojo semántico únicamente a las sucursales bajo el 80% y gris pizarra al resto (reducción de carga cognitiva).
3. Redacta un Título Asertivo que resuma el hallazgo principal y su impacto en millones.

Restricciones y Reglas:
- Evita métricas de vanidad (no destaques acumulados históricos irrelevantes).
- Usa una paleta accesible para daltonismo y prioriza el patrón de lectura en Z.

Formato de Salida:
1. Encabezado con Título Asertivo.
2. Tabla de KPIs Accionables con columna de Semáforo.
3. Minuta Ejecutiva en 3 balas: Contexto, Conflicto (Causa Raíz) y Resolución Cuantificada.`,
    expectedPillars: {
      roleHint: 'Definir rol experto en Data Storytelling / BI Ejecutivo.',
      taskHint: 'Pedir cálculo de KPI accionable (% cumplimiento), jerarquía visual y título asertivo.',
      constraintsHint: 'Evitar métricas de vanidad y aplicar uso intencional del color solo en anomalías.',
      formatHint: 'Estructurar en Título Asertivo + Tabla Semáforo + Arco Narrativo (Contexto/Conflicto/Resolución).'
    }
  },
  s4: {
    sessionId: 's4',
    challengeTitle: 'System Prompt para Agente Guardián en Tiempo Real (Streaming)',
    challengeContext:
      'Configurar un Agente de IA que procese telemetría en vivo de camiones mineros CAEX, consulte contexto de Redis Iris y emita protocolos de emergencia.',
    suboptimalPrompt:
      'Eres un agente que revisa la temperatura de los camiones de la mina. Si sube mucho avisa al chofer y manda un correo.',
    idealGoldenPrompt: `Actúa como un Agente Autónomo Guardián de Operaciones Mineras en Tiempo Real (conectado a Apache Flink y Redis Iris).
Contexto: Monitoreas la telemetría viva de camiones de extracción CAEX en Antofagasta. Recibirás eventos con marca de tiempo (Event-time), temperatura de motor, presión de refrigerante e historial reciente recuperado desde Redis Agent Memory.

Tarea:
Evalúa cada lectura entrante siguiendo el ciclo ReAct (Pensamiento -> Diagnóstico -> Acción):
- Si Temp < 100°C: Estado NORMAL (sin interrupción en cabina).
- Si Temp entre 100°C y 110°C: Estado ADVERTENCIA (sugerir reducir marcha y monitorear).
- Si Temp > 110°C o caída abrupta de presión: Estado CRÍTICO (ordenar detención segura inmediata en berma).

Restricciones y Reglas:
- No emitas códigos crípticos; traduce el evento a una explicación narrativa clara y directa para el operador en menos de 40 palabras.
- Si llegan eventos desordenados, prioriza la secuencia lógica del Event-time.

Formato de Salida:
Devuelve un bloque estructurado con:
1. [NIVEL DE ALERTA Y DIAGNÓSTICO DE CAUSA RAÍZ]
2. [INSTRUCCIÓN DE VOZ PARA CABINA DEL CHOFER]
3. [MINUTA Y TICKET AUTOMÁTICO PARA JEFE DE MANTENIMIENTO]`,
    expectedPillars: {
      roleHint: 'Definir rol de Agente Autónomo en Tiempo Real integrado con Redis/Flink.',
      taskHint: 'Establecer umbrales claros de decisión y razonamiento paso a paso (ReAct).',
      constraintsHint: 'Exigir brevedad operativa para cabina, manejo de Event-time y cero jerga críptica.',
      formatHint: 'Dividir salida en Diagnóstico, Instrucción de Cabina y Ticket de Mantenimiento.'
    }
  },
  s5: {
    sessionId: 's5',
    challengeTitle: 'Orquestación de Producto de Datos Anti-Churn con Gobernanza',
    challengeContext:
      'Diseñar la estrategia analítica, detección de riesgo de fuga en una Fintech y plan de retención respetando privacidad (PII) y explicabilidad (XAI).',
    suboptimalPrompt:
      'Analiza esta tabla de clientes del banco y dime quiénes van a cerrar su tarjeta y qué descuento les damos.',
    idealGoldenPrompt: `Actúa como un Chief Data Product Officer especialista en Retención Fintech y Gobernanza de IA.
Contexto: La tasa de fuga (Churn) de tarjetas de crédito subió al 8% mensual. Evaluaremos un dataset anonimizado de clientes para priorizar acciones de retención con ROI positivo.

Tarea:
1. Identifica los 3 patrones principales que explican la probabilidad de fuga (ej. caída en frecuencia de uso, reclamos no resueltos, cobro de comisión).
2. Clasifica a cada cliente por nivel de riesgo (ALTO, MEDIO, BAJO) adjuntando la explicación explícita (XAI) del porqué de su puntaje.
3. Propón una acción de retención personalizada cuyo costo sea inferior al Lifetime Value (LTV) del cliente.

Restricciones y Reglas (Ética y Privacidad):
- Verifica que ningún RUT, nombre o dato personal identificable (PII) sea expuesto en el reporte; utiliza únicamente el identificador "ID_Cliente".
- Audita que la recomendación no introduzca sesgos socioeconómicos o demográficos injustificados.

Formato de Salida:
1. Matriz de Clientes en Riesgo (ID_Cliente | Score_Fuga | Causa_Explicable_XAI | Accion_Retencion | ROI_Estimado).
2. Resumen Ejecutivo de 3 puntos para defensa ante el Directorio.`,
    expectedPillars: {
      roleHint: 'Asignar rol de líder de Producto de Datos Fintech con foco en ROI y Ética.',
      taskHint: 'Solicitar segmentación de riesgo, explicación causal (XAI) y acción con ROI.',
      constraintsHint: 'Exigir anonimización estricta de PII y auditoría contra sesgos algorítmicos.',
      formatHint: 'Solicitar Matriz de Retención accionable + Pitch Ejecutivo para Directorio.'
    }
  }
};

export function evaluatePromptDeterministically(
  promptText: string,
  sessionId: string
): PromptEvaluationResult {
  const template = PROMPT_TEMPLATES_DATA[sessionId] || PROMPT_TEMPLATES_DATA.s1;
  const text = promptText.trim();
  const lower = text.toLowerCase();

  // 1. Evaluate Rol y Contexto
  let rolContexto = 35;
  if (/(actúa como|actua como|eres un|rol:|experto|especialista|ingeniero|analista)/i.test(text)) {
    rolContexto += 35;
  }
  if (/(contexto|empresa|retail|fintech|mina|camiones|sucursal|cliente|directorio|contabilidad)/i.test(text)) {
    rolContexto += 25;
  }
  if (text.length > 180) rolContexto = Math.min(98, rolContexto + 5);

  // 2. Evaluate Claridad de la Tarea
  let claridadTarea = 40;
  if (/(extrae|clasifica|analiza|calcula|transforma|identifica|evalúa|evalua|genera)/i.test(text)) {
    claridadTarea += 25;
  }
  if (/(ejemplo|1\.|2\.|paso|primero|segundo|- )/i.test(text)) {
    claridadTarea += 25;
  }
  if (text.length > 250) claridadTarea = Math.min(96, claridadTarea + 8);

  // 3. Evaluate Restricciones y Reglas
  let restriccionesReglas = 25;
  if (/(no inventes|únicamente|unicamente|solo|restricci|regla|evita|límite|limite|pii|anonimiz|confidencial|sin )/i.test(text)) {
    restriccionesReglas += 45;
  }
  if (/(\[|\]|"alta"|"baja"|dd\/mm\/aaaa|<|>|%)/i.test(lower)) {
    restriccionesReglas += 25;
  }

  // 4. Evaluate Formato de Salida
  let formatoSalida = 30;
  if (/(json|csv|markdown|tabla|columnas|formato de salida|estructura|llaves)/i.test(text)) {
    formatoSalida += 45;
  }
  if (/(\{|\}|\||1\.|2\.|3\.)/.test(text)) {
    formatoSalida += 20;
  }

  rolContexto = Math.min(100, Math.max(20, rolContexto));
  claridadTarea = Math.min(100, Math.max(25, claridadTarea));
  restriccionesReglas = Math.min(100, Math.max(15, restriccionesReglas));
  formatoSalida = Math.min(100, Math.max(20, formatoSalida));

  const overallScore = Math.round(
    (rolContexto * 0.25) +
    (claridadTarea * 0.3) +
    (restriccionesReglas * 0.2) +
    (formatoSalida * 0.25)
  );

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (rolContexto >= 70) {
    strengths.push('Defines con claridad el rol experto y el contexto de negocio donde opera la IA.');
  } else {
    improvements.push(`Agrega el Rol y Contexto inicial: ${template.expectedPillars.roleHint}`);
  }

  if (claridadTarea >= 70) {
    strengths.push('La acción analítica principal está bien articulada y desglosada por pasos o ejemplos.');
  } else {
    improvements.push(`Detalla la Tarea paso a paso: ${template.expectedPillars.taskHint}`);
  }

  if (restriccionesReglas >= 70) {
    strengths.push('Incluyes reglas de control, umbrales o resguardo de calidad y privacidad de datos.');
  } else {
    improvements.push(`Añade Restricciones de Gobernanza: ${template.expectedPillars.constraintsHint}`);
  }

  if (formatoSalida >= 70) {
    strengths.push('Especificas una estructura de salida clara y fácil de integrar en sistemas downstream.');
  } else {
    improvements.push(`Especifica el Formato de Salida exacto: ${template.expectedPillars.formatHint}`);
  }

  if (strengths.length === 0) {
    strengths.push('El prompt expresa la intención general del problema que deseas resolver en la sesión.');
  }
  if (improvements.length === 0) {
    improvements.push('Tu prompt ya cumple un estándar excelente; puedes añadir un caso borde adicional para blindar aún más la respuesta.');
  }

  return {
    overallScore,
    criteria: {
      rolContexto,
      claridadTarea,
      restriccionesReglas,
      formatoSalida
    },
    strengths: strengths.slice(0, 3),
    improvements: improvements.slice(0, 3),
    optimizedPrompt: template.idealGoldenPrompt,
    teacherTip:
      'En clase en vivo, muestra cómo pasar de una instrucción ambigua de 1 línea a un prompt estructurado por pilares reduce drásticamente las alucinaciones.'
  };
}
