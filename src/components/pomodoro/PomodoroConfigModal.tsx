import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark, HiOutlineCheckCircle, HiOutlineClock, HiOutlineArrowPath } from "react-icons/hi2";
import { BsLayers } from "react-icons/bs";
import { THEMES, type ThemeKey } from "../../context/themePalettes";
import { useTheme } from "../../context/ThemeContext";

interface PomodoroConfigModalProps {
  open: boolean;
  onClose: () => void;
  initialWorkMinutes: number;
  initialBreakMinutes: number;
  initialWorkSessions: number;
  onSave: (data: {
    workMinutes: number;
    breakMinutes: number;
    workSessions: number;
  }) => void;
}

const PomodoroConfigModal: React.FC<PomodoroConfigModalProps> = ({
  open,
  onClose,
  initialWorkMinutes,
  initialBreakMinutes,
  initialWorkSessions,
  onSave,
}) => {
  const [workMinutes, setWorkMinutes] = useState(initialWorkMinutes);
  const [breakMinutes, setBreakMinutes] = useState(initialBreakMinutes);
  const [workSessions, setWorkSessions] = useState(initialWorkSessions);

  const { currentThemeKey, setThemeByKey, modalBg } = useTheme();

  useEffect(() => {
    setWorkMinutes(initialWorkMinutes);
    setBreakMinutes(initialBreakMinutes);
    setWorkSessions(initialWorkSessions);
  }, [open, initialWorkMinutes, initialBreakMinutes, initialWorkSessions]);

  const handleSave = () => {
    onSave({
      workMinutes: Math.max(1, workMinutes),
      breakMinutes: Math.max(1, breakMinutes),
      workSessions: Math.max(1, workSessions),
    });
    onClose();
  };

  const THEMES_ARRAY = Object.values(THEMES) as Array<(typeof THEMES.original)>;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: "rgba(20, 55, 89, 0.24)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
          }}
        >
          <motion.div
            className="relative flex flex-col items-center w-[370px] max-w-full px-7 py-8 rounded-3xl shadow-2xl"
            initial={{ scale: 0.97, y: 60, opacity: 0.7 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, y: 60, opacity: 0.7 }}
            transition={{ duration: 0.36, ease: [0.22, 0.8, 0.33, 1] }}
            style={{
              background: modalBg, // <-- Aquí el fondo dinámico del tema
              border: "1.5px solid #c5e6fa",
              boxShadow: "0 8px 44px 0 #14375922, 0 2px 24px #51a8e014",
              backdropFilter: "blur(18px)",
            }}
          >
            <button
              className="absolute right-3 top-3 w-9 h-9 flex items-center justify-center bg-white/60 hover:bg-blue-100 transition rounded-full text-xl shadow"
              onClick={onClose}
              aria-label="Cerrar configuración"
            >
              <HiOutlineXMark />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <BsLayers className="text-2xl text-blue-500" />
              <h2 className="font-bold text-xl">Configura tu Pomodoro</h2>
            </div>
            <div className="mb-6 w-full">
              <div className="font-bold mb-2 flex items-center gap-2 text-blue-600">
                <span>🎨</span> Temas
              </div>
              <div className="flex gap-3 flex-wrap">
                {THEMES_ARRAY.map(theme => (
                  <button
                    key={theme.key}
                    type="button"
                    className={`
                      flex flex-col items-center gap-1 px-2 py-1 rounded-2xl border-2 transition
                      ${currentThemeKey === theme.key
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-transparent opacity-80 hover:border-blue-300"}
                    `}
                    onClick={() => setThemeByKey(theme.key as ThemeKey)}
                    aria-label={`Cambiar a tema ${theme.name}`}
                  >
                    <div className="flex gap-1">
                      <span
                        className="w-7 h-4 rounded-l-full"
                        style={{ background: theme.work.primary }}
                      />
                      <span
                        className="w-7 h-4 rounded-r-full"
                        style={{ background: theme.break.primary }}
                      />
                    </div>
                    <span className="text-xs font-medium mt-1">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={e => {
                e.preventDefault();
                handleSave();
              }}
            >
              <label className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-2 border border-blue-200 focus-within:border-blue-500 transition">
                <HiOutlineClock className="text-blue-400 text-xl" />
                <span className="font-medium text-sm min-w-[86px]">Min. trabajo</span>
                <input
                  type="number"
                  value={workMinutes}
                  onChange={e => setWorkMinutes(Math.max(1, Math.floor(Number(e.target.value) || 0)))}
                  className="input-no-arrows flex-1 px-2 py-1 rounded text-center outline-none bg-transparent font-semibold text-lg"
                  min={1}
                  required
                />
              </label>
              <label className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-2 border border-blue-200 focus-within:border-blue-500 transition">
                <HiOutlineArrowPath className="text-blue-400 text-xl" />
                <span className="font-medium text-sm min-w-[86px]">Min. descanso</span>
                <input
                  type="number"
                  value={breakMinutes}
                  onChange={e => setBreakMinutes(Math.max(1, Math.floor(Number(e.target.value) || 0)))}
                  className="input-no-arrows flex-1 px-2 py-1 rounded text-center outline-none bg-transparent font-semibold text-lg"
                  min={1}
                  required
                />
              </label>
              <label className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-2 border border-blue-200 focus-within:border-blue-500 transition">
                <HiOutlineCheckCircle className="text-blue-400 text-xl" />
                <span className="font-medium text-sm min-w-[86px]">Sesiones</span>
                <input
                  type="number"
                  value={workSessions}
                  onChange={e => setWorkSessions(Math.max(1, Math.floor(Number(e.target.value) || 1)))}
                  className="input-no-arrows flex-1 px-2 py-1 rounded text-center outline-none bg-transparent font-semibold text-lg"
                  min={1}
                  required
                />
              </label>
              <button
                className="mt-2 w-full rounded-xl py-2 font-bold text-white text-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:scale-[1.04] transition"
                type="submit"
              >
                Guardar configuración
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PomodoroConfigModal;
