import React from "react";

const IssueDetailsPreview = () => {
  const issue = {
    title: "Road Pothole in Uttara Sector 7",
    description: "A large pothole in front of House 17 causing traffic and waterlogging.",
    status: "pending",
    priority: "normal",
    isBoosted: false,
    submittedBy: { name: "Alif", email: "alif@gmail.com" },
    assignedStaff: {
      name: "John Doe",
      email: "john@city.gov",
      phone: "01700000000",
    },
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
    ],
    timeline: [
      {
        status: "pending",
        message: "Issue created by citizen",
        updatedBy: "Citizen",
        dateTime: Date.now(),
      },
      {
        status: "assigned",
        message: "Assigned to staff: John Doe",
        updatedBy: "Admin",
        dateTime: Date.now() - 3600000,
      },
      {
        status: "boosted",
        message: "Priority set to HIGH (100৳ paid)",
        updatedBy: "Citizen",
        dateTime: Date.now() - 7200000,
      },
    ],
  };

  const user = { name: "Alif", email: "alif@gmail.com" };

  const isOwner = user.email === issue.submittedBy.email;
  const canEdit = isOwner && issue.status === "pending";
  const canDelete = isOwner;
  const canBoost = !issue.isBoosted;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold text-gray-800">{issue.title}</h1>
          <p className="text-gray-600 mt-2">{issue.description}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              {issue.status}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              Priority: {issue.priority}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Submitted by: {issue.submittedBy.name} ({issue.submittedBy.email})
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-wrap gap-4">
          {canEdit && (
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Edit Issue
            </button>
          )}

          {canDelete && (
            <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete Issue
            </button>
          )}

          {canBoost && (
            <button className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Boost Priority (100৳)
            </button>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Assigned Staff</h2>

          <div className="border p-4 rounded-lg bg-gray-50">
            <p><strong>Name:</strong> {issue.assignedStaff.name}</p>
            <p><strong>Email:</strong> {issue.assignedStaff.email}</p>
            <p><strong>Phone:</strong> {issue.assignedStaff.phone}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Issue Images</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {issue.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Issue"
                className="rounded-lg shadow-sm object-cover h-32 w-full"
              />
            ))}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Issue Timeline</h2>

          <div className="relative border-l border-gray-300 ml-4 space-y-10">
            {issue.timeline.map((entry, index) => (
              <div key={index} className="ml-6">
                <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2"></div>

                <div className="bg-gray-50 p-4 rounded-lg shadow-sm border">
                  <p className="font-semibold capitalize">{entry.status}</p>
                  <p className="text-gray-700">{entry.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Updated by: {entry.updatedBy}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(entry.dateTime).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsPreview;
