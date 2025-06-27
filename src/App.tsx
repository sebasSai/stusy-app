import { useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import BubbleBackground from "./components/BubbleBackground";
import PomodoroTimer from "./components/pomodoro/PomodoroTimer";

function App() {
  const { theme, headerGradient } = useTheme();

  useEffect(() => {
    // El fondo del body usa el gradiente general del header, pero puedes personalizarlo aquí si quieres otro para el body
    document.body.style.background = headerGradient ?? theme.cardBg;
    document.body.style.transition = "background 0.8s cubic-bezier(.33,1.02,.58,1)";
    document.body.style.color = theme.deepNavy;
    return () => {
      document.body.style.background = "";
      document.body.style.transition = "";
      document.body.style.color = "";
    };
  }, [headerGradient, theme.cardBg, theme.deepNavy]);

  return (
    <div className="min-h-screen w-full relative" style={{ background: "transparent", color: theme.deepNavy }}>
      <BubbleBackground />
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[80vh]">
        <PomodoroTimer />
      </main>
    </div>
  );
}

export default App;
