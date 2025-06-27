import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { NEUTRAL_THEME } from "../../context/themePalettes";
import PomodoroConfigModal from "./PomodoroConfigModal";

const TRANSITION_SECONDS = 10 as const;
type Phase = "work" | "break" | "transition";

interface PomodoroTimerProps {
  initialWorkMinutes?: number;
  initialBreakMinutes?: number;
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onEnd?: (completed: boolean) => void;
  onModeChange?: (isWork: boolean) => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  initialWorkMinutes = 25,
  initialBreakMinutes = 5,
  onStart,
  onPause,
  onReset,
  onEnd,
  onModeChange,
}) => {
  const [workMinutes, setWorkMinutes] = useState(initialWorkMinutes);
  const [breakMinutes, setBreakMinutes] = useState(initialBreakMinutes);
  const [sessions, setSessions] = useState(4);
  const [currentSession, setCurrentSession] = useState(1);
  const [phase, setPhase] = useState<Phase>("work");
  const [prevPhase, setPrevPhase] = useState<Phase>("work");
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [configOpen, setConfigOpen] = useState(false);
  const [showFinishMsg, setShowFinishMsg] = useState(false);

  const { theme, setMode } = useTheme();
  const themeToUse = phase === "transition" ? NEUTRAL_THEME : theme;

  useEffect(() => {
    if (phase === "work" || phase === "break") setMode(phase);
  }, [phase, setMode]);

  const getInitialSeconds = useCallback(
    (ph: Phase) => {
      if (ph === "work") return workMinutes * 60;
      if (ph === "break") return breakMinutes * 60;
      return TRANSITION_SECONDS;
    },
    [workMinutes, breakMinutes]
  );

  useEffect(() => {
    if (!isRunning) setSecondsLeft(getInitialSeconds(phase));
  }, [workMinutes, breakMinutes, phase, isRunning, getInitialSeconds]);

  useEffect(() => {
    if (!isRunning) return;

    if (secondsLeft === 0) {
      if (phase === "work") {
        if (currentSession === sessions) {
          setIsRunning(false);
          setShowFinishMsg(true);
          onEnd?.(true);
        } else {
          setPrevPhase("work");
          setPhase("transition");
          setSecondsLeft(TRANSITION_SECONDS);
          onModeChange?.(false);
        }
      } else if (phase === "break") {
        setPrevPhase("break");
        setPhase("transition");
        setSecondsLeft(TRANSITION_SECONDS);
        onModeChange?.(true);
      } else if (phase === "transition") {
        if (prevPhase === "work") {
          setPhase("break");
          setSecondsLeft(breakMinutes * 60);
        } else if (prevPhase === "break") {
          setCurrentSession((prev) => prev + 1);
          setPhase("work");
          setSecondsLeft(workMinutes * 60);
        }
      }
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [
    isRunning,
    secondsLeft,
    phase,
    prevPhase,
    currentSession,
    sessions,
    workMinutes,
    breakMinutes,
    onEnd,
    onModeChange,
  ]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const totalSeconds = getInitialSeconds(phase);
  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;
  const RADIUS = 80;
  const CIRCUM = 2 * Math.PI * RADIUS;

  // Acciones UI
  const handleStart = () => {
    setIsRunning(true);
    onStart?.();
  };
  const handlePause = () => {
    setIsRunning(false);
    onPause?.();
  };
  const handleReset = () => {
    setIsRunning(false);
    setPhase("work");
    setSecondsLeft(workMinutes * 60);
    setCurrentSession(1);
    setShowFinishMsg(false);
    onModeChange?.(true);
    onReset?.();
  };

  const handleBadgeClick = () => setConfigOpen(true);
  const handleConfigSave = ({
    workMinutes,
    breakMinutes,
    sessions,
  }: {
    workMinutes: number;
    breakMinutes: number;
    sessions: number;
  }) => {
    setWorkMinutes(workMinutes);
    setBreakMinutes(breakMinutes);
    setSessions(sessions);
    setPhase("work");
    setSecondsLeft(workMinutes * 60);
    setCurrentSession(1);
    setIsRunning(false);
    setShowFinishMsg(false);
  };

  const transitionMsg =
    phase === "transition"
      ? prevPhase === "work"
        ? "Prepárate para el descanso"
        : "Prepárate para la siguiente sesión de trabajo"
      : "";

  return (
    <>
      <motion.div
        className="flex flex-col items-center justify-center p-7 rounded-3xl shadow-2xl relative"
        initial={{ opacity: 0, scale: 0.97, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.44, ease: [0.18, 0.7, 0.44, 0.99] }}
        style={{
          minWidth: 320,
          maxWidth: 400,
          background: themeToUse.cardBg,
          border: `1.8px solid ${themeToUse.border}`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: `0 12px 44px 0 ${themeToUse.glow}22, 0 1.5px 24px ${themeToUse.accent}14`,
          transition: "background 0.8s, border 0.8s, box-shadow 0.8s",
        }}
      >


        {/* ÚNICO BOTÓN DE ESTADO */}
        <motion.button
          type="button"
          role="button"
          tabIndex={0}
          onClick={handleBadgeClick}
          onKeyDown={e => (e.key === "Enter" ? handleBadgeClick() : null)}
          aria-label={
            phase === "work"
              ? "En foco"
              : phase === "break"
              ? "Descanso"
              : "Transición"
          }
          className="flex items-center gap-2 mb-3 px-5 py-2 rounded-full font-bold text-base shadow-sm cursor-pointer select-none border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
          style={{
            background:
              phase === "work"
                ? themeToUse.primary
                : phase === "break"
                ? themeToUse.primary
                : themeToUse.cardBg,
            color:
              phase === "transition"
                ? themeToUse.accent
                : themeToUse.input,
            borderColor:
              phase === "transition"
                ? themeToUse.label
                : themeToUse.accent,
            transition: "background 0.55s, color 0.55s, border-color 0.55s, box-shadow 0.45s cubic-bezier(.33,1.02,.58,1)",
            minWidth: 144,
            justifyContent: "center",
          }}
          initial={{ y: -18, opacity: 0.5, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.41, ease: [0.22, 0.8, 0.33, 1] }}
        >
          {phase === "work" && (
            <>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#fff3" />
                <path
                  d="M12 7v5l4 2"
                  stroke={themeToUse.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>En foco</span>
            </>
          )}
          {phase === "break" && (
            <>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#fff3" />
                <path
                  d="M9 17c1.5 1.5 6 1.5 7.5-1.5s-2.5-6-3.5-6-5 3-4 7.5Z"
                  stroke={themeToUse.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Descanso</span>
            </>
          )}
          {phase === "transition" && (
            <>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#fff3" />
                <path
                  d="M7 12h10"
                  stroke={themeToUse.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>Transición</span>
            </>
          )}
        </motion.button>

        {(phase === "work" || phase === "break") && (
          <div className="mb-2 text-xs font-semibold" style={{ color: themeToUse.label }}>
            Sesión {currentSession} de {sessions}
          </div>
        )}

        <motion.div
          key={phase}
          initial={{ scale: 0.97, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.48, ease: [0.18, 0.7, 0.44, 0.99] }}
          className="relative my-3 flex items-center justify-center"
          style={{ width: 180, height: 180, zIndex: 1 }}
        >
          <svg width="220" height="220" style={{ position: "absolute", left: -20, top: -20 }}>
            {/* Glow SOLO sobre el progreso */}
            <motion.circle
              cx="110"
              cy="110"
              r={RADIUS}
              fill="none"
              stroke={themeToUse.glow}
              strokeWidth="26"
              strokeDasharray={CIRCUM}
              strokeDashoffset={CIRCUM * (1 - progress)}
              strokeLinecap="round"
              style={{
                filter: `blur(16px)`,
                opacity: 0.18,
                transition: "filter 0.8s, opacity 0.8s",
                pointerEvents: "none",
              }}
              initial={false}
              animate={{ strokeDashoffset: CIRCUM * (1 - progress) }}
            />
            {/* Anillo base */}
            <circle
              cx="110"
              cy="110"
              r={RADIUS}
              fill="none"
              stroke={themeToUse.border}
              strokeWidth="13"
            />
            {/* Progreso */}
            <motion.circle
              cx="110"
              cy="110"
              r={RADIUS}
              fill="none"
              stroke={`url(#timerGradient)`}
              strokeWidth="13"
              strokeDasharray={CIRCUM}
              strokeDashoffset={CIRCUM * (1 - progress)}
              strokeLinecap="round"
              initial={false}
              animate={{ strokeDashoffset: CIRCUM * (1 - progress) }}
              transition={{ duration: 1.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                filter: `drop-shadow(0 0 10px ${themeToUse.glow}66)`,
                transition: "filter 0.8s",
              }}
            />
            <defs>
              <linearGradient id="timerGradient" x1="0" y1="0" x2="220" y2="220" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={themeToUse.primary} />
                <stop offset="100%" stopColor={themeToUse.accent} />
              </linearGradient>
            </defs>
          </svg>

          {/* SOLO EL TIEMPO EN EL CENTRO */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.span
              key={phase}
              className="text-5xl font-mono select-none font-bold"
              style={{
                color: themeToUse.deepNavy,
                letterSpacing: 2,
                transition: "color 0.8s",
              }}
              aria-live="polite"
              initial={{ scale: 0.95, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.48, ease: [0.18, 0.7, 0.44, 0.99] }}
            >
              {formatTime(secondsLeft)}
            </motion.span>
          </div>
        </motion.div>

        {phase === "transition" && (
          <div className="mb-4 text-base text-center font-medium" style={{ color: themeToUse.label }}>
            {transitionMsg}
          </div>
        )}

        <div className="flex flex-col gap-2 w-full mt-2">
          <motion.button
            whileTap={{ scale: 0.93 }}
            className="w-full rounded-2xl py-3 font-bold text-lg shadow-md mb-1 transition-all flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(90deg, ${themeToUse.primary} 0%, ${themeToUse.accent} 90%)`,
              color: "#fff",
              border: "none",
              boxShadow: `0 0 10px ${themeToUse.glow}66`,
              transition: "background 0.8s, box-shadow 0.8s",
            }}
            onClick={isRunning ? handlePause : handleStart}
            aria-label={isRunning ? "Pausar temporizador" : "Iniciar temporizador"}
          >
            {isRunning ? (
              <svg width="22" height="22" fill="none" viewBox="0 0 20 20">
                <rect x="5" y="4" width="3.5" height="12" rx="1" fill="#fff" />
                <rect x="11.5" y="4" width="3.5" height="12" rx="1" fill="#fff" />
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" viewBox="0 0 20 20">
                <path
                  d="M7 5.5v9l7-4.5-7-4.5Z"
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth="1"
                />
              </svg>
            )}
            {isRunning ? "Pausar" : "Iniciar"}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="w-full rounded-2xl py-2 font-semibold border transition-all"
            style={{
              background: themeToUse.input,
              color: themeToUse.primary,
              border: `1.5px solid ${themeToUse.primary}`,
              transition: "background 0.8s, border 0.8s, color 0.8s",
            }}
            onClick={handleReset}
            aria-label="Resetear temporizador"
            disabled={isRunning && secondsLeft !== 0}
          >
            Resetear
          </motion.button>
        </div>
      </motion.div>
      <PomodoroConfigModal
        open={configOpen}
        onClose={() => setConfigOpen(false)}
        initialWorkMinutes={workMinutes}
        initialBreakMinutes={breakMinutes}
        initialWorkSessions={sessions}
        onSave={({ workMinutes, breakMinutes, workSessions }) =>
          handleConfigSave({ workMinutes, breakMinutes, sessions: workSessions })
        }
      />

      <AnimatePresence>
        {showFinishMsg && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "rgba(0,0,0,0.34)" }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl px-7 py-10 text-center flex flex-col items-center gap-4"
              initial={{ scale: 0.97, y: 40, opacity: 0.85 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: 40, opacity: 0.85 }}
              transition={{ duration: 0.33, ease: [0.22, 0.8, 0.33, 1] }}
            >
              <span className="text-2xl font-bold text-blue-600 mb-1">
                ¡Has acabado tus sesiones, felicidades! 🎉
              </span>
              <button
                className="mt-3 px-5 py-2 rounded-xl font-bold bg-blue-500 text-white hover:bg-blue-600 transition"
                onClick={() => {
                  setShowFinishMsg(false);
                  handleReset();
                }}
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PomodoroTimer;
