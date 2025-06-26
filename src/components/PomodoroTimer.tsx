import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { NEUTRAL_THEME } from "../context/themePalettes";
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
    if (phase === "work") setMode("work");
    else if (phase === "break") setMode("break");
  }, [phase, setMode]);

 
  useEffect(() => {
    if (!isRunning) {
      setSecondsLeft(getInitialSeconds(phase));
    }
   
  }, [workMinutes, breakMinutes, phase, isRunning, getInitialSeconds]);


  useEffect(() => {
    if (!isRunning) return;

    if (secondsLeft === 0) {
      if (phase === "work") {
        if (currentSession === sessions) {
   
          setIsRunning(false);
          setShowFinishMsg(true);
          if (onEnd) onEnd(true);
        } else {
          setPrevPhase("work");
          setPhase("transition");
          setSecondsLeft(TRANSITION_SECONDS);
          if (onModeChange) onModeChange(false);
        }
      } else if (phase === "break") {
        setPrevPhase("break");
        setPhase("transition");
        setSecondsLeft(TRANSITION_SECONDS);
        if (onModeChange) onModeChange(true);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getInitialSeconds(ph: Phase) {
    if (ph === "work") return workMinutes * 60;
    if (ph === "break") return breakMinutes * 60;
    return TRANSITION_SECONDS;
  }

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const totalSeconds = getInitialSeconds(phase);
  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;
  const RADIUS = 80;
  const CIRCUM = 2 * Math.PI * RADIUS;

  const handleStart = () => {
    setIsRunning(true);
    if (onStart) onStart();
  };
  const handlePause = () => {
    setIsRunning(false);
    if (onPause) onPause();
  };
  const handleReset = () => {
    setIsRunning(false);
    setPhase("work");
    setSecondsLeft(workMinutes * 60);
    setCurrentSession(1);
    setShowFinishMsg(false);
    if (onModeChange) onModeChange(true);
    if (onReset) onReset();
  };

  const handleBadgeClick = () => setConfigOpen(true);
  const handleConfigSave = (cfg: {
    workMinutes: number;
    breakMinutes: number;
    sessions: number;
  }) => {
    setWorkMinutes(cfg.workMinutes);
    setBreakMinutes(cfg.breakMinutes);
    setSessions(cfg.sessions);
    setPhase("work");
    setSecondsLeft(cfg.workMinutes * 60);
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
        <div
          className="absolute"
          style={{
            zIndex: 0,
            top: 90,
            left: "50%",
            width: 230,
            height: 110,
            transform: "translate(-50%,-58%)",
            background: `radial-gradient(circle, ${themeToUse.glow}BB 0%, transparent 70%)`,
            filter: "blur(18px)",
            pointerEvents: "none",
            transition: "background 0.8s",
          }}
          aria-hidden="true"
        />

        <motion.div
          role="button"
          tabIndex={0}
          onClick={handleBadgeClick}
          onKeyDown={e => (e.key === "Enter" ? handleBadgeClick() : null)}
          className="flex items-center gap-2 mb-3 px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow cursor-pointer select-none"
          style={{
            background: themeToUse.primary,
            color: themeToUse.input,
            border: `1.1px solid ${themeToUse.accent}66`,
            marginTop: -16,
            boxShadow: `0 0 10px 0 ${themeToUse.glow}33`,
            transition: "background 0.8s, color 0.8s, border 0.8s",
          }}
          key={phase}
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.37 }}
        >
          {phase === "work" && (
            <>
              <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9" fill="#fff6" />
                <path
                  d="M10 4v6l4 2"
                  stroke={themeToUse.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              En foco
            </>
          )}
          {phase === "break" && (
            <>
              <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9" fill="#fff6" />
                <path
                  d="M7 13c1 1 5 1 6-1s-2-4-3-4-4 2-3 5Z"
                  stroke={themeToUse.accent}
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Descanso
            </>
          )}
          {phase === "transition" && (
            <>
              <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9" fill="#fff6" />
                <path
                  d="M5 10h10"
                  stroke={themeToUse.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Transición
            </>
          )}
        </motion.div>

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
          <svg width="180" height="180">
            <circle
              cx="90"
              cy="90"
              r={RADIUS}
              fill="none"
              stroke="#ECEEF2"
              strokeWidth="13"
            />
            <motion.circle
              cx="90"
              cy="90"
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
              <linearGradient
                id="timerGradient"
                x1="0"
                y1="0"
                x2="180"
                y2="180"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={themeToUse.primary} />
                <stop offset="100%" stopColor={themeToUse.accent} />
              </linearGradient>
            </defs>
          </svg>
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
        onSave={({
          workMinutes,
          breakMinutes,
          workSessions,
        }) => handleConfigSave({ workMinutes, breakMinutes, sessions: workSessions })}
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
