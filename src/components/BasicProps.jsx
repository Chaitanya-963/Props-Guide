import { useState } from "react";

function Button({
  text,
  color = "primary",
  size = "medium",
  onClick,
  disabled = false,
}) {
  const sizeStyles = {
    small: "text-xs px-2.5 py-1 rounded-md",
    medium: "text-sm px-5 py-2.5 rounded-lg",
    large: "text-lg px-8 py-4 rounded-xl",
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
        inline-flex items-center justify-center font-semibold tracking-wide 
        transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2
        ${sizeStyles[size] || sizeStyles.medium}
        ${colorStyles[color] || colorStyles.primary}
        ${disabled ? "opacity-45 cursor-not-allowed pointer-events-none shadow-none" : "cursor-pointer active:scale-[0.95] active:brightness-90"}
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
      className={`p-8 rounded-2xl shadow-xl transition-all duration-300 border ${
        isDark
          ? "bg-slate-900 border-slate-800 text-slate-100"
          : "bg-white border-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight mb-3">Basic Props</h2>
        <p
          className={`text-base leading-relaxed mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          Props allow components to receive data and configuration values from
          their parent. By altering properties like{" "}
          <code className="text-indigo-400 font-mono text-sm px-1.5 py-0.5 rounded-sm bg-indigo-500/10">
            size
          </code>
          ,
          <code className="text-indigo-400 font-mono text-sm px-1.5 py-0.5 rounded-sm bg-indigo-500/10">
            color
          </code>
          , or
          <code className="text-indigo-400 font-mono text-sm px-1.5 py-0.5 rounded-sm bg-indigo-500/10">
            disabled
          </code>
          , the layout updates instantly.
        </p>

        <div className="space-y-8">
          {/* Sizes Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-slate-700/30">
              <h3 className="text-md font-semibold tracking-wide uppercase text-slate-400">
                Different Sizes
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono">
                Clicks: {clickCount}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                text="Small Button"
                size="small"
                onClick={incrementCount}
              />
              <Button
                text="Medium Button"
                size="medium"
                onClick={incrementCount}
              />
              <Button
                text="Large Button"
                size="large"
                onClick={incrementCount}
              />
            </div>
          </div>

          {/* Colors Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-slate-700/30">
              <h3 className="text-md font-semibold tracking-wide uppercase text-slate-400">
                Different Colors
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button text="Primary" color="primary" onClick={incrementCount} />
              <Button
                text="Secondary"
                color="secondary"
                onClick={incrementCount}
              />
              <Button text="Danger" color="danger" onClick={incrementCount} />
              <Button text="Success" color="success" onClick={incrementCount} />
            </div>
          </div>

          {/* Interactive States Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-slate-700/30">
              <h3 className="text-md font-semibold tracking-wide uppercase text-slate-400">
                Component States
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Active / Clickable Row */}
              <div
                className={`p-4 rounded-xl border ${isDark ? "bg-slate-800/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}
              >
                <div className="text-xs font-semibold text-indigo-400 font-mono mb-2">
                  STATE: ACTIVE (CLICK & HOLD TO TEST SCALE)
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    text="Click Active"
                    color="primary"
                    onClick={incrementCount}
                  />
                  <Button
                    text="Danger Active"
                    color="danger"
                    onClick={incrementCount}
                  />
                </div>
              </div>

              {/* Disabled Row */}
              <div
                className={`p-4 rounded-xl border ${isDark ? "bg-slate-800/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}
              >
                <div className="text-xs font-semibold text-rose-400 font-mono mb-2">
                  STATE: DISABLED (PROPS ISOLATED)
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    text="Primary Disabled"
                    color="primary"
                    disabled={true}
                    onClick={incrementCount}
                  />
                  <Button
                    text="Danger Disabled"
                    color="danger"
                    disabled={true}
                    onClick={incrementCount}
                  />
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
