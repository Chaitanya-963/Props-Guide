import { useTheme } from "./ThemeToggler.jsx"; 



function Card({ children, title, color = "blue", }) {
  const { isDark } = useTheme();
  const colorClasses = {
    blue: isDark
      ? "border-blue-500 bg-blue-950/20 text-blue-200"
      : "border-blue-500 bg-blue-50 text-blue-900",
    green: isDark
      ? "border-emerald-500 bg-emerald-950/20 text-emerald-200"
      : "border-emerald-500 bg-emerald-50 text-emerald-900",
    purple: isDark
      ? "border-purple-500 bg-purple-950/20 text-purple-200"
      : "border-purple-500 bg-purple-50 text-purple-900",
    red: isDark
      ? "border-rose-500 bg-rose-950/20 text-rose-200"
      : "border-rose-500 bg-rose-50 text-rose-900",
    amber: isDark
      ? "border-amber-500 bg-amber-950/20 text-amber-200"
      : "border-amber-500 bg-amber-50 text-amber-900",
  };

  return (
    <div
      className={`border-l-4 ${colorClasses[color] || colorClasses.blue} p-4 sm:p-5 rounded-r-xl rounded-l-xs shadow-md transition-all duration-300 backdrop-blur-xs flex flex-col justify-between h-full min-w-0 w-full overflow-hidden`}
    >
      <div className="min-w-0 w-full flex flex-col h-full justify-between">
        <div>
          {title && (
            <h3
              className={`text-sm sm:text-base font-bold mb-2 tracking-tight truncate ${isDark ? "text-white" : "text-slate-900"}`}
            >
              {title}
            </h3>
          )}
          <div
            className={`text-xs sm:text-sm leading-relaxed mb-4 min-w-0 w-full ${isDark ? "text-slate-300" : "text-slate-700"}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function Container({ children, layout = "vertical" }) {
  const layoutClasses = {
    vertical: "flex flex-col space-y-4 w-full",
    // 375px Fix: Explicitly structural grid settings block width stretching inside horizontal spaces
    horizontal: "grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap gap-4 w-full",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full",
  };

  return (
    <div className={layoutClasses[layout] || layoutClasses.vertical}>
      {children}
    </div>
  );
}

const ChildrenProps = () => {
  const { isDark } = useTheme();
  return (
    <section
      className={`p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 border w-full max-w-full overflow-hidden ${
        isDark
          ? "bg-slate-950/40 border-slate-800/80 text-slate-100"
          : "bg-white border-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1 sm:mb-2">
          Children Props
        </h2>

        <p
          className={`text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-3xl ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          The{" "}
          <code className="text-indigo-400 font-mono text-[11px] sm:text-xs px-1.5 py-0.5 rounded-sm bg-indigo-500/10">
            children
          </code>{" "}
          prop allows components to act as generic layouts. Parents can inject
          any data, text strings, custom interactive buttons, or nested element
          configurations seamlessly inside them.
        </p>

        <div className="space-y-4 w-full">
          <h3
            className={`text-[11px] sm:text-xs font-bold tracking-wide uppercase ${isDark ? "text-slate-500" : "text-slate-400"} mb-1`}
          >
            Card Component Composability Demo
          </h3>

          <Container layout="grid">
            {/* Type 1: Standard User Profile Card */}
            <Card title="User Profile" color="blue" isDark={isDark}>
              <div className="space-y-1 font-medium break-all text-[11px] sm:text-xs">
                <p>
                  <span className="opacity-60">Name:</span> Chaitanya Mehetre
                </p>
                <p>
                  <span className="opacity-60">Email:</span> {`chaitanya@me.in`}
                </p>
                <p>
                  <span className="opacity-60">Role:</span> Developer
                </p>
              </div>
            </Card>

            {/* Type 2: Interactive Statistics Card with Action Button */}
            <Card title="Company Statistics" color="green" isDark={isDark}>
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-1 font-medium text-[11px] sm:text-xs mb-3">
                  <p>
                    <span className="opacity-60">Founder:</span> Mark Z.
                  </p>
                  <p>
                    <span className="opacity-60">Network:</span> meta.me.in
                  </p>
                  <p>
                    <span className="opacity-60">Status:</span> Highly Active
                  </p>
                </div>
                <button className="w-full px-3 py-2 text-[11px] sm:text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer shadow-xs active:scale-[0.97]">
                  Connect with me!
                </button>
              </div>
            </Card>

            {/* Type 3: Technical System Notification Alert */}
            <Card title="System Update" color="purple" isDark={isDark}>
              <div className="flex flex-col h-full justify-between">
                <p className="mb-3 font-medium text-[11px] sm:text-xs">
                  Build pipeline deployment successfully executed to Vercel
                  production hosting.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 whitespace-nowrap">
                    v2.4.1-stable
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 whitespace-nowrap">
                    SHA-8f2c7a
                  </span>
                </div>
              </div>
            </Card>

            {/* Type 4: Critical Error Banner */}
            <Card title="API Connection Failure" color="red" isDark={isDark}>
              <div className="flex flex-col h-full justify-between">
                <p className="mb-3 text-[11px] sm:text-xs">
                  Failed to fetch context records from backend database instance
                  clusters. Request timeout interval expired.
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-rose-400 mt-auto min-w-0 w-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                  <span className="truncate">
                    Error Code: 504 Timeout
                  </span>
                </span>
              </div>
            </Card>

            {/* Type 5: Pending Warning Status Indicator */}
            <Card title="Subscription Notice" color="amber" isDark={isDark}>
              <div className="flex flex-col h-full justify-between">
                <p className="mb-3 text-[11px] sm:text-xs">
                  Your usage limits have crossed 85% of your standard trial tiers.
                  Please wire payment processing systems.
                </p>
                <button
                  className={`w-full text-center px-3 py-1.5 text-[11px] sm:text-xs font-bold rounded-lg border transition-all mt-auto active:scale-[0.97] cursor-pointer ${
                    isDark
                      ? "border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
                      : "border-amber-200 text-amber-700 hover:bg-amber-100/50"
                  }`}
                >
                  Upgrade Workspace Tiers
                </button>
              </div>
            </Card>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default ChildrenProps;
