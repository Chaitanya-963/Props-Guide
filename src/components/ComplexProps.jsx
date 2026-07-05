import { useState } from "react";
import { useTheme } from "./ThemeToggler.jsx";

function UserProfileCard({ user, theme, actions }) {
  const { isDark: isDarkGlobal } = useTheme();
  const darkThemeClasses = {
    "Mark zen":
      "bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 border-purple-500/30 text-purple-100",
    "Sarah Chen":
      "bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-emerald-500/30 text-emerald-100",
    "Alex Rivera":
      "bg-gradient-to-br from-rose-950 via-slate-900 to-amber-950 border-rose-500/30 text-rose-100",
  };

  const currentDarkClass =
    darkThemeClasses[user.name] ||
    "bg-slate-900 border-slate-700 text-slate-100";

  return (
    <div
      className={`p-4 sm:p-6 rounded-3xl shadow-xl border relative overflow-hidden transition-all duration-300 sm:hover:-translate-y-1.5 sm:hover:shadow-2xl flex flex-col justify-between h-full group w-full max-w-full min-w-0 ${
        isDarkGlobal
          ? `${currentDarkClass}`
          : `${theme.backgroundColor} ${theme.textColor} border-white/60`
      }`}
    >
      {/* Decorative Background Glow Effect */}
      <div
        className={`hidden sm:block absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${
          user.name === "Mark zen"
            ? "bg-purple-400"
            : user.name === "Sarah Chen"
              ? "bg-emerald-400"
              : "bg-rose-400"
        }`}
      />

      <div className="w-full min-w-0">
        {/* Header Layout Zone */}
        <div className="flex items-center justify-between gap-2.5 mb-4 sm:mb-6 relative z-10 w-full min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
            <div
              className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-2xl shadow-md shrink-0 transform sm:group-hover:rotate-6 transition-transform duration-300 ${
                isDarkGlobal
                  ? user.name === "Mark zen"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : user.name === "Sarah Chen"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  : theme.avatarBg
              }`}
            >
              {user.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm sm:text-base md:text-lg font-black tracking-tight truncate">
                {user.name}
              </h4>
              <p
                className={`text-[9px] sm:text-xs font-bold tracking-wider uppercase mt-0.5 truncate ${
                  isDarkGlobal ? "text-slate-400" : "opacity-70"
                }`}
              >
                {user.role}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <span
            className={`text-[8px] sm:text-[10px] font-black px-2 py-0.5 sm:py-1 rounded-lg sm:rounded-xl uppercase tracking-wider border shadow-xs shrink-0 self-center ${
              user.status === "Active"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                : "bg-amber-500/20 text-amber-400 border-amber-500/40"
            }`}
          >
            {user.status}
          </span>
        </div>

        {/* Numeric Statistics Layout Dashboard Grid */}
        {user.stats && (
          <div
            className={`grid grid-cols-3 gap-1 p-2 sm:p-3 rounded-2xl text-center mb-4 sm:mb-6 border relative z-10 w-full min-w-0 ${
              isDarkGlobal
                ? "bg-slate-950/40 border-slate-800/80 backdrop-blur-md"
                : "bg-white/60 border-black/5 backdrop-blur-md"
            }`}
          >
            {Object.entries(user.stats).map(([key, value]) => (
              <div key={key} className="min-w-0 py-0.5 w-full">
                <div
                  className={`text-xs sm:text-base md:text-lg font-black tracking-tight truncate ${
                    isDarkGlobal
                      ? user.name === "Mark zen"
                        ? "text-purple-300"
                        : user.name === "Sarah Chen"
                          ? "text-emerald-300"
                          : "text-rose-300"
                      : "text-slate-900"
                  }`}
                >
                  {typeof value === "number" ? value.toLocaleString() : value}
                </div>
                <div
                  className={`text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wider truncate mt-0.5 ${
                    isDarkGlobal ? "text-slate-500" : "opacity-60"
                  }`}
                >
                  {key}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Primary & Secondary Action Button Zone */}
      {actions && (
        <div className="grid grid-cols-2 gap-2 mt-auto relative z-10 w-full min-w-0">
          <button
            onClick={actions.secondary.onClick}
            className={`px-2 py-2 text-[10px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer border active:scale-[0.96] truncate text-center ${
              isDarkGlobal
                ? "bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-slate-800"
                : `${actions.secondary.className} border-black/5`
            }`}
          >
            {actions.secondary.label}
          </button>
          <button
            onClick={actions.primary.onClick}
            className={`px-2 py-2 text-[10px] sm:text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer text-center active:scale-[0.96] truncate ${
              isDarkGlobal
                ? user.name === "Mark zen"
                  ? "bg-purple-600 hover:bg-purple-50 text-white shadow-purple-900/20"
                  : user.name === "Sarah Chen"
                    ? "bg-emerald-600 hover:bg-emerald-50 text-white shadow-emerald-900/20"
                    : "bg-rose-600 hover:bg-rose-50 text-white shadow-rose-900/20"
                : actions.primary.className
            }`}
          >
            {actions.primary.label}
          </button>
        </div>
      )}
    </div>
  );
}
const ComplexProps = () => {
  const { isDark } = useTheme();
  const [message, setMessage] = useState(
    "Click an action on any profile card...",
  );

  const users = [
    {
      user: {
        name: "Mark zen",
        email: "markzen@me.com",
        avatar: "👦🏻",
        role: "Admin",
        status: "Active",
        stats: {
          posts: 145,
          followers: 25432,
          following: 451,
        },
      },
      theme: {
        backgroundColor:
          "bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100",
        textColor: "text-purple-950",
        avatarBg: "bg-purple-200 text-purple-700 border border-purple-300",
        badgeBg: "bg-purple-200",
      },
      actions: {
        primary: {
          label: "View Profile",
          onClick: () => setMessage("Viewing Mark's Profile Dashboard"),
          className:
            "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-200 hover:from-purple-500 hover:to-indigo-500",
        },
        secondary: {
          label: "Message",
          onClick: () => setMessage("Opening encrypted channel to Mark"),
          className: "bg-white/80 hover:bg-white text-purple-900",
        },
      },
    },
    {
      user: {
        name: "Sarah Chen",
        email: "sarah.c@me.com",
        avatar: "👩🏻‍💻",
        role: "Developer",
        status: "Active",
        stats: {
          projects: 32,
          commits: 48921,
          reviews: 89,
        },
      },
      theme: {
        backgroundColor:
          "bg-gradient-to-br from-teal-100 via-emerald-50 to-cyan-100",
        textColor: "text-emerald-950",
        avatarBg: "bg-emerald-200 text-emerald-700 border border-emerald-300",
        badgeBg: "bg-emerald-200",
      },
      actions: {
        primary: {
          label: "Review Code",
          onClick: () => setMessage("Opening Sarah's active pull requests"),
          className:
            "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-200 hover:from-emerald-500 hover:to-teal-500",
        },
        secondary: {
          label: "Sponsor",
          onClick: () => setMessage("Opening GitHub sponsorship tiers"),
          className: "bg-white/80 hover:bg-white text-emerald-900",
        },
      },
    },
    {
      user: {
        name: "Alex Rivera",
        email: "alex.r@me.com",
        avatar: "🎨",
        role: "Designer",
        status: "Away",
        stats: {
          designs: 89,
          followers: 12405,
          following: 615,
        },
      },
      theme: {
        backgroundColor:
          "bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100",
        textColor: "text-rose-950",
        avatarBg: "bg-rose-200 text-rose-700 border border-rose-300",
        badgeBg: "bg-rose-200",
      },
      actions: {
        primary: {
          label: "View Portfolio",
          onClick: () =>
            setMessage("Opening Alex's production Figma workspace"),
          className:
            "bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-rose-200 hover:from-rose-500 hover:to-amber-400",
        },
        secondary: {
          label: "Hire Me",
          onClick: () => setMessage("Opening contractor dispatch interface"),
          className: "bg-white/80 hover:bg-white text-rose-900",
        },
      },
    },
  ];

  return (
    <section
      className={`p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl border transition-colors duration-300 w-full max-w-full overflow-hidden ${
        isDark
          ? "bg-slate-950 border-slate-800 text-slate-100"
          : "bg-slate-50/50 border-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Header Block Layout */}
        <div className="mb-5 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-1 sm:mb-2">
            Complex Props & Destructuring
          </h3>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            Demonstrating advanced patterns: spreading object states (
            <code className="font-mono text-[11px] sm:text-xs px-1 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
              {"{...userData}"}
            </code>
            ), custom inline style maps, and binding stateful callback loops.
          </p>
        </div>

        {/* Global Action Logger State Banner */}
        <div
          className={`p-3 sm:p-4 rounded-2xl mb-6 sm:mb-8 border font-mono text-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 transition-all ${
            isDark
              ? "bg-slate-900/60 border-indigo-500/20 text-indigo-400 shadow-inner"
              : "bg-indigo-50 border-indigo-100 text-indigo-700 shadow-xs"
          }`}
        >
          <div className="flex items-center gap-2 truncate w-full sm:w-auto min-w-0">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse shrink-0" />
            <span className="font-black uppercase tracking-wider text-[10px] opacity-75 whitespace-nowrap">
              LOG:
            </span>
            <span className="truncate font-semibold text-[11px] sm:text-xs">
              {message}
            </span>
          </div>
          <button
            onClick={() => setMessage("Click an action on any profile card...")}
            className="text-[10px] font-black uppercase tracking-wider underline hover:opacity-80 cursor-pointer self-end sm:self-auto shrink-0 whitespace-nowrap"
          >
            Clear
          </button>
        </div>

        {/* Dynamic Responsive Card Container System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {users.map((userData, index) => (
            <UserProfileCard key={index} {...userData} isDarkGlobal={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComplexProps;
