# 🎙️ Guion Docente - Sesión 4: Agentes de IA Generativa en Tiempo Real y Stream de Datos

**Duración Total:** 2 horas y media (150 minutos)
**Objetivo:** Comprender la lógica de procesamiento en tiempo real (Streaming), configurar flujos de alertas basados en eventos, entender la arquitectura en código con LangChain, observar su ejecución con LangSmith, y realizar un laboratorio práctico.

---

## ⏱️ Cronograma (150 Minutos)

1. **[00:00 - 00:30] Bloque 1:** Introducción al Streaming vs Batch y Arquitectura Base (30 min)
2. **[00:30 - 01:00] Bloque 2:** Configuración del Agente de Monitoreo y Reglas de Negocio (30 min)
3. **[01:00 - 01:20] Bloque 3:** Arquitectura en Código con LangChain (20 min)
4. **[01:20 - 01:30] Bloque 4:** Observabilidad y Trazabilidad con LangSmith (10 min)
5. **[01:30 - 01:40] Bloque 5:** El Nivel Máximo de Autonomía - El Caso de Antigravity (10 min)
6. **[01:40 - 02:20] Bloque 6:** Laboratorio Práctico de Simulación (40 min)
7. **[02:20 - 02:30] Bloque 7:** Cierre y Reflexión (10 min)

---

## 🗣️ Guion Paso a Paso

### 🧠 Bloque 1: Introducción al Streaming y Arquitectura (30 min)

**[00:00] Bienvenida e Introducción:**
> *"¡Hola a todos! Bienvenidos a nuestra cuarta sesión. Hasta ahora, hemos trabajado analizando el pasado: procesando reseñas del mes anterior, o analizando las ventas acumuladas de la semana pasada. Eso es lo que llamamos procesamiento 'Batch' o por lotes. Es útil para la planificación estratégica, pero ¿qué pasa cuando la decisión debe tomarse en segundos? 
> En industrias como la minería, la logística marítima o la seguridad bancaria, esperar al final de la semana para enterarse de un problema es una catástrofe. Si un camión de extracción de cobre de 300 toneladas tiene el motor sobrecalentado a 115 grados, necesitamos alertar al conductor y activar el protocolo de seguridad en ese preciso segundo. Eso es el procesamiento en streaming o en tiempo real. 
> Hoy usaremos a la IA como un agente guardián permanente. Le enseñaremos reglas lógicas y la alimentaremos secuencialmente con datos para ver cómo toma decisiones y emite alarmas al instante."*

**[00:15] Explicando la Infraestructura:**
> *"Para que esto sea posible, no basta solo con el modelo de lenguaje. Necesitamos una arquitectura robusta.
> Primero, tenemos motores de procesamiento como **Apache Flink**. Piensen en Flink como la autopista. Es un framework que maneja flujos de datos a altísima velocidad garantizando que ningún evento se pierda, procesando los datos según el tiempo exacto en que ocurrieron.
> Luego, tenemos la capa intermedia. Aquí entra **Redis y Redis Iris**. Los agentes de IA necesitan contexto para tomar decisiones, pero no pueden tardar minutos buscando en bases de datos tradicionales. Redis actúa como una 'cinta transportadora' ultrarrápida, y Redis Iris permite hacer búsquedas vectoriales instantáneas para entregarle a la IA el contexto técnico que necesita en milisegundos."*

---

### 🛠️ Bloque 2: Configuración del Agente de Monitoreo (30 min)

**[00:30] El Concepto de Event-Driven GenAI:**
> *"Dejamos atrás los tableros estáticos donde solo parpadea una luz roja. Con 'Event-Driven GenAI', cada mensaje, log o lectura de un sensor actúa como un disparador (trigger) que despierta a un micro-agente.
> La IA generativa no solo verifica si un número superó un límite; interpreta el contexto. Traduce una alerta críptica como 'ErrorCode 504' en un diagnóstico narrativo claro para que el operador en terreno sepa exactamente qué hacer. Esto reduce la fatiga por exceso de alertas."*

**[00:45] Preparando la Simulación:**
> *"Para simular esto hoy, sin necesidad de programar sensores físicos, vamos a utilizar la memoria contextual del chat de IA. Crearemos un sistema operativo virtual en nuestro chat. Le daremos un 'Prompt Maestro' donde le indicaremos que actúe como el sistema de alerta de un camión minero, con reglas estrictas de temperaturas normales, de advertencia y críticas. El agente se quedará esperando nuestras lecturas y reaccionará de manera autónoma."*

---

### ⚙️ Bloque 3: Arquitectura en Código con LangChain (20 min)

