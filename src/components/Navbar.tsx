import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Pomodoro", path: "/" },
  { label: "Estadísticas", path: "/stats" },
  { label: "Configuración", path: "/settings" },
];

const Navbar: React.FC = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { theme, headerGradient } = useTheme(); 

  return (
    <header
      className="w-full px-6 py-3 flex items-center justify-between relative"
      style={{
        background: headerGradient || theme.cardBg, 
        minHeight: 70,
        boxShadow: `0 6px 24px 0 ${theme.glow}40`,
        zIndex: 20,
        position: "relative",
        transition: "background 0.8s cubic-bezier(.33,1.02,.58,1)",
      }}
    >
      <div className="flex items-center gap-3 select-none relative z-10">
        <span
          className="px-3 py-1 rounded-full font-bold tracking-tight shadow"
          style={{
            background: theme.cardBg,
            color: theme.primary,
            fontSize: 26,
            letterSpacing: 1,
            border: `2.4px solid ${theme.primary}`,
            boxShadow: `0 0 18px 2px ${theme.glow}22`,
            userSelect: "none",
            transition: "background 0.8s, color 0.8s, border 0.8s",
          }}
        >
          Pomoflow
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-5 z-10">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.path}
            className="text-base font-semibold px-3 py-1 rounded relative group transition-colors"
            style={{
              color: theme.input,
              letterSpacing: 0.5,
              transition: "color 0.8s",
            }}
          >
            {link.label}
            <span
              className="absolute left-0 right-0 -bottom-1 h-[3px] rounded group-hover:bg-current transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left"
              style={{
                background: theme.primary,
                opacity: 0.95,
                transition: "background 0.8s",
              }}
            />
          </a>
        ))}
        <div className="relative">
          <button
            className="mx-2"
            onClick={() => {
              setNotifOpen((n) => !n);
              setUserOpen(false);
            }}
            aria-label="Ver notificaciones"
            style={{
              background: theme.input,
              borderRadius: 12,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: notifOpen
                ? `0 0 8px 2px ${theme.glow}88`
                : undefined,
              border: notifOpen
                ? `2.3px solid ${theme.primary}`
                : "2px solid transparent",
              transition: "box-shadow 0.2s, border 0.2s, background 0.8s",
            }}
          >
            <span className="relative">
              <svg width={22} height={22} fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11c0-3.07-1.64-5.64-5-6.32V4a1 1 0 1 0-2 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 0 0 5 19h14a1 1 0 0 0 .71-1.71L18 16Z"
                  fill={theme.primary}
                />
              </svg>
              <span
                className="absolute top-0 right-0 w-2 h-2 rounded-full border-2"
                style={{
                  background: theme.glow,
                  borderColor: theme.accent,
                }}
              />
            </span>
          </button>
          <AnimatePresence>{notifOpen && /* panel de notificaciones */ null}</AnimatePresence>
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setUserOpen((u) => !u);
              setNotifOpen(false);
            }}
            aria-label="Abrir menú de usuario"
            className="ml-3"
            style={{
              background: theme.primary,
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: userOpen
                ? `0 0 8px 2px ${theme.primary}88`
                : undefined,
              border: userOpen
                ? `2.3px solid ${theme.glow}`
                : "2px solid transparent",
              transition: "box-shadow 0.2s, border 0.2s, background 0.8s",
            }}
          >
            <span className="text-lg font-bold" style={{ color: theme.deepNavy }}>
              A
            </span>
          </button>
          <AnimatePresence>{userOpen && /*panel de usuario */ null}</AnimatePresence>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
