
const ComplexProps = ({isDark}) => {
  return (
    <div className={`p-8 rounded-2xl shadow-xl transition-all duration-300 border ${
      isDark 
        ? "bg-slate-900 border-slate-800" 
        : "bg-white border-slate-100"
    }`}>
      <h1 className={`text-2xl font-bold tracking-tight mb-3 ${
        isDark ? "text-slate-100" : "text-slate-900"
      }`}>
        Complex Props
      </h1>
      
      <p className={`text-base leading-relaxed ${
        isDark ? "text-slate-400" : "text-slate-600"
      }`}>
        Complex Props is in progress
      </p>
    </div>
  )
}

export default ComplexProps