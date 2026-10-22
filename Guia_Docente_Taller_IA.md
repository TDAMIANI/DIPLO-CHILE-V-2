# Guía Didáctica y Guión Docente: Taller de IA Aplicada a Productos y Servicios (No-Code)

**Rol del Facilitador:** Tutor Especializado en Inteligencia Artificial Generativa y Estrategia Digital.
**Enfoque Pedagógico:** 100% Práctico, Experiencial y Orientado al Negocio (Sin Código).
**Duración Total:** 15 Horas Cronológicas (5 Sesiones de 3 Horas cada una).
**Dirigido a:** Profesionales de Operaciones, Finanzas, Marketing, Ventas, Recursos Humanos y Emprendedores.

---

## 🎤 DISCURSO DE APERTURA GENERAL (Día 1 - Minuto 0)

> *"Estimados profesionales, muy buenas tardes y bienvenidos. 
> 
> Hoy iniciamos un viaje de 15 horas que va a cambiar radicalmente la forma en la que abordan los problemas en sus empresas. Quiero que hagamos un pacto desde el primer minuto: **olviden la idea de que la tecnología y los datos son solo para programadores o ingenieros de software.** 
> 
> En esta sala no vamos a escribir ni una sola línea de código en Python, SQL o Java. No lo necesitamos. Hoy en día, la verdadera ventaja competitiva y el superpoder profesional no radica en memorizar la sintaxis de un lenguaje de programación, sino en **saber pensar de manera lógica** y actuar como un **Director de Orquesta**. 
> 
> En este taller, las mejores Inteligencias Artificiales del mundo —como ChatGPT, Claude y Perplexity— serán sus músicos virtuosos. Su labor como directores de orquesta será saber guiarlas, darles contexto, entregarles la partitura correcta mediante instrucciones precisas (prompts) y exigirles el máximo nivel de calidad en el entregable. 
> 
> Tomaremos problemas cotidianos del mercado chileno —desde boletas y facturas desordenadas en PDFs, pasando por miles de comentarios de clientes insatisfechos en redes sociales, hasta flujos de datos en tiempo real— y los resolveremos conversando en lenguaje natural. 
> 
> Prepárense para mancharse las manos con datos desde hoy mismo. ¡Bienvenidos a la era del profesional aumentado por Inteligencia Artificial!"*

---

# 📚 PLANIFICACIÓN SESIÓN POR SESIÓN (3 Horas cada una)

---

## 📅 SESIÓN 1: Minería de Datos y Estructuración a Gran Escala
**Fecha y Horario:** Martes 20 de octubre de 2026, en horario 19:00 a 22:00 hrs.
**Objetivo de Aprendizaje:** Aprender a recolectar, estructurar, clasificar y etiquetar miles de registros de datos no estructurados (texto libre) utilizando modelos de lenguaje avanzados sin usar código.

### ⏱️ Cronograma Detallado (180 Minutos)

*   **00:00 - 00:45 | Bloque 1: El Dolor de la Data No Estructurada y el Negocio (45 min)**
    *   *Enfoque:* Entender el valor de los datos cualitativos y por qué las empresas pierden dinero al ignorar el texto libre.
*   **00:45 - 01:30 | Bloque 2: Ingeniería de Prompts Aplicada - Estructuración (45 min)**
    *   *Enfoque:* Aprender la técnica de "Few-Shot Prompting" y delimitación de formatos de salida (tablas, CSV, JSON).
*   **01:30 - 02:30 | Bloque 3: Laboratorio Práctico - Clasificación Automatizada de Clientes (60 min)**
    *   *Enfoque:* Trabajo activo con un conjunto de datos real de reclamos de retail chileno.
*   **02:30 - 03:00 | Bloque 4: Calibración, Discusión de Errores y Cierre (30 min)**
    *   *Enfoque:* Cómo manejar la variabilidad de la IA y cómo copiar los datos a herramientas tradicionales.

---

### 🎙️ Guión y Speech del Docente Paso a Paso

#### 🧠 Bloque 1: El Dolor de la Data No Estructurada (45 min)
**Speech del Tutor:**
> *"Comencemos con una realidad incómoda: el 80% de la información valiosa de sus empresas está guardada en lugares donde las planillas tradicionales no pueden llegar. Está en los correos que envían los clientes, en los comentarios de redes sociales, en las transcripciones de llamadas del call center y en las encuestas de satisfacción. 
> 
> Imaginen que son los Gerentes de Clientes de un gran retail en Chile y reciben 5.000 comentarios mensuales. Tradicionalmente, tenían dos opciones pésimas: o pagaban a un equipo de analistas para leerlos uno a uno durante semanas, o simplemente ignoraban la información y tomaban decisiones basados en el 'olfato'. 
> 
> Hoy vamos a aprender cómo transformar el texto libre en columnas perfectas de Excel con categorías, sentimientos y niveles de urgencia automáticos utilizando LLMs (Large Language Models) como Claude o ChatGPT. Esto no es magia, es minería de datos conversacional."*

*   **Concepto clave a explicar en la pizarra/diapositiva:** 
    *   **Datos Estructurados:** Filas y columnas claras (ej: una planilla de sueldos).
    *   **Datos No Estructurados:** Información libre y sin formato (ej: un correo de reclamo largo).

