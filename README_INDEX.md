## Nombre del proyecto:
**Pomoflow - Gestor Modular de Tiempos Pomodoro**

---

## Resumen general:

Pomoflow es una aplicación web minimalista y escalable para la gestión del tiempo basada en la técnica Pomodoro. Su objetivo es ofrecer a profesionales y estudiantes una herramienta intuitiva para maximizar la concentración, alternando entre periodos de trabajo y descanso con personalización visual completa, estadísticas y recordatorios.

---

## Listado de módulos:

### 1. `/src/context`
**Gestión global de tema y estado**  
Centraliza el manejo de paletas de colores, modo work/break, y preferencias globales de UI.  
→ [README_IA.md - Context](./src/context/README_IA.md)  
**Estado:** Listo

---

### 2. `/src/components`
**Componentes globales (Navbar, BubbleBackground, Footer, etc)**  
Contiene los elementos visuales persistentes que componen la estructura y navegación general de la app.  
→ [README_IA.md - Components](./src/components/README_IA.md)  
**Estado:** Listo

---

### 3. `/src/components/pomodoro`
**Pomodoro Timer y Configuración**  
Incluye el temporizador principal, lógica de fases, y el modal de configuración de tiempos y tema.  
→ [README_IA.md - Pomodoro](./src/components/pomodoro/README_IA.md)  
**Estado:** Listo

---

### 4. `/src/components/stats`  
**Estadísticas de uso**  
Visualización y análisis de sesiones realizadas, tiempos productivos y métricas personalizadas.  
→ *Por definir*  
**Estado:** Por hacer

---

### 5. `/src/components/settings`  
**Configuración avanzada**  
Preferencias de usuario, integración de notificaciones, sincronización y otras opciones.  
→ *Por definir*  
**Estado:** Por hacer

---

## Estado del desarrollo

| Módulo                        | Estado       |
|-------------------------------|--------------|
| `/src/context`                | ✅ Listo     |
| `/src/components`             | ✅ Listo     |
| `/src/components/pomodoro`    | ✅ Listo     |
| `/src/components/stats`       | ⏳ Por hacer |
| `/src/components/settings`    | ⏳ Por hacer |

---

## Notas generales

- **Stack tecnológico:** React + Vite, TailwindCSS, TypeScript, Framer Motion, FastAPI, PostgreSQL, Clerk/Auth0, Vercel, Railway/Render.
- **Principios de desarrollo:** Estructura modular validada por documentación (DMGD), SOLID, sin scaffolding innecesario.
- **Dependencias:** Los módulos deben consumir los contextos globales definidos en `/src/context`. Paletas y constantes visuales centralizadas en `/src/context/themePalettes.ts`.
- **Instrucciones clave:**  
  - Antes de crear nuevos módulos, valida el flujo y la documentación.
  - Mantén actualizado el estado de avance en este índice.
  - Lee siempre los respectivos README_IA.md antes de modificar un módulo existente.

---