**[01:00] De la Teoría a la Práctica en Código:**
> *"Aunque hoy usaremos el chat para simular el comportamiento, en el mundo real empresarial estos sistemas se construyen utilizando frameworks de código como **LangChain**. 
> ¿Qué es LangChain? Es el marco de trabajo que nos permite conectar el 'cerebro' (el modelo de lenguaje) con las 'manos' (el mundo exterior). Nos permite crear agentes que pueden ejecutar herramientas (Tools). Por ejemplo, podemos crear una herramienta en Python llamada `enviar_alerta_plataforma`. El agente evaluará el dato, decidirá si es crítico, y si lo es, invocará esa herramienta de forma autónoma para notificar a los sistemas de la empresa."*

**[01:10] Video de Apoyo y Despliegue:**
> *"Para entender esto mejor, les recomiendo revisar el video 'LangChain Agents Tutorial' *(mostrar video si es posible o dar la referencia)*, donde se visualiza cómo el agente razona iterativamente usando el modelo 'ReAct' (Reasoning and Acting) antes de emitir su respuesta.
> Una vez programado, este agente en Python se empaqueta en un contenedor Docker, se expone como una API usando FastAPI y se sube a la nube (como Google Cloud Run). Desde ahí, los sistemas como Apache Flink le enviarán los datos en tiempo real."*

---

### 🔍 Bloque 4: Observabilidad con LangSmith (10 min)

**[01:20] El 'Grafana' de la Inteligencia Artificial:**
> *"Pero hay un problema en producción: cuando un agente toma una decisión equivocada, el código no te dice por qué el modelo pensó de esa forma. Aquí es donde entra **LangSmith**.
> LangSmith no reemplaza al modelo de IA: actúa como una plataforma de observabilidad y depuración, equivalente a lo que Grafana o Datadog representan para el software tradicional. 
> Con LangSmith podemos ver el 'Trace' o traza completa de ejecución. Podemos ver exactamente qué prompt recibió el modelo, qué herramienta usó, cuánto tiempo tardó en milisegundos, y cuántos tokens (y dinero) consumió. Esto es vital para depurar y asegurar el ROI de nuestro agente antes de lanzarlo a producción."*

---

### 🚀 Bloque 5: El Nivel Máximo de Autonomía - El Caso de Antigravity (10 min)

**[01:30] La evolución hacia la autonomía total:**
> *"Hemos visto cómo un agente puede reaccionar a una alerta de temperatura y notificar. Pero, ¿hasta dónde llega la capacidad de un agente autónomo? Para que se hagan una idea del estado del arte, hablemos de **Antigravity**.
> Antigravity es el poderoso agente de inteligencia artificial desarrollado por Google DeepMind que potencia Google AI Studio Build. A diferencia de nuestro agente minero que solo ejecuta una tarea específica, Antigravity es un agente de propósito general con acceso a un ecosistema completo: puede leer un directorio de archivos, escribir código complejo, ejecutar comandos en una consola de servidor, instalar dependencias y compilar software real. 
> Si Antigravity escribe un código y este falla al compilar, el agente no se detiene; lee el mensaje de error de la terminal, razona sobre la falla y reescribe el código para solucionarlo de forma completamente autónoma. Esta es la máxima expresión de la metodología 'ReAct' iterativa. Hacia allá va la industria: desde agentes de asistencia o de un solo uso, hacia sistemas de ejecución autónoma capaces de auto-corregirse en entornos dinámicos."*

---

### 👥 Bloque 6: Laboratorio Práctico (40 min)

**[01:40] Manos a la obra:**
> *"Ahora es su turno. Van a abrir su modelo preferido (ChatGPT o Claude) y van a introducir el Prompt Maestro del caso minero (CAEX). 
> Una vez que el sistema se active, van a empezar a inyectar 'eventos' de temperatura manualmente, uno por mensaje: 'Lectura: 90°C', luego 'Lectura: 105°C', y finalmente 'Lectura: 115°C'.
> Observen cómo el agente adapta su tono, emite alarmas visuales y redacta instrucciones de contingencia."*

**[02:00] Desafío Avanzado del Laboratorio:**
> *"Para los que ya lograron estabilizar la alerta, vamos al siguiente nivel. Pídanle a su agente que, de forma autónoma y al detectar la alerta crítica, genere el borrador de un correo electrónico formal y urgente dirigido al Jefe de Mantenimiento de la mina, detallando la situación para programar el remolque."*
*(El docente asiste a los alumnos y revisa resultados durante este tiempo)*

---

### 📢 Bloque 7: Cierre y Reflexión (10 min)

**[02:20] Conclusión de la sesión:**
> *"Felicidades. Acaban de ver cómo la Inteligencia Artificial pasa de ser un simple chatbot a un inspector de seguridad de planta operando en tiempo real.
> Entender esta lógica de 'disparadores', contexto rápido con Redis, y respuestas orquestadas con LangChain, es el primer paso para diseñar flujos automáticos avanzados que no solo informen, sino que actúen. 
> Y recuerden, ninguna de estas soluciones llega a buen puerto sin observabilidad: herramientas como LangSmith son la clave para que la IA sea confiable, predecible y segura en la industria. ¡Nos vemos en la siguiente sesión!"*