#### 🛠️ Bloque 2: Ingeniería de Prompts - Técnica Few-Shot (45 min)
**Speech del Tutor:**
> *"Para que una Inteligencia Artificial trabaje de forma profesional para nosotros, debemos dejar de tratarla como un buscador de Google. No le diremos 'clasifica estos textos'. Eso genera respuestas inconsistentes y resúmenes inútiles. 
> 
> Le daremos un rol, una regla de negocio estricta y, lo más importante, **ejemplos de referencia** (Few-Shot Prompting). Si le mostramos a la IA cómo queremos que responda una vez, replicará el patrón a la perfección con los siguientes mil casos."*

*   **Prompt Maestro para modelar frente a la clase:**
    ```text
    Actúa como un Analista de Experiencia del Cliente (CX) Senior en una compañía de retail chilena.
    Tu tarea es analizar comentarios de clientes y clasificarlos de manera estructurada en una tabla.
    
    Para cada comentario que te entregue, debes extraer las siguientes columnas:
    1. Sentimiento: Exclusivamente [Positivo / Negativo / Neutro]
    2. Categoría: Exclusivamente [Logística de Despacho / Calidad de Producto / Problema de Pago / Servicio al Cliente]
    3. Urgencia: Exclusivamente [Alta / Media / Baja]
    4. Resumen: Un resumen muy breve en máximo 5 palabras.
    
    Usa los siguientes ejemplos para calibrar tu criterio:
    ---
    Comentario: "Compré una mesa de comedor, llegó trizada en una esquina y el repartidor fue muy pesado cuando le reclamé."
    Sentimiento: Negativo
    Categoría: Calidad de Producto
    Urgencia: Alta
    Resumen: Mesa rota y mala atención
    ---
    Comentario: "El producto llegó a tiempo en Viña del Mar, pero no era el color que pedí en la web."
    Sentimiento: Negativo
    Categoría: Logística de Despacho
    Urgencia: Media
    Resumen: Despacho de color incorrecto
    ---
    
    Procesa el siguiente listado y devuélveme el resultado únicamente en formato de tabla de Markdown con las columnas solicitadas:
    
    [Insertar listado de comentarios en el Laboratorio]
    ```

#### 👥 Bloque 3: Laboratorio Práctico (60 min)
**Instrucciones para los Alumnos:**
Los alumnos abren la pestaña de herramientas o su IA de preferencia. Copian el set de datos de prueba de la sesión 1 (reseñas de retail) y aplican el prompt anterior.
*   **Desafío Adicional:** Deben modificar el prompt para que la IA agregue una columna llamada `Compensación Sugerida`, donde determine si al cliente se le debe ofrecer un cupón de descuento, la devolución del dinero o solo una disculpa formal.

#### 📢 Bloque 4: Calibración y Cierre (30 min)
**Speech del Tutor:**
> *"Miren sus pantallas. En menos de un minuto, la IA leyó, entendió y catalogó decenas de comentarios complejos que a un humano le habrían tomado horas de lectura pesada. Y lo mejor de todo es que el criterio es consistente. Ahora, simplemente copiamos esta tabla de Markdown, la pegamos en Excel y ¡listo! Tenemos un dashboard listo para analizar. Hemos domesticado la data no estructurada."*

---

## 📅 SESIÓN 2: Tecnologías de Ingesta (ETL Conversacional)
**Fecha y Horario:** Jueves 22 de octubre de 2026, en horario 19:00 a 22:00 hrs.
**Objetivo de Aprendizaje:** Aprender a realizar procesos de extracción, transformación y carga (ETL) de documentos de negocio desordenados (facturas, boletas, correos de rendición de gastos) a formatos tabulares limpios.

### ⏱️ Cronograma Detallado (180 Minutos)

*   **00:00 - 00:45 | Bloque 1: ¿Qué es ETL y por qué el "copiar y pegar" manual está matando la productividad? (45 min)**
    *   *Enfoque:* Automatización de procesos administrativos contables utilizando visión artificial de las IAs.
*   **00:45 - 01:30 | Bloque 2: Extracción Inteligente de Documentos Multimodales (45 min)**
    *   *Enfoque:* Cómo subir archivos PDF o imágenes de recibos de gastos y formatear los datos extraídos.
*   **01:30 - 02:30 | Bloque 3: Laboratorio Práctico - Consolidación de Caja Chica de Ventas (60 min)**
    *   *Enfoque:* Tomar correos desordenados con fotos adjuntas de boletas y construir la planilla de contabilidad mensual.
*   **02:30 - 03:00 | Bloque 4: Limpieza de Anomalías, Conversión de Monedas y Cierre (30 min)**
    *   *Enfoque:* Manejo de tipos de cambio de divisas y datos faltantes de manera automática con la IA.

---

### 🎙️ Guión y Speech del Docente Paso a Paso

