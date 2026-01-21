import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Headphones,
  Map,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const PremiumBoost = () => {
  const features = [
    {
      icon: <Zap className="text-yellow-400" />,
      title: "Priority Action",
      desc: "Your reports move 3x faster through the approval pipeline.",
      color: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: <ShieldCheck className="text-emerald-400" />,
      title: "Verified Badge",
      desc: "Get an 'Elite Citizen' badge that adds weight to your reports.",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      icon: <Headphones className="text-sky-400" />,
      title: "Direct Support",
      desc: "Access to a dedicated concierge for reporting complex issues.",
      color: "from-sky-500/20 to-indigo-500/20",
    },
    {
      icon: <Map className="text-purple-400" />,
      title: "Impact Map",
      desc: "See personalized analytics of how you've improved your area.",
      color: "from-purple-500/20 to-pink-500/20",
    },
  ];

  return (
    <section className="relative py-24 bg-base-100 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#aa84fc] opacity-[0.05] blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 opacity-[0.05] blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#aa84fc] text-sm font-bold mb-6"
            >
              <Sparkles size={16} />
              <span>UPGRADE TO ELITE CITIZEN</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black text-secondary leading-tight mb-8">
              Make Your Voice <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aa84fc] to-[#4ade80]">
                Unstoppable
              </span>
            </h2>

            <p className="text-slate-400 text-lg mb-10 max-w-lg">
              Standard citizens report issues. Premium citizens drive change.
              Get priority resolution and exclusive features to help your
              community better.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${f.color} border border-white/5 backdrop-blur-md`}
                >
                  <div className="mb-3">{f.icon}</div>
                  <h4 className="text-white font-bold mb-1">{f.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content: The 3D-ish Card */}
          <motion.div
            initial={{ opacity: 0, rotateY: 20, perspective: 1000 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Main Premium Card */}
            <motion.div
              whileHover={{ rotateX: 5, rotateY: -5 }}
              className="relative bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl overflow-hidden"
            >
              {/* Card Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#aa84fc] blur-[80px] opacity-20" />

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-12">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#aa84fc] to-[#4ade80] flex items-center justify-center font-black text-white italic text-xl shadow-lg">
                    N
                  </div>
                  <span className="text-slate-400 font-mono text-sm tracking-widest uppercase">
                    Elite Pass 2026
                  </span>
                </div>

                <div className="mb-10">
                  <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest">
                    Annual Membership
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-6xl font-black text-white tracking-tighter">
                      ৳499
                    </h3>
                    <span className="text-[#4ade80] font-bold">/year</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  {[
                    "Instant AI Issue Categorization",
                    "SMS & Email Priority Alerts",
                    "Quarterly Impact Reports",
                    "Unlimited Reports",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-[#aa84fc]" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(170, 132, 252, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-2 group transition-all"
                >
                  GET STARTED NOW
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <p className="text-center text-slate-500 text-[10px] mt-6 tracking-widest uppercase font-bold">
                  Designed for Smart Citizens of Bangladesh
                </p>
              </div>
            </motion.div>

            {/* Decorative Floating Element */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-emerald-500 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20"
            >
              <div className="bg-white/20 p-2 rounded-lg">
                <Zap size={20} fill="white" />
              </div>
              <div>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">
                  Fastest Response
                </p>
                <p className="text-sm font-black italic">99.9% Resolved</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumBoost;
