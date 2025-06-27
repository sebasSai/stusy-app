## Nombre del módulo:  
**Pomodoro**
Ruta: `/src/components/pomodoro`

---

## Propósito del módulo:

El módulo **Pomodoro** gestiona la lógica, estado y visualización del temporizador Pomodoro, así como la configuración personalizada de sesiones y temas visuales asociados. Permite al usuario iniciar, pausar, reiniciar y configurar sus ciclos de trabajo y descanso, integrándose completamente con la gestión de temas visuales de la aplicación.

---

## Estructura visual:

- **PomodoroTimer**  
  - Recuadro central con el temporizador circular, controles de inicio/pausa, reset y badge de estado.
  - Indicación visual de la fase actual: Work, Break, o Transición.
  - Cambia colores dinámicamente según el contexto de tema (work/break/neutral).

- **PomodoroConfigModal**  
  - Modal de configuración que se abre al hacer clic en el badge del temporizador.
  - Permite modificar minutos de trabajo, descanso, cantidad de sesiones y tema visual.
  - Selector visual de temas (work/break) en modo preview.
  - Botón de guardar configuración.

---

## Componentes utilizados:

- **PomodoroTimer**  
  - Controla toda la lógica de temporización y fases Pomodoro.
  - Renderiza el modal de configuración.

- **PomodoroConfigModal**  
  - Modal para configuración rápida de parámetros Pomodoro y selección de tema.
  - Permite elegir y previsualizar todos los temas disponibles.

---

## Flujo o comportamiento:

1. El usuario visualiza el temporizador Pomodoro y puede:
   - Iniciar la cuenta regresiva.
   - Pausar en cualquier momento.
   - Resetear al estado inicial.
2. Puede abrir el **modal de configuración** para cambiar los minutos de trabajo, descanso, número de sesiones y el tema visual.
3. Al terminar las sesiones, se muestra un mensaje de finalización y opción de reinicio.
4. El tema y los colores del temporizador, botones y modal **cambian automáticamente** según la fase (work, break, transición) y el tema seleccionado globalmente.

---

## Relación con otros módulos:

- **Recibe contexto de ThemeContext** para cambiar paleta de colores según el estado de la app.
- Puede interactuar con módulos de estadísticas o histórico (futuro).
- El timer es autónomo, pero su visual depende del contexto global (Navbar, fondo, etc.).

---

## Notas técnicas

### Props importantes
- `initialWorkMinutes`, `initialBreakMinutes`, `onStart`, `onPause`, `onReset`, `onEnd`, `onModeChange` (todos opcionales y gestionados internamente en la mayoría de los flujos).
- PomodoroConfigModal recibe los valores iniciales y un callback para guardar la configuración.

### Hooks o lógica relevante
- **useTheme**: Para acceder y cambiar dinámicamente el tema visual según fase y selección del usuario.
- Lógica de transición de fases: Work > Neutral > Break > (repeat), manteniendo sincronía con la UI y el contexto.

### Consideraciones visuales/diseño
- Transiciones suaves entre colores usando Tailwind y estilos inline reactivos al contexto.
- Accesibilidad: labels, aria-live, roles y navegación por teclado en modal.

### Decisiones técnicas relevantes o pendientes
- Separación estricta de lógica visual, negocio y persistencia.
- El modal de configuración está totalmente desacoplado: fácil de expandir para nuevas opciones en el futuro.
- Pendiente: integración con backend para guardar historial o preferencias en servidor/DB.

---