#### 🧠 Bloque 1: ¿Qué es ETL Contable? (45 min)
**Speech del Tutor:**
> *"Bienvenidos a la Sesión 2. Hablemos de los dolores administrativos. En cualquier empresa, el cierre de mes es una pesadilla. Los vendedores que viajan por regiones envían correos diciendo 'Rindo 40 mil pesos de bencina, adjunto foto', luego mandan un WhatsApp con otra boleta arrugada, y al final envían un PDF formal. 
> 
> Históricamente, un analista contable pasaba 3 días digitando estos datos uno por uno en el sistema. Eso se llama ETL: Extraer, Transformar y Cargar. Hoy vamos a enseñarle a la IA a hacer este trabajo de hormiga por nosotros. Ella leerá las fotos, extraerá los números, calculará los impuestos, convertirá los dólares a pesos chilenos y nos entregará un archivo Excel listo para subir al software contable de la empresa."*

*   **Concepto clave a explicar:**
    *   **Extracción (Extract):** Leer el texto dentro de fotos o PDFs.
    *   **Transformación (Transform):** Estandarizar fechas, limpiar caracteres extraños y unificar monedas.
    *   **Carga (Load):** Generar el archivo de destino (ej: CSV, Excel).

#### 🛠️ Bloque 2: Demostración de Ingesta Multimodal (45 min)
**Speech del Tutor:**
> *"Las IAs modernas son multimodales, lo que significa que tienen 'ojos'. Pueden ver una boleta arrugada, entender la tipografía borrosa del papel térmico y extraer los datos. Vamos a ver cómo estructurar un prompt contable para que procese un correo informal y fotos adjuntas."*

*   **Prompt Maestro para modelar frente a la clase:**
    ```text
    Actúa como un Auditor Contable y Especialista en Conciliación de Gastos. 
    A continuación te entregaré un correo electrónico informal donde un vendedor reporta sus gastos del mes de manera desordenada y con inconsistencias.
    
    Realiza el siguiente proceso contable (ETL):
    1. EXTRAER: Identifica la Fecha, el Comercio, el Concepto detallado de gasto, y el Monto original.
    2. TRANSFORMAR:
       - Si el gasto está en dólares (USD), conviértelo conceptualmente a pesos chilenos (CLP) usando un tipo de cambio estimado de 1 USD = 950 CLP.
       - Si el gasto está en UF, conviértelo a CLP usando 1 UF = 38.000 CLP.
       - Estandariza todas las fechas a formato estricto DD/MM/AAAA.
       - Si no se menciona el comercio o el detalle, márcalo como "INFORMACIÓN FALTANTE" en color rojo o negrita.
    3. CARGAR: Entrega el resultado exclusivamente en una tabla estructurada de Markdown con las columnas: [Fecha Original, Fecha Estándar, Comercio, Detalle, Monto Original, Monto CLP, Estado del Gasto].
    
    Aquí está el reporte informal del vendedor:
    "Estimados, rindo los gastos de la gira por Concepción e Iquique:
    - El lunes 3 de Noviembre pagué un almuerzo con el cliente en El rincón marino por $45.000.
    - El 05/11 compré útiles de oficina en una librería local por un valor de 1.5 UF para la sucursal.
    - El jueves 6 de nov tomé un Uber que me costó $12.500 pero perdí la boleta, de todos modos fue de la reunión al aeropuerto.
    - Compré una suscripción de software de emergencia que me costó 12.99 dólares el día viernes 7."
    ```

#### 👥 Bloque 3: Laboratorio Práctico (60 min)
**Instrucciones para los Alumnos:**
Los alumnos toman el set de datos interactivo de la sesión 2. Suben las imágenes de boletas y el correo consolidado al chat de IA. Experimentan pidiéndole a la IA que clasifique si los gastos cumplen con la política de la empresa (por ejemplo: *"Si el gasto en comida supera los $40.000, marca una alerta de política excedida"*).

#### 📢 Bloque 4: Cierre (30 min)
**Speech del Tutor:**
> *"Piensen en el ahorro de tiempo. Hemos tomado datos en tres formatos distintos (UF, dólares, pesos), corregido la falta de información, estandarizado fechas y generado una planilla contable en 10 segundos. Esto es eficiencia pura. Un proceso que tomaba horas ahora se ejecuta en un suspiro."*

---

## 📅 SESIÓN 3: Visualización Avanzada (Dashboarding con IA)
**Fecha y Horario:** Martes 27 de octubre de 2026, en horario 19:00 a 22:00 hrs.
**Objetivo de Aprendizaje:** Aprender a analizar bases de datos numéricas de ventas y operaciones, realizar cálculos de negocio complejos y generar visualizaciones gráficas y reportes de storytelling interactivos utilizando asistentes de datos con IA.

### ⏱️ Cronograma Detallado (180 Minutos)

*   **00:00 - 00:45 | Bloque 1: El Arte del Storytelling con Datos (45 min)**
    *   *Enfoque:* Por qué los ejecutivos odian las tablas infinitas y cómo los gráficos cuentan historias de decisión.
*   **00:45 - 01:30 | Bloque 2: Análisis Avanzado de Datos (ChatGPT ADA & Claude Artifacts) (45 min)**
    *   *Enfoque:* Cómo subir archivos CSV/Excel de ventas e interactuar verbalmente para programar visualizaciones.
