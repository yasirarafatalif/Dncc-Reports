import {
  FaRegEdit,
  FaCheckCircle,
  FaUserCog,
  FaTools,
  FaBell,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaRegEdit />,
    title: "Report an Issue",
    desc: "Citizens report public issues with photos, description and live location.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Issue Verification",
    desc: "Admin verifies the reported issue to ensure authenticity.",
  },
  {
    icon: <FaUserCog />,
    title: "Assign to Staff",
    desc: "Verified issues are assigned to responsible government staff.",
  },
  {
    icon: <FaTools />,
    title: "Issue Resolution",
    desc: "Staff resolves the issue on-site and updates the status.",
  },
  {
    icon: <FaBell />,
    title: "Status Update",
    desc: "Citizens receive real-time updates until the issue is resolved.",
  },
];

const HowItWork = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A simple and transparent workflow to ensure faster resolution of
            public infrastructure issues.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition"
            >
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl mb-6">
                {step.icon}
              </div>

              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
