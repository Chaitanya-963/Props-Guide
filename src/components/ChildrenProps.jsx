function Card({ children, title, color = "blue", isDark = true }) {
  // Fixed mapping bugs and introduced beautiful dark/light adaptive states
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
    <div className={`border-l-4 ${colorClasses[color] || colorClasses.blue} p-6 rounded-r-xl rounded-l-xs shadow-md transition-all duration-300 backdrop-blur-xs`}>
      {title && (
        <h3 className={`text-lg font-bold mb-3 tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
          {title}
        </h3>
      )}
      <div className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
        {children}
      </div>
    </div>
  );
}

function Container({ children, layout = "vertical" }) {
  const layoutClasses = {
    vertical: "flex flex-col space-y-4",
    horizontal: "flex flex-row flex-wrap gap-4",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", 
  };

  return <div className={layoutClasses[layout] || layoutClasses.vertical}>{children}</div>;
}

const ChildrenProps = ({ isDark = true }) => {
  return (
    <section className={`p-8 rounded-2xl shadow-xl transition-all duration-300 border ${
      isDark 
        ? "bg-slate-900 border-slate-800 text-slate-100" 
        : "bg-white border-slate-100 text-slate-900"
    }`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-3">Children Props</h2>
        <p className={`text-base leading-relaxed mb-8 max-w-3xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          The <code className="text-indigo-400 font-mono text-sm px-1.5 py-0.5 rounded-sm bg-indigo-500/10">children</code> prop 
          allows components to act as generic layouts. Parents can inject any data, text strings, custom interactive buttons, 
          or nested element configurations seamlessly inside them.
        </p>

        <div className="space-y-4">
          <h3 className={`text-sm font-semibold tracking-wide uppercase ${isDark ? "text-slate-400" : "text-slate-500"} mb-4`}>
            Card Component Composability Demo
          </h3>
          
          <Container layout="grid">
            {/* Type 1: Standard User Profile Card */}
            <Card title="User Profile" color="blue" isDark={isDark}>
              <div className="space-y-1 font-medium">
                <p><span className="opacity-60">Name:</span> Chaitanya Mehetre</p>
                <p><span className="opacity-60">Email:</span> chaitanya@me.in</p>
                <p><span className="opacity-60">Role:</span> Developer</p>
              </div>
            </Card>

            {/* Type 2: Interactive Statistics Card with Action Button */}
            <Card title="Company Statistics" color="green" isDark={isDark}>
              <div className="space-y-1 font-medium mb-4">
                <p><span className="opacity-60">Founder:</span> Mark Z.</p>
                <p><span className="opacity-60">Network:</span> meta.me.in</p>
                <p><span className="opacity-60">Status:</span> Highly Active</p>
              </div>
              <button className="w-full sm:w-auto px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer shadow-sm">
                Connect with me!
              </button>
            </Card>

            {/* Type 3: Technical System Notification Alert */}
            <Card title="System Update" color="purple" isDark={isDark}>
              <p className="mb-3 font-medium">Build pipeline deployment successfully executed to Vercel production hosting.</p>
              <div className="flex gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  v2.4.1-stable
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  SHA-8f2c7a
                </span>
              </div>
            </Card>

            {/* Type 4: Critical Error Banner */}
            <Card title="API Connection Failure" color="red" isDark={isDark}>
              <p className="mb-3">Failed to fetch context records from backend database instance clusters. Request timeout interval expired.</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
                Error Code: 504 Gateway Timeout
              </span>
            </Card>

            {/* Type 5: Pending Warning Status Indicator */}
            <Card title="Subscription Notice" color="amber" isDark={isDark}>
              <p className="mb-4">Your usage limits have crossed 85% of your standard trial tiers. Please wire payment processing systems.</p>
              <button className={`w-full text-center px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                isDark 
                  ? "border-amber-500/40 text-amber-400 hover:bg-amber-500/10" 
                  : "border-amber-200 text-amber-700 hover:bg-amber-100/50"
              }`}>
                Upgrade Workspace Tiers
              </button>
            </Card>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default ChildrenProps;
