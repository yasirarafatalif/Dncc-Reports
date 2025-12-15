import React from "react";
import { FaCity, FaTools, FaUserCheck, FaChartLine } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Building Smarter Cities,
            <span className="block text-blue-600">Together</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A modern public infrastructure issue reporting platform that empowers citizens
            and helps authorities respond faster, smarter, and with full transparency.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* INTRO CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 -mt-16 relative z-10">
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            The <span className="font-semibold">Public Infrastructure Issue Reporting System</span> is a digital
            solution designed to close the communication gap between citizens and municipal authorities.
            From reporting issues to tracking resolutions, the entire process is simple, transparent,
            and efficient.
          </p>
        </div>

        {/* FEATURES */}
        <section className="grid md:grid-cols-4 gap-6 mt-16">
          <FeatureCard
            icon={<FaCity />}
            title="City-Centric"
            text="Designed to improve urban living by solving real-life public infrastructure problems."
          />
          <FeatureCard
            icon={<FaUserCheck />}
            title="Citizen Empowerment"
            text="Gives citizens a direct voice and visibility into issue resolution progress."
          />
          <FeatureCard
            icon={<FaTools />}
            title="Efficient Management"
            text="Admins and staff can verify, assign, and resolve issues with a structured workflow."
          />
          <FeatureCard
            icon={<FaChartLine />}
            title="Transparent Tracking"
            text="Real-time status updates ensure accountability and trust."
          />
        </section>

        {/* MISSION & VISION */}
        <section className="grid md:grid-cols-2 gap-10 mt-20">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h2>
            <p className="text-blue-900/80 leading-relaxed">
              To create a reliable and transparent platform that reduces response time,
              improves accountability, and strengthens collaboration between citizens
              and government authorities.
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 shadow">
            <h2 className="text-2xl font-bold text-emerald-900 mb-4">Our Vision</h2>
            <p className="text-emerald-900/80 leading-relaxed">
              A future where smart cities use technology to proactively address problems
              and citizens actively participate in improving public services.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How the System Works
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              "Report an Issue",
              "Admin Verification",
              "Staff Assignment",
              "Progress Tracking",
              "Issue Resolution",
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
              >
                <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="font-semibold text-gray-800">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <div className="bg-gray-900 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Let’s Make Our Cities Better
            </h2>
            <p className="text-gray-300 text-lg">
              Report problems. Track progress. See real change.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, text }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:-translate-y-1 hover:shadow-lg transition">
      <div className="text-3xl text-blue-600 mb-4 flex justify-center">{icon}</div>
      <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
    </div>
  );
};

export default About;
