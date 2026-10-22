# Suite de Interacciones Híbridas por Sesión (Autoevaluación, Simulador de Decisiones y Evaluador de Prompts con IA)

Incorporación de tres dinámicas interactivas diseñadas específicamente para cada una de las 5 sesiones del curso, integradas junto al Módulo Teórico y el Laboratorio Práctico, con soporte híbrido para **Práctica Individual** y **Modo Clase en Vivo**.

## Revisión del Usuario y Decisiones Confirmadas

> [!IMPORTANT]
> Las siguientes decisiones han sido alineadas a partir de tus respuestas y guiarán la implementación en las 5 sesiones (Martes 20 oct, Jueves 22 oct, Martes 27 oct, Jueves 29 oct y Martes 03 nov de 2026):

- **Alcance de Interacciones Confirmado**: Se integrarán las **3 dinámicas seleccionadas** en cada una de las 5 sesiones:
  1. **Quiz Interactivo de Autoevaluación por Sesión** (al cierre del Módulo Teórico).
  2. **Simulador de Toma de Decisiones con Casos Empresariales** (integrado junto al Laboratorio Práctico).
  3. **Optimizador y Evaluador de Prompts en Vivo con IA** (integrado como estación práctica interactiva en cada sesión).
- **Enfoque Pedagógico Confirmado**: **Modo Híbrido (Clase en Vivo + Práctica Individual)**. Cada módulo contará con un selector de modo que permite al alumno practicar con feedback inmediato o al docente proyectar en clase ocultando la respuesta/impacto hasta que el grupo vote y debata.
- **Ubicación Confirmada**: **Integrada orgánicamente dentro de la vista de cada sesión**, acompañando el flujo natural entre el Módulo Teórico y el Laboratorio Práctico.

---

## 1. Visión General y Concepto Central

- **Qué Hace**: Transforma cada sesión en una experiencia activa donde los participantes validan la teoría recién vista, toman decisiones ejecutivas bajo presión simulando casos reales en Chile/LatAm y perfeccionan sus propios prompts con diagnóstico en tiempo real impulsado por IA.
- **Audiencia y Contexto**: Docentes que proyectan la plataforma en vivo (horario 19:00 a 22:00 hrs) para generar debate grupal, y alumnos que revisan o practican de forma autónoma desde su computador.
- **Valor Principal**: Cierra la brecha entre leer conceptos teóricos y aplicarlos en situaciones reales de negocio sin salir del flujo de la sesión.

---

## 2. Experiencia de Usuario y Diseño Visual

### Flujos de Usuario Clave

1. **Selector de Modalidad Híbrida (`Práctica Individual` / `Debate en Clase en Vivo`)**:
   - En **Práctica Individual**, al elegir una opción del Quiz o del Simulador de Decisiones, el resultado y la justificación pedagógica se muestran al instante y el progreso queda guardado localmente.
   - En **Modo Clase en Vivo**, al seleccionar una alternativa se marca como "Voto del Grupo" sin revelar aún si es óptima, habilitando el botón **"Revelar Análisis Docente"** para fomentar la discusión antes de mostrar la solución.
2. **Estación 1 — Quiz Interactivo de Autoevaluación (Cierre del Módulo Teórico)**:
   - 3 preguntas situacionales por sesión (15 en total) conectadas directamente con los puntos teóricos de esa fecha.
   - Indicadores de estado claros con ícono y etiqueta explícita (`Correcto`, `Por reforzar`, `En debate grupal`), puntaje acumulado con tipografía tabular (`tabular-nums`) y explicación del porqué de cada respuesta.
3. **Estación 2 — Simulador de Toma de Decisiones Empresariales (Laboratorio Práctico)**:
   - Presenta un dilema corporativo de 2 etapas adaptado a la temática de la sesión:
     - **Sesión 1 (20 oct)**: Crisis de datos corruptos y caída de stock en tiempo real durante CyberDay.
     - **Sesión 2 (22 oct)**: Alucinación de un LLM en catálogo técnico y fuga de datos sensibles en prompts.
     - **Sesión 3 (27 oct)**: Campaña multicanal con baja conversión y sesgo visual en dashboards ejecutivos.
     - **Sesión 4 (29 oct)**: Despliegue acelerado con Antigravity + Gemini ante un cambio de requerimientos de último minuto.
     - **Sesión 5 (03 nov)**: Defensa de arquitectura y ROI del proyecto final ante preguntas críticas del directorio.
   - Panel dividido en dos zonas: **Escenario y Opciones de Decisión** a la izquierda, y **Matriz de Impacto en Vivo** a la derecha (Calidad Técnica, Tiempo de Ejecución y Riesgo Operativo con barras comparativas y números tabulares).
4. **Estación 3 — Evaluador y Optimizador de Prompts en Vivo con IA**:
   - Permite escribir un prompt desde cero o cargar un "Prompt Base Mejorable" propio de la sesión con un clic.
   - Evalúa en tiempo real mediante Gemini en el servidor (con respaldo analítico instantáneo) cuatro pilares: **Rol y Contexto**, **Claridad de la Tarea**, **Restricciones y Reglas**, y **Formato de Salida**.
   - Entrega sugerencias accionables y genera una **Versión Optimizada del Prompt** lista para copiar y usar en las herramientas de la sesión.

### Identidad Visual y Tema

