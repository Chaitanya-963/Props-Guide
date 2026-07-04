import { useState } from "react";

function Button({
  text,
  color = "primary",
  size = "medium",
  onClick,
  disabled = false,
}) {
  const sizeStyles = {
    small: "text-[11px] sm:text-xs px-2.5 py-1.5 rounded-md",
    medium: "text-xs sm:text-sm px-3.5 py-2 rounded-lg",
    large: "text-sm sm:text-lg px-4.5 py-2.5 sm:py-3.5 rounded-xl",
  };

  const colorStyles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-500/10 focus-visible:ring-blue-500",
    secondary:
      "bg-slate-600 hover:bg-slate-700 text-white shadow-xs shadow-slate-500/10 focus-visible:ring-slate-500",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-xs shadow-rose-500/10 focus-visible:ring-rose-500",
    success:
      "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shadow-emerald-500/10 focus-visible:ring-emerald-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-bold tracking-wide 
        transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2
        shrink-0 whitespace-nowrap select-none
        ${sizeStyles[size] || sizeStyles.medium}
        ${colorStyles[color] || colorStyles.primary}
        ${disabled ? "opacity-45 cursor-not-allowed pointer-events-none shadow-none" : "cursor-pointer active:scale-[0.97] active:brightness-90"}
      `}
    >
      {text}
    </button>
  );
}

const BasicProps = ({ isDark }) => {
  const [clickCount, setClickCount] = useState(0);

  const incrementCount = () => setClickCount((prev) => prev + 1);

  return (
    <section
      className={`p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 border w-full max-w-full overflow-hidden ${
        isDark
          ? "bg-slate-950 border-slate-900 text-slate-100"
          : "bg-slate-50/50 border-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1 sm:mb-2">
          Basic Props
        </h2>
        <p
          className={`text-xs sm:text-sm leading-relaxed mb-5 sm:mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          Props allow components to receive data and configuration values from
          their parent. By altering properties like{" "}
          <code className="text-indigo-400 font-mono text-[11px] sm:text-xs px-1 py-0.5 rounded-sm bg-indigo-500/10">
            size
          </code>
          ,{" "}
          <code className="text-indigo-400 font-mono text-[11px] sm:text-xs px-1 py-0.5 rounded-sm bg-indigo-500/10">
            color
          </code>
          , or{" "}
          <code className="text-indigo-400 font-mono text-[11px] sm:text-xs px-1 py-0.5 rounded-sm bg-indigo-500/10">
            disabled
          </code>
          , the layout updates instantly.
        </p>

        <div className="space-y-6 w-full">
          {/* Sizes Section */}
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between border-b pb-1 border-slate-700/30 gap-2">
              <h3 className="text-[11px] sm:text-xs font-bold tracking-wide uppercase text-slate-400 truncate">
                Different Sizes
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 whitespace-nowrap">
                Clicks: {clickCount}
              </span>
            </div>
            {/* Safe Horizon Lane: Swipes smoothly on mobile viewports, drops into regular flex wrapping on desktop */}
            <div className="flex items-center gap-2.5 pt-1 overflow-x-auto pb-2 scrollbar-none sm:overflow-visible sm:pb-0 sm:flex-wrap w-full">
              <Button text="Small" size="small" onClick={incrementCount} />
              <Button text="Medium" size="medium" onClick={incrementCount} />
              <Button text="Large" size="large" onClick={incrementCount} />
            </div>
          </div>

          {/* Colors Section */}
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between border-b pb-1 border-slate-700/30">
              <h3 className="text-[11px] sm:text-xs font-bold tracking-wide uppercase text-slate-400 truncate">
                Different Colors
              </h3>
            </div>
            {/* Safe Horizon Lane: Prevents layout breaking regardless of container dimensions */}
            <div className="flex items-center gap-2.5 pt-1 overflow-x-auto pb-2 scrollbar-none sm:overflow-visible sm:pb-0 sm:flex-wrap w-full">
              <Button text="Primary" color="primary" onClick={incrementCount} />
              <Button text="Secondary" color="secondary" onClick={incrementCount} />
              <Button text="Danger" color="danger" onClick={incrementCount} />
              <Button text="Success" color="success" onClick={incrementCount} />
            </div>
          </div>

          {/* Interactive States Section */}
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between border-b pb-1 border-slate-700/30">
              <h3 className="text-[11px] sm:text-xs font-bold tracking-wide uppercase text-slate-400 truncate">
                Component States
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 w-full">
              {/* Active Card Block */}
              <div
                className={`p-4 rounded-xl border flex flex-col justify-between overflow-hidden min-w-0 ${
                  isDark
                    ? "bg-slate-900/60 border-slate-800"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="text-[10px] font-bold text-indigo-400 font-mono mb-3 uppercase tracking-wider">
                  State: Active (Scale Test)
                </div>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none sm:overflow-visible sm:pb-0 sm:flex-wrap w-full mt-auto">
                  <Button text="Click Active" color="primary" onClick={incrementCount} />
                  <Button text="Danger Active" color="danger" onClick={incrementCount} />
                </div>
              </div>

              {/* Disabled Card Block */}
              <div
                className={`p-4 rounded-xl border flex flex-col justify-between overflow-hidden min-w-0 ${
                  isDark
                    ? "bg-slate-900/60 border-slate-800"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="text-[10px] font-bold text-rose-400 font-mono mb-3 uppercase tracking-wider">
                  State: Disabled (Isolated)
                </div>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none sm:overflow-visible sm:pb-0 sm:flex-wrap w-full mt-auto">
                  <Button text="Primary Disabled" color="primary" disabled={true} onClick={incrementCount} />
                  <Button text="Danger Disabled" color="danger" disabled={true} onClick={incrementCount} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicProps;
