import BasicProps from "./components/BasicProps.jsx";
import RefProps from "./components/RefProps.jsx";
import ChildrenProps from "./components/ChildrenProps.jsx";
import ComplexProps from "./components/ComplexProps.jsx";
import ThemeToggler from "./components/ThemeToggler.jsx";
import { useEffect, useState } from "react";

function Navigation() {
  const sections = [
    { id: "basic", label: "Basic Props", icon: "📦" },
    { id: "ref", label: "Ref Props", icon: "🔗" },
    { id: "children", label: "Children Props", icon: "👦🏻" },
    { id: "complex", label: "Complex Props", icon: "🧩" },
    { id: "theme", label: "Theme Toggler", icon: "🎨" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-600 text-slate-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 overflow-x-auto gap-2 scrollbar-none">
          {sections.map((section) => (
            <button
              key={section.id}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap text-slate-100 hover:bg-slate-50 hover:text-indigo-600 active:bg-slate-100 transition-all duration-200"
            >
              <span className="text-base" role="img" aria-label={section.label}>
                {section.icon}
              </span>
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("basic");

  // Automatically update active nav button based on window scroll position
  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Triggers when element occupies mid-screen
    });

    const targetIds = ["basic", "children", "complex", "ref", "theme"];
    targetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen antialiased transition-colors duration-300 w-full overflow-x-hidden ${
        isDark
          ? "bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white"
          : "bg-slate-50 text-slate-800 selection:bg-indigo-600 selection:text-white"
      }`}
    >
      <Navigation 
        isDark={isDark} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      {/* Outer padding transitions smoothly from small viewports to desktop frames */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <header
          className={`relative border-b pb-8 sm:pb-10 mb-8 sm:mb-12 transition-colors duration-300 ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}
        >
          {/* Decorative ambient background glows - Disabled on tiny screens to optimize memory performance */}
          <div
            className={`absolute -top-20 -left-20 w-48 h-48 sm:w-72 sm:h-72 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 ${
              isDark
                ? "bg-indigo-500/10 opacity-100"
                : "bg-indigo-500/5 opacity-70"
            }`}
          />

          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span
              className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold tracking-wider rounded-full uppercase border transition-all duration-300 ${
                isDark
                  ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
                  : "text-indigo-600 bg-indigo-50 border-indigo-200"
                }`}
            >
              Core Concept
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4 bg-linear-to-r bg-clip-text text-transparent transition-all duration-300 ${
              isDark
                ? "from-white via-slate-200 to-slate-400"
                : "from-slate-900 via-slate-800 to-slate-600"
            }`}
          >
            React Props
          </h1>

          <p
            className={`text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed transition-colors duration-300 ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            A comprehensive guide to understanding props, explicit data flow,
            and component configuration in React.
          </p>
        </header>

        {/* Responsive Grid Layout Container */}
        <main className="grid gap-10 sm:gap-16 w-full max-w-full overflow-hidden">
          <div id="basic" className="scroll-mt-20 sm:scroll-mt-24 w-full">
            <BasicProps isDark={isDark} />
          </div>
          <div id="children" className="scroll-mt-20 sm:scroll-mt-24 w-full">
            <ChildrenProps isDark={isDark} />
          </div>
          <div id="complex" className="scroll-mt-20 sm:scroll-mt-24 w-full">
            <ComplexProps isDark={isDark} />
          </div>
          <div id="ref" className="scroll-mt-20 sm:scroll-mt-24 w-full">
            <RefProps isDark={isDark} />
          </div>
          <div id="theme" className="scroll-mt-20 sm:scroll-mt-24 w-full">
            <ThemeToggler isDark={isDark} setIsDark={setIsDark} />
          </div>
        </main>
      </div>

      {/* Footer Element */}
      <footer
        className={`mt-16 sm:mt-24 border-t text-center py-6 sm:py-8 transition-colors duration-300 ${
          isDark
            ? "border-slate-800/60 text-slate-500"
            : "border-slate-200 text-slate-500"
        }`}
      >
        <p className="text-xs sm:text-sm font-medium tracking-wide">
          Made By{" "}
          <span className={isDark ? "text-slate-300" : "text-slate-700"}>
            Chaitanya Mehetre
          </span>{" "}
          ❤️
        </p>
      </footer>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