- **Dirección Estética**: Diseño educativo interactivo de alta legibilidad, alineado con la paleta de la plataforma.
- **Paleta y Contraste (Regla 60-30-10)**:
  - **60% Lienzo Dominante**: Superficies limpias en blanco/gris pizarra claro (`slate-50` / `white`) para el bloque teórico-evaluativo y pizarra profunda (`slate-900`) para las estaciones integradas al Laboratorio Práctico.
  - **30% Estructuras y Contenedores**: Bordes finos de `1px` (`border-slate-200` en claro, `border-slate-800` en oscuro) sin bordes laterales gruesos ni tarjetas anidadas innecesarias.
  - **10% Acentos Semánticos**: Índigo (`indigo-600`) para controles interactivos activos, Esmeralda (`emerald-600`) acompañado de etiqueta e ícono para decisiones óptimas, y Ámbar/Coral (`amber-600` / `rose-600`) con etiqueta explícita para alertas de riesgo o puntos de mejora.
- **Tipografía y Jerarquía**: Títulos expresivos con `text-wrap: balance`, controles de una sola línea (`whitespace-nowrap`) y cifras de puntajes/métricas con alineación tabular (`tabular-nums`).

---

## 3. Decisiones de Producto y Balance Técnico

- **Decisión 1: Modo Híbrido con Revelación Controlada**
  - *Enfoque Elegido*: Conmutador directo en la barra de herramientas de las actividades que alterna entre resolución inmediata (estudio autónomo) y resolución en dos pasos (votación grupal + revelación del profesor).
  - *Por Qué*: Evita que la respuesta correcta aparezca de golpe cuando el docente está compartiendo pantalla en Zoom/Meet o en el proyector, manteniendo la tensión pedagógica.
- **Decisión 2: Evaluación de Prompts en el Servidor con Respaldo Determinista**
  - *Enfoque Elegido*: Ruta en el backend Express que consulta el modelo Gemini para analizar y reescribir el prompt del alumno, complementada con un motor de análisis estructurado de respaldo en caso de latencia o falta de conexión.
  - *Por Qué*: Garantiza que la actividad en vivo durante la clase de 19:00 a 22:00 hrs nunca se detenga ni muestre errores bloqueantes frente a los alumnos.
- **Decisión 3: Persistencia Local por Sesión**
  - *Enfoque Elegido*: Guardar puntajes del quiz, decisiones tomadas y prompts optimizados en el almacenamiento local del navegador indexado por sesión (`s1` a `s5`).
  - *Por Qué*: Permite que los alumnos retomen sus avances entre el martes 20 de octubre y el martes 03 de noviembre sin perder sus pruebas.

---

## 4. Arquitectura Técnica y Flujo de Datos

### Diagrama de Arquitectura y Componentes

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         Vista de Sesión (SessionView)                     │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ Barra de Control Híbrida: [Modo Individual] ⇄ [Modo Clase en Vivo]  │  │
│  └───────────────┬─────────────────────────────────────┬───────────────┘  │
│                  ▼                                     ▼                  │
│  ┌─────────────────────────────────┐   ┌───────────────────────────────┐  │
│  │ 1. Módulo Teórico               │   │ 2. Laboratorio Práctico       │  │
│  │  ├─ Acordeones + Infografías    │   │  ├─ Caso Real + Paso a Paso   │  │
│  │  ├─ Sandbox de Datos            │   │  ├─ [NUEVO] Simulador de      │  │
│  │  └─ [NUEVO] Quiz Interactivo    │   │  │   Decisiones Empresariales │  │
│  │      de Autoevaluación (S1-S5)  │   │  └─ [NUEVO] Optimizador y     │  │
│  └───────────────┬─────────────────┘   │      Evaluador de Prompts IA  │  │
│                  │                     └───────────────┬───────────────┘  │
└──────────────────┼─────────────────────────────────────┼──────────────────┘
                   │                                     │
                   ▼                                     ▼
     ┌───────────────────────────┐         ┌───────────────────────────┐
     │ Persistencia LocalStorage │         │ Backend Express (/api/*)  │
     │ - Progreso Quiz por S1-S5 │         │ - POST /api/evaluate-     │
     │ - Estado del Simulador    │         │   prompt (Gemini SDK)     │
     │ - Historial de Prompts    │         │ - Respaldo Estructurado   │
     └───────────────────────────┘         └───────────────────────────┘
```

### Modelo de Datos y Mapeo de Estado Interactivo

- **Banco de Autoevaluación (`SessionQuiz`)**:
  - Cada sesión (`s1`–`s5`) incluye 3 preguntas de aplicación práctica con 4 opciones, índice de respuesta correcta, explicación docente detallada y nivel de dominio.
  - Manejadores de estado para selección de respuesta, bloqueo/revelación en Modo Clase en Vivo, cálculo de porcentaje de aciertos y botón de reinicio.
- **Escenarios del Simulador (`DecisionSimulator`)**:
  - Cada sesión cuenta con un escenario empresarial dividido en 2 fases secuenciales. Cada decisión modifica tres indicadores numéricos (`precision`, `velocidad`, `seguridad`) de 0 a 100 y despliega el análisis de impacto ejecutivo.
- **Evaluador de Prompts con IA (`LivePromptEvaluator`)**:
  - Estado para el texto del prompt, selector de plantillas base de la sesión, estado de carga y objeto de resultado (`score`, `criteriaBreakdown`, `feedback`, `optimizedPrompt`), con botón de copiado rápido al portapapeles.