*   **01:30 - 02:30 | Bloque 3: Laboratorio Práctico - Reporte de Ventas Regionales de Chile (60 min)**
    *   *Enfoque:* Generar gráficos de cumplimiento de metas y redactar minutas para directores.
*   **02:30 - 03:00 | Bloque 4: Descarga de Recursos, Exportación de Gráficos y Cierre (30 min)**
    *   *Enfoque:* Cómo descargar los assets visuales generados y montarlos en diapositivas corporativas.

---

### 🎙️ Guión y Speech del Docente Paso a Paso

#### 🧠 Bloque 1: El Arte del Storytelling con Datos (45 min)
**Speech del Tutor:**
> *"Hola a todos y bienvenidos a la Sesión 3. Hoy vamos a hablar de cómo vender nuestras ideas a la alta gerencia. A un gerente general no le interesa ver un Excel con 50.000 filas de transacciones de ventas. Si tú le presentas eso, lo único que lograrás es que se aburra o se pierda. 
> 
> Lo que un tomador de decisiones quiere ver son **patrones, anomalías y recomendaciones de acción**. Quieren ver de inmediato qué sucursal está perdiendo dinero, por qué está pasando y qué debemos hacer para arreglarlo. 
> 
> Hoy usaremos las capacidades de análisis de datos de los LLMs. Subiremos un Excel real de ventas y, en lugar de arrastrar celdas o configurar tablas dinámicas complejas, le pediremos verbalmente a la IA que analice la tendencia, dibuje los gráficos con colores estratégicos y nos escriba el resumen ejecutivo listo para exponer."*

*   **Concepto clave a explicar:**
    *   **Análisis Exploratorio:** Encontrar qué sucursales van bien y cuáles van mal.
    *   **Storytelling Visual:** Usar el color para guiar la vista (ej: rojo para peligro, gris para lo normal).

#### 🛠️ Bloque 2: Demostración de Análisis Avanzado de Datos (45 min)
**Speech del Tutor:**
> *"Cuando subimos un Excel a una IA, ella no se limita a leer el texto; levanta un entorno de código (Python) en la nube de forma transparente y ejecuta los algoritmos por nosotros. Nosotros solo conversamos en español de negocios. Vamos a ver este prompt de análisis estratégico."*

*   **Prompt Maestro para copiar y de demostración:**
    ```text
    Actúa como un Director de Business Intelligence de nivel corporativo.
    He subido una planilla de Excel que contiene las ventas de nuestras sucursales en Chile.
    
    Por favor, procesa la información y realiza las siguientes tareas de análisis y visualización:
    1. Calcula una nueva columna: "% de Cumplimiento de Meta" (Ventas / Meta de Ventas).
    2. Identifica y genera un listado de las sucursales críticas que estén por debajo del 80% de cumplimiento.
    3. Crea un gráfico de barras horizontales elegante que muestre el % de cumplimiento por sucursal. 
       - Usa el color rojo carmín para resaltar las sucursales con cumplimiento crítico (< 80%).
       - Usa un tono azul slate o gris suave para las sucursales que sí cumplieron la meta.
       - Agrega una línea promedio vertical punteada que represente la media nacional.
    4. Redacta una minuta ejecutiva de 3 puntos clave dirigida al Gerente Comercial que resuma el diagnóstico y sugiera una acción correctiva.
    ```

#### 👥 Bloque 3: Laboratorio Práctico (60 min)
**Instrucciones para los Alumnos:**
Los alumnos acceden a la herramienta de visualización o suben su base de datos de ventas de la sesión 3 a su chat. Ejecutan el prompt y comienzan a refinar los gráficos: *"Modifica el gráfico para que sea un gráfico de líneas que muestre la tendencia mes a mes en vez de barras"* o *"Por favor, haz que los títulos del gráfico estén en tipografía Arial y el fondo sea completamente transparente para mi presentación"*.

#### 📢 Bloque 4: Cierre (30 min)
**Speech del Tutor:**
> *"Miren esto. Han creado un análisis financiero completo y un gráfico personalizado de nivel profesional en minutos. Ya no dependen de que el área de TI les configure el reporte para mañana. Ustedes tienen el control absoluto de sus reportes, rápido y con la estética exacta que buscan."*

---

## 📅 SESIÓN 4: Pipeline en Streaming y Monitoreo Inteligente
**Fecha y Horario:** Jueves 29 de octubre de 2026, en horario 19:00 a 22:00 hrs.
**Objetivo de Aprendizaje:** Comprender la lógica de procesamiento en tiempo real (Streaming), configurar flujos de alertas basados en eventos críticos y programar respuestas operativas lógicas asistidas por IA.

### ⏱️ Cronograma Detallado (180 Minutos)

*   **00:00 - 00:45 | Bloque 1: Procesamiento en Tiempo Real vs Lotes (45 min)**
    *   *Enfoque:* Comprender cómo reaccionan las industrias modernas en vivo (sensores de minería, alertas de fraude bancario).
*   **00:45 - 01:30 | Bloque 2: Configuración de Árboles de Decisión y Lógica de Eventos con IA (45 min)**
    *   *Enfoque:* Entrenar prompts de monitoreo de variables continuas y diseño de triggers de alerta.
