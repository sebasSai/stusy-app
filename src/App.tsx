import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import PomodoroTimer from "./components/PomodoroTimer";

function App() {
  const { theme, headerGradient } = useTheme();

  return (
    <div
      className="min-h-screen w-full transition-colors duration-700"
      style={{
        background: headerGradient || theme.cardBg, 
        color: theme.deepNavy,
      }}
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <PomodoroTimer />
      </div>
      
    </div>
  );
}

export default App;
