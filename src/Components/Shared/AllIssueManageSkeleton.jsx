import React from 'react';
const AllIssueManageSkeleton = () => {
  return (
    <div className="p-6 min-h-screen bg-slate-50 animate-pulse">

      {/* ================= FILTER SKELETON ================= */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="h-12 w-48 bg-gray-200 rounded-lg"></div>

          <div className="h-12 w-full md:w-56 bg-gray-200 rounded-lg"></div>
          <div className="h-12 w-full md:w-56 bg-gray-200 rounded-lg"></div>

          <div className="h-12 w-40 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* ================= TABLE SKELETON ================= */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b flex justify-between">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
        </div>

        {/* Table Rows */}
        <div className="divide-y">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 p-4 items-center"
            >
              <div className="h-4 w-6 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-6 w-28 bg-gray-200 rounded-lg"></div>
              <div className="h-6 w-24 bg-gray-200 rounded-lg"></div>
              <div className="h-6 w-24 bg-gray-200 rounded-lg"></div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>

              <div className="flex gap-2">
                <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllIssueManageSkeleton;
