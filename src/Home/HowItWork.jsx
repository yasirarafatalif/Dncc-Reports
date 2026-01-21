import React from "react";
import { motion } from "framer-motion";
import { Edit3, ShieldCheck, UserCheck, Settings, Bell, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: <Edit3 size={28} />,
    title: "Report an Issue",
    desc: "Citizens report public issues with photos and live location.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Issue Verification",
    desc: "Admin verifies the reported issue to ensure authenticity.",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: <UserCheck size={28} />,
    title: "Assign to Staff",
    desc: "Verified issues are assigned to responsible government staff.",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    icon: <Settings size={28} />,
    title: "Issue Resolution",
    desc: "Staff resolves the issue on-site and updates the status.",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: <Bell size={28} />,
    title: "Status Update",
    desc: "Citizens receive real-time updates until the issue is resolved.",
    color: "bg-pink-500/10 text-pink-500",
  },
];

const HowItWork = () => {
  return (
    <section className="py-24 bg-base-200 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#aa84fc]/5 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#aa84fc] font-black tracking-[0.3em] text-[10px] uppercase border border-[#aa84fc]/30 px-4 py-1.5 rounded-full">
              Workflow
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-secondary mt-6 mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              A transparent 5-step process ensuring every reported issue gets the attention it deserves.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-800 to-transparent -translate-y-1/2 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-2 w-10 h-10  border border-white/10 rounded-full flex items-center justify-center text-[#aa84fc] font-black text-xs z-20 shadow-xl group-hover:border-[#aa84fc]/50 transition-colors">
                  0{index + 1}
                </div>

                {/* Card */}
                <div className="h-full p-8 rounded-[2.5rem] bg-base-100 backdrop-blur-xl border border-white/5 hover:border-[#aa84fc]/20 transition-all duration-500 text-center flex flex-col items-center">
                  
                  {/* Icon Box */}
                  <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center mb-8 shadow-inner transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110`}>
                    {step.icon}
                  </div>

                  <h3 className="font-bold text-xl text-white mb-4 group-hover:text-[#aa84fc] transition-colors leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {step.desc}
                  </p>

                  {/* Desktop Arrows (except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 text-slate-700 group-hover:text-[#aa84fc] transition-colors animate-pulse">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWork;