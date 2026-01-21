import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, CheckCircle, Users, Clock, MapPin } from "lucide-react";

/* -------------------- Counter -------------------- */
const StatCounter = ({ targetValue, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = targetValue;
    const totalMs = duration * 1000;
    const stepTime = Math.max(totalMs / end, 10);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetValue, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

/* -------------------- Main Component -------------------- */
const LiveCityStats = () => {
  const stats = [
    {
      id: 1,
      label: "Issues Resolved",
      value: 1240,
      suffix: "+",
      icon: <CheckCircle size={24} className="text-emerald-500" />,
      hoverText: "group-hover:text-emerald-600",
      bar: "from-emerald-400 to-emerald-600"
    },
    {
      id: 2,
      label: "Active Citizens",
      value: 850,
      suffix: "K",
      icon: <Users size={24} className="text-violet-500" />,
      hoverText: "group-hover:text-violet-600",
      bar: "from-violet-400 to-violet-600"
    },
    {
      id: 3,
      label: "Avg. Resolution Time",
      value: 48,
      suffix: "hrs",
      icon: <Clock size={24} className="text-sky-500" />,
      hoverText: "group-hover:text-sky-600",
      bar: "from-sky-400 to-sky-600"
    },
    {
      id: 4,
      label: "Active Wards",
      value: 92,
      suffix: "",
      icon: <MapPin size={24} className="text-rose-500" />,
      hoverText: "group-hover:text-rose-600",
      bar: "from-rose-400 to-rose-600"
    }
  ];

  return (
    <section className="relative py-24 bg-base-200 overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0  bg-[size:40px_40px] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 px-4 py-1.5 rounded-full mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-emerald-700 text-[10px] font-black tracking-widest uppercase">
              Live Tracking Active
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-secondary mb-6 tracking-tight">
            Real-Time <span className="text-primary">Impact</span>
          </h2>

          <div className="mx-auto w-20 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="h-full bg-base-100 shadow-2xl border-slate-200 p-8 rounded-[2.5rem]
                transition-all duration-500
                group-hover:border-violet-300
                group-hover:shadow-[0_25px_60px_rgba(124,92,255,0.12)]">

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8
                  transition-transform duration-500 group-hover:scale-110">
                  {stat.icon}
                </div>

                {/* Text */}
                <h3 className={`text-5xl font-black text-secondary tracking-tighter transition-colors duration-500 ${stat.hoverText}`}>
                  <StatCounter targetValue={stat.value} />
                  <span className="ml-1 text-xl text-slate-400 font-bold">{stat.suffix}</span>
                </h3>

                <p className="mt-1 text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                  {stat.label}
                </p>

                {/* Progress Bar */}
                <div className="mt-8 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "80%" }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    className={`h-full bg-gradient-to-r ${stat.bar}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 bg-white border border-slate-200 p-6 rounded-3xl
          flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
              <Activity size={20} className="animate-pulse" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-sm">
                System Status:
                <span className="ml-2 text-emerald-600 uppercase tracking-widest text-[10px]">
                  Optimal
                </span>
              </p>
              <p className="text-slate-500 text-xs font-medium">
                Monitoring infrastructure across 92 wards in real-time.
              </p>
            </div>
          </div>

          <button className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white
            rounded-xl text-[10px] font-black tracking-widest uppercase
            transition-all shadow-lg shadow-violet-200">
            View Analytics
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveCityStats;