*   **01:30 - 02:30 | Bloque 3: Laboratorio Práctico - Simulador de Alertas Críticas (60 min)**
    *   *Enfoque:* Alimentar progresivamente a la IA con datos de temperatura y presión en un chat simulando un operario en terreno.
*   **02:30 - 03:00 | Bloque 4: Generación Automática de Protocolos de Emergencia y Cierre (30 min)**
    *   *Enfoque:* Cómo transformar una alarma técnica en un correo de contingencia enviado automáticamente.

---

### 🎙️ Guión y Speech del Docente Paso a Paso

#### 🧠 Bloque 1: Streaming vs Batch (45 min)
**Speech del Tutor:**
> *"Bienvenidos a la Sesión 4. Hasta ahora, hemos trabajado analizando el pasado: las reseñas de los clientes del mes anterior o las ventas acumuladas de la semana pasada. Pero en muchas industrias chilenas, especialmente en la minería, la logística marítima o la seguridad bancaria, esperar al final de la semana para enterarse de un problema es una catástrofe. 
> 
> Si un camión de extracción de cobre de 300 toneladas tiene el motor sobrecalentado a 115 grados, necesitamos alertar al conductor e indicarle el protocolo de seguridad en ese preciso segundo. Eso es el procesamiento en streaming o tiempo real. Hoy usaremos a la IA como un agente guardián permanente. Le enseñaremos reglas lógicas y la alimentaremos secuencialmente con datos para ver cómo toma decisiones y emite alarmas al instante."*

*   **Concepto clave a explicar:**
    *   **Procesamiento por Lotes (Batch):** Análisis masivo al final del periodo.
    *   **Procesamiento en Tiempo Real (Streaming):** Monitoreo continuo de eventos individuales.
    *   **Triggers (Disparadores):** Reglas lógicas (ej: "SI la temperatura es mayor a 110, ENTONCES alerta").
    *   **Capa Intermedia - Redis Iris:** Explique que los agentes de IA necesitan contexto rápido. Redis Iris actúa como puente integrando búsqueda vectorial (Context Retriever) y memoria (Agent Memory) para que la IA actúe rápido y con información fresca, sin hacer consultas lentas a bases de datos tradicionales.
    *   **Motor de Procesamiento - Apache Flink:** Explique que es el marco de trabajo que maneja estos flujos a altísima velocidad. Garantiza que ningún evento se pierda (Exactly-Once) y procesa los datos según el tiempo exacto en que ocurrieron (Event-time), sirviendo de motor analítico en vivo.

#### 🛠️ Bloque 2: Configuración del Agente de Monitoreo (45 min)
**Speech del Tutor:**
> *"Para simular esto sin programar sensores de hardware físicos, vamos a utilizar la memoria contextual del chat de IA. Crearemos un sistema operativo virtual en el chat que se quedará esperando nuestras lecturas de datos y actuará según el umbral."*

*   **Prompt Maestro para copiar y de demostración:**
    ```text
    Actúa como un Sistema de Alerta Temprana y Monitoreo Industrial para un camión de minería de gran tonelaje (CAEX).
    Tu tarea es procesar las lecturas de temperatura del motor (en grados Celsius) que te iré enviando secuencialmente, una a una, en mensajes cortos.
    
    Aplica estrictamente las siguientes reglas de negocio:
    - Rango Normal (0°C a 100°C): Responde únicamente con "🟢 [NORMAL] Temp: XX°C. Continuar operaciones."
    - Rango Advertencia (101°C a 110°C): Responde con "⚠️ [ADVERTENCIA] Temp: XX°C. Temperatura elevada. Reducir velocidad y activar ventilación auxiliar."
    - Rango Crítico (> 110°C): Responde de forma muy visible: "🚨 [ALERTA CRÍTICA: MOTOR SOBRECALENTADO] Temp: XX°C. ¡DETENER EL VEHÍCULO DE INMEDIATO!" e incluye de inmediato un Plan de Contingencia de 3 pasos rápidos de seguridad para el operador en cabina.
    
    Por favor, espera mis datos. Responde únicamente confirmando con: "Sistema de Monitoreo CAEX Activo. Envíame la primera lectura de temperatura."
    ```

#### ⚙️ Bloque 2.5: Arquitectura en Código (Armar un Agente en LangChain)
**Speech del Tutor:**
> *"Aunque usamos el chat para simular el comportamiento de un Agente, en la vida real estos sistemas se construyen utilizando frameworks de código como LangChain. Un framework como este nos permite conectar el 'cerebro' del LLM con el mundo exterior: bases de datos, APIs y sistemas de streaming."*

