import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Logo1 from "../Shared/Logo1";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="footer max-w-7xl mx-auto p-10 grid-cols-1 md:grid-cols-4">

        {/* ===== Brand ===== */}
        <aside className="space-y-3">
          <Logo1 />
          <p className="text-sm text-gray-600">
            Public Infrastructure Issue Reporting System <br />
            Improving municipal services through technology.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-3">
            <a
              href=""
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              <FaFacebookF />
            </a>
           
            <a
              href="#"
              className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </aside>

        {/* ===== Services ===== */}
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Issue Reporting</a>
          <a className="link link-hover">Issue Tracking</a>
          <a className="link link-hover">Staff Assignment</a>
          <a className="link link-hover">Resolution Monitoring</a>
        </nav>

        {/* ===== Company ===== */}
        <nav>
          <h6 className="footer-title">Company</h6>
          <a href="/about" className="link link-hover">About Us</a>
          <a href="/contact" className="link link-hover">Contact</a>
       
        </nav>

        {/* ===== Legal ===== */}
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of Use</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookie Policy</a>
        </nav>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="border-t border-base-300 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Public Issue System • Developed by{" "}
        <span className="font-semibold">Yasir Arafat Alif</span>
      </div>
    </footer>
  );
};

export default Footer;
