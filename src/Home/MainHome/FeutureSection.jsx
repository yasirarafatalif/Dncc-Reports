import React from "react";
import { motion } from "framer-motion";
import { 
  Megaphone, 
  MapPin, 
  // UserShield, 
  ClipboardCheck, 
  History, 
  BarChart3, 
  Sparkles 
} from "lucide-react";

const features = [
  {
    icon: <Megaphone size={28} />,
    title: "Easy Issue Reporting",
    desc: "Citizens can report infrastructure issues like potholes or garbage overflow with photos in seconds.",
    accent: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: <MapPin size={28} />,
    title: "Live Location Tracking",
    desc: "Every report is mapped with GPS precision for faster identification and government action.",
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: <ClipboardCheck size={28} /> ,
    title: "Admin & Staff Management",
    desc: "Secure portal for authorities to verify reports and manage field staff assignments.",
    accent: "text-[#aa84fc]",
    bg: "bg-[#aa84fc]/10",
  },
  {
    icon: <ClipboardCheck size={28} />,
    title: "Task Assignment System",
    desc: "Verified issues are intelligently assigned to responsible staff with status tracking.",
    accent: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: <History size={28} />,
    title: "Real-Time Updates",
    desc: "Instant notifications for citizens as their reported issues move from pending to resolved.",
    accent: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Analytics & Transparency",
    desc: "A data-driven dashboard ensuring accountability and measurable city improvements.",
    accent: "text-sky-500",
    bg: "bg-sky-500/10",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-24 bg-base-200 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#aa84fc]/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-emerald-500/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles size={14} className="text-[#aa84fc]" />
            <span>Platform Capabilities</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black text-secondary mb-6 tracking-tight leading-tight">
            Powerful Features for a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aa84fc] to-[#6d28d9]">
              Connected Community
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            A smart digital ecosystem designed to transform public infrastructure management with total transparency.
          </p>
        </div>

        {/* Bento-style Grid */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-[2.5rem]  bg-base-100 border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-[#aa84fc]/10 transition-all duration-500"
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.accent} flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110 shadow-inner`}>
                {item.icon}
              </div>

              {/* Text Info */}
              <h3 className="text-2xl font-bold text-secondary mb-4 group-hover:text-[#aa84fc] transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-500 leading-relaxed text-sm font-medium">
                {item.desc}
              </p>

              {/* Bottom Decorative Line */}
              <div className="absolute bottom-10 left-10 w-8 h-1 bg-base-100  rounded-full transition-all duration-500 group-hover:w-20 group-hover:bg-[#aa84fc]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;