*   **Ejemplo de Código - Agente en LangChain (Python):**
    ```python
    from langchain.chat_models import ChatOpenAI
    from langchain.prompts import ChatPromptTemplate
    from langchain.agents import initialize_agent, AgentType
    from langchain.tools import tool

    # 1. Definimos una Herramienta (Tool) para enviar alertas a la plataforma
    @tool
    def enviar_alerta_plataforma(mensaje: str) -> str:
        """Usa esto para enviar una notificación crítica a la plataforma operativa."""
        # Aquí iría el código real (ej: requests.post('https://api.empresa.com/alerta', data=...))
        return "Alerta enviada exitosamente a la plataforma."

    # 2. Inicializamos el Modelo (LLM)
    llm = ChatOpenAI(temperature=0, model="gpt-4o")

    # 3. Definimos el Prompt Básico del Agente
    prompt = ChatPromptTemplate.from_messages([
        ("system", "Eres un Analista Industrial experto. Tu tarea es monitorear alertas de temperatura de maquinaria. "
                   "Si la temperatura reportada es mayor a 110°C, debes generar un informe crítico de inmediato "
                   "y utilizar la herramienta 'enviar_alerta_plataforma' para notificar al supervisor. "
                   "Si es menor, simplemente indica que está en rango normal."),
        ("human", "Datos actuales del sensor: {input_datos}")
    ])

    # 4. Inicializamos el Agente
    agent = initialize_agent(
        tools=[enviar_alerta_plataforma],
        llm=llm,
        agent=AgentType.OPENAI_FUNCTIONS,
        verbose=True
    )

    # 5. Ejecutar (Ejemplo)
    # agent.run("Temp: 115°C, Presión: Normal")
    ```

*   **¿Cómo se sube esto a la Plataforma?:**
    1. **Empaquetado (API):** El script anterior se envuelve en una API web (usando **FastAPI** o **LangServe**), de modo que el agente quede escuchando peticiones (endpoints).
    2. **Contenerización (Docker):** El código y sus dependencias (`requirements.txt`) se empaquetan en una imagen de **Docker** para asegurar que funcione en cualquier entorno.
    3. **Despliegue (Deploy):** La imagen de Docker se sube a un servicio en la nube (como **Google Cloud Run**, AWS ECS o Azure Container Apps).
    4. **Integración al Stream:** Una vez alojado en la nube, la plataforma recibe una URL pública (ej. `https://mi-agente-industrial.run.app/procesar_evento`). Sistemas de streaming como **Apache Flink** o **Kafka** envían los eventos en vivo mediante solicitudes HTTP a esta URL, alimentando continuamente al agente.

