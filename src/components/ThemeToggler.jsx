import { createContext, useContext, useState } from "react";

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark"); // Defaulting to dark to look correct on init

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Theme Toggle Button Component
function ThemeToggleButton() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-14 h-7 rounded-full transition-colors duration-300 cursor-pointer shrink-0
        ${isDark ? "bg-indigo-600" : "bg-slate-300"}
      `}
    >
      <div
        className={`
          absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white
          transition-transform duration-300 flex items-center justify-center shadow-xs
          ${isDark ? "transform translate-x-7" : ""}
        `}
      >
        <span className="text-xs">{isDark ? "🌙" : "☀️"}</span>
      </div>
    </button>
  );
}

// Themed Card Component
function ThemedCard({ title, children }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`
        p-5 rounded-2xl border transition-colors duration-300 shadow-md text-left
        ${isDark ? "bg-slate-900/60 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"}
      `}
    >
      <h3 className="text-sm sm:text-base font-bold mb-3 tracking-tight">{title}</h3>
      <div className="text-xs sm:text-sm leading-relaxed">{children}</div>
    </div>
  );
}

// Themed Button Component
function ThemedButton({ children, variant = "primary", onClick }) {
  const { isDark } = useTheme();

  const getButtonClasses = () => {
    if (variant === "primary") {
      return isDark
        ? "bg-indigo-600 hover:bg-indigo-500 text-white"
        : "bg-indigo-600 hover:bg-indigo-700 text-white";
    }
    if (variant === "secondary") {
      return isDark
        ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all active:scale-[0.97] cursor-pointer ${getButtonClasses()}`}
    >
      {children}
    </button>
  );
}

// Main Theme Demo Component
export default function ThemeToggler() {
  const { isDark } = useTheme();
  const [clickCount, setClickCount] = useState(0);

  return (
    <section
      className={`
        p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 border w-full max-w-full overflow-hidden text-left
        ${isDark ? "bg-slate-950 border-slate-800 text-slate-100" : "bg-white border-slate-100 text-slate-900"}
      `}
    >
      <div className="max-w-3xl mx-auto w-full">
        {/* Header Block Layout */}
        <div className="flex items-center justify-between mb-4 gap-4">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">Theme Toggler</h2>
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-[11px] sm:text-xs font-bold tracking-wide uppercase opacity-60">
              {isDark ? "Dark Mode" : "Light Mode"}
            </span>
            <ThemeToggleButton />
          </div>
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          This section demonstrates theme toggling using Context API and props.
          The theme state is shared across all child components without prop
          drilling.
        </p>

        <div className="space-y-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <ThemedCard title="User Information">
              <p className={`space-y-1 font-medium text-[11px] sm:text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                <span className="opacity-60">Name:</span> John Doe
                <br />
                <span className="opacity-60">Email:</span> john@example.com
                <br />
                <span className="opacity-60">Role:</span> Developer
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ThemedButton variant="primary" onClick={() => setClickCount(clickCount + 1)}>
                  Edit Profile
                </ThemedButton>
                <ThemedButton variant="secondary" onClick={() => setClickCount(clickCount + 1)}>
                  Settings
                </ThemedButton>
              </div>
            </ThemedCard>

            <ThemedCard title="Statistics">
              <div className="space-y-2 font-medium text-[11px] sm:text-xs">
                <div className="flex justify-between items-center border-b border-slate-700/10 pb-1">
                  <span className="opacity-60">Total Clicks:</span>
                  <span className="font-bold text-indigo-400 font-mono">{clickCount}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700/10 pb-1">
                  <span className="opacity-60">Theme:</span>
                  <span className="font-bold capitalize">{isDark ? "Dark" : "Light"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-60">Status:</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>
              </div>
            </ThemedCard>
          </div>

          <ThemedCard title="Interactive Demo">
            <p className={`mb-4 text-[11px] sm:text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Try clicking the buttons below to see how they adapt to the current theme:
            </p>
            <div className="flex flex-wrap gap-2">
              <ThemedButton variant="primary" onClick={() => setClickCount(clickCount + 1)}>
                Primary Action
              </ThemedButton>
              <ThemedButton variant="secondary" onClick={() => setClickCount(clickCount + 1)}>
                Secondary Action
              </ThemedButton>
              <ThemedButton variant="secondary" onClick={() => setClickCount(0)}>
                Reset Counter
              </ThemedButton>
            </div>
          </ThemedCard>

          {/* Sandbox Info Alert Panel */}
          <div
            className={`
              p-4 rounded-xl border-l-4 transition-colors text-xs sm:text-sm leading-relaxed
              ${isDark ? "bg-indigo-500/10 border-indigo-500 text-indigo-300" : "bg-indigo-50 border-indigo-500 text-indigo-800"}
            `}
          >
            <h4 className="font-bold mb-1.5">Why Context + Props?</h4>
            <ul className="list-disc list-inside space-y-1 text-[11px] sm:text-xs font-medium">
              <li>Avoids "prop drilling" through multiple component layers</li>
              <li>Makes theme accessible to any component in the tree</li>
              <li>Components can still receive other props normally</li>
              <li>Combines global state (context) with local configuration (props)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
