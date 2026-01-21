import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import Logo1 from "../Shared/Logo1";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative bg-base-100 pt-20 overflow-hidden">
      {/* Decorative Background Element (Subtle Gradient Blur) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 pb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-4 space-y-6">
            <motion.div variants={itemVariants} className="scale-110 origin-left">
              <Logo1 />
            </motion.div>
            <motion.p variants={itemVariants} className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Empowering citizens to report and track public infrastructure issues. 
              Together, we build a smarter, more responsive community.
            </motion.p>
            
            {/* Social Icons with Premium Hover */}
            <motion.div variants={itemVariants} className="flex gap-4">
              {[
                { icon: <FaFacebookF />, color: "hover:bg-blue-600", href: "#" },
                { icon: <FaLinkedinIn />, color: "hover:bg-blue-700", href: "https://www.linkedin.com/in/yasir-arafat-alif-b73944275/" },
           
                { icon: <FaGithub />, color: "hover:bg-slate-900", href: "https://github.com/yasirarafatalif" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 ${social.color} hover:text-white transition-all duration-300 shadow-sm`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links Sections */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Services */}
            <motion.div variants={itemVariants} className="space-y-5">
              <h4 className="text-slate-900 font-bold text-base tracking-tight uppercase text-xs">Services</h4>
              <ul className="space-y-3">
                {["Issue Reporting", "Live Tracking", "Staff Assignment", "Analytics"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 hover:text-blue-600 text-sm transition-colors duration-200 flex items-center group">
                      <span className="w-0 group-hover:w-2 h-[2px] bg-blue-600 mr-0 group-hover:mr-2 transition-all"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants} className="space-y-5">
              <h4 className="text-slate-900 font-bold text-base tracking-tight uppercase text-xs">Company</h4>
              <ul className="space-y-3">
                {["About Us", "Contact", "Our Mission", "Success Stories"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 hover:text-blue-600 text-sm transition-colors duration-200 flex items-center group">
                      <span className="w-0 group-hover:w-2 h-[2px] bg-blue-600 mr-0 group-hover:mr-2 transition-all"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={itemVariants} className="space-y-5">
              <h4 className="text-slate-900 font-bold text-base tracking-tight uppercase text-xs">Legal</h4>
              <ul className="space-y-3">
                {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 hover:text-blue-600 text-sm transition-colors duration-200 flex items-center group">
                      <span className="w-0 group-hover:w-2 h-[2px] bg-blue-600 mr-0 group-hover:mr-2 transition-all"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="bg-slate-50/50   py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-secondary text-sm font-medium">
          <p>© {currentYear} <span className="text-slate-900 font-bold">Public Issue System</span>. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Developed  by 
            <a href="#" className="text-slate-900 font-bold hover:text-blue-600 transition-colors ml-1 underline underline-offset-4 decoration-blue-200">
              Yasir Arafat Alif
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;