*   **📺 Material de Apoyo (Demo de LangChain Agents):**
    > **Link:** [https://www.youtube.com/watch?v=WfHJ_Zfaqjs](https://www.youtube.com/watch?v=WfHJ_Zfaqjs)
    > **Explicación para el docente:** Muestre este video como un ejemplo práctico y visual para los estudiantes. El video ilustra paso a paso cómo se define un agente y se le conectan herramientas (Tools). Esto ayuda a tangibilizar la explicación teórica, mostrando cómo el agente razona iterativamente ("ReAct": Reasoning and Acting), decide qué herramienta ejecutar, obtiene el resultado y finalmente formula su respuesta, lo que es vital antes de llevarlo a un entorno de producción.

#### 🔍 Bloque 2.6: Demo Práctica - Observabilidad con LangSmith (10 min)
**Speech del Tutor:**
> *"Cuando desarrollamos agentes de IA, el problema no suele ser escribir el código, sino entender por qué el agente tomó una decisión. Si quieres hacer una demo en una clase o presentación, el objetivo es mostrar el valor de **ver qué hace una aplicación de IA por dentro, paso a paso**. LangSmith permite inspeccionar cada paso, identificar errores, medir costos y optimizar el comportamiento antes de llevar la solución a producción."*

**Paso a paso de la Demo para los Alumnos:**
1. **Crear una cuenta:** Entrar a [LangSmith](https://smith.langchain.com) y registrarse con Google/GitHub.
2. **Crear un API Key:** Ir a Settings → API Keys → Create API Key.
3. **Instalar dependencias:** `pip install langsmith langchain langchain-openai`
4. **Configurar variables:**
   ```bash
   export LANGSMITH_TRACING=true
   export LANGSMITH_API_KEY=tu_api_key
   export OPENAI_API_KEY=tu_openai_key
   export LANGSMITH_PROJECT="Demo Clase IA"
   ```
5. **Crear un programa pequeño (`demo.py`):**
   ```python
   from langchain_openai import ChatOpenAI
   llm = ChatOpenAI()
   respuesta = llm.invoke("¿Qué es la inteligencia artificial?")
   print(respuesta.content)
   ```
6. **Ejecutar el script:** `python demo.py`. Obtendrás una respuesta normal en consola.
7. **Abrir LangSmith:** En la plataforma, abre el proyecto "Demo Clase IA". Podrás mostrar a la clase:
   - Tiempo de ejecución (ej. 1,3 segundos)
   - Tokens consumidos (Entrada: 125, Salida: 240)
   - Costo (USD 0.0021)
   - Prompt completo y Respuesta.
   
*   **El momento "Wow" para la clase:** Realiza una segunda ejecución cambiando el prompt a `"Responde como profesor universitario sobre qué es la inteligencia artificial."`. Al recargar LangSmith, los alumnos verán dos trazas diferentes, pudiendo comparar visualmente cómo cambió el consumo de tokens, el tiempo y el comportamiento del modelo, demostrando el poder de la observabilidad.
*   **Mensaje Clave para la clase:** *"LangSmith no reemplaza al modelo de IA: actúa como una plataforma de observabilidad y depuración, equivalente a lo que Grafana o Datadog representan para aplicaciones tradicionales, pero orientada al ciclo de vida de aplicaciones basadas en modelos de lenguaje."*

#### 🚀 Bloque 2.7: El Nivel Máximo de Autonomía - El Caso de Antigravity (10 min)
**Speech del Tutor:**
> *"Hemos visto cómo armar un agente con una herramienta específica (una alerta) y cómo monitorearlo. Pero, ¿hasta dónde llega esta tecnología? El mejor ejemplo de un agente avanzado de propósito general en la actualidad es **Antigravity**, el agente desarrollado por Google DeepMind que potencia **Google AI Studio Build**.
> A diferencia de nuestro agente minero que hace una sola cosa, Antigravity puede interactuar con un entorno completo: lee directorios de archivos, escribe código complejo, ejecuta comandos de terminal, y compila el software. Si Antigravity escribe un código y la compilación falla, el agente lee el mensaje de error de la terminal, razona sobre el problema y corrige su propio código de forma autónoma. Esta capacidad de evaluar el entorno y auto-corregirse (ReAct iterativo) representa el futuro hacia donde evolucionarán los sistemas de software autónomos."*

#### 👥 Bloque 3: Laboratorio Práctico (60 min)
**Instrucciones para los Alumnos:**
Los alumnos levantan el sistema en su chat. Comienzan a enviar lecturas progresivas (ej: *"Lectura: 95"*, *"Lectura: 104"*, *"Lectura: 112"*) y observan cómo la IA cambia reactivamente de color, tono y contenido.
*   **Desafío Avanzado:** Deben pedirle al agente que, cuando detecte una alerta crítica, además de darle las instrucciones al conductor, genere el borrador de un correo electrónico urgente redactado formalmente para el Jefe de Mantenimiento de la faena detallando la hora (ficticia) y la temperatura para programar el remolque.

#### 📢 Bloque 4: Cierre (30 min)
**Speech del Tutor:**
> *"Miren la versatilidad de la IA. Ha actuado como un inspector de seguridad de planta en tiempo real. Entender esta lógica de 'disparadores' y respuestas automáticas es el primer paso para diseñar flujos automáticos avanzados en sus empresas con herramientas modernas."*

---

## 📅 SESIÓN 5: Actividad Práctica (El Producto de Datos Conceptual)
**Fecha y Horario:** Martes 03 de noviembre de 2026, en horario 19:00 a 22:00 hrs.
**Objetivo de Aprendizaje:** Integrar de punta a punta las habilidades adquiridas en el taller para conceptualizar, estructurar, simular y defender comercialmente un Producto de Datos No-Code completo que resuelva un problema real del mercado.

### ⏱️ Cronograma Detallado (180 Minutos)

*   **00:00 - 00:30 | Bloque 1: Presentación del Desafío y Rúbrica de Certificación (30 min)**
    *   *Enfoque:* Entender qué se espera del Producto de Datos Conceptual y organización de los grupos de trabajo.
*   **00:30 - 01:45 | Bloque 2: Taller de Co-creación con IA (75 min)**
    *   *Enfoque:* Orquestación de múltiples IAs para investigar el mercado, generar un dataset simulado, analizarlo visualmente y diseñar el pitch.
*   **01:45 - 02:45 | Bloque 3: Panel de Demostración y Pitchs Ejecutivos (60 min)**
    *   *Enfoque:* Exposición de 5 minutos por grupo defendiendo su solución frente al tutor y feedback estratégico.
*   **02:45 - 03:00 | Bloque 4: Calificación Final, Entrega de Resultados y Palabras de Cierre (15 min)**
    *   *Enfoque:* Reflexión final sobre el rol del profesional aumentado con IA Generativa.

---

### 🎙️ Guión y Speech del Docente Paso a Paso

#### 🧠 Bloque 1: El Desafío Integrador (30 min)
**Speech del Tutor:**
> *"Estimados directores de orquesta, hemos llegado a la gran final: la Sesión 5. Hoy no habrá clases teóricas de mi parte. Hoy es el día en que demuestran de qué son capaces. 
> 
> Durante las próximas 3 horas, trabajarán en equipos para dar vida a un **Producto de Datos Conceptual** completo. Elegirán un dolor de negocio real: la fuga de clientes en una Fintech chilena, el abandono de carritos en un e-commerce local, la predicción de fallas en maquinaria agrícola o el ausentismo laboral en retail. 
> 
> Usarán Perplexity o Claude para investigar el mercado, luego le pedirán a ChatGPT que actúe como un Ingeniero de Datos y les invente un dataset simulado de 20 clientes estructurado en CSV. Posteriormente, analizarán ese CSV de forma visual para encontrar la solución y, finalmente, redactarán el pitch ejecutivo que presentarán hoy frente a toda la clase. Tienen 75 minutos de co-creación intensiva. ¡Mucho éxito!"*

#### 🛠️ Bloque 2: Guía Metodológica de Co-creación Grupal (75 min)
Los alumnos siguen la siguiente ruta paso a paso guiados activamente por el tutor:

##### 📍 Paso 1: Investigación de Mercado de Alta Velocidad (Perplexity o Claude)
*   **Objetivo:** Comprender las variables críticas del problema elegido.
*   **Prompt Recomendado:**
    ```text
    ¿Cuáles son las 5 variables métricas más importantes a analizar para predecir y evitar el abandono de clientes (churn) en una compañía Fintech de préstamos personales de consumo en Chile? Explica de forma breve qué significa cada variable en el contexto de negocio.
    ```

##### 📍 Paso 2: Simulación y Generación de Datos Sintéticos (ChatGPT)
*   **Objetivo:** Crear una tabla de datos ficticia pero realista para poder trabajar y analizar.
*   **Prompt Recomendado:**
    ```text
    Actúa como un Ingeniero de Datos Senior. Tu tarea es generar un dataset simulado en formato CSV con 20 filas que representen clientes de una compañía de créditos en Chile.
    Las columnas deben ser: [ID_Cliente, Comuna, Edad, Monto_Aprobado_CLP, Dias_Inactivo, Cuotas_Atrasadas, Estado_Fuga (Fugado / Activo)].
    
    Asegúrate de que los datos tengan coherencia lógica: los clientes con mayor cantidad de "Dias_Inactivo" y "Cuotas_Atrasadas" deben tener alta probabilidad de estar en "Fugado".
    Entrega únicamente el texto plano del formato CSV para copiar y pegar de inmediato.
    ```

##### 📍 Paso 3: Análisis Visual de Insights (ChatGPT Advanced Data Analysis o Claude)
*   **Objetivo:** Generar gráficos profesionales y extraer las 3 acciones comerciales clave para revertir el problema.
*   **Prompt Recomendado:**
    ```text
    Actúa como un Consultor Comercial Senior. He subido un dataset CSV de clientes en riesgo de fuga.
    
    Por favor, analiza la información y realiza lo siguiente:
    1. Genera un gráfico de dispersión (Scatter Plot) correlacionando "Dias_Inactivo" en el eje X y "Cuotas_Atrasadas" en el eje Y. Colorea los puntos según su "Estado_Fuga" (usa rojo carmín para Fugados y azul cobalto para Activos).
    2. Identifica el perfil promedio del cliente propenso a fugarse.
    3. Redacta 3 acciones concretas y ejecutivas de marketing directo para retener a estos clientes antes de que sea demasiado tarde.
    ```

##### 📍 Paso 4: Redacción del Pitch de Negocio (ChatGPT)
*   **Objetivo:** Estructurar el guion de presentación de 5 minutos para defender la viabilidad del pipeline.
*   **Prompt Recomendado:**
    ```text
    Actúa como un experto en oratoria y presentaciones de negocio ante directorios de alta gerencia (Pitch Deck).
    Ayúdame a estructurar la presentación de nuestro Producto de Datos de prevención de fuga de clientes en Chile.
    
    Genera un guion de 4 diapositivas estructurado de la siguiente forma:
    - Diapositiva 1: El Dolor del Negocio (Pérdida de ingresos por fuga de clientes). ¿Cuál es la oportunidad?
    - Diapositiva 2: El Diagnóstico con Datos (Explicación del análisis visual e insights encontrados).
    - Diapositiva 3: La Propuesta de Solución de Marketing Automatizado.
    - Diapositiva 4: El Retorno de Inversión (Por qué es viable y rentable implementar este pipeline No-Code).
    
    Para cada diapositiva escribe el título sugerido, los elementos visuales que deben mostrarse y el discurso completo de voz que debo leer durante el pitch. Mantén un tono persuasivo, profesional y centrado en el negocio.
    ```

#### 👥 Bloque 3: Demostración y Pitchs Ejecutivos (60 min)
*   Cada grupo proyecta la plataforma y expone su caso ante la clase durante **5 minutos**.
*   **Retroalimentación del Tutor:** Enfoque en cómo usaron la IA para resolver el desafío, la calidad estética de las visualizaciones y la solidez comercial de la propuesta planteada.

#### 📢 Bloque 4: Certificación y Cierre (15 min)
**Speech del Tutor:**
> *"Estimados profesionales, ha sido un absoluto honor haberlos acompañado a lo largo de estas 15 horas de taller práctico. 
> 
> Miren hacia atrás por un segundo: ingresaron a este curso con la idea de que los datos y la inteligencia artificial eran una caja negra lejana, misteriosa y reservada exclusivamente para ingenieros informáticos de gran trayectoria. 
> 
> Hoy, cada uno de ustedes ha conceptualizado, estructurado, simulado y defendido un Producto de Datos completo, de forma interactiva y con un nivel de análisis visual de alta calidad. Y lo hicieron conversando con la tecnología en su propio idioma.
> 
> Se llevan a sus puestos de trabajo el activo más valioso de la era digital: la **mentalidad de directores de orquesta tecnológica**. A partir de mañana, cuando tengan un problema contable, un listado enorme de textos o la necesidad de reportar métricas complejas, ya saben que no están limitados por no saber programar. Están limitados únicamente por su creatividad, por su criterio estratégico y por la claridad con la que se comunican con sus herramientas.
> 
> Un aplauso gigante para ustedes y ¡muy bienvenidos al futuro del trabajo aumentado por IA!"*
