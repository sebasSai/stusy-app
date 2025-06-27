## Nombre del módulo:  
**Context (Gestión de Tema y Estado Global)**
Ruta: `/src/context`

---

## Propósito del módulo:

Centraliza y expone el estado global de la app relacionado con temas visuales (*ThemeContext*), modo de color (work/break), y funciones para cambiar temas y sincronizar preferencias. Permite a cualquier componente consumir la paleta de colores y estilos activos, así como modificar el tema de la app de manera reactiva.

---

## Estructura visual:

(No aplica interfaz visual directa, pero provee el contexto necesario para que toda la UI cambie de manera global).

- Define un Provider (`ThemeProvider`) que debe envolver a la app en el punto más alto de la jerarquía de React (usualmente en main.tsx o App.tsx).
- Expone un hook (`useTheme`) para acceso sencillo al contexto.

---

## Componentes/archivos utilizados:

- **ThemeContext.tsx**
  - Define el contexto, el proveedor y el hook de acceso.
  - Expone y sincroniza los valores de tema, modo, gradientes globales y funciones de actualización.
- **themePalettes.ts**
  - Define todas las paletas de colores disponibles (original, minimalista, etc) y la paleta neutral para transiciones.

---

## Flujo o comportamiento:

1. Al montar la app, el ThemeProvider verifica localStorage para cargar el tema guardado, si existe.
2. Cuando el usuario selecciona un nuevo tema (por ejemplo, desde el modal PomodoroConfigModal), se actualiza el estado global y se guarda en localStorage.
3. Todos los componentes suscritos al contexto (*useTheme*) reciben automáticamente la nueva paleta y actualizan su UI sin recargar la página.
4. El modo (work/break) puede ser modificado por los flujos de negocio (PomodoroTimer), cambiando la paleta activa sin perder el tema elegido.

---

## Relación con otros módulos:

- Es consumido por **Navbar, PomodoroTimer, PomodoroConfigModal, BubbleBackground**, y cualquier otro componente que use el hook `useTheme`.
- No depende de componentes visuales, solo de la definición de paletas en `themePalettes.ts`.
- Puede ser extendido para gestionar otros estados globales (ejemplo: idioma, usuario).

---

## Notas técnicas

### Props importantes

- El Provider no requiere props salvo los hijos (`children`), pero expone:
  - `theme`: Paleta actual activa según tema y modo.
  - `mode`: "work" o "break".
  - `currentThemeKey`: string con el key del tema.
  - `setThemeByKey`: función para cambiar tema activo.
  - `setMode`: función para cambiar modo work/break.
  - `headerGradient`, `modalBg`: gradientes globales definidos por tema.

### Hooks o lógica relevante

- `useTheme`: Acceso al contexto desde cualquier componente.
- Persistencia automática en localStorage.
- Separación de las definiciones de paleta en archivo externo (`themePalettes.ts`) para cumplir Open/Closed de SOLID.

### Consideraciones visuales/diseño

- Los valores de color y gradientes están tipados, evitando errores en los componentes consumidores.
- Cambio inmediato y consistente de tema global sin parpadeos.
- Preparado para expansión futura de temas.

### Decisiones técnicas relevantes o pendientes

- Escalabilidad asegurada: puedes añadir nuevos temas sin modificar la lógica del contexto.
- Dependencia explícita de los componentes consumidores vía hook.
- Pendiente: integración con preferencias de usuario en backend (para sincronía multi-dispositivo, opcional).
