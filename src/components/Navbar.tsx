import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Hamburguesa y cerrar (puedes usar cualquier icono que tengas)
import clsx from "clsx";

const NAV_LINKS = [
  { label: "Pomodoro", path: "/" },
  { label: "Estadísticas", path: "/stats" },
  { label: "Configuración", path: "/settings" },
];

const Navbar: React.FC = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, headerGradient } = useTheme();

  // Contraste para logo según tema
  const logoTextColor = theme.deepNavy === "#FFFFFF" ? theme.primary : theme.deepNavy;
  const logoBgColor = theme.cardBg;

  // Contraste para links en minimalista
  const linkColor = theme.input;
  const mobileBg = headerGradient || theme.cardBg;

  return (
    <header
      className="w-full px-6 py-3 flex items-center justify-between relative z-30"
      style={{
        background: headerGradient || theme.cardBg,
        minHeight: 70,
        boxShadow: `0 6px 24px 0 ${theme.glow}40`,
        position: "relative",
        transition: "background 0.8s cubic-bezier(.33,1.02,.58,1)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 select-none relative z-10">
        <span
          className="px-3 py-1 rounded-full font-bold tracking-tight shadow"
          style={{
            background: logoBgColor,
            color: logoTextColor,
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

      {/* Menú Desktop */}
      <nav className="hidden md:flex items-center gap-5 z-10">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.path}
            className="text-base font-semibold px-3 py-1 rounded relative group transition-colors"
            style={{
              color: linkColor,
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
        {/* Notificaciones */}
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
          <AnimatePresence>{notifOpen && null}</AnimatePresence>
        </div>

        {/* Usuario */}
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
          <AnimatePresence>{userOpen && null}</AnimatePresence>
        </div>
      </nav>

      {/* Menú móvil (Hamburguesa) */}
      <div className="flex md:hidden z-20">
        <button
          className="rounded-md p-2"
          aria-label="Abrir menú"
          style={{
            background: theme.input,
            border: "1.6px solid " + theme.primary,
            color: theme.primary,
            boxShadow: `0 1px 6px 0 ${theme.glow}11`,
            transition: "background 0.5s, border 0.5s",
          }}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={26} />
        </button>
        {/* Menú desplegable */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 flex flex-col bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                className={clsx(
                  "ml-auto w-3/4 max-w-xs h-full flex flex-col py-7 px-7 shadow-2xl",
                  "rounded-l-3xl",
                )}
                style={{
                  background: mobileBg,
                  transition: "background 0.6s",
                  boxShadow: `-6px 0 44px 0 ${theme.glow}11`,
                }}
                initial={{ x: 320 }}
                animate={{ x: 0 }}
                exit={{ x: 320 }}
                transition={{ type: "spring", stiffness: 250, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="mb-8 ml-auto"
                  aria-label="Cerrar menú"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: theme.input,
                    borderRadius: "50%",
                    border: "1.6px solid " + theme.primary,
                    color: theme.primary,
                  }}
                >
                  <X size={24} />
                </button>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.path}
                    className="block text-lg font-bold py-3 mb-1 rounded transition-colors"
                    style={{
                      color: theme.input,
                      background: "transparent",
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
