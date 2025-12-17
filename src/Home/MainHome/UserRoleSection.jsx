import { FaUserAlt, FaUserShield, FaTools } from "react-icons/fa";

const roles = [
  {
    icon: <FaUserAlt />,
    title: "Citizen",
    points: [
      "Report public issues",
      "Upload photos & location",
      "Track issue status",
      "Get real-time notifications",
    ],
    color: "from-green-50 to-green-100 text-green-600",
  },
  {
    icon: <FaUserShield />,
    title: "Admin",
    points: [
      "Verify reported issues",
      "Assign tasks to staff",
      "Monitor system activity",
      "View analytics dashboard",
    ],
    color: "from-blue-50 to-blue-100 text-blue-600",
  },
  {
    icon: <FaTools />,
    title: "Staff",
    points: [
      "View assigned issues",
      "Update work progress",
      "Resolve issues on-site",
      "Close completed tasks",
    ],
    color: "from-purple-50 to-purple-100 text-purple-600",
  },
];

const UserRoleSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
     
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#71717A]   mb-4">
            User Roles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Different roles work together to ensure faster and transparent
            resolution of public infrastructure issues.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${role.color} rounded-2xl p-8 shadow hover:shadow-xl  hover:scale-105 hover:cursor-pointer transition`}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-2xl mb-6 shadow">
                {role.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {role.title}
              </h3>

              <ul className="space-y-2 text-gray-700">
                {role.points.map((point, i) => (
                  <li key={i}>✔ {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRoleSection;
