import { useRef, forwardRef, useState } from "react";
import { useTheme } from "./ThemeToggler.jsx"; 


const CustomInput = forwardRef(({ label, placeholder, className }, ref) => {
  const { isDark } = useTheme();
  return (
    <div className="w-full min-w-0">
      <label 
        className={`block text-xs sm:text-sm font-bold mb-1.5 transition-colors duration-200 ${
          isDark ? "text-slate-300" : "text-slate-700"
        }`}
      >
        {label}
      </label>
      <input
        ref={ref}
        type="text"
        className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-lg transition-all duration-200 outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-medium ${
          isDark 
            ? "bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-600 focus:bg-slate-900/40" 
            : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white"
        } ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
});

CustomInput.displayName = "CustomInput";

const RefProps = () => {
  const { isDark } = useTheme();
  const inputRef = useRef(null);
  const secondInputRef = useRef(null);
  const [logMessage, setLogMessage] = useState("Interact with input controls to log actions...");

  const focusInput = (target) => {
    if (target === 1) {
      inputRef.current?.focus();
      setLogMessage("Focused: First input field active");
    } else {
      secondInputRef.current?.focus();
      setLogMessage("Focused: Second input field active");
    }
  };

  const getInputValue = () => {
    const val1 = inputRef.current?.value || "Empty";
    const val2 = secondInputRef.current?.value || "Empty";
    setLogMessage(`Read Values -> Input 1: "${val1}" | Input 2: "${val2}"`);
  };

  const clearInputValue = () => {
    if (inputRef.current) inputRef.current.value = "";
    if (secondInputRef.current) secondInputRef.current.value = "";
    setLogMessage("Cleared: Reset all forwarded ref inputs");
  };

  return (
    <section
      className={`p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 border w-full max-w-full overflow-hidden ${
        isDark
          ? "bg-slate-950/40 border-slate-800/80 text-slate-100"
          : "bg-white border-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-3xl mx-auto w-full">
        {/* Header Section */}
        <h2 className={`text-xl sm:text-2xl font-black tracking-tight mb-1 sm:mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
          Ref Props & Forwarding
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed mb-5 sm:mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          React components don't expose their underlying DOM nodes by default. Using{" "}
          <code className="text-indigo-400 font-mono text-[11px] sm:text-xs px-1 py-0.5 rounded-sm bg-indigo-500/10">
            forwardRef
          </code>{" "}
          allows child inputs to hand over direct node control to parent widgets, enabling focus manipulation and reading text states without re-renders.
        </p>

        {/* Live UI State Feedback Logger */}
        <div
          className={`p-3 rounded-xl mb-5 border font-mono text-[11px] flex items-center gap-2 truncate w-full transition-all ${
            isDark
              ? "bg-slate-900/60 border-indigo-500/20 text-indigo-400 shadow-inner"
              : "bg-indigo-50 border-indigo-100 text-indigo-700 shadow-xs"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse shrink-0" />
          <span className="font-black uppercase tracking-wider text-[9px] opacity-75 whitespace-nowrap">Node Event:</span>
          <span className="truncate font-semibold">{logMessage}</span>
        </div>

        {/* Inputs Layout Container */}
        <div className="space-y-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <CustomInput
              ref={inputRef}
              label="First input with ref"
              placeholder="Type something here..."
              isDark={isDark}
            />
            <CustomInput
              ref={secondInputRef}
              label="Second input with ref"
              placeholder="Type something else..."
              isDark={isDark}
            />
          </div>

          {/* Touch-Friendly Navigation Action Lane */}
          <div className="flex items-center gap-2 pt-1 overflow-x-auto pb-2 scrollbar-none sm:overflow-visible sm:pb-0 sm:flex-wrap w-full">
            <button
              onClick={() => focusInput(1)}
              className="px-3 py-2 text-[11px] sm:text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shrink-0 transition-transform active:scale-[0.97]"
            >
              Focus First
            </button>
            <button
              onClick={() => focusInput(2)}
              className="px-3 py-2 text-[11px] sm:text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shrink-0 transition-transform active:scale-[0.97]"
            >
              Focus Second
            </button>
            <button
              onClick={getInputValue}
              className={`px-3 py-2 text-[11px] sm:text-xs font-bold rounded-lg border cursor-pointer shrink-0 transition-all active:scale-[0.97] ${
                isDark 
                  ? "border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300" 
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
              }`}
            >
              Read Nodes
            </button>
            <button
              onClick={clearInputValue}
              className={`px-3 py-2 text-[11px] sm:text-xs font-bold rounded-lg border cursor-pointer shrink-0 transition-all active:scale-[0.97] ${
                isDark 
                  ? "border-rose-950/40 bg-rose-950/20 text-rose-400 hover:bg-rose-900/30" 
                  : "border-rose-100 bg-rose-50 text-rose-700 hover:bg-rose-100/60"
              }`}
            >
              Clear Values
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefProps;
