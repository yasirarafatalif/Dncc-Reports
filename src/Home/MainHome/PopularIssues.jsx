import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Trash2, Droplets, Construction, AlertTriangle, ArrowUpRight } from "lucide-react";

const PopularIssues = () => {
  const issues = [
    {
      id: 1,
      title: "Broken Streetlight",
      category: "Electricity",
      count: "124 Reports",
      status: "Fixing",
      icon: <Lightbulb className="text-yellow-400" />,
      glow: "group-hover:shadow-yellow-500/20",
      border: "hover:border-yellow-500/50"
    },
    {
      id: 2,
      title: "Garbage Overflow",
      category: "Sanitation",
      count: "89 Reports",
      status: "Pending",
      icon: <Trash2 className="text-emerald-400" />,
      glow: "group-hover:shadow-emerald-500/20",
      border: "hover:border-emerald-500/50"
    },
    {
      id: 3,
      title: "Water Leakage",
      category: "WASA",
      count: "56 Reports",
      status: "Resolved",
      icon: <Droplets className="text-blue-400" />,
      glow: "group-hover:shadow-blue-500/20",
      border: "hover:border-blue-500/50"
    },
    {
      id: 4,
      title: "Road Potholes",
      category: "Infrastructure",
      count: "210 Reports",
      status: "Critical",
      icon: <Construction className="text-orange-400" />,
      glow: "group-hover:shadow-orange-500/20",
      border: "hover:border-orange-500/50"
    },
  ];

  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#aa84fc]/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-[#aa84fc] font-bold mb-3">
              <span className="w-8 h-[2px] bg-[#aa84fc]"></span>
              <span className="tracking-[0.2em] text-xs uppercase">Live Statistics</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
              Hotspots of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aa84fc] to-[#4ade80]">Reports</span>
            </h2>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            className="flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors"
          >
            Explore Map <ArrowUpRight size={20} className="text-[#aa84fc]" />
          </motion.button>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {issues.map((issue, idx) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -12 }}
              className={`group relative p-8 rounded-[2.5rem] bg-base-200 border border-white/5 backdrop-blur-xl transition-all duration-500 ${issue.border} ${issue.glow} hover:shadow-2xl`}
            >
              {/* Status Badge */}
              <div className="absolute top-6 right-6">
                <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${
                    issue.status === 'Resolved' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' :
                    issue.status === 'Critical' ? 'border-red-500/50 text-red-400 bg-red-500/10' : 
                    'border-slate-500/50 text-slate-300 bg-slate-500/10'
                  }`}>
                  {issue.status}
                </span>
              </div>

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-8 border border-white/5 group-hover:border-[#aa84fc]/30 transition-colors shadow-inner">
                {issue.icon}
              </div>

              {/* Text Info */}
              <p className="text-[#aa84fc] text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                {issue.category}
              </p>
              <h3 className="text-2xl font-bold text-secondary mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400">
                {issue.title}
              </h3>

              {/* Footer Stat */}
              <div className="flex items-center justify-between">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/100?img=${i + issue.id + 10}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div className="text-right">
                   <p className="text-white font-black text-sm">{issue.count}</p>
                   <p className="text-[9px] text-slate-500 uppercase font-bold">Total Active</p>
                </div>
              </div>
              
              {/* Animated Line on Hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#aa84fc] to-transparent group-hover:w-1/2 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularIssues;