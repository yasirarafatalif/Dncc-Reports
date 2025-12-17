import {
  FaBullhorn,
  FaMapMarkedAlt,
  FaUserShield,
  FaTasks,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBullhorn />,
    title: "Easy Issue Reporting",
    desc: "Citizens can easily report issues like potholes, streetlight damage, garbage overflow with photos and location.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Live Location Tracking",
    desc: "Each issue is mapped with GPS location for faster identification and action.",
  },
  {
    icon: <FaUserShield />,
    title: "Admin & Staff Management",
    desc: "Admins can verify issues and assign tasks to government staff securely.",
  },
  {
    icon: <FaTasks />,
    title: "Task Assignment System",
    desc: "Issues are assigned to specific staff members with status tracking.",
  },
  {
    icon: <FaClock />,
    title: "Real-Time Status Updates",
    desc: "Users receive live updates when issues are pending, resolved, or rejected.",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics & Transparency",
    desc: "Dashboard analytics ensure accountability and transparent governance.",
  },
];

const gradients = [
  "from-green-50 to-green-100",
  "from-blue-50 to-blue-100",
  "from-purple-50 to-purple-100",
  "from-orange-50 to-orange-100",
  "from-pink-50 to-pink-100",
  "from-indigo-50 to-indigo-100",
];

const FeutureSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl  font-extrabold text-[#71717A]  mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A smart digital platform designed to improve public infrastructure
            management with transparency and efficiency.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
            data-aos="fade-up"
              key={index}
              className={`bg-gradient-to-br ${gradients[index]} hover:scale-105 hover:cursor-pointer rounded-2xl p-8 shadow hover:shadow-xl transition duration-300 hover:-translate-y-1`}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/80 text-green-600 text-2xl mb-6 shadow">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeutureSection;
