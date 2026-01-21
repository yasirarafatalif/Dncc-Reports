import React from "react";
import { motion } from "framer-motion";
import { User, ShieldCheck, HardHat, CheckCircle2, Sparkles } from "lucide-react";

const roles = [
  {
    icon: <User size={32} />,
    title: "Citizen",
    tagline: "The Eyes of the City",
    points: [
      "Report public infrastructure issues",
      "Upload real-time photos & location",
      "Track reporting history & status",
      "Get instant status notifications",
    ],
    accent: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-500",
    borderColor: "group-hover:border-emerald-500/50",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Admin",
    tagline: "The System Controller",
    points: [
      "Verify and validate reported issues",
      "Assign tasks to specific staff members",
      "Monitor system-wide activity logs",
      "Access advanced analytics dashboard",
    ],
    accent: "from-[#aa84fc]/20 to-[#aa84fc]/5",
    iconColor: "text-[#aa84fc]",
    borderColor: "group-hover:border-[#aa84fc]/50",
  },
  {
    icon: <HardHat size={32} />,
    title: "Staff",
    tagline: "The Action Takers",
    points: [
      "View and manage assigned tasks",
      "Update live progress on-site",
      "Resolve infrastructure problems",
      "Submit final resolution reports",
    ],
    accent: "from-sky-500/20 to-sky-500/5",
    iconColor: "text-sky-500",
    borderColor: "group-hover:border-sky-500/50",
  },
];

const UserRoleSection = () => {
  return (
    <section className="py-24 bg-base-200 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-100 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-slate-100  border-slate-200 px-4 py-1.5 rounded-full text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles size={14} className="text-[#aa84fc]" />
            <span>Collaboration Ecosystem</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-secondary mb-6 tracking-tight">
            Built for Every <span className="text-[#aa84fc]">Stakeholder</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            A seamless bridge between citizens and authorities for a more transparent and responsive city.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative p-10 rounded-[2.5rem] bg-gradient-to-br ${role.accent}  border-slate-100 transition-all duration-500 ${role.borderColor} hover:shadow-2xl hover:shadow-[#aa84fc]/5`}
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center ${role.iconColor} mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                {role.icon}
              </div>

              {/* Title & Tagline */}
              <div className="mb-8">
                <h3 className="text-2xl font-black text-secondary mb-1">
                  {role.title}
                </h3>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${role.iconColor}`}>
                  {role.tagline}
                </p>
              </div>

              {/* Points List */}
              <ul className="space-y-4">
                {role.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm leading-relaxed">
                    <CheckCircle2 size={18} className={`${role.iconColor} mt-0.5 flex-shrink-0`} />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Decorative Background Icon */}
              <div className={`absolute bottom-6 right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500`}>
                 {React.cloneElement(role.icon, { size: 100 })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRoleSection;