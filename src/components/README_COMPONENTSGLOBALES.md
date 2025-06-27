## Nombre del módulo:  
**Components (navbar, bubblebackground)**
Ruta: `/src/components`

---

## Propósito del módulo:

Este módulo agrupa los **componentes visuales globales y reutilizables** que forman la estructura y la experiencia de usuario base de la aplicación Pomoflow. Incluye elementos como la barra de navegación superior (Navbar) y el fondo animado de burbujas (BubbleBackground), entre otros componentes visuales generales.

Su objetivo es proporcionar consistencia visual, navegación y elementos UI compartidos en toda la aplicación.

---

## Estructura visual:

- **Navbar**:  
  - Barra horizontal fija en la parte superior.
  - Contiene el logotipo, enlaces de navegación, iconos de usuario y notificaciones.
  - Aplica estilos responsivos (desktop/mobile).

- **BubbleBackground**:  
  - Fondo animado con burbujas flotantes y efecto parallax.
  - Ocupa todo el viewport, por debajo del resto del contenido.

- **(Futuro)** Otros componentes globales, como Footer, serán añadidos aquí.

---

## Componentes utilizados:

- **Navbar**  
  - Función: Navegación principal de la app, muestra el nombre/logo, menús y acciones globales.
- **BubbleBackground**  
  - Función: Elemento visual decorativo que otorga identidad a la app.
- **(Opcional en futuro)**: Footer, Toaster, overlays globales, etc.

---

## Flujo o comportamiento:

- El usuario ve la **Navbar** siempre fija arriba, puede navegar entre secciones (ej: Pomodoro, Estadísticas, Configuración).
- Interactúa con iconos de usuario o notificaciones (cuando sean implementados).
- El **BubbleBackground** es solo visual; responde al mouse para animar burbujas, pero no tiene interacción central en el flujo de la app.

---

## Relación con otros módulos:

- **Recibe el contexto de tema visual (ThemeContext) para adaptar colores y estilos globales.**
- Puede importar componentes utilitarios (iconos, hooks, etc.) de otras carpetas.
- El componente Pomodoro y otros módulos principales **no** están dentro de esta carpeta, pero usan estos componentes como envoltorio o decoración.

---

## Notas técnicas

### Props importantes (si aplica)
- **Navbar**: No recibe props actualmente, utiliza hooks de contexto.
- **BubbleBackground**: No recibe props, pero puede expandirse para permitir customización.

### Hooks o lógica relevante
- Ambos componentes usan el hook `useTheme` para adaptar su paleta de colores al tema global seleccionado.
- **BubbleBackground** implementa lógica propia de animación y reacción al mouse.

### Consideraciones visuales/diseño
- El fondo y la barra deben responder fluidamente a los cambios de tema (work, break, neutral).
- Se usa **TailwindCSS** + estilos inline para customización dinámica desde contexto.
- Layout pensado para responsividad.

### Decisiones técnicas relevantes o pendientes
- **Separación de responsabilidades**: Componentes globales no deben incluir lógica de negocio (Pomodoro, sesiones, etc.).
- Cualquier lógica compartida (hooks, utilidades) debe abstraerse fuera de esta carpeta.
- Futuro: cuando se agregue Footer u overlays, seguir esta estructura y actualizar este README.

---
