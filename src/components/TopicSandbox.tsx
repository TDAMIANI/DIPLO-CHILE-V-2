import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, Terminal, Copy, Check, ExternalLink, Sparkles, 
  TrendingUp, Award, Table, HelpCircle, ArrowRight, Layers,
  ChevronRight, ArrowUpRight, Search, Filter, ShieldAlert, Download
} from 'lucide-react';

interface SandboxItem {
  dataframe: {
    title: string;
    description: string;
    headers: string[];
    rows: Record<string, string | number>[];
  };
  prompt: {
    role: string;
    text: string;
    goal: string;
  };
  tools: {
    name: string;
    url: string;
    category: string;
    badgeColor: string;
  }[];
  realExample: {
    company: string;
    industry: string;
    problem: string;
    solution: string;
    impact: string;
  };
  beginnerExplanation?: {
    whatItMeans: string;
    howAiSolvesIt: string;
  };
}

interface TopicSandboxProps {
  sessionId: string;
  topicIdx: number;
}

export function TopicSandbox({ sessionId, topicIdx }: TopicSandboxProps) {
  const [copied, setCopied] = useState(false);
  const [dfSearch, setDfSearch] = useState('');

  // Comprehensive dataset for all 20 theoretical topics across the 5 sessions
  const sandboxData: Record<string, Record<number, SandboxItem>> = {
    s1: {
      0: {
        dataframe: {
          title: "df_caos_black_friday",
          description: "Muestra de transacciones con inconsistencias de formato, tipeo y stock recibidas durante el Black Friday.",
          headers: ["id_transaccion", "producto", "sucursal", "cantidad", "stock", "fecha", "canal"],
          rows: [
            { id_transaccion: "1001", producto: "TV Samsung 55", sucursal: "Santiago", cantidad: 1, stock: 5, fecha: "09:01", canal: "Web" },
            { id_transaccion: "1002", producto: "TV SAMSUNG 55\"", sucursal: "STGO", cantidad: 1, stock: "FALTA", fecha: "09:01", canal: "App" },
            { id_transaccion: "1003", producto: "Televisor Samsung 55 pulgadas", sucursal: "Santiago Centro", cantidad: 1, stock: 4, fecha: "09:02", canal: "Caja" },
            { id_transaccion: "1004", producto: "Notebook Lenovo", sucursal: "Providencia", cantidad: 2, stock: 8, fecha: "09:02", canal: "Marketplace" },
            { id_transaccion: "1005", producto: "Notebook Lenov", sucursal: "Providencia", cantidad: 2, stock: "FALTA", fecha: "09:02", canal: "Web" }
          ]
        },
        prompt: {
          role: "Analista de Datos Experto con IA",
          text: "Actúa como un Analista de Datos experto. Lee el siguiente DataFrame de transacciones del Black Friday que contiene inconsistencias de formato, errores de tipeo, stock faltante e inconsistencias de sucursales:\n\n| id_transaccion | producto | sucursal | cantidad | stock | fecha | canal |\n| 1001 | TV Samsung 55 | Santiago | 1 | 5 | 09:01 | Web |\n| 1002 | TV SAMSUNG 55\" | STGO | 1 | | 09:01 | App |\n| 1003 | Televisor Samsung 55 pulgadas | Santiago Centro | 1 | 4 | 09:02 | Caja |\n| 1004 | Notebook Lenovo | Providencia | 2 | 8 | 09:02 | Marketplace |\n| 1005 | Notebook Lenov | Providencia | 2 | | 09:02 | Web |\n\nRealiza las siguientes tareas de saneamiento semántico:\n1. Une y normaliza los nombres de productos equivalentes a un SKU único (ej. 'Samsung Smart TV 55\"').\n2. Corrige errores ortográficos ('Notebook Lenov' -> 'Notebook Lenovo').\n3. Completa la información de stock faltante infiriendo los valores basados en la secuencia temporal y ventas anteriores del mismo lote.\n4. Unifica nombres de sucursal inconsistentes (Santiago, STGO, Santiago Centro -> 'Sucursal Santiago Centro').\n5. Detecta posibles compras duplicadas.\n6. Retorna el DataFrame resultante limpio, ordenado y listo para actualizar el stock real en el sistema sin desfases.",
          goal: "Saneamiento y normalización semántica en tiempo real para actualización de stock."
        },
        tools: [
          { name: "ChatGPT / Claude / Gemini", url: "https://chatgpt.com", category: "IA Generativa", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200" },
          { name: "Python / Pandas", url: "https://pandas.pydata.org", category: "Análisis de Datos", badgeColor: "bg-blue-100 text-blue-800 border-blue-200" }
        ],
        realExample: {
          company: "Retail Multicanal (Caso Black Friday)",
          industry: "E-Commerce & Retail",
          problem: "Durante el Black Friday, la avalancha de datos con inconsistencias de formato ('TV Samsung 55', 'TV SAMSUNG 55\"', 'Televisor Samsung 55 pulgadas') y errores de escritura impide la actualización de stock en tiempo real, causando sobreventas de stock agotado.",
          solution: "La IA actúa como un analista inteligente de datos que, en milisegundos, lee cada transacción, interpreta su significado real, unifica nombres, corrige errores ortográficos y completa datos faltantes antes de que afecten el inventario.",
          impact: "Sincronización de stock en tiempo real, menos productos vendidos sin disponibilidad real, reducción de devoluciones, y cero trabajo manual de conciliación nocturna."
        },
        beginnerExplanation: {
          whatItMeans: "Una cadena de retail vende televisores, notebooks y celulares online y en sucursales. Durante el Black Friday, recibe miles de compras por minuto desde la web, app, cajas físicas y marketplaces. El problema es que los datos no vienen uniformes: por ejemplo, 'TV Samsung 55', 'TV SAMSUNG 55\"' y 'Televisor Samsung 55 pulgadas'. Para una persona inteligente son lo mismo, pero para un sistema tradicional rígido son tres productos distintos. Al no unificarse, el stock se descuadra, el sistema cree que aún quedan productos y sigue vendiendo televisores que físicamente ya se agotaron, resultando en cancelaciones de compra dolorosas.",
          howAiSolvesIt: "La IA Generativa actúa como un analista de datos experto automatizado que resuelve el problema en milisegundos:\n\n" +
            "✔ PASO 1. DETECTA PRODUCTOS IDÉNTICOS: Identifica que 'TV Samsung 55', 'TV SAMSUNG 55\"' y 'Televisor Samsung 55 pulgadas' corresponden al mismo SKU y los unifica como 'Samsung Smart TV 55\"'.\n" +
            "✔ PASO 2. CORRIGE ERRORES DE TIPEO: Convierte 'Notebook Lenov' automáticamente en 'Notebook Lenovo'.\n" +
            "✔ PASO 3. COMPLETA INFORMACIÓN FALTANTE: Si una fila llega sin stock (Null), la IA deduce el valor restante basándose en el historial secuencial de ventas anteriores (ej. de 5 a 4).\n" +
            "✔ PASO 4. UNIFICA SUCURSALES: Agrupa 'STGO', 'Santiago' y 'Santiago Centro' bajo la misma 'Sucursal Santiago Centro'.\n" +
            "✔ PASO 5. DETECTA DUPLICADOS: Si llegan dos registros casi iguales del mismo cliente con segundos de diferencia, alerta de una posible compra duplicada.\n" +
            "✔ PASO 6. ACTUALIZA EL STOCK EN TIEMPO REAL: Deja los datos perfectamente limpios para que el stock se descuente al instante sin desfases."
        }
      },
      1: {
        dataframe: {
          title: "df_comparativa_almacenamiento",
          description: "Mapeo comparativo de plataformas de datos corporativas con sus respectivos costos analíticos.",
          headers: ["plataforma", "categoria", "costo_almacenar_gb", "velocidad_consultas", "caso_uso_optimo"],
          rows: [
            { plataforma: "Google BigQuery", categoria: "Data Warehouse", costo_almacenar_gb: "$0.020 USD", velocidad_consultas: "Subsegundo", caso_uso_optimo: "Queries SQL analíticas pesadas" },
            { plataforma: "Snowflake", categoria: "Data Warehouse", costo_almacenar_gb: "$0.023 USD", velocidad_consultas: "Subsegundo", caso_uso_optimo: "Análisis multi-cloud corporativo" },
            { plataforma: "Amazon S3", categoria: "Data Lake", costo_almacenar_gb: "$0.021 USD", velocidad_consultas: "Segundos a minutos", caso_uso_optimo: "Guardar archivos nativos crudos" },
            { plataforma: "PostgreSQL", categoria: "Base Relacional (SQL)", costo_almacenar_gb: "$0.115 USD", velocidad_consultas: "Subsegundo (bajos datos)", caso_uso_optimo: "Operaciones transaccionales rápidas" }
          ]
        },
        prompt: {
          role: "Ingeniero de Cloud Analytics",
          text: "Genera una consulta SQL analítica optimizada para Google BigQuery que calcule el total vendido por región chilena, la cantidad de compras únicas y el promedio de ticket de compra en los últimos 30 días, ordenado por ventas descendente. Asegúrate de evitar lecturas completas de tablas aplicando particiones por fecha.",
          goal: "Aprender a optimizar costos de consulta en entornos corporativos."
        },
        tools: [
          { name: "Google BigQuery", url: "https://cloud.google.com/bigquery", category: "Data Warehouse", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200" },
          { name: "Snowflake", url: "https://www.snowflake.com", category: "Data Cloud & Warehouse", badgeColor: "bg-blue-100 text-blue-800 border-blue-200" },
          { name: "Amazon S3", url: "https://aws.amazon.com/s3", category: "Data Lake Storage", badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200" },
          { name: "Databricks", url: "https://www.databricks.com", category: "Data Lakehouse", badgeColor: "bg-orange-100 text-orange-800 border-orange-200" },
          { name: "Gemini", url: "https://gemini.google.com", category: "Modelos de IA", badgeColor: "bg-purple-100 text-purple-800 border-purple-200" }
        ],
        realExample: {
          company: "Cencosud",
          industry: "Retail y Holding Comercial",
          problem: "Consultas de reportes históricos de ventas anuales tardaban hasta 6 horas en completarse en sistemas locales.",
          solution: "Migración masiva hacia un Data Lakehouse en la nube con particiones lógicas por sucursal y fecha de transacción.",
          impact: "Reportes gerenciales completados en 15 segundos en vez de 6 horas, con cero mantenimiento físico."
        },
        beginnerExplanation: {
          whatItMeans: "Imagina que eres el gerente de una cadena gigante como Cencosud (Jumbo, Paris, Easy) y quieres saber cuánto se vendió en los últimos 5 años para planificar las compras. Si intentas hacer esta pregunta en la base de datos de las cajas registradoras (base relacional), el sistema se congelará porque está ocupado cobrando a los clientes activos. Para resolver esto, las empresas copian toda su historia a un 'Data Warehouse' o 'Data Lake' en la nube, que es como una biblioteca gigante diseñada para leer millones de filas en segundos sin molestar a las tiendas.",
          howAiSolvesIt: "1) Almacenamiento Inteligente: Separar los datos operacionales de los analíticos. Google BigQuery permite consultar miles de millones de filas de forma casi instantánea.\n2) IA para Optimizar Consultas: En lugar de pagar miles de dólares por búsquedas ineficientes, la IA genera consultas SQL optimizadas (usando particiones y filtros inteligentes) para buscar solo en las secciones correctas, ahorrando tiempo y dinero.\n3) Reportes Instantáneos: Permite pasar de esperar 6 horas por un reporte a obtenerlo en 15 segundos."
        }
      },
      2: {
        dataframe: {
          title: "df_metadatos_documentales",
          description: "Muestra de un catálogo documental donde se indexan archivos no estructurados.",
          headers: ["id_documento", "nombre_archivo", "tipo_mime", "peso_mb", "es_legible_ia", "tags_autodetectados"],
          rows: [
            { id_documento: "DOC-001", nombre_archivo: "Contrato_Proveedor_Miel.pdf", tipo_mime: "application/pdf", peso_mb: 4.2, es_legible_ia: "SÍ", tags_autodetectados: "legal, proveedor, chile" },
            { id_documento: "DOC-002", nombre_archivo: "Audio_Soporte_Queja_Cliente.mp3", tipo_mime: "audio/mpeg", peso_mb: 12.8, es_legible_ia: "REQUIERE SPEECH-TO-TEXT", tags_autodetectados: "callcenter, reclamo, despacho" },
            { id_documento: "DOC-003", nombre_archivo: "Boleta_Compra_49210.jpg", tipo_mime: "image/jpeg", peso_mb: 1.5, es_legible_ia: "REQUIERE OCR", tags_autodetectados: "boleta, finanzas, retail" }
          ]
        },
        prompt: {
          role: "Especialista en IA Cognitiva",
          text: "Escribe un prompt estructurado para Claude 3.5 Sonnet que actúe como un motor de extracción de metadatos. El objetivo es pasarle el texto de un contrato de arriendo en PDF y que devuelva exclusivamente un JSON válido con campos como: fecha_inicio, fecha_termino, monto_pesos, rut_arrendatario y clausula_multa.",
          goal: "Estructurar texto no estructurado con un esquema JSON preciso."
        },
        tools: [
          { name: "Google NotebookLM", url: "https://notebooklm.google.com", category: "Investigación", badgeColor: "bg-blue-100 text-blue-800 border-blue-200" },
          { name: "Claude AI", url: "https://claude.ai", category: "Asistente LLM", badgeColor: "bg-orange-100 text-orange-800 border-orange-200" }
        ],
        realExample: {
          company: "Clínica Las Condes",
          industry: "Salud e Instituciones Médicas",
          problem: "Miles de informes de altas médicas en texto libre imposibles de cruzar estadísticamente para estudios de brotes o epidemiología.",
          solution: "Uso de procesamiento de lenguaje natural (NLP) e IA para leer informes, extraer diagnósticos codificados (CIE-10) y guardarlos en una base analítica estructurada.",
          impact: "Detección temprana de correlaciones patológicas en minutos en lugar de semanas de lectura manual."
        },
        beginnerExplanation: {
          whatItMeans: "Los médicos escriben sus informes a mano o en textos libres llenos de abreviaciones. Si la clínica quiere saber cuántos pacientes tuvieron una neumonía específica este mes, un humano tendría que abrir y leer miles de PDFs uno por uno. Esto se llama 'datos no estructurados' y representa el 80% de la información de cualquier empresa.",
          howAiSolvesIt: "1) Visión por Computadora (OCR): Convierte imágenes de boletas y contratos escaneados en texto digital que la computadora puede leer.\n2) IA para Extraer Datos Clave: El modelo de IA (como Claude o Gemini) lee el texto libre del PDF y extrae automáticamente los datos importantes (rut, montos, diagnósticos) y los guarda en un formato estructurado (como un JSON).\n3) Indexación Inteligente: Convierte miles de cartas o fichas médicas desorganizadas en una base de datos ordenada donde se puede buscar por etiquetas de forma automática."
        }
      },
      3: {
        dataframe: {
          title: "df_resumen_reseñas_limpio",
          description: "Salida del motor de IA tras procesar comentarios crudos del portal web.",
          headers: ["id_reseña", "comentario_original", "sentimiento_ia", "urgencia_ia", "categoria_asertada"],
          rows: [
            { id_reseña: "REV-101", comentario_original: "El despacho tardó 3 días más de lo prometido. Pésimo.", sentimiento_ia: "NEGATIVO", urgencia_ia: "ALTA", categoria_asertada: "Logística / Envío" },
            { id_reseña: "REV-102", comentario_original: "La calidad es excelente, el material se siente super premium.", sentimiento_ia: "POSITIVO", urgencia_ia: "BAJA", categoria_asertada: "Calidad de Producto" },
            { id_reseña: "REV-103", comentario_original: "Me cobraron dos veces en la tarjeta pero solo tengo una orden.", sentimiento_ia: "NEGATIVO", urgencia_ia: "CRÍTICA", categoria_asertada: "Financiero / Facturación" }
          ]
        },
        prompt: {
          role: "Data Cleaning Expert with AI",
          text: "Tengo un listado de direcciones de clientes chilenos ingresadas con errores ortográficos y variaciones: ['Av. Providencia 120, depto 4', 'Providencia #120 dpto4, Stgo', 'Calle Providencia 120 d4']. Escribe un script en Python usando la API de Gemini que estandarice estas direcciones a un formato oficial único, separando: Calle, Número, Departamento, Comuna y Región.",
          goal: "Homologar datos sucios de texto mediante el razonamiento semántico del modelo."
        },
        tools: [
          { name: "OpenAI ChatGPT", url: "https://chatgpt.com", category: "Asistencia de Código", badgeColor: "bg-green-100 text-green-800 border-green-200" },
          { name: "Google Gemini", url: "https://gemini.google.com", category: "Modelos de IA", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200" }
        ],
        realExample: {
          company: "Falabella.com",
          industry: "E-Commerce Regional",
          problem: "Los sellers externos suben nombres de marcas de forma descuidada ('aple', 'SAMSUMG', 'Nike-original'), arruinando las búsquedas de los usuarios.",
          solution: "Implementación de una API que pre-clasifica y limpia de forma inteligente la ortografía y categoriza los productos usando modelos de lenguaje antes de publicarlos.",
          impact: "Reducción de un 42% en fallos de búsquedas internas y aumento del 12% en conversión de compra."
        },
        beginnerExplanation: {
          whatItMeans: "Cuando compras online, a veces escribes 'Av Providencia', otras 'Avenida provi' o 'Providencia 120'. Para una computadora, estas son tres direcciones completamente distintas. Lo mismo pasa cuando los vendedores externos suben productos y escriben 'aple' o 'SAMSUMG'. Si los datos están sucios, el buscador de la tienda no encontrará los productos y la logística enviará los pedidos al lugar equivocado.",
          howAiSolvesIt: "1) Razonamiento Semántico de la IA: A diferencia de las reglas rígidas de antes, la IA entiende el contexto ('aple' significa 'Apple') y corrige la ortografía automáticamente.\n2) Estandarización de Direcciones: Divide una dirección desordenada en partes perfectas (Calle, Número, Comuna) usando su conocimiento geográfico.\n3) Categorización Automatizada: Clasifica en milisegundos los productos y comentarios en categorías correctas, mejorando las búsquedas y la atención al cliente."
        }
      }
    },
    s2: {
      0: {
        dataframe: {
          title: "df_monitoreo_pipelines_etl",
          description: "Métricas de salud operativa de las tareas ETL que cargan la bodega de datos de marketing.",
          headers: ["id_pipeline", "fase_actual", "filas_leidas", "tiempo_carga_seg", "estado_operativo"],
          rows: [
            { id_pipeline: "ETL_Ventas_Diarias", fase_actual: "CARGANDO", filas_leidas: 450000, tiempo_carga_seg: 185, estado_operativo: "OK" },
            { id_pipeline: "ETL_Campañas_Google", fase_actual: "TRANSFORMANDO", filas_leidas: 24000, tiempo_carga_seg: 12, estado_operativo: "OK" },
            { id_pipeline: "ETL_Inventario_Locales", fase_actual: "COMPLETADO", filas_leidas: 98120, tiempo_carga_seg: 45, estado_operativo: "ÉXITO" },
            { id_pipeline: "ETL_Logistica_Despachos", fase_actual: "EXTRAYENDO", filas_leidas: 0, tiempo_carga_seg: 1200, estado_operativo: "ADVERTENCIA (TIMEOUT)" }
          ]
        },
        prompt: {
          role: "Data Engineer Senior",
          text: "Escribe un script en Python utilizando la biblioteca Pandas que realice el proceso de transformación (ETL) de un archivo CSV de ventas crudo. El script debe: 1) Cargar el archivo, 2) Eliminar filas duplicadas basadas en 'id_pedido', 3) Convertir las fechas al formato YYYY-MM-DD, 4) Reemplazar valores nulos en 'monto_descuento' por 0, y 5) Guardar el resultado limpio en un nuevo archivo Parquet.",
          goal: "Automatizar un pipeline de limpieza local usando herramientas estándar."
        },
        tools: [
          { name: "ChatGPT (Advanced Data Analysis)", url: "https://chatgpt.com", category: "Transformación de Datos", badgeColor: "bg-green-100 text-green-800 border-green-200" },
          { name: "Google Colab + Gemini", url: "https://colab.research.google.com", category: "Orquestación y Código", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200" }
        ],
        realExample: {
          company: "BCI Banco",
          industry: "Banca y Finanzas",
          problem: "Retrasos masivos en la generación de consolidados financieros para auditorías internas, por procesamiento secuencial rígido.",
          solution: "Migración de sus antiguas tareas ETL secuenciales en servidores físicos a una arquitectura elástica ELT basada en almacenamiento en la nube, procesando en paralelo.",
          impact: "Cierre contable disponible a las 7 AM todos los días, con un ahorro del 28% en horas de procesamiento de base de datos."
        }
      },
      1: {
        dataframe: {
          title: "df_monitoreo_apis",
          description: "Estatus de consumo de las APIs de proveedores de despacho externos.",
          headers: ["proveedor_api", "metodo_http", "latencia_ms", "cuota_diaria_usada", "codigo_respuesta"],
          rows: [
            { proveedor_api: "Chilexpress API", metodo_http: "POST /v1/cobertura", latencia_ms: 124, cuota_diaria_usada: "34,500 / 100,000", codigo_respuesta: "200 OK" },
            { proveedor_api: "Starken API", metodo_http: "GET /envio/status", latencia_ms: 450, cuota_diaria_usada: "12,900 / 50,000", codigo_respuesta: "200 OK" },
            { proveedor_api: "Correos Chile", metodo_http: "POST /boleta", latencia_ms: 1520, cuota_diaria_usada: "5,100 / 20,000", codigo_respuesta: "504 GATEWAY TIMEOUT" }
          ]
        },
        prompt: {
          role: "Desarrollador de Integraciones",
          text: "Escribe una función asíncrona en Node.js (TypeScript) que consuma una API externa que requiere autenticación tipo Bearer Token. Debe implementar una estrategia de reintentos con retraso exponencial (exponential backoff) en caso de recibir respuestas de error temporales (códigos de estado 500, 502, 503 o 504), reintentando un máximo de 3 veces.",
          goal: "Diseñar conexiones resilientes a APIs inestables de terceros."
        },
        tools: [
          { name: "Postman", url: "https://www.postman.com", category: "Desarrollo de APIs", badgeColor: "bg-amber-100 text-amber-800 border-amber-200" },
          { name: "Perplexity AI", url: "https://www.perplexity.ai", category: "Investigación", badgeColor: "bg-teal-100 text-teal-800 border-teal-200" }
        ],
        realExample: {
          company: "Mercado Libre",
          industry: "Logística y Comercio Electrónico",
          problem: "Falta de visualización y altos costos por re-consultar tarifas de transportistas externos manualmente para cada compra.",
          solution: "Integración de un hub de APIs que consulta tarifas en tiempo real usando un sistema de almacenamiento en caché para respuestas repetitivas de un mismo código postal.",
          impact: "Ahorro del 60% en llamadas a APIs de terceros y cálculo instantáneo de envíos para el usuario."
        }
      },
      2: {
        dataframe: {
          title: "df_batch_vs_streaming",
          description: "Métricas operativas del balance de tecnologías de ingesta por lote o continuo.",
          headers: ["id_tarea", "modo_ingesta", "volumen_promedio_dia", "latencia_procesamiento", "costo_infra_mes"],
          rows: [
            { id_tarea: "Ingesta de Balances Contables", modo_ingesta: "BATCH (Lote nocturno)", volumen_promedio_dia: "15 GB", latencia_procesamiento: "4 horas", costo_infra_mes: "$150 USD" },
            { id_tarea: "Logs de Navegación App", modo_ingesta: "STREAMING (Continuo)", volumen_promedio_dia: "1.2 TB", latencia_procesamiento: "850 milisegundos", costo_infra_mes: "$2,400 USD" },
            { id_tarea: "Detección Fraude Tarjetas", modo_ingesta: "STREAMING (Continuo)", volumen_promedio_dia: "80 GB", latencia_procesamiento: "45 milisegundos", costo_infra_mes: "$1,800 USD" }
          ]
        },
        prompt: {
          role: "Arquitecto de Datos Distribuidos",
          text: "Escribe una comparativa técnica detallada de los casos de uso específicos donde usar Apache Kafka (Streaming) es mandatorio frente a soluciones por lote (Batch) como consultar bases SQL duplicadas. Explica detalladamente el concepto de 'backpressure' y cómo influye en la estabilidad del sistema.",
          goal: "Entender el balance técnico y económico de infraestructuras en tiempo real."
        },
        tools: [
          { name: "Apache Kafka", url: "https://kafka.apache.org", category: "Streaming", badgeColor: "bg-neutral-100 text-neutral-800 border-neutral-200" },
          { name: "Google Pub/Sub", url: "https://cloud.google.com/pubsub", category: "Ingesta Nube", badgeColor: "bg-blue-100 text-blue-800 border-blue-200" }
        ],
        realExample: {
          company: "Copec (App Muevo)",
          industry: "Energía y Servicios de Movilidad",
          problem: "Los clientes no veían actualizados sus cupones de descuento ni puntos inmediatamente después de cargar combustible.",
          solution: "Cambio de un sistema batch por hora por un motor de streaming donde cada carga de combustible publica un evento instantáneo consumido por la app.",
          impact: "Incremento del 24% en satisfacción al cliente y fidelización activa de usuarios."
        }
      },
      3: {
        dataframe: {
          title: "df_automatizaciones_copilot",
          description: "Muestra de scripts generados por IA para integración de conectores.",
          headers: ["id_script", "proposito", "lenguaje_origen", "lineas_codigo", "porcentaje_precision"],
          rows: [
            { id_script: "con_salesforce", proposito: "Extracción automática de leads modificados", lenguaje_origen: "Python", lineas_codigo: 124, porcentaje_precision: "95%" },
            { id_script: "con_shopify", proposito: "Ingesta de órdenes en tiempo real a base de datos", lenguaje_origen: "Node.js", lineas_codigo: 210, porcentaje_precision: "92%" },
            { id_script: "limpieza_rut_cl", proposito: "Validador y formateador de RUT chileno con dígito verificador", lenguaje_origen: "Python", lineas_codigo: 45, porcentaje_precision: "99%" }
          ]
        },
        prompt: {
          role: "AI Copilot Architect",
          text: "Actúa como mi programador par. Necesito escribir un script en Python que use SQLAlchemy para conectarse a un PostgreSQL, lea la tabla 'usuarios_pendientes', valide que el campo 'email' sea correcto, y formatee el RUT al estándar '12.345.678-9'. Agrega comentarios técnicos claros y detallados para que mi equipo aprenda a mantenerlo.",
          goal: "Generar scripts limpios de infraestructura asistidos por inteligencia artificial."
        },
        tools: [
          { name: "Claude AI", url: "https://claude.ai", category: "Modelos de IA", badgeColor: "bg-orange-100 text-orange-800 border-orange-200" },
          { name: "GitHub Copilot", url: "https://github.com/features/copilot", category: "Asistente Código", badgeColor: "bg-slate-100 text-slate-800 border-slate-200" }
        ],
        realExample: {
          company: "NotCo",
          industry: "Alimentos y Biotech",
          problem: "Altos tiempos de ingeniería en conectar y unificar datos químicos de plantas exóticas investigadas de múltiples fuentes internacionales.",
          solution: "Utilización de copilotos de código entrenados para acelerar la creación de scripts de ingesta y parseadores químicos automáticos.",
          impact: "Ingenieros de datos desplegaron conectores 3 veces más rápido, acelerando los tiempos de I+D del algoritmo Giuseppe."
        }
      }
    },
    s3: {
      0: {
        dataframe: {
          title: "df_carga_cognitiva_visual",
          description: "Análisis del impacto visual de elementos redundantes en tableros de control directivos.",
          headers: ["id_elemento", "tipo_gráfico", "cantidad_colores", "tiene_leyenda_redundante", "segundos_entender_kpi"],
          rows: [
            { id_elemento: "Gráfico de Torta Regional", tipo_gráfico: "Torta (Pie Chart)", cantidad_colores: 18, tiene_leyenda_redundante: "SÍ", segundos_entender_kpi: "14.5 segundos" },
            { id_elemento: "Ventas Mensuales", tipo_gráfico: "Barras Acumuladas", cantidad_colores: 8, tiene_leyenda_redundante: "SÍ", segundos_entender_kpi: "8.2 segundos" },
            { id_elemento: "Evolución de Ticket Promedio", tipo_gráfico: "Líneas Limpias", cantidad_colores: 1, tiene_leyenda_redundante: "NO (directo)", segundos_entender_kpi: "1.4 segundos" }
          ]
        },
        prompt: {
          role: "Diseñador de Experiencia Analítica (UX/UI para Datos)",
          text: "Tengo un dashboard con un mapa regional, dos gráficos de torta con 12 categorías cada uno, una tabla detallada con 50 columnas y 4 tarjetas de KPIs parpadeantes. Explica de forma detallada cómo puedo aplicar principios Gestalt de Proximidad, Contraste y Simplificación para re-estructurarlo y evitar que el gerente general sufra fatiga visual.",
          goal: "Dominar la jerarquía visual y reducir la carga cognitiva analítica."
        },
        tools: [
          { name: "Figma", url: "https://www.figma.com", category: "Diseño Interfaz", badgeColor: "bg-rose-100 text-rose-800 border-rose-200" },
          { name: "Power BI", url: "https://powerbi.microsoft.com", category: "Dashboarding", badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200" }
        ],
        realExample: {
          company: "Cornershop by Uber",
          industry: "Despachos y Last-Mile Delivery",
          problem: "Los paneles operativos de monitoreo de despachos tenían cientos de números parpadeando, impidiendo identificar compras realmente retrasadas.",
          solution: "Rediseño completo de la interfaz, agrupando por estados semánticos (Verde, Amarillo, Rojo) y ocultando datos finos que solo se muestran con doble clic.",
          impact: "Reducción del 50% en retrasos de asignación al ver de inmediato las anomalías en el mapa."
        }
      },
      1: {
        dataframe: {
          title: "df_kpi_accionables_vs_vanidad",
          description: "Comparativa y diagnóstico de métricas de rendimiento comercial.",
          headers: ["metrica_estudiada", "es_vanidad", "es_accionable", "riesgo_asociado", "alternativa_accionable"],
          rows: [
            { metrica_estudiada: "Visitas totales al sitio", es_vanidad: "SÍ", es_accionable: "NO", riesgo_asociado: "Da falsa sensación de éxito sin ventas reales", alternativa_accionable: "Tasa de conversión de carrito" },
            { metrica_estudiada: "Costo de Adquisición de Cliente (CAC)", es_vanidad: "NO", es_accionable: "SÍ", riesgo_asociado: "Ninguno (es una métrica crítica de finanzas)", alternativa_accionable: "Métrica ya óptima" },
            { metrica_estudiada: "Descargas acumuladas app", es_vanidad: "SÍ", es_accionable: "NO", riesgo_asociado: "Oculta el abandono inmediato de la aplicación", alternativa_accionable: "Usuarios activos mensuales (MAU)" }
          ]
        },
        prompt: {
          role: "Asesor de Negocio y BI",
          text: "Escribe una guía metodológica breve para el equipo de marketing. Define la fórmula exacta del Customer Lifetime Value (LTV) y el Customer Acquisition Cost (CAC) y explica qué decisiones operativas de presupuesto de marketing debemos tomar si la relación LTV/CAC cae por debajo de 3.",
          goal: "Definir y accionar KPIs reales para el éxito estratégico de una startup."
        },
        tools: [
          { name: "Google Sheets", url: "https://docs.google.com/spreadsheets", category: "Modelamiento", badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200" },
          { name: "Gemini", url: "https://gemini.google.com", category: "Modelos de IA", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200" }
        ],
        realExample: {
          company: "LATAM Airlines",
          industry: "Aerolíneas y Transporte Aéreo",
          problem: "El equipo de marketing celebraba que el tráfico del sitio subía un 20%, pero las ventas de pasajes seguían estancadas.",
          solution: "Eliminación de visitas como indicador clave, instalando la tasa de conversión por ruta en el centro del dashboard de los ejecutivos.",
          impact: "Aumento del 8% en facturación al focalizar inversión solo en rutas con baja ocupación activa."
        }
      },
      2: {
        dataframe: {
          title: "df_storytelling_títulos",
          description: "Muestra de títulos convencionales de gráficos frente a títulos de storytelling analítico asertivo.",
          headers: ["id_grafico", "titulo_tradicional", "titulo_storytelling_asertivo", "insight_clave_transmitido"],
          rows: [
            { id_grafico: "CHART-01", titulo_tradicional: "Ventas del Año", titulo_storytelling_asertivo: "Las ventas cayeron un 12% por escasez de stock de importación en Q2", insight_clave_transmitido: "Identifica la causa del problema y no solo el resultado" },
            { id_grafico: "CHART-02", titulo_tradicional: "Satisfacción de Clientes", titulo_storytelling_asertivo: "La atención por WhatsApp superó en un 30% en agrado a la telefónica", insight_clave_transmitido: "Evidencia el mejor canal para tomar decisiones de asignación" },
            { id_grafico: "CHART-03", titulo_tradicional: "Tasa de Fuga", titulo_storytelling_asertivo: "Perdemos un 5% de clientes por lentitud en el onboarding", insight_clave_transmitido: "Focaliza el esfuerzo del equipo en la etapa de registro" }
          ]
        },
        prompt: {
          role: "Consultor de Storytelling Analítico",
          text: "Tengo un gráfico de líneas que muestra la retención de clientes en una app fintech bajando mes a mes durante un año. Ayúdame a estructurar una presentación corta de 3 diapositivas aplicando el arco narrativo clásico de datos: Diapositiva 1 (Contexto / Onboarding), Diapositiva 2 (Conflicto / El por qué de la caída), Diapositiva 3 (Resolución / Qué acciones concretas debemos gatillar).",
          goal: "Saber convencer a directores ejecutivos mediante una narrativa sólida apoyada en datos."
        },
        tools: [
          { name: "PowerPoint / Slides", url: "https://docs.google.com/presentation", category: "Presentación", badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200" },
          { name: "Claude AI", url: "https://claude.ai", category: "Análisis Narrativo", badgeColor: "bg-orange-100 text-orange-800 border-orange-200" }
        ],
        realExample: {
          company: "Enel Distribución",
          industry: "Energía y Utilidades Públicas",
          problem: "Los directores corporativos ignoraban los reportes energéticos masivos porque contenían tablas ilegibles de gigavatios.",
          solution: "Adopción de títulos accionables en los gráficos que explicaban directamente las anomalías de sobrecarga en subestaciones eléctricas.",
          impact: "Reducción del 40% en retrasos de aprobación de inversiones preventivas de infraestructura."
        }
      },
      3: {
        dataframe: {
          title: "df_componentes_frontend_ia",
          description: "Registro de componentes de gráficos reactivos creados mediante lenguaje natural asistido.",
          headers: ["tipo_grafico", "libreria", "interactividad_solicitada", "tiempo_desarrollo_con_ia", "lineas_codigo"],
          rows: [
            { tipo_grafico: "Barras Horizontales con Alerta", libreria: "Recharts (React)", interactividad_solicitada: "Tooltips y cambio dinámico de color si está bajo meta", tiempo_desarrollo_con_ia: "4 minutos", lineas_codigo: 84 },
            { tipo_grafico: "Mapa de Calor de Ventas", libreria: "D3.js (JS)", interactividad_solicitada: "Zoom dinámico e indexado de coordenadas geográficas", tiempo_desarrollo_con_ia: "15 minutos", lineas_codigo: 180 },
            { tipo_grafico: "Líneas de Margen de Ganancia", libreria: "Chart.js (React)", interactividad_solicitada: "Ocultar / Mostrar líneas mediante clicks en leyendas", tiempo_desarrollo_con_ia: "2 minutos", lineas_codigo: 54 }
          ]
        },
        prompt: {
          role: "Frontend Engineer focused on BI",
          text: "Escribe el código completo de un componente de React que utilice la librería Recharts para mostrar un gráfico de líneas interactivo. Los datos de entrada son un array de objetos con meses y tasas de conversión. El gráfico debe tener tooltip personalizado, líneas suaves tipo 'monotone' en color índigo, y una línea de referencia horizontal en color rojo en la meta del 2.5%.",
          goal: "Aprender a generar visualizaciones interactivas listas para usar."
        },
        tools: [
          { name: "Recharts", url: "https://recharts.org", category: "Librería Gráficos", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200" },
          { name: "v0 by Vercel", url: "https://v0.dev", category: "Generador UI", badgeColor: "bg-slate-100 text-slate-800 border-slate-200" }
        ],
        realExample: {
          company: "Finning CAT",
          industry: "Maquinaria Industrial y Minera",
          problem: "Los ingenieros tardaban semanas en programar a mano componentes visuales a medida solicitados por los clientes para ver el uso de excavadoras.",
          solution: "Utilización de herramientas generativas de UI para maquetar visualmente componentes de gráficos interactivos listos en minutos.",
          impact: "Reducción de semanas a solo 2 días en el ciclo de diseño y aprobación de prototipos de clientes."
        }
      }
    },
    s4: {
      0: {
        dataframe: {
          title: "df_latencias_tiempo_real",
          description: "Diagnóstico de la latencia y costos operativos en sistemas en tiempo real frente a batch.",
          headers: ["caso_uso", "latencia_promedio_obtenida", "arquitectura_tecnica", "costo_computacional", "tolerancia_retraso"],
          rows: [
            { caso_uso: "Trading financiero de divisas", latencia_promedio_obtenida: "12 microsegundos", arquitectura_tecnica: "Enrutamiento ultra-baja latencia (C++)", costo_computacional: "Extremadamente alto", tolerancia_retraso: "0 segundos" },
            { caso_uso: "Recomendaciones de E-Commerce", latencia_promedio_obtenida: "1.2 segundos", arquitectura_tecnica: "Bases de datos en memoria (Redis)", costo_computacional: "Alto", tolerancia_retraso: "Hasta 5 segundos" },
            { caso_uso: "Alertas de IoT Minero", latencia_promedio_obtenida: "50 milisegundos", arquitectura_tecnica: "Suscripción por eventos MQTT", costo_computacional: "Moderado", tolerancia_retraso: "Hasta 2 segundos" }
          ]
        },
        prompt: {
          role: "Arquitecto de Infraestructura Escalable",
          text: "Escribe un análisis técnico que justifique ante el gerente de TI cuándo se requiere implementar verdaderamente una base de datos en tiempo real como Redis para caché de sesión, frente al uso tradicional de consultas directas en PostgreSQL. Detalla el impacto en los costos mensuales de la nube.",
          goal: "Saber decidir cuándo amerita financieramente el tiempo real."
        },
        tools: [
          { name: "Redis", url: "https://redis.io", category: "Base de Datos en Memoria", badgeColor: "bg-red-100 text-red-800 border-red-200" },
          { name: "Apache Flink", url: "https://flink.apache.org", category: "Procesamiento de Stream", badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200" }
        ],
        realExample: {
          company: "Transbank",
          industry: "Pasarelas de Pago y FinTech",
          problem: "Durante los CyberDays chilenos, las consultas tradicionales de bases de datos colapsaban los flujos de pago, perdiendo miles de transacciones por segundo.",
          solution: "Implementación de una pasarela con procesamiento asíncrono y almacenamiento temporal ultrarrápido en memoria para pre-autorizaciones.",
          impact: "Cero caídas durante eventos masivos, procesando más de 8,000 compras por minuto con éxito."
        }
      },
      1: {
        dataframe: {
          title: "df_eventos_ingesta_mensajeria",
          description: "Mapeo de eventos publicados en vivo en el e-commerce.",
          headers: ["id_evento", "topico_evento", "sistema_origen", "sistema_suscriptor", "tiempo_enrutado_ms"],
          rows: [
            { id_evento: "EV-0091", topico_evento: "pago_aprobado", sistema_origen: "Servicio_Pagos", sistema_suscriptor: "Logística, Alertas_SMS, BI_Dashboard", tiempo_enrutado_ms: "2 ms" },
            { id_evento: "EV-0092", topico_evento: "stock_critico", sistema_origen: "Servicio_Inventario", sistema_suscriptor: "Compras_Automatizadas, Alerta_Soporte", tiempo_enrutado_ms: "4 ms" },
            { id_evento: "EV-0093", topico_evento: "carrito_abandonado", sistema_origen: "Web_Front", sistema_suscriptor: "Marketing_Campañas", tiempo_enrutado_ms: "5 ms" }
          ]
        },
        prompt: {
          role: "Especialista en Microservicios",
          text: "Diseña un diagrama de arquitectura Mermaid.js de un e-commerce orientado a eventos. El diagrama debe mostrar un broker de mensajería central (Kafka) recibiendo eventos como 'orden_creada', 'pago_exitoso' y 'envio_despachado', con servicios de Facturación, Inventario y Alertas al Cliente consumiendo estos eventos en paralelo.",
          goal: "Saber estructurar aplicaciones escalables desacopladas."
        },
        tools: [
          { name: "Apache Kafka", url: "https://kafka.apache.org", category: "Broker de Eventos", badgeColor: "bg-neutral-100 text-neutral-800 border-neutral-200" },
          { name: "RabbitMQ", url: "https://www.rabbitmq.com", category: "Colas de Mensajes", badgeColor: "bg-orange-100 text-orange-800 border-orange-200" }
        ],
        realExample: {
          company: "Rappi",
          industry: "Delivery Regional",
          problem: "Cada pedido realizado saturaba la base de datos central al intentar escribir simultáneamente el cobro, la asignación de repartidor y la alerta del restaurante.",
          solution: "Desacoplar la aplicación en microservicios independientes que se comunican exclusivamente enviando mensajes inmutables de eventos rápidos.",
          impact: "Reducción de caídas de aplicación en horas pico de almuerzo en un 99%."
        }
      },
      2: {
        dataframe: {
          title: "df_flujo_sensores_iot",
          description: "Datos en tránsito de los sensores mecánicos en los camiones de extracción.",
          headers: ["id_sensor", "tipo_variable", "valor_leido", "timestamp_emision", "es_anomalia_critica"],
          rows: [
            { id_sensor: "SEN-ENG-891", tipo_variable: "Temperatura Motor", valor_leido: 96.5, timestamp_emision: "2026-07-06 18:04:15", es_anomalia_critica: "NO" },
            { id_sensor: "SEN-ENG-891", tipo_variable: "Temperatura Motor", valor_leido: 112.4, timestamp_emision: "2026-07-06 18:04:20", es_anomalia_critica: "SÍ (ALERTA)" },
            { id_sensor: "SEN-PRS-102", tipo_variable: "Presión Neumático", valor_leido: 34.2, timestamp_emision: "2026-07-06 18:04:18", es_anomalia_critica: "NO" }
          ]
        },
        prompt: {
          role: "IoT Solutions Engineer",
          text: "Escribe una plantilla de arquitectura técnica que describa el flujo de datos completo (ingesta MQTT, broker Apache Kafka, procesamiento analítico con Spark Streaming y visualización WebSocket) para un proyecto que requiere monitorear en tiempo real la temperatura de 50 camiones en una mina.",
          goal: "Planificar proyectos de monitoreo industrial de extremo a extremo."
        },
        tools: [
          { name: "WebSockets", url: "https://developer.mozilla.org/es/docs/Web/API/WebSockets_API", category: "Protocolo de Red", badgeColor: "bg-blue-100 text-blue-800 border-blue-200" },
          { name: "Google Cloud IoT", url: "https://cloud.google.com/solutions/iot", category: "Servicios IoT", badgeColor: "bg-slate-100 text-slate-800 border-slate-200" }
        ],
        realExample: {
          company: "Metro de Santiago",
          industry: "Transporte Público Masivo",
          problem: "Rupturas y fallos en rieles y bogies de trenes se detectaban únicamente cuando la máquina se detenía, provocando suspensiones de servicio.",
          solution: "Instalación de acelerómetros IoT en las ruedas que transmiten vibraciones en streaming. Un algoritmo analiza las frecuencias y reporta desgastes invisibles.",
          impact: "Reducción del 30% en fallos catastróficos y mantenimiento de trenes 100% predictivo."
        }
      },
      3: {
        dataframe: {
          title: "df_alertas_inteligentes_ia",
          description: "Historial de alertas redactadas y priorizadas de forma autónoma por el agente analítico.",
          headers: ["id_alerta", "codigo_anomalia_tecnico", "prioridad_asignada", "explicacion_humanizada_ia", "operador_notificado"],
          rows: [
            { id_alerta: "ALT-88", codigo_anomalia_tecnico: "ERR_CODE_405_DB", prioridad_asignada: "ALTA", explicacion_humanizada_ia: "La base de datos de envíos superó el 90% de almacenamiento. Riesgo inminente de detención del sistema.", operador_notificado: "Supervisor de Turno TI" },
            { id_alerta: "ALT-89", codigo_anomalia_tecnico: "TEMP_WARN_110", prioridad_asignada: "CRÍTICA", explicacion_humanizada_ia: "El motor principal está recalentándose y superó los 110°C hace más de 30 segundos. Se sugiere apagar inmediatamente.", operador_notificado: "Técnico en Terreno" },
            { id_alerta: "ALT-90", codigo_anomalia_tecnico: "DROP_RATE_05", prioridad_asignada: "MEDIA", explicacion_humanizada_ia: "Tasa de conversión bajó un 10% en la última hora. Posible error en el portal de checkout.", operador_notificado: "Líder de Soporte E-commerce" }
          ]
        },
        prompt: {
          role: "AI Agent Specialist",
          text: "Eres un Agente de IA que supervisa un canal de Slack para el equipo técnico. Tu tarea es recibir un log técnico de error crudo (ej: 'Exception in thread main java.lang.NullPointerException: Cannot invoke DatabaseConnection.execute()') y traducirlo en un mensaje corto, amable, de alerta para Slack que explique: 1) Qué ocurrió en palabras sencillas, 2) Qué tan grave es, y 3) Qué pasos sugeridos debe seguir el ingeniero de turno.",
          goal: "Humanizar errores de código mediante explicaciones asertivas del modelo."
        },
        tools: [
          { name: "Gemini Pro API", url: "https://ai.google.dev", category: "API de Inteligencia", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200" },
          { name: "LangChain", url: "https://www.langchain.com", category: "Framework de Agentes", badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200" }
        ],
        realExample: {
          company: "Codelco",
          industry: "Minería del Cobre",
          problem: "Los chancadores de roca producían fallas costosas de reparar. Los operarios no podían interpretar los complejos códigos hexadecimales de error del sistema.",
          solution: "Un agente inteligente monitorea el flujo de datos técnicos y, al detectar un patrón de desgaste, emite una alerta detallando la pieza exacta a sustituir.",
          impact: "Ahorro de más de $1.2M USD anuales en repuestos mecánicos al detener las máquinas de forma programada."
        }
      }
    },
    s5: {
      0: {
        dataframe: {
          title: "df_cuatro_pilares_sintesis",
          description: "Tabla de resumen que unifica las tecnologías idóneas por cada pilar de la analítica moderna.",
          headers: ["pilar_arquitectura", "tecnologia_lider_industria", "ventaja_critica", "nivel_complejidad", "riesgo_por_omitir"],
          rows: [
            { pilar_arquitectura: "1. Ingesta Eficaz", tecnologia_lider_industria: "ChatGPT / Google Colab", ventaja_critica: "Automatiza y orquesta tareas", nivel_complejidad: "Baja", riesgo_por_omitir: "Cargar datos sucios u obsoletos" },
            { pilar_arquitectura: "2. Almacenamiento", tecnologia_lider_industria: "Google BigQuery / Snowflake", ventaja_critica: "Escalabilidad elástica de queries", nivel_complejidad: "Baja", riesgo_por_omitir: "Consultas lentas que congelan el negocio" },
            { pilar_arquitectura: "3. Visualización", tecnologia_lider_industria: "Power BI / Recharts", ventaja_critica: "Reduce carga cognitiva de directivos", nivel_complejidad: "Baja", riesgo_por_omitir: "Directivos toman decisiones a ciegas" },
            { pilar_arquitectura: "4. Tiempo Real", tecnologia_lider_industria: "Apache Kafka / Redis", ventaja_critica: "Detección inmediata de alertas", nivel_complejidad: "Alta", riesgo_por_omitir: "Enterarse de fraudes o fallos horas tarde" }
          ]
        },
        prompt: {
          role: "Arquitecto Jefe de Datos",
          text: "Escribe una propuesta de arquitectura unificada para una aplicación financiera de inversiones chilena. Debe incorporar los 4 pilares de datos explicados en clase. Describe qué tecnologías específicas usarías y cómo fluye el dato de un pilar a otro en un diagrama Mermaid.",
          goal: "Consolidar los conocimientos adquiridos en un diseño técnico completo."
        },
        tools: [
          { name: "Google BigQuery", url: "https://cloud.google.com/bigquery", category: "Bodega de Datos", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200" },
          { name: "Claude AI", url: "https://claude.ai", category: "Consultoría Arquitectura", badgeColor: "bg-orange-100 text-orange-800 border-orange-200" }
        ],
        realExample: {
          company: "Netflix",
          industry: "Streaming de Entretenimiento",
          problem: "Los usuarios abandonaban la plataforma a los 3 minutos si no encontraban algo atractivo, requiriendo afinar el motor de sugerencias.",
          solution: "Unión de los 4 pilares: Ingesta de clicks de usuarios, almacenamiento masivo de reproducciones, IA estimando afinidad e interfaz mostrando el carrusel personalizado dinámico.",
          impact: "Retención del 93% de usuarios activos diarios mediante personalización de portadas."
        }
      },
      1: {
        dataframe: {
          title: "df_fases_mvp_datos",
          description: "Cronograma ágil de despliegue para validar productos de datos impulsados por inteligencia artificial.",
          headers: ["fase_cronograma", "objetivo_prioritario", "metrica_exito_fase", "tiempo_estimado_semanas"],
          rows: [
            { fase_cronograma: "Fase 1: Estudio & Investigación", objetivo_prioritario: "Entender el dolor real del usuario final", metrica_exito_fase: "Entrevistas completadas e hipótesis validadas", tiempo_estimado_semanas: "Semana 1" },
            { fase_cronograma: "Fase 2: Mockups & Prototipo IA", objetivo_prioritario: "Crear interfaz básica conectada a prompts manuales", metrica_exito_fase: "Feedback de usuarios sobre el valor de la IA", tiempo_estimado_semanas: "Semana 2" },
            { fase_cronograma: "Fase 3: Pipelines Mínimos", objetivo_prioritario: "Automatizar extracción y carga del lote inicial", metrica_exito_fase: "Estructuración de datos sin errores de consistencia", tiempo_estimado_semanas: "Semana 3" },
            { fase_cronograma: "Fase 4: Despliegue de MVP", objetivo_prioritario: "Lanzamiento y medición de adopción real", metrica_exito_fase: "Tasa de uso activo diaria superior al 40%", tiempo_estimado_semanas: "Semana 4" }
          ]
        },
        prompt: {
          role: "Product Owner de Datos",
          text: "Escribe un plan de producto de datos para una solución de recomendación de compra en una tienda de e-commerce. Tu objetivo es proponer un MVP de 3 semanas que valide si a los clientes les gustan las recomendaciones automatizadas por un LLM, utilizando la menor cantidad de infraestructura posible para reducir riesgos.",
          goal: "Adoptar filosofías ágiles de desarrollo de software para validar ideas rápidamente."
        },
        tools: [
          { name: "Notion", url: "https://www.notion.so", category: "Planificación", badgeColor: "bg-slate-100 text-slate-800 border-slate-200" },
          { name: "Miro", url: "https://www.miro.com", category: "Modelado Visual", badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200" }
        ],
        realExample: {
          company: "Fintual",
          industry: "Asesorías Financieras y FinTech",
          problem: "Crear un asesor automatizado de portafolios de inversión en base a perfiles psicológicos es caro y complejo.",
          solution: "Lanzamiento rápido de un prototipo básico de chat de texto libre en una tarde, donde asesores humanos redactaban respuestas usando IA para validar el interés.",
          impact: "Validación de la idea en una semana, lo que justificó el desarrollo del algoritmo definitivo."
        }
      },
      2: {
        dataframe: {
          title: "df_anonimizacion_privacidad",
          description: "Mapeo de datos sensibles de clientes y su técnica recomendada de anonimización para cumplir con el regulador.",
          headers: ["nombre_campo_sensible", "tipo_sensibilidad", "tecnica_anonimizacion", "nivel_seguridad_final", "regulación_aplicable"],
          rows: [
            { nombre_campo_sensible: "nombre_cliente", PII: "ALTO", tecnica_anonimizacion: "Sustitución por Pseudónimos (Faker)", nivel_seguridad_final: "Óptimo", regulación_aplicable: "Ley de Protección de Datos Personales" },
            { nombre_campo_sensible: "rut_identificador", PII: "EXTREMO", tecnica_anonimizacion: "Hashing irreversible (SHA-256 + Salt)", nivel_seguridad_final: "Extremo", regulación_aplicable: "Regulación Financiera CMF" },
            { nombre_campo_sensible: "telefono_contacto", PII: "ALTO", tecnica_anonimizacion: "Enmascaramiento parcial (••••-••45)", nivel_seguridad_final: "Alto", regulación_aplicable: "Políticas Internas GDPR" }
          ]
        },
        prompt: {
          role: "Oficial de Seguridad de Datos (DPO)",
          text: "Escribe un script en Python que reciba un dataframe con columnas 'Nombre', 'Rut', 'Teléfono' e 'Ingresos' de clientes reales chilenos. El script debe generar una copia del dataframe donde los nombres sean reemplazados por alias ficticios, los RUTs sean hasheados de forma irreversible usando SHA-256 con un valor salt secreto, y los teléfonos estén enmascarados parcialmente, de forma que el set de datos sea seguro de enviar a un analista externo.",
          goal: "Implementar técnicas reales de anonimización para proteger la privacidad."
        },
        tools: [
          { name: "Microsoft Presidio", url: "https://microsoft.github.io/presidio/", category: "Privacidad de Datos", badgeColor: "bg-blue-100 text-blue-800 border-blue-200" },
          { name: "ChatGPT", url: "https://chatgpt.com", category: "Modelos de IA", badgeColor: "bg-green-100 text-green-800 border-green-200" }
        ],
        realExample: {
          company: "Consorcio Seguros",
          industry: "Seguros de Vida y Previsión",
          problem: "Los científicos de datos necesitaban historiales de salud para crear modelos de riesgo, pero la ley prohíbe exponer la identidad de los asegurados.",
          solution: "Implementación de un túnel automático de encriptación que anonimiza por completo la información médica antes de ingresarla al Data Lake analítico.",
          impact: "Cumplimiento al 100% de la normativa chilena vigente de privacidad de datos, permitiendo innovar con seguridad."
        }
      },
      3: {
        dataframe: {
          title: "df_entornos_operaciones_ops",
          description: "Muestra de configuraciones de infraestructura en producción para escalado de scripts analíticos.",
          headers: ["ambiente", "escalabilidad_esperada", "tiempo_aprovisionamiento", "herramientas_despliegue_ops", "riesgo_falla"],
          rows: [
            { ambiente: "Google Colab / Local", escalabilidad_esperada: "Inviable para producción", tiempo_aprovisionamiento: "Inmediato", herramientas_despliegue_ops: "Ejecución manual interactiva", riesgo_falla: "Extremo (se apaga la pestaña)" },
            { ambiente: "Docker + Cloud Run", escalabilidad_esperada: "Escalado automático a demanda", tiempo_aprovisionamiento: "3 minutos", herramientas_despliegue_ops: "Scripts de Terraform / GitHub Actions", riesgo_falla: "Bajo (monitoreado)" },
            { ambiente: "Kubernetes Cluster (GKE)", escalabilidad_esperada: "Infinita (escala corporativa)", tiempo_aprovisionamiento: "10 minutos", herramientas_despliegue_ops: "Orquestación de microservicios robusta", riesgo_falla: "Bajo" }
          ]
        },
        prompt: {
          role: "Ingeniero Cloud DevOps Senior",
          text: "Escribe un archivo Dockerfile paso a paso y optimizado para empaquetar un script de Python que ejecuta un pipeline ETL. El Dockerfile debe basarse en una imagen ligera (python:3.10-slim), instalar dependencias listadas en un requirements.txt, configurar variables de entorno seguras y definir el entrypoint de inicio automático de la tarea.",
          goal: "Aprender a empaquetar y dockerizar código analítico para entornos estables."
        },
        tools: [
          { name: "Docker", url: "https://www.docker.com", category: "Contenedores", badgeColor: "bg-blue-100 text-blue-800 border-blue-200" },
          { name: "Google Cloud Run", url: "https://cloud.google.com/run", category: "Computación Escalable", badgeColor: "bg-slate-100 text-slate-800 border-slate-200" }
        ],
        realExample: {
          company: "Sodimac",
          industry: "Retail y Construcción",
          problem: "Los scripts de predicción de demanda logística corrían en la computadora personal de un científico de datos. Si se cortaba la luz, las tiendas se quedaban desabastecidas.",
          solution: "Contenedorización del modelo mediante Docker, programado para autoejecutarse en la nube todas las noches mediante pipelines automatizados de CI/CD.",
          impact: "Abastecimiento continuo automático para más de 250 locales comerciales de Sodimac en toda América Latina."
        }
      }
    }
  };

  const currentData = sandboxData[sessionId]?.[topicIdx];

  const handleCopyPrompt = () => {
    if (!currentData) return;
    navigator.clipboard.writeText(currentData.prompt.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!currentData || !currentData.dataframe) return;
    const { headers, rows, title } = currentData.dataframe;
    
    const csvRows = [headers.join(',')];
    rows.forEach(row => {
      const values = headers.map(header => {
        const val = row[header];
        const stringVal = val === undefined || val === null ? '' : val.toString();
        if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
          return `"${stringVal.replace(/"/g, '""')}"`;
        }
        return stringVal;
      });
      csvRows.push(values.join(','));
    });
    
    const csvContent = "\uFEFF" + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${title || 'dataframe'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!currentData) return null;

  const filteredRows = currentData.dataframe.rows.filter(row =>
    Object.values(row).some(val => 
      val.toString().toLowerCase().includes(dfSearch.toLowerCase())
    )
  );

  return (
    <div className="mt-8 border border-indigo-100 rounded-3xl bg-white shadow-md overflow-hidden transition-all duration-300">
      {/* Header title */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2.5">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-sm shadow-indigo-600/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unidad de Integración Técnica</h4>
            <h3 className="text-sm font-extrabold text-slate-800 leading-tight">Caso Práctico e Integración con IA</h3>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 space-y-8">
        {/* SECTION 1: Caso de Estudio y Guía de Entendimiento Práctico */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2.5">
              <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-extrabold text-slate-800 text-sm leading-tight">
                  Caso Real: {currentData.realExample.company}
                </h5>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Industria: {currentData.realExample.industry}
                </p>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full">
              Impacto: {currentData.realExample.impact}
            </span>
          </div>

          {currentData.beginnerExplanation && (
            <div className="bg-gradient-to-br from-indigo-50/60 to-purple-50/40 p-5 rounded-2xl border border-indigo-100/70 shadow-sm space-y-4">
              <div className="flex items-center space-x-2">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-[10.5px] font-extrabold text-indigo-800 uppercase tracking-wider">
                  🔰 Guía de Entendimiento y Contexto
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h6 className="text-[11px] font-extrabold text-slate-800 mb-1">
                    ¿Qué significa este caso en el mundo real?
                  </h6>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {currentData.beginnerExplanation.whatItMeans}
                  </p>
                </div>
                
                <div className="pt-2 border-t border-slate-200/50">
                  <h6 className="text-[11px] font-extrabold text-indigo-950 mb-1">
                    ¿Cómo lo resuelve la IA Generativa y el Canal de Ingesta Digital?
                  </h6>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                    {currentData.beginnerExplanation.howAiSolvesIt}
                  </p>
                </div>

                {/* Visual Flow diagram for Black Friday case specifically */}
                {currentData.dataframe.title === "df_caos_black_friday" && (
                  <div className="pt-3 border-t border-slate-200/50">
                    <h6 className="text-[11px] font-extrabold text-indigo-950 mb-3">
                      📊 Flujo del Proceso en la Clase (De Datos Crudos a Inventario en Tiempo Real):
                    </h6>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-white/90 p-4 rounded-2xl border border-indigo-50/80 shadow-inner">
                      <div className="flex flex-col items-center text-center min-w-[70px]">
                        <span className="text-lg">🛍️</span>
                        <span className="text-[10px] font-extrabold text-slate-800 mt-1">Ventas</span>
                        <span className="text-[9px] text-slate-400 font-medium leading-none">Multicanal</span>
                      </div>
                      <div className="text-indigo-400 font-bold text-sm rotate-90 sm:rotate-0">➔</div>
                      <div className="flex flex-col items-center text-center min-w-[70px]">
                        <span className="text-lg">📋</span>
                        <span className="text-[10px] font-extrabold text-slate-800 mt-1">DF Recibido</span>
                        <span className="text-[9px] text-rose-500 font-bold leading-none">Inconsistente</span>
                      </div>
                      <div className="text-indigo-400 font-bold text-sm rotate-90 sm:rotate-0">➔</div>
                      <div className="flex flex-col items-center text-center bg-gradient-to-br from-indigo-50 to-purple-50 px-3 py-1.5 rounded-xl border border-indigo-100 min-w-[90px] shadow-sm">
                        <span className="text-lg animate-bounce">🤖</span>
                        <span className="text-[10px] font-extrabold text-indigo-800 mt-0.5">IA Generativa</span>
                        <span className="text-[8px] text-purple-600 font-bold leading-none uppercase tracking-wider">Corrige & Sanea</span>
                      </div>
                      <div className="text-indigo-400 font-bold text-sm rotate-90 sm:rotate-0">➔</div>
                      <div className="flex flex-col items-center text-center min-w-[70px]">
                        <span className="text-lg">✨</span>
                        <span className="text-[10px] font-extrabold text-slate-800 mt-1">DF Limpio</span>
                        <span className="text-[9px] text-emerald-600 font-bold leading-none">Normalizado</span>
                      </div>
                      <div className="text-indigo-400 font-bold text-sm rotate-90 sm:rotate-0">➔</div>
                      <div className="flex flex-col items-center text-center min-w-[70px]">
                        <span className="text-lg">📈</span>
                        <span className="text-[10px] font-extrabold text-slate-800 mt-1">Stock Actual</span>
                        <span className="text-[9px] text-blue-600 font-bold leading-none">En Tiempo Real</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
              <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                El Desafío / Problema Inicial
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {currentData.realExample.problem}
              </p>
            </div>
            <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/60">
              <span className="text-[9.5px] font-bold text-emerald-600 uppercase tracking-wider block mb-1.5">
                La Solución Técnica Desplegada
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {currentData.realExample.solution}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Dataframe Tabular */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="font-mono text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md border border-indigo-100 font-bold">
                  {currentData.dataframe.title}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Dataframe Tabular</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {currentData.dataframe.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadCsv}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
                title="Descargar este Dataframe en formato CSV para usarlo con ChatGPT, Claude o Gemini"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar CSV</span>
              </button>

              <div className="relative w-full sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filtrar filas..."
                  value={dfSearch}
                  onChange={(e) => setDfSearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* Styled Data Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/20 shadow-inner">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200">
                    {currentData.dataframe.headers.map((header) => (
                      <th key={header} className="p-3 text-[10.5px] font-extrabold text-slate-600 uppercase tracking-wider font-mono">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredRows.length > 0 ? (
                    filteredRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/60 bg-white transition-colors">
                        {currentData.dataframe.headers.map((header) => (
                          <td key={header} className="p-3 font-medium text-slate-700 leading-normal">
                            {typeof row[header] === 'number' ? (
                              <span className="font-mono text-slate-900 font-bold bg-slate-100/50 px-1.5 py-0.5 rounded">
                                {row[header].toLocaleString()}
                              </span>
                            ) : (
                              row[header]?.toString().startsWith('••••') ? (
                                <span className="font-mono text-slate-400 text-xs">{row[header]}</span>
                              ) : row[header] === 'OK' || row[header] === 'ÉXITO' || row[header] === 'INGESTADO' || row[header] === 'SÍ' ? (
                                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] inline-flex items-center">
                                  <Check className="w-3 h-3 mr-1" />
                                  {row[header]}
                                </span>
                              ) : row[header] === 'PROCESANDO' || row[header] === 'CARGANDO' || row[header] === 'TRANSFORMANDO' ? (
                                <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px] animate-pulse inline-block">
                                  {row[header]}
                                </span>
                              ) : row[header]?.toString().includes('ADVERTENCIA') || row[header] === 'NEGATIVO' || row[header]?.toString().includes('TIMEOUT') || row[header] === 'CRÍTICA' ? (
                                <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded text-[10px] inline-flex items-center">
                                  <ShieldAlert className="w-3 h-3 mr-1" />
                                  {row[header]}
                                </span>
                              ) : (
                                row[header]
                              )
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={currentData.dataframe.headers.length} className="p-8 text-center text-slate-400 italic">
                        No se encontraron registros coincidentes con el filtro.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION 3: Prompt de IA */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                  Rol: {currentData.prompt.role}
                </span>
                <span className="text-xs text-slate-400 font-semibold uppercase">Estrategia Generativa</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                <strong>Objetivo Académico:</strong> {currentData.prompt.goal}
              </p>
            </div>

            <button
              onClick={handleCopyPrompt}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Prompt</span>
                </>
              )}
            </button>
          </div>

          {/* Prompt code block */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-slate-100 font-mono text-[11.5px] leading-relaxed relative group shadow-lg">
            <div className="absolute top-3 right-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Prompt Listo para Copiar
            </div>
            <p className="text-slate-300 pr-4 whitespace-pre-wrap">
              "{currentData.prompt.text}"
            </p>
          </div>

          <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100 text-xs text-indigo-950">
            <span className="font-extrabold text-indigo-800 block mb-1">💡 ¿Cómo usar este Prompt?</span>
            <p className="leading-relaxed">
              Copia este bloque de instrucciones y pégalo directamente en la suite de herramientas sugeridas a continuación para automatizar la tarea, analizar los datos y generar prototipos en vivo.
            </p>
          </div>
        </div>

        {/* Links to related tools (always displayed) */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
            Suite de Herramientas Recomendada para esta Unidad
          </span>
          <div className="flex flex-wrap gap-2.5">
            {currentData.tools.map((tool, idx) => (
              <a
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group px-3 py-2 rounded-xl border text-xs font-bold flex items-center space-x-2 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md ${tool.badgeColor}`}
              >
                <span>{tool.name}</span>
                <span className="opacity-60 text-[9.5px] font-medium border-l pl-2 border-current">
                  {tool.category}